import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  StatusBar,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppColors} from '../assets/Colors';

const InAppCamera = ({
  visible,
  type,
  onClose,
  onCapture,
  languageSwitch = 'english',
  _flash,
}) => {
  const camera = useRef(null);
  const device = useCameraDevice(type || 'back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const [isActive, setIsActive] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [flash, setFlash] = useState('off');

  useEffect(() => {
    if (visible) {
      checkPermission();
    } else {
      setIsActive(false);
      setPhoto(null);
    }
  }, [visible]);

  const checkPermission = async () => {
    if (!hasPermission) {
      const permission = await requestPermission();
      if (permission) {
        setIsActive(true);
      } else {
        Alert.alert(
          languageSwitch === 'english'
            ? 'Permission Denied'
            : 'अनुमति अस्वीकृत',
          languageSwitch === 'english'
            ? 'Camera permission is required to take photos.'
            : 'फोटो लेने के लिए कैमरा अनुमति आवश्यक है।',
          [{text: 'OK', onPress: onClose}],
        );
      }
    } else {
      setIsActive(true);
    }
  };

  const takePhoto = async () => {
    if (!camera.current) return;

    try {
      setIsTakingPhoto(true);
      const photo = await camera.current.takePhoto({
        flash: flash,
        qualityPrioritization: 'speed',
        enableShutterSound: true,
      });
      console.log('poiuytr', photo);

      // Convert to the format expected by your existing code
      const photoData = {
        uri: `file://${photo.path}`,
        type: 'image/jpeg',
        fileName: `photo_${Date.now()}.jpg`,
      };

      setPhoto(photoData);
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert(
        languageSwitch === 'english' ? 'Error' : 'त्रुटि',
        languageSwitch === 'english'
          ? 'Failed to take photo. Please try again.'
          : 'फोटो लेने में विफल। कृपया पुनः प्रयास करें।',
      );
    } finally {
      setIsTakingPhoto(false);
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
  };

  const confirmPhoto = () => {
    if (photo) {
      onCapture(photo);
      setPhoto(null);
      onClose();
    }
  };

  const toggleFlash = () => {
    setFlash(prev => (prev === 'off' ? 'on' : 'off'));
  };

  if (!device) {
    return (
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={AppColors.mainColor} />
          <Text style={styles.loadingText}>
            {languageSwitch === 'english'
              ? 'Loading Camera...'
              : 'कैमरा लोड हो रहा है...'}
          </Text>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent>
      <StatusBar hidden />
      <View style={styles.container}>
        {photo ? (
          // Preview Screen
          <View style={styles.previewContainer}>
            <Image
              source={{uri: photo.uri}}
              style={styles.preview}
              resizeMode="contain"
            />

            {/* Preview Controls */}
            <View style={styles.previewControls}>
              <TouchableOpacity
                style={styles.previewButton}
                onPress={retakePhoto}>
                <MaterialCommunityIcons
                  name="camera-retake"
                  size={30}
                  color="#fff"
                />
                <Text style={styles.previewButtonText}>
                  {languageSwitch === 'english' ? 'Retake' : 'पुनः लें'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.previewButton, styles.confirmButton]}
                onPress={confirmPhoto}>
                <Icon name="check-circle" size={30} color="#fff" />
                <Text style={styles.previewButtonText}>
                  {languageSwitch === 'english'
                    ? 'Use Photo'
                    : 'फोटो उपयोग करें'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // Camera Screen
          <>
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={isActive && visible}
              photo={true}
            />

            {/* Top Controls */}
            <View style={styles.topControls}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Icon name="close" size={30} color="#fff" />
              </TouchableOpacity>
              {_flash && (
                <TouchableOpacity
                  style={styles.flashButton}
                  onPress={toggleFlash}>
                  <Icon
                    name={flash === 'on' ? 'flash-on' : 'flash-off'}
                    size={28}
                    color={flash === 'on' ? '#FFD700' : '#fff'}
                  />
                </TouchableOpacity>
              )}
            </View>

            {/* Bottom Controls */}
            <View style={styles.bottomControls}>
              <View style={styles.captureContainer}>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={takePhoto}
                  disabled={isTakingPhoto}>
                  {isTakingPhoto ? (
                    <ActivityIndicator size="large" color="#fff" />
                  ) : (
                    <View style={styles.captureButtonInner} />
                  )}
                </TouchableOpacity>
              </View>

              <Text style={styles.hintText}>
                {languageSwitch === 'english'
                  ? 'Tap to capture photo'
                  : 'फोटो लेने के लिए टैप करें'}
              </Text>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
  },
  topControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  closeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 10,
  },
  captureContainer: {
    marginBottom: 20,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#fff',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  hintText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  previewControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  previewButton: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  confirmButton: {
    opacity: 1,
  },
  previewButtonText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default InAppCamera;

// import React, {useRef, useState, useEffect, useCallback} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   Image,
//   Modal,
//   StatusBar,
//   NativeModules,
// } from 'react-native';
// import {
//   Camera,
//   useCameraDevice,
//   useCameraPermission,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import {Worklets} from 'react-native-worklets-core';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {AppColors} from '../assets/Colors';

// // Import our custom Face Detection plugin
// // const {FaceDetectorFrameProcessorPlugin} = NativeModules;

// const InAppCamera = ({
//   visible,
//   type,
//   onClose,
//   onCapture,
//   languageSwitch = 'english',
//   _flash,
//   enableFaceDetection = true,
// }) => {
//   const camera = useRef(null);
//   const device = useCameraDevice(type || 'back');
//   const {hasPermission, requestPermission} = useCameraPermission();
//   const [isActive, setIsActive] = useState(false);
//   const [photo, setPhoto] = useState(null);
//   const [isTakingPhoto, setIsTakingPhoto] = useState(false);
//   const [flash, setFlash] = useState('off');
//   const [faces, setFaces] = useState([]);
//   const [faceDetected, setFaceDetected] = useState(false);

//   useEffect(() => {
//     if (visible) {
//       checkPermission();
//     } else {
//       setIsActive(false);
//       setPhoto(null);
//       setFaces([]);
//       setFaceDetected(false);
//     }
//   }, [visible]);

//   const checkPermission = async () => {
//     if (!hasPermission) {
//       const permission = await requestPermission();
//       if (permission) {
//         setIsActive(true);
//       } else {
//         Alert.alert(
//           languageSwitch === 'english'
//             ? 'Permission Denied'
//             : 'अनुमति अस्वीकृत',
//           languageSwitch === 'english'
//             ? 'Camera permission is required to take photos.'
//             : 'फोटो लेने के लिए कैमरा अनुमति आवश्यक है।',
//           [{text: 'OK', onPress: onClose}],
//         );
//       }
//     } else {
//       setIsActive(true);
//     }
//   };

//   // Callback to update faces
//   const updateFaces = Worklets.createRunOnJS(detectedFaces => {
//     setFaces(detectedFaces);
//     setFaceDetected(detectedFaces.length > 0);
//   });

//   // Frame processor with face detection
//   const frameProcessor = useFrameProcessor(frame => {
//     'worklet';
//     // console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`)
//     console.log(frame);
//   }, []);
//   const takePhoto = async () => {
//     if (!camera.current) return;

//     try {
//       setIsTakingPhoto(true);
//       const photo = await camera.current.takePhoto({
//         flash: flash,
//         // enableAutoRedEyeReduction: true,
//         qualityPrioritization: 'speed',
//         enableShutterSound: true,
//       });

//       const photoData = {
//         uri: `file://${photo.path}`,
//         type: 'image/jpeg',
//         fileName: `photo_${Date.now()}.jpg`,
//         // facesDetected: faces.length,
//       };

//       setPhoto(photoData);
//     } catch (error) {
//       console.error('Error taking photo:', error);
//       Alert.alert(
//         languageSwitch === 'english' ? 'Error' : 'त्रुटि',
//         languageSwitch === 'english'
//           ? 'Failed to take photo. Please try again.'
//           : 'फोटो लेने में विफल। कृपया पुनः प्रयास करें।',
//       );
//     } finally {
//       setIsTakingPhoto(false);
//     }
//   };

//   const retakePhoto = () => {
//     setPhoto(null);
//   };

//   const confirmPhoto = () => {
//     if (photo) {
//       onCapture(photo);
//       setPhoto(null);
//       onClose();
//     }
//   };

//   const toggleFlash = () => {
//     setFlash(prev => (prev === 'off' ? 'on' : 'off'));
//   };

//   // Render face boxes
//   const renderFaceBoxes = () => {
//     if (!enableFaceDetection || faces.length === 0) return null;

//     return (
//       <View style={StyleSheet.absoluteFill} pointerEvents="none">
//         {faces.map((face, index) => {
//           const bounds = face.bounds;
//           if (!bounds) return null;

//           return (
//             <View
//               key={`face-${index}`}
//               style={[
//                 styles.faceBox,
//                 {
//                   left: bounds.x,
//                   top: bounds.y,
//                   width: bounds.width,
//                   height: bounds.height,
//                 },
//               ]}>
//               {/* Corner markers */}
//               <View style={[styles.corner, styles.cornerTL]} />
//               <View style={[styles.corner, styles.cornerTR]} />
//               <View style={[styles.corner, styles.cornerBL]} />
//               <View style={[styles.corner, styles.cornerBR]} />
//             </View>
//           );
//         })}
//       </View>
//     );
//   };

//   if (!device) {
//     return (
//       <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color={AppColors.mainColor} />
//           <Text style={styles.loadingText}>
//             {languageSwitch === 'english'
//               ? 'Loading Camera...'
//               : 'कैमरा लोड हो रहा है...'}
//           </Text>
//         </View>
//       </Modal>
//     );
//   }

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       onRequestClose={onClose}
//       statusBarTranslucent>
//       <StatusBar hidden />
//       <View style={styles.container}>
//         {photo ? (
//           // Preview Screen
//           <View style={styles.previewContainer}>
//             <Image
//               source={{uri: photo.uri}}
//               style={styles.preview}
//               resizeMode="contain"
//             />

//             {/* Face count badge */}
//             {enableFaceDetection && photo.facesDetected > 0 && (
//               <View style={styles.faceCountBadge}>
//                 <Icon name="face" size={20} color="#fff" />
//                 <Text style={styles.faceCountText}>
//                   {photo.facesDetected}{' '}
//                   {languageSwitch === 'english' ? 'face(s)' : 'चेहरा/चेहरे'}
//                 </Text>
//               </View>
//             )}

//             {/* Preview Controls */}
//             <View style={styles.previewControls}>
//               <TouchableOpacity
//                 style={styles.previewButton}
//                 onPress={retakePhoto}>
//                 <MaterialCommunityIcons
//                   name="camera-retake"
//                   size={30}
//                   color="#fff"
//                 />
//                 <Text style={styles.previewButtonText}>
//                   {languageSwitch === 'english' ? 'Retake' : 'पुनः लें'}
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.previewButton, styles.confirmButton]}
//                 onPress={confirmPhoto}>
//                 <Icon name="check-circle" size={30} color="#fff" />
//                 <Text style={styles.previewButtonText}>
//                   {languageSwitch === 'english'
//                     ? 'Use Photo'
//                     : 'फोटो उपयोग करें'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ) : (
//           // Camera Screen
//           <>
//             <Camera
//               ref={camera}
//               // frameProcessor={frameProcessor}
//               style={StyleSheet.absoluteFill}
//               device={device}
//               isActive={isActive && visible}
//               photo={true}
//             //   frameProcessor={enableFaceDetection ? frameProcessor : undefined}
//             />

//             {/* Face detection overlays */}
//             {renderFaceBoxes()}

//             {/* Face detection indicator */}
//             {/* {enableFaceDetection && (
//               <View style={styles.faceIndicatorContainer}>
//                 <View
//                   style={[
//                     styles.faceIndicator,
//                     faceDetected && styles.faceIndicatorActive,
//                   ]}>
//                   <Icon
//                     name="face"
//                     size={24}
//                     color={faceDetected ? '#4CAF50' : '#fff'}
//                   />
//                   <Text
//                     style={[
//                       styles.faceIndicatorText,
//                       faceDetected && styles.faceIndicatorTextActive,
//                     ]}>
//                     {faceDetected
//                       ? languageSwitch === 'english'
//                         ? `${faces.length} face(s)`
//                         : `${faces.length} चेहरा/चेहरे`
//                       : languageSwitch === 'english'
//                       ? 'No face'
//                       : 'कोई चेहरा नहीं'}
//                   </Text>
//                 </View>
//               </View>
//             )} */}

//             {/* Top Controls */}
//             <View style={styles.topControls}>
//               <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//                 <Icon name="close" size={30} color="#fff" />
//               </TouchableOpacity>
//               {_flash && (
//                 <TouchableOpacity
//                   style={styles.flashButton}
//                   onPress={toggleFlash}>
//                   <Icon
//                     name={flash === 'on' ? 'flash-on' : 'flash-off'}
//                     size={28}
//                     color={flash === 'on' ? '#FFD700' : '#fff'}
//                   />
//                 </TouchableOpacity>
//               )}
//             </View>

//             {/* Bottom Controls */}
//             <View style={styles.bottomControls}>
//               <View style={styles.captureContainer}>
//                 <TouchableOpacity
//                   style={styles.captureButton}
//                   onPress={takePhoto}
//                   disabled={isTakingPhoto}>
//                   {isTakingPhoto ? (
//                     <ActivityIndicator size="large" color="#fff" />
//                   ) : (
//                     <View style={styles.captureButtonInner} />
//                   )}
//                 </TouchableOpacity>
//               </View>

//               <Text style={styles.hintText}>
//                 {languageSwitch === 'english'
//                   ? 'Tap to capture photo'
//                   : 'फोटो लेने के लिए टैप करें'}
//               </Text>
//             </View>
//           </>
//         )}
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   loadingText: {
//     color: '#fff',
//     marginTop: 20,
//     fontSize: 16,
//   },
//   topControls: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     zIndex: 10,
//   },
//   closeButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   flashButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bottomControls: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingBottom: 40,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     zIndex: 10,
//   },
//   captureContainer: {
//     marginBottom: 20,
//   },
//   captureButton: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: 'rgba(255,255,255,0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 5,
//     borderColor: '#fff',
//   },
//   captureButtonInner: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#fff',
//   },
//   hintText: {
//     color: '#fff',
//     fontSize: 14,
//     textAlign: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 20,
//   },
//   previewContainer: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   preview: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   previewControls: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//   },
//   previewButton: {
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   confirmButton: {
//     opacity: 1,
//   },
//   previewButtonText: {
//     color: '#fff',
//     marginTop: 8,
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   // Face Detection Styles
//   faceBox: {
//     position: 'absolute',
//     borderWidth: 2,
//     borderColor: '#4CAF50',
//     borderRadius: 4,
//   },
//   corner: {
//     position: 'absolute',
//     width: 20,
//     height: 20,
//     borderColor: '#4CAF50',
//   },
//   cornerTL: {
//     top: -2,
//     left: -2,
//     borderTopWidth: 4,
//     borderLeftWidth: 4,
//   },
//   cornerTR: {
//     top: -2,
//     right: -2,
//     borderTopWidth: 4,
//     borderRightWidth: 4,
//   },
//   cornerBL: {
//     bottom: -2,
//     left: -2,
//     borderBottomWidth: 4,
//     borderLeftWidth: 4,
//   },
//   cornerBR: {
//     bottom: -2,
//     right: -2,
//     borderBottomWidth: 4,
//     borderRightWidth: 4,
//   },
//   faceIndicatorContainer: {
//     position: 'absolute',
//     top: 110,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     zIndex: 10,
//   },
//   faceIndicator: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     gap: 8,
//   },
//   faceIndicatorActive: {
//     backgroundColor: 'rgba(76,175,80,0.3)',
//     borderWidth: 1,
//     borderColor: '#4CAF50',
//   },
//   faceIndicatorText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   faceIndicatorTextActive: {
//     color: '#4CAF50',
//   },
//   faceCountBadge: {
//     position: 'absolute',
//     top: 60,
//     right: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(76,175,80,0.9)',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 20,
//     gap: 6,
//   },
//   faceCountText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });

// export default InAppCamera;
