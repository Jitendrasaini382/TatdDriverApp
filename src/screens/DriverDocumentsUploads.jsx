import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  ActionSheetIOS,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import {
  DRIVER_DOCUMENT_UPLOADED_STATUS,
  DRIVER_DOCUMENTS_UPLOAD,
  GET_DRIVER_UPLOADED_DATA,
} from '../apis/Apis';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {useSelector} from 'react-redux';
import {RefreshControl} from 'react-native';

const DriverDocumentsUploads = ({navigation}) => {
  const [images, setImages] = useState({
    driver_photo: null,
    aadhar_number_file_front: null,
    aadhar_number_file_back: null,
    licence_number_file_front: null,
    licence_number_file_back: null,
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [errors, setErrors] = useState({
    driver_photo: '',
    aadhar_number_file_front: '',
    aadhar_number_file_back: '',
    licence_number_file_front: '',
    licence_number_file_back: '',
    address: '',
  });

  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [docVerification, setDocVerification] = useState(false);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const openCameraOrGallery = docType => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Gallery'],
          cancelButtonIndex: 0,
        },
        async buttonIndex => {
          if (buttonIndex === 1) pickImage('camera', docType);
          else if (buttonIndex === 2) pickImage('gallery', docType);
        },
      );
    } else {
      Alert.alert('Upload Image', 'Choose an option', [
        {text: 'Camera', onPress: () => pickImage('camera', docType)},
        {text: 'Gallery', onPress: () => pickImage('gallery', docType)},
        {text: 'Cancel', style: 'cancel'},
      ]);
    }
  };

  useEffect(() => {
    setLoading(true);
    getDriverDocumentUploadedStatus();
  }, []);

  const getDriverDocumentUploadedStatus = async () => {
    try {
      const response = await DRIVER_DOCUMENT_UPLOADED_STATUS({
        action: 'document_upload_status',
        current_language: languageSwitch,
      });

      if (response?.status_code == 200 && response?.message == 'success') {
        if (response?.flag == 'driver_pending' && response?.message_alert) {
          setMessage(response?.message_alert);
          setDocVerification(true);
        } else if (response?.flag == 'new_driver') {
          setDocVerification(false);
        } else if (response?.flag == 'driver_rejected') {
          await getDriverUploadedData();
          setDocVerification(false);
        }
      }
    } catch (error) {
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const getDriverUploadedData = async () => {
    setLoading(true);
    try {
      const response = await GET_DRIVER_UPLOADED_DATA({
        action: 'get_driver_upload_image',
      });

      if (response?.status_code == 200) {
        setAddress(response?.current_address);
        setImages({
          driver_photo: response?.driver_photo || null,
          aadhar_number_file_front: response?.aadhaar_front || null,
          aadhar_number_file_back: response?.aadhaar_back || null,
          licence_number_file_front: response?.licence_front || null,
          licence_number_file_back: response?.licence_back || null,
        });
      }
    } catch (error) {
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const pickImage = async (source, docType) => {
    try {
      const image = await (source === 'camera'
        ? ImagePicker.openCamera({
            cropping: true,
            // freeStyleCropEnabled: true,
            cropperCircleOverlay: false,
            compressImageQuality: 0.5,
            cropperToolbarTitle: 'Crop Image',
            cropperActiveWidgetColor: 'red',
            // freeStyleCropEnabled: true,
          })
        : ImagePicker.openPicker({
            cropping: true,
            freeStyleCropEnabled: true,
            cropperCircleOverlay: false,
            compressImageQuality: 0.5,
            cropperToolbarTitle: 'Crop Image',
            cropperActiveWidgetColor: 'red',
            // freeStyleCropEnabled: true,
          }));

      if (image?.path) {
        setImages(prev => ({...prev, [docType]: image.path}));
        setErrors(prev => ({...prev, [docType]: ''}));
      }
    } catch (error) {
      console.log('Image picking error:', error);
    }
  };

  const handleSubmit = async () => {
    let newErrors = {};
    let isValid = true;

    if (!images.driver_photo) {
      newErrors.driver_photo = 'Driver photo is required';
      isValid = false;
    }

    if (!images.aadhar_number_file_front) {
      newErrors.aadhar_number_file_front = 'Aadhaar front image is required';
      isValid = false;
    }

    if (!images.aadhar_number_file_back) {
      newErrors.aadhar_number_file_back = 'Aadhaar back image is required';
      isValid = false;
    }

    if (!images.licence_number_file_front) {
      newErrors.licence_number_file_front = 'License front image is required';
      isValid = false;
    }

    if (!images.licence_number_file_back) {
      newErrors.licence_number_file_back = 'License back image is required';
      isValid = false;
    }

    if (!address.trim()) {
      newErrors.address = 'Current address is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    const formData = new FormData();
    Object.entries(images).forEach(([key, value]) => {
      if (value) {
        formData.append(key, {
          uri: value,
          name: `${key}.jpg`,
          type: 'image/jpeg',
        });
      }
    });
    formData.append('current_language', languageSwitch);
    formData.append('current_address', address);

    try {
      const response = await DRIVER_DOCUMENTS_UPLOAD(formData);

      console.log(response, 'responseresponse DRIVER_DOCUMENTS_UPLOAD');

      if (response?.status_code == 200) {
        navigation.navigate('TrustedDriver');
      }
    } catch (error) {
      console.log('API request failed', error);
    }
  };

  const renderImageBox = (key, label) => (
    <View style={styles.imageBoxContainer} key={key}>
      <TouchableOpacity
        style={[styles.uploadBox, errors[key] && {borderColor: 'red'}]}
        onPress={() => openCameraOrGallery(key)}>
        {images[key] ? (
          <Image source={{uri: images[key]}} style={styles.image} />
        ) : (
          <Text style={styles.smallLabel}>{label}</Text>
        )}
      </TouchableOpacity>
      {errors[key] ? <Text style={styles.errorText}>{errors[key]}</Text> : null}
    </View>
  );

  if (loading) {
    return (
      <ActivityIndicator
        size={20}
        color={AppColors.mainColor}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton />
      {docVerification ? (
        <View
          style={{
            marginTop: 30,
            padding: 10,
          }}>
          <View
            style={{
              borderColor: 'rgb(128,128,128)',
              backgroundColor: AppColors.white,
              borderWidth: 1,
              borderStyle: 'solid',
              borderRadius: 8,
              lineHeight: 20,
              shadowColor: 'rgb(128,128,128)',
              shadowOffset: {width: 5, height: 4},
              shadowOpacity: 5,
              elevation: 5,
              shadowRadius: 5,
              marginBottom: 20,
              padding: 10,
            }}>
            <View style={{padding: 14, alignItems: 'flex-start'}}>
              <Text
                style={{
                  textAlign: 'auto',
                  color: AppColors.black,
                  fontWeight: '700',
                  fontSize: 21,
                }}>
                {message}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <KeyboardAvoidingView style={{flex:1}} behavior='padding'>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                // getDriverUploadedData();
                getDriverDocumentUploadedStatus();
              }}
            />
          }
          contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Driver's Document Upload</Text>

          <Text style={[styles.label, {alignSelf: 'center'}]}>
            Upload Driver Photo
          </Text>
          <TouchableOpacity
            onPress={() => openCameraOrGallery('driver_photo')}
            style={[
              styles.uploadBox,
              {height: 200, width: 200, alignSelf: 'center'},
              errors.driver_photo && {borderColor: 'red'},
            ]}>
            <TouchableOpacity
              onPress={() => openCameraOrGallery('driver_photo')}>
              {images.driver_photo ? (
                <Image
                  source={{uri: images.driver_photo}}
                  style={[styles.image, {height: 200, width: 200}]}
                />
              ) : (
                <Text style={styles.placeholderText}>Upload Driver Photo</Text>
              )}
            </TouchableOpacity>
          </TouchableOpacity>
          {errors.driver_photo ? (
            <Text style={styles.errorTextCenter}>{errors.driver_photo}</Text>
          ) : null}

          <Text style={styles.label}>Aadhaar Card (Front & Back)</Text>
          <View style={styles.row}>
            {renderImageBox('aadhar_number_file_front', 'Aadhaar Card Front')}
            {renderImageBox('aadhar_number_file_back', 'Aadhaar Card Back')}
          </View>

          <Text style={styles.label}>License (Front & Back)</Text>
          <View style={styles.row}>
            {renderImageBox('licence_number_file_front', 'License Front')}
            {renderImageBox('licence_number_file_back', 'License Back')}
          </View>

          <Text style={styles.label}>Current Address</Text>
          <TextInput
            style={[styles.input, errors.address && {borderColor: 'red'}]}
            placeholder="Enter Current Address"
            placeholderTextColor={'grey'}
            value={address}
            onChangeText={text => {
              setAddress(text);
              if (text.trim()) {
                setErrors(prev => ({...prev, address: ''}));
              }
            }}
            multiline
          />
          {errors.address ? (
            <Text style={styles.errorText}>{errors.address}</Text>
          ) : null}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: AppColors.white},
  scrollContainer: {padding: 20},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: AppColors.white,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: AppColors.mainColor,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    color: AppColors.black,
    marginVertical: 10,
  },
  smallLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: AppColors.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  imageBoxContainer: {
    flex: 1,
  },
  uploadBox: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#f2f3f5',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 15,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    padding: 10,
    flex: 1,
    borderRadius: 5,
    marginTop: 5,
    color: AppColors.black,
  },
  submitButton: {
    backgroundColor: AppColors.mainColor,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: {color: AppColors.white, fontSize: 18, fontWeight: 'bold'},
  placeholderText: {
    color: AppColors.black,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  errorTextCenter: {
    color: AppColors.red,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default DriverDocumentsUploads;
