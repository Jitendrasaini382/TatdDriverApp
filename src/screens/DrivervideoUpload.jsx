import React, {useState, useRef} from 'react';
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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-crop-picker';
import * as Progress from 'react-native-progress';
import RNFS from 'react-native-fs';
import Header from '../components/Header';
import {useRoute} from '@react-navigation/native';

const {width: screenWidth} = Dimensions.get('window');

const CHUNK_SIZE = 1024 * 1024; // 1MB
const UPLOAD_URL = 'https://www.expertroservice.in/video-upload/upload.php';

const CarVideoUpload = () => {
  const routes = useRoute();
  console.log(routes);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [videoUri, setVideoUri] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [showSteps, setShowSteps] = useState(false);
  const videoRef = useRef(null);

  // Light theme colors - always white background
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
  };

  const recordVideo = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
      compressVideoPreset: 'MediumQuality',
      durationLimit: 60, // Allow up to 60 seconds
    })
      .then(video => {
        setVideoUri(video.path);
        setUploadStatus('Video recorded successfully!');
        setUploadProgress(0);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          Alert.alert('Error', 'Failed to record video: ' + error.message);
        }
      });
  };

  const uploadVideoInChunks = async () => {
    if (!videoUri) {
      Alert.alert('Error', 'Please select a video first');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus('Starting upload...');

    try {
      const stat = await RNFS.stat(videoUri);
      const fileSize = Number(stat.size);
      const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);
      const originalName = stat.name || `video_${Date.now()}.mp4`;

      // Step 1: Initialize upload
      let initForm = new FormData();
      initForm.append('action', 'check_upload');
      initForm.append('booking_id', routes?.params?.bookingNumber);
      initForm.append('driver_id', '10');
      initForm.append('video_type', routes?.params?.videoType);
      initForm.append('total_chunks', totalChunks);
      initForm.append('original_name', originalName);

      let initRes = await fetch(UPLOAD_URL, {method: 'POST', body: initForm});
      let initData = await initRes.json();

      const videoId = initData.video_id;
      const uploaded = new Set(initData.uploaded_chunks || []);

      // Step 2: Upload chunks
      for (let i = 0; i < totalChunks; i++) {
        if (uploaded.has(i)) continue;

        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, fileSize);

        const base64Chunk = await RNFS.read(
          videoUri,
          end - start,
          start,
          'base64',
        );
        const chunkPath = `${RNFS.CachesDirectoryPath}/chunk_${i}.mp4`;
        await RNFS.writeFile(chunkPath, base64Chunk, 'base64');

        let formData = new FormData();
        formData.append('action', 'upload_chunk');
        formData.append('video_id', videoId);
        formData.append('chunk_index', i.toString());
        formData.append('total_chunks', totalChunks.toString());
        formData.append('chunk', {
          uri: 'file://' + chunkPath,
          type: 'video/mp4',
          name: `chunk_${i}.mp4`,
        });

        let res = await fetch(UPLOAD_URL, {method: 'POST', body: formData});
        let d = await res.json();

        try {
          await RNFS.unlink(chunkPath);
        } catch (e) {}

        if (!res.ok) {
          throw new Error(`Chunk ${i + 1} upload failed`);
        }

        const progress = ((i + 1) / totalChunks) * 100;
        setUploadProgress(progress);
        setUploadStatus(`Uploading... ${Math.round(progress)}%`);

        if (d.next_action === 'merge_chunks') {
          break;
        }
      }

      // Step 3: Merge chunks
      let mergeForm = new FormData();
      mergeForm.append('action', 'merge_chunks');
      mergeForm.append('video_id', videoId);

      let mergeRes = await fetch(UPLOAD_URL, {method: 'POST', body: mergeForm});
      let mergeData = await mergeRes.json();

      setUploadStatus('Upload completed successfully!');
      setUploadProgress(100);
      Alert.alert('Success', 'Your car video has been uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      setUploadStatus('Upload failed');
      Alert.alert('Upload Error', err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const clearVideo = () => {
    setVideoUri(null);
    setUploadProgress(0);
    setUploadStatus('');
    setIsUploading(false);
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    surface: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    text: {
      color: colors.text,
    },
    mutedText: {
      color: colors.muted,
    },
    accent: {
      backgroundColor: colors.accent,
    },
    accentPressed: {
      backgroundColor: colors.accentPress,
    },
  });

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Header backButton={true} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, dynamicStyles.text]}>
            Upload Your Car Video
          </Text>
          <Text style={[styles.subtitle, dynamicStyles.mutedText]}>
            Record a short walk-around video of your car
          </Text>
        </View>

        {/* Video Preview */}
        <View style={[styles.previewFrame, dynamicStyles.surface]}>
          {videoUri ? (
            <Video
              ref={videoRef}
              source={{uri: videoUri}}
              style={styles.video}
              controls={true}
              resizeMode="contain"
              paused={true}
            />
          ) : (
            <View style={styles.placeholder}>
              <Text style={[styles.placeholderTitle, dynamicStyles.text]}>
                No video recorded
              </Text>
              <Text style={[styles.placeholderText, dynamicStyles.mutedText]}>
                Tap "Record Video" below to start
              </Text>
            </View>
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
              {Math.round(uploadProgress)}% uploaded
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
                : dynamicStyles.text,
            ]}>
            {uploadStatus}
          </Text>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {!videoUri ? (
            <TouchableOpacity
              style={[styles.btn, dynamicStyles.accent]}
              onPress={recordVideo}
              disabled={isUploading}
              activeOpacity={0.8}>
              <Text style={styles.btnText}>Record Video</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.btn, {backgroundColor: colors.ok}]}
                onPress={uploadVideoInChunks}
                disabled={isUploading}
                activeOpacity={0.8}>
                <Text style={styles.btnText}>
                  {isUploading ? 'Uploading...' : 'Start Upload'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, styles.secondaryBtn, dynamicStyles.surface]}
                onPress={recordVideo}
                disabled={isUploading}
                activeOpacity={0.8}>
                <Text style={[styles.btnText, dynamicStyles.text]}>
                  Record New Video
                </Text>
              </TouchableOpacity>

              {!isUploading && (
                <TouchableOpacity
                  style={[styles.btn, styles.clearBtn]}
                  onPress={clearVideo}
                  activeOpacity={0.8}>
                  <Text style={[styles.btnText, {color: colors.danger}]}>
                    Clear Video
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>

        {/* Instructions Section */}
        <View style={[styles.instructionsCard, dynamicStyles.surface]}>
          <View style={styles.instructionsHeader}>
            <Text style={[styles.instructionsTitle, dynamicStyles.text]}>
              How to Record Your Car Video
            </Text>
          </View>

          <View style={styles.instructionsContent}>
            <TouchableOpacity
              style={styles.stepsToggle}
              onPress={() => setShowSteps(!showSteps)}>
              <Text style={[styles.stepsToggleText, dynamicStyles.text]}>
                {showSteps ? '▼' : '▶'} Show recording tips
              </Text>
            </TouchableOpacity>

            {showSteps && (
              <View style={styles.stepsList}>
                <Text style={[styles.stepItem, dynamicStyles.mutedText]}>
                  • Hold phone horizontally (landscape) for better view
                </Text>
                <Text style={[styles.stepItem, dynamicStyles.mutedText]}>
                  • Start at front, walk clockwise around car (10-15 seconds)
                </Text>
                <Text style={[styles.stepItem, dynamicStyles.mutedText]}>
                  • Keep 1-2 meters distance, include wheels and panels
                </Text>
                <Text style={[styles.stepItem, dynamicStyles.mutedText]}>
                  • Pause briefly on any scratches or dents
                </Text>
                <Text style={[styles.stepItem, dynamicStyles.mutedText]}>
                  • End with interior shot (dashboard & odometer)
                </Text>
                <Text style={[styles.stepItem, dynamicStyles.mutedText]}>
                  • Ensure good lighting for clear footage
                </Text>
              </View>
            )}
          </View>
        </View>

        <Text style={[styles.note, dynamicStyles.mutedText]}>
          Supported formats: MP4, MOV • Maximum size: ~200MB
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  previewFrame: {
    aspectRatio: 16 / 9,
    width: '100%',
    borderRadius: 14,
    borderWidth: 2,
    borderStyle: 'dashed',
    marginBottom: 20,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    textAlign: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  progressText: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  statusText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  btn: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.2,
  },
  secondaryBtn: {
    borderWidth: 1.5,
    borderColor: '#e6e8ef',
  },
  clearBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#e74c3c',
  },
  instructionsCard: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
  },
  instructionsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e8ef',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  instructionsContent: {
    padding: 16,
  },
  stepsToggle: {
    paddingVertical: 4,
  },
  stepsToggleText: {
    fontSize: 15,
    fontWeight: '600',
  },
  stepsList: {
    marginTop: 12,
    paddingLeft: 8,
  },
  stepItem: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  note: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default CarVideoUpload;
