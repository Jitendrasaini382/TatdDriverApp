import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  useColorScheme,
  Platform,
  ActivityIndicator,
  Linking,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {launchCamera} from 'react-native-image-picker';
import NetInfo from '@react-native-community/netinfo';
import * as Progress from 'react-native-progress';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import RNFS from 'react-native-fs';
import Header from '../components/Header';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import YoutubePlayer from 'react-native-youtube-iframe';

import axios from 'axios';
import store from '../redux/store';
import {
  resetUserAuthState,
  setUserAuthStates,
} from '../redux/slices/userAuthSlice';
import DeviceInfo from 'react-native-device-info';
import {jwtDecode} from 'jwt-decode';
import {API_BASE_URL} from '../constant/path';
import {useSelector} from 'react-redux';
import {SUBMIT_FINAL_VIDEO_OF_DRIVERS_CAR} from '../apis/Apis';
import SlideupModal from '../components/modal/SlideUpModal';
import {AppColors} from '../assets/Colors';

const {width: screenWidth} = Dimensions.get('window');
const CHUNK_SIZE = 1024 * 1024; // 1MB

// 🔹 Axios client
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
  timeout: 0,
});

axiosClient.interceptors.request.use(
  async config => {
    const token = store.getState().userAuth.jwt;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response?.status == 401 ||
      error.response?.status == 400 ||
      (error.response?.data?.message === 'Token has expired' &&
        !originalRequest._retry)
    ) {
      originalRequest._retry = true;
      const refreshToken = store.getState().userAuth.refreshToken;
      const isRegistered = store.getState().userAuth.isRegistered;
      if (refreshToken) {
        const appVersion = DeviceInfo.getVersion();
        try {
          const url = isRegistered
            ? `${API_BASE_URL}login/refresh_token.php`
            : `${API_BASE_URL}driver-job/refresh_token.php`;

          const res = await axios.post(url, {
            refresh_token: refreshToken,
            app_version: appVersion,
          });

          if (res.data?.jwt) {
            store.dispatch(
              setUserAuthStates({key: 'jwt', value: res.data.jwt}),
            );
            store.dispatch(
              setUserAuthStates({
                key: 'userProfile',
                value: jwtDecode(res.data.jwt),
              }),
            );

            axiosClient.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${res.data.jwt}`;
            originalRequest.headers['Authorization'] = `Bearer ${res.data.jwt}`;
            return axiosClient(originalRequest);
          } else {
            store.dispatch(resetUserAuthState());
          }
        } catch (refreshError) {
          store.dispatch(resetUserAuthState());
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);

// 🔹 Upload API helper
const uploadApi = async (path, body) => {
  console.log('🌐 API CALL:', path, '➡️ Body:', body);
  try {
    const response = await axiosClient.post(path, body);
    console.log('✅ API RESPONSE:', path, response.data);
    if (response.data.status_code === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    console.log('❌ API CALL FAILED:', path, err.message);
    throw new Error(err.message || 'Upload failed');
  }
};

const CarVideoUpload = () => {
  const navigation = useNavigation();
  const routes = useRoute();
  console.log(routes);
  const colorScheme = useColorScheme();

  const [videoUri, setVideoUri] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [lastvideoData, setlastvideoData] = useState(null);
  const [showSteps, setShowSteps] = useState(true);
  const [isChecked, setisChecked] = useState(false);

  // Fixes: refs
  const pausedRef = useRef(false);
  const inFlightRef = useRef(false);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const colors = {
    bg: '#ffffff',
    surface: '#ffffff',
    muted: '#5b6475',
    text: '#0c1017',
    accent: '#2563eb',
    accentPress: '#1d4ed8',
    border: '#e6e8ef',
    ok: '#2ecc71',
    danger: '#e74c3c',
    warning: '#f39c12',
  };

  // Request permissions
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const camera = await request(PERMISSIONS.ANDROID.CAMERA);
      const audio = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
      return camera === RESULTS.GRANTED && audio === RESULTS.GRANTED;
    } else {
      const camera = await request(PERMISSIONS.IOS.CAMERA);
      const mic = await request(PERMISSIONS.IOS.MICROPHONE); // uncomment this line
      console.log(camera, mic);
      return camera === RESULTS.GRANTED;
    }
  };
  const [isShowingConfirmModal, setisShowingConfirmModal] = useState(false);

  // Record video
  const recordVideo = async () => {
    const granted = await requestPermissions();
    if (!granted) {
      Alert.alert(
        Platform.OS === 'android' ? 'अनुमति अस्वीकृत' : 'Permission denied',
        Platform.OS === 'android'
          ? 'कैमरा और माइक्रोफ़ोन की अनुमति देना ज़रूरी है।'
          : 'Camera and microphone permissions are required.',
        [
          {
            text: Platform.OS === 'android' ? 'रद्द करें' : 'Cancel',
            style: 'cancel',
          },
          {
            text:
              Platform.OS === 'android' ? 'सेटिंग्स पर जाएँ' : 'Go to Settings',
            onPress: () => {
              Linking.openSettings(); // Open app settings
            },
          },
        ],
      );
      return;
    }

    const options = {
      mediaType: 'video',
      videoQuality: Platform.OS == 'android' ? 'medium' : 'medium',
      durationLimit: 60,
      saveToPhotos: true,
    };

    const result = await launchCamera(options);
    if (result.didCancel) return;
    if (result.errorCode) {
      Alert.alert('Error', result.errorMessage || 'Camera error');
      return;
    }

    const videoAsset = result.assets && result.assets[0];
    if (videoAsset) {
      setVideoUri(videoAsset.uri);
      setUploadProgress(0);
      setUploadCompleted(false);
      setIsSubmitted(false);
      setUploadStatus('');
      uploadVideoInChunks(videoAsset.uri);
    }
  };

  // Upload function with fixes
  const uploadVideoInChunks = async (uri = videoUri) => {
    if (!uri) {
      Alert.alert('Error', 'Please select a video first');
      return;
    }

    if (inFlightRef.current) {
      console.log('⏳ Upload already running, skip new start');
      return;
    }
    inFlightRef.current = true;

    // reset paused
    setPaused(false);
    pausedRef.current = false;

    setIsUploading(true);
    setIsProcessing(true);
    setUploadStatus('Processing video...');
    setUploadProgress(0);
    console.log('🚀 Starting fresh upload process...');

    try {
      const stat = await RNFS.stat(uri);
      const fileSize = Number(stat.size);
      const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);
      const originalName = stat.name || `video_${Date.now()}.mp4`;

      console.log('📂 File details:', {
        uri,
        fileSize,
        totalChunks,
        originalName,
      });

      // Step 1: init
      const initForm = new FormData();
      initForm.append('action', 'check_upload');
      initForm.append('booking_number', routes?.params?.bookingNumber);
      initForm.append('booking_status_id', routes?.params?.status_id);
      initForm.append('total_chunks', totalChunks);
      initForm.append('original_name', originalName);

      const initData = await uploadApi(
        'duty-report/car_video_upload_validation.php',
        initForm,
      );

      const vidId = initData.video_id;
      setVideoId(vidId);
      console.log('📌 Video ID:', vidId);

      // Step 2: upload chunks
      for (let i = 0; i < totalChunks; i++) {
        if (pausedRef.current) {
          console.log('⏸ Upload paused at chunk:', i);
          break;
        }

        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, fileSize);
        console.log(`⬆️ Uploading chunk ${i + 1}/${totalChunks}`);

        const base64Chunk = await RNFS.read(uri, end - start, start, 'base64');
        const chunkPath = `${RNFS.CachesDirectoryPath}/chunk_${i}.mp4`;
        await RNFS.writeFile(chunkPath, base64Chunk, 'base64');

        const formData = new FormData();
        formData.append('action', 'upload_chunk');
        formData.append('video_id', vidId);
        formData.append('booking_status_id', routes?.params?.status_id);
        formData.append('chunk_index', i.toString());
        formData.append('total_chunks', totalChunks.toString());
        formData.append('chunk', {
          uri: 'file://' + chunkPath,
          type: 'video/mp4',
          name: `chunk_${i}.mp4`,
        });

        let res;
        try {
          res = await uploadApi(
            'duty-report/car_video_upload_validation.php',
            formData,
          );
          console.log(`✅ Chunk ${i} uploaded`, res);
        } catch (e) {
          if (String(e).includes('Network')) {
            setUploadStatus('Network lost, will retry...');
            setIsProcessing(false);
            setPaused(true);
            pausedRef.current = true;
            console.log('❌ Network error at chunk:', i);
            break;
          } else {
            setUploadStatus('Upload failed');
            Alert.alert('Upload Error', String(e));
            console.log('❌ Fatal error at chunk:', i, e);
            return;
          }
        } finally {
          await RNFS.unlink(chunkPath).catch(() => {});
        }

        const progress = ((i + 1) / totalChunks) * 100;
        setUploadProgress(progress);
        setUploadStatus(`Uploading... ${Math.round(progress)}%`);

        if (res?.next_action === 'merge_chunks') {
          console.log('🔔 Merge triggered');
          break;
        }
      }

      // Step 3: merge
      if (!pausedRef.current) {
        const mergeForm = new FormData();
        mergeForm.append('action', 'merge_chunks');
        mergeForm.append('booking_status_id', routes?.params?.status_id);
        mergeForm.append('video_id', vidId);

        const res = await uploadApi(
          'duty-report/car_video_upload_validation.php',
          mergeForm,
        );
        console.log('🎉 Merge response:', res);

        setlastvideoData(res);
        setUploadStatus('');
        setUploadProgress(100);
        setUploadCompleted(true);
      }
    } catch (err) {
      if (String(err).includes('Network')) {
        setPaused(true);
        pausedRef.current = true;
        setUploadStatus('Network lost, will retry...');
        setIsProcessing(false);
      } else {
        setUploadStatus('Upload failed');
        Alert.alert('Upload Error', String(err));
      }
    } finally {
      inFlightRef.current = false;
      if (!pausedRef.current) {
        setIsUploading(false);
        setIsProcessing(false);
      }
      console.log('🏁 Upload finished');
    }
  };

  // Submit video
  const [submitLoader, setsubmitLoader] = useState(false);
  const submitVideo = async () => {
    if (!videoId) {
      Alert.alert('Error', 'No video to submit');
      return;
    }
    try {
      setsubmitLoader(true);
      console.log(`${API_BASE_URL}duty-report/car-video-upload-success.php`);
      // setIsSubmitted(true);
      const data = await SUBMIT_FINAL_VIDEO_OF_DRIVERS_CAR({
        action: 'car_video_upload_success',
        booking_number: routes?.params?.bookingNumber,
        video_url: lastvideoData?.final_path,
        booking_status_id: routes?.params?.status_id,
      });
      console.log(data, 'oiuytdsxdcv');
      // Alert.alert('', data?.message);
      navigation.reset({
        index: 1, // 0 = trustedDriver, 1 = DutyReportUpdate (active screen)
        routes: [
          {name: 'TrustedDriver'},
          {
            name: 'DutyReportUpdate',
            params: {
              bookingNumber: routes?.params?.bookingNumber,
              state: '',
              action: routes?.params?.status_id,
            },
          },
        ],
      });
    } catch (error) {
      console.log(error);
      // setIsSubmitted(false);
      Alert.alert('Submit Error', String(error));
    } finally {
      setsubmitLoader(false);
    }
  };
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  // NetInfo listener
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (
        pausedRef.current &&
        state.isConnected &&
        videoUri &&
        !uploadCompleted &&
        !inFlightRef.current
      ) {
        console.log('🌐 Network back, restarting...');
        setPaused(false);
        pausedRef.current = false;
        // setUploadProgress(0);
        setIsUploading(false);
        setIsProcessing(false);
        setUploadCompleted(false);
        setUploadStatus('Retrying upload from start...');
        setTimeout(() => {
          uploadVideoInChunks(videoUri);
        }, 800);
      }
    });
    return () => unsubscribe();
  }, [videoUri, uploadCompleted]);

  const dynamicStyles = StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.bg},
    surface: {backgroundColor: colors.surface, borderColor: colors.border},
    text: {color: colors.text},
    mutedText: {color: colors.muted},
    accent: {backgroundColor: colors.accent},
    accentPressed: {backgroundColor: colors.accentPress},
  });

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Header backButton={true} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, dynamicStyles.text]}>
            {languageSwitch === 'hindi'
              ? 'कार का वीडियो अपलोड करें'
              : 'Upload Car Video'}
          </Text>
          {/* <Text style={[styles.subtitle, dynamicStyles.mutedText]}>
            {languageSwitch === 'hindi'
              ? 'अपनी कार का एक छोटा वॉक-अराउंड वीडियो रिकॉर्ड करें'
              : 'Record a short walk-around video of your car'}
          </Text> */}
        </View>

        {/* Video Preview */}
        <View style={[styles.previewFrame, dynamicStyles.surface]}>
          {videoUri ? (
            <View style={styles.videoContainer}>
              <Video
                ref={videoRef}
                source={{uri: videoUri}}
                style={styles.video}
                controls={true}
                resizeMode="contain"
                paused={true}
              />
              {uploadCompleted && !isSubmitted && (
                <TouchableOpacity
                  style={styles.editIcon}
                  onPress={() => {
                    recordVideo();
                  }}
                  activeOpacity={0.8}>
                  <Icon name="edit" size={20} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <Pressable
              onPress={() => {
                setisShowingConfirmModal(true);
              }}
              style={styles.placeholder}>
              <Icon color={'#999494d5'} size={40} name="upload" />
              <Text style={[styles.placeholderText, dynamicStyles.mutedText]}>
                {languageSwitch === 'hindi'
                  ? 'वीडियो अपलोड करें'
                  : 'Upload Video'}
              </Text>

              {/* <Text style={[styles.placeholderTitle, dynamicStyles.text]}>
                {languageSwitch === 'hindi'
                  ? 'कोई वीडियो रिकॉर्ड नहीं किया गया'
                  : 'No video recorded'}
              </Text> */}
              {/* <Text style={[styles.placeholderText, dynamicStyles.mutedText]}>
                {languageSwitch === 'hindi'
                  ? '"वीडियो अपलोड करें" पर टैप करके शुरू करें'
                  : 'Tap "Upload Video" below to start'}
              </Text> */}
            </Pressable>
          )}
        </View>

        {/* Upload Progress */}
        {(isUploading || uploadProgress > 0) && (
          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={uploadProgress / 100}
              width={screenWidth - 32}
              height={8}
              color={colors.accent}
              unfilledColor={colors.border}
              borderWidth={0}
              borderRadius={4}
            />
            <Text style={[styles.progressText, dynamicStyles.mutedText]}>
              {Math.round(uploadProgress)}%{' '}
              {languageSwitch === 'hindi' ? 'अपलोड हुआ' : 'uploaded'}
            </Text>
          </View>
        )}

        {/* Status Message */}
        {uploadStatus !== '' && (
          <Text
            style={[
              styles.statusText,
              uploadStatus.includes('success')
                ? {color: colors.ok}
                : uploadStatus.includes('failed')
                ? {color: colors.danger}
                : uploadStatus.includes('Processing')
                ? {color: colors.warning}
                : dynamicStyles.text,
            ]}>
            {uploadStatus}
          </Text>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {!videoUri ? (
            <TouchableOpacity
              style={[
                styles.btn,
                dynamicStyles.accent,
                {flexDirection: 'row', justifyContent: 'center'},
              ]}
              onPress={() => {
                setisShowingConfirmModal(true);
              }}
              disabled={isUploading}
              activeOpacity={0.8}>
              <Icon color={'white'} size={25} name="upload" />
              <Text style={styles.btnText}>
                {languageSwitch === 'hindi'
                  ? 'वीडियो अपलोड करें'
                  : 'Upload Video'}
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              {isProcessing && (
                <TouchableOpacity
                  style={[styles.btn, {backgroundColor: colors.warning}]}
                  disabled={true}>
                  <Text style={styles.btnText}>
                    {languageSwitch === 'hindi'
                      ? 'प्रोसेस हो रहा है...'
                      : 'Processing...'}
                  </Text>
                </TouchableOpacity>
              )}

              {uploadCompleted && !isSubmitted && (
                <TouchableOpacity
                  style={[styles.btn, {backgroundColor: colors.ok}]}
                  onPress={submitVideo}
                  disabled={submitLoader}
                  activeOpacity={0.8}>
                  {submitLoader ? (
                    <ActivityIndicator color={'white'} />
                  ) : (
                    <Text style={styles.btnText}>
                      {languageSwitch === 'hindi'
                        ? 'वीडियो सबमिट करें'
                        : 'Submit Video'}
                    </Text>
                  )}
                </TouchableOpacity>
              )}

              {isSubmitted && (
                <TouchableOpacity
                  style={[
                    styles.btn,
                    {backgroundColor: colors.ok, opacity: 0.7},
                  ]}
                  disabled={true}>
                  <Text style={styles.btnText}>
                    {languageSwitch === 'hindi'
                      ? '✓ सबमिट किया गया'
                      : '✓ Submitted'}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>

        {/* Instructions */}
        {routes?.params?.videoUrl && (
          <View style={[styles.instructionsCard, dynamicStyles.surface]}>
            <View style={styles.instructionsHeader}>
              <Text style={[styles.instructionsTitle, dynamicStyles.text]}>
                {languageSwitch === 'hindi'
                  ? 'कार का वीडियो कैसे रिकॉर्ड करें'
                  : 'How to Record Car Video'}
              </Text>
            </View>
            <View style={styles.instructionsContent}>
              {/* {bookingInfo?.data?.youtube_video && ( */}

              {/* )} */}
              {/* <TouchableOpacity
    style={styles.stepsToggle}
    onPress={() => setShowSteps(!showSteps)}>
    <Text style={[styles.stepsToggleText, dynamicStyles.text]}>
      {showSteps
        ? languageSwitch === 'hindi'
          ? '▼ रिकॉर्डिंग टिप्स छुपाएँ'
          : '▼ Hide recording tips'
        : languageSwitch === 'hindi'
        ? '▶ रिकॉर्डिंग टिप्स दिखाएँ'
        : '▶ Show recording tips'}
    </Text>
  </TouchableOpacity> */}
              {showSteps && (
                <View style={styles.stepsList}>
                  <View style={{marginTop: 0}}>
                    <YoutubePlayer
                      height={200}
                      // initialPlayerParams={{

                      // controls:false
                      // }
                      // }
                      autoPlay={false}
                      videoId={routes?.params?.videoUrl}
                    />
                  </View>
                  {/* <Text style={[styles.stepItem, dynamicStyles.mutedText]}>
        {languageSwitch === 'hindi'
          ? '• फ़ोन को क्षैतिज (लैंडस्केप) रखें'
          : '• Hold phone horizontally (landscape)'}
      </Text>
      <Text style={[styles.stepItem, dynamicStyles.mutedText]}>
        {languageSwitch === 'hindi'
          ? '• आगे से शुरू करें, घड़ी की दिशा में चलें (10-15 सेकंड)'
          : '• Start at front, walk clockwise (10-15s)'}
      </Text>
      <Text style={[styles.stepItem, dynamicStyles.mutedText]}>
        {languageSwitch === 'hindi'
          ? '• 1-2 मीटर की दूरी रखें, पहियों और पैनल्स दिखाएँ'
          : '• Keep 1-2m distance, show wheels and panels'}
      </Text>
      <Text style={[styles.stepItem, dynamicStyles.mutedText]}>
        {languageSwitch === 'hindi'
          ? '• खरोंच/डेंट पर रुकें'
          : '• Pause on scratches/dents'}
      </Text>
      <Text style={[styles.stepItem, dynamicStyles.mutedText]}>
        {languageSwitch === 'hindi'
          ? '• अंदरूनी हिस्सा (डैशबोर्ड और ओडोमीटर) दिखाकर समाप्त करें'
          : '• End with interior (dashboard & odometer)'}
      </Text>
      <Text style={[styles.stepItem, dynamicStyles.mutedText]}>
        {languageSwitch === 'hindi'
          ? '• अच्छे प्रकाश का ध्यान रखें'
          : '• Ensure good lighting'}
      </Text> */}
                </View>
              )}
            </View>
          </View>
        )}

        {/* <Text style={[styles.note, dynamicStyles.mutedText]}>
          {languageSwitch === 'hindi'
            ? 'समर्थित फॉर्मेट: MP4, MOV • अधिकतम आकार: ~200MB'
            : 'Supported formats: MP4, MOV • Maximum size: ~200MB'}
        </Text> */}
      </ScrollView>
      <SlideupModal
        visible={isShowingConfirmModal}
        onClose={() => {
          setisChecked(false);
          setisShowingConfirmModal(false);
        }}>
        {languageSwitch == 'hindi' ? (
          <>
            <Text style={{fontSize: 14, color: 'black', marginTop: 20}}>
              <Text style={{fontWeight: 'bold'}}>सहमति-पत्र :</Text>मैं कार की
              360-डिग्री वीडियो बनाए जाने के लिए सहमत हूँ। कार की वीडियो बनाने
              से पहले मैंने ग्राहक से अनुमति प्राप्त कर ली है। कार की वीडियो
              केवल ट्रिप की शुरुआत और ट्रिप के अंत में बनाई जाएगी।{' '}
            </Text>

            <Text style={{fontSize: 14, color: 'black', marginTop: 20}}>
              <Text style={{fontWeight: 'bold'}}>वीडियो बनाने का लक्ष्य:</Text>
              यह पता चल पाए कि जिस हालत में आपने गाड़ी शुरू की है, उसी हालत में
              गाड़ी की अवस्था ट्रिप के अंत में है या नहीं ।
            </Text>

            <Text style={{fontSize: 14, color: 'black', marginTop: 20}}>
              <Text style={{fontWeight: 'bold'}}>नियम:</Text>यदि गाड़ी में किसी
              भी प्रकार का नुकसान (डैमेज) मेरी गलती से होता है, तो मेरी आईडी
              हमेशा के लिए बंद कर दी जाएगी।
            </Text>
          </>
        ) : (
          <>
            <Text style={{fontSize: 14, color: 'black', marginTop: 20}}>
              <Text style={{fontWeight: 'bold'}}>Consent Letter : </Text> agree
              with the 360-degree video recording of the car. Before making the
              video, I have obtained permission from the customer. The car’s
              video will only be recorded at the beginning and at the end of the
              trip.
            </Text>
            <Text style={{fontSize: 14, color: 'black', marginTop: 20}}>
              <Text style={{fontWeight: 'bold'}}>Purpose of the Video:</Text> To
              verify that the condition of the car at the start of the trip
              remains the same at the end of the trip.
            </Text>
            <Text style={{fontSize: 14, color: 'black', marginTop: 20}}>
              <Text style={{fontWeight: 'bold'}}>Rules</Text>If any damage to
              the car occurs due to my fault, my ID will be permanently
              deactivated.
            </Text>
          </>
        )}

        <View style={{marginTop: 15}}>
          <BouncyCheckbox
            size={25}
            fillColor={AppColors.mainColor}
            unFillColor="#FFFFFF"
            text={languageSwitch == 'hindi' ? 'मैं सहमत हूँ।' : 'I Agree.'}
            iconStyle={{borderColor: AppColors.mainColor}}
            innerIconStyle={{borderWidth: 2}}
            textStyle={{
              // fontFamily: 'JosefinSans-Regular',
              textDecorationLine: 'none',
              color: 'black',
              fontWeight: 'bold',
            }}
            onPress={() => {
              // console.log(isChecked);
              setisChecked(!isChecked);
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setisShowingConfirmModal(false);
              setTimeout(() => {
                recordVideo();
                setisChecked(false);
              }, 100);
            }}
            disabled={!isChecked}
            style={{
              opacity: isChecked ? 1 : 0.5,
              paddingHorizontal: 15,
              paddingVertical: 9,
              backgroundColor: AppColors.mainColor,
              borderRadius: 8,
              alignSelf: 'center',
              marginVertical: 15,
            }}>
            <Text style={{color: 'white', fontSize: 18}}>Upload Video</Text>
          </TouchableOpacity>
        </View>
      </SlideupModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollContent: {padding: 16, paddingBottom: 32},
  header: {marginBottom: 20, alignItems: 'center'},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    // marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {fontSize: 16, textAlign: 'center'},
  previewFrame: {
    aspectRatio: 16 / 10,
    width: '100%',
    borderRadius: 14,
    borderWidth: 2,
    borderStyle: 'dashed',
    marginBottom: 20,
    overflow: 'hidden',
  },
  videoContainer: {width: '100%', height: '100%', position: 'relative'},
  video: {width: '100%', height: '100%', backgroundColor: '#000'},
  editIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  placeholder: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  placeholderTitle: {fontSize: 18, fontWeight: '600', marginBottom: 8},
  placeholderText: {fontSize: 14, textAlign: 'center'},
  progressContainer: {alignItems: 'center', marginBottom: 16},
  progressText: {fontSize: 14, marginTop: 8, fontWeight: '500'},
  statusText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  buttonContainer: {marginBottom: 24},
  btn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnText: {fontSize: 16, fontWeight: '600', color: '#fff'},
  instructionsCard: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
  },
  instructionsHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e8ef',
  },
  instructionsTitle: {fontSize: 18, fontWeight: '600'},
  instructionsContent: {padding: 16},
  stepsToggle: {paddingVertical: 4},
  stepsToggleText: {fontSize: 15, fontWeight: '600'},
  stepsList: {marginTop: 12, paddingLeft: 8},
  stepItem: {fontSize: 14, lineHeight: 20, marginBottom: 6},
  note: {fontSize: 12, textAlign: 'center'},
});

export default CarVideoUpload;
