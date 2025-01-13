import React, {useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setRatingModal} from '../../redux/slices/trustedDriverSlice';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';

const RatingModal = ({data}) => {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user?.name) || 'User';

  const closeModal = useCallback(() => {
    dispatch(setRatingModal(false));
  }, [dispatch]);

  // const renderBulletPoint = (text, index) => (
  //   <Text key={index} style={styles.middleText}>
  //     {`${index + 1} - ${text}`}
  //   </Text>
  // );

  // const bulletPoints = [
  //   'See bookings immediately on the panel; otherwise, they will appear late.',
  //   'Be notified via SMS when new bookings come in your area.',
  //   'If your Rating Score is more than 4 and your Booking Score is more than 70%, you can see and take more than one booking in a day.',
  // ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.topHeading}>{data?.title}</Text>
            <Text style={styles.topText}>{data?.body?.line1}</Text>
            <Text style={styles.topText}>{data?.body?.line2}</Text>
            <Text style={styles.topText}>{data?.body?.line3}</Text>
            <Text style={styles.topText}>{data?.body?.line4}</Text>
            <Text style={styles.topText}>{data?.body?.line5}</Text>
            {/* {bulletPoints.map(renderBulletPoint)} */}
            {/* <Text style={styles.BottamText}>
              To increase your Rating, provide customers with a good experience.
            </Text> */}
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default React.memo(RatingModal);

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  contentContainer: {
    // elevation: 13,
    padding: 10,
    backgroundColor: AppColors.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 0.2,
  },
  topHeading: {
    textAlign: 'center',
    justifyContent: 'center',
    color: AppColors.mainColor,
    marginVertical: 15,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: AppFont.regularFont,
  },
  topText: {
    marginVertical: 10,
    textAlign: 'left',
    color: AppColors.silverGrey,
    fontSize: 18,
    fontWeight: '400',
  },
  middleText: {
    textAlign: 'left',
    color: AppColors.silverGrey,
    fontSize: 18,
    fontWeight: '400',
  },
  BottamText: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: AppColors.silverGrey,
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 15,
  },
  button: {
    marginVertical: 15,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: AppColors.mainColor,
    alignSelf: 'flex-start',
  },
  buttonText: {color: AppColors.white},
});

// ////////////////////////////

// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import {Dimensions} from 'react-native';
// import { AppColors } from '../../assets/Colors';
// import { useDispatch } from 'react-redux';
// import { setRatingModal } from '../../redux/slices/trustedDriverSlice';
// import { AppFont } from '../../assets/FontsFamily';
// const {width, height} = Dimensions.get('window');

// const RatingModal = () => {
//   const dispatch = useDispatch();

//   return (
//     <TouchableWithoutFeedback onPress={() => dispatch(setRatingModal(false))}>
//       <View style={styles.mainContainer}>
//         <View style={styles.contentContainer}>
//           <Text style={styles.topHeading}>Rating </Text>
//           <Text style={styles.topText}>
//             Dear MOHIT DHANAWAT, If your Rating Score is more than 4, then you
//             will:
//           </Text>
//           <Text style={styles.middleText}>
//             1 - See bookings immediately on the panel; otherwise, they will
//             appear late.
//           </Text>
//           <Text style={styles.middleText}>
//             2 - Be notified via SMS when new bookings come in your area.
//           </Text>
//           <Text style={styles.middleText}>
//             3 - If your Rating Score is more than 4 and your Booking Score is
//             more than 70%, you can see and take more than one booking in a day.
//           </Text>
//           <Text style={styles.BottamText}>
//           To increase your Rating, provide customers with a good experience.
//           </Text>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() =>  dispatch(setRatingModal(false))}>
//             <Text style={styles.buttonText}>close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// export default RatingModal;

// const styles = StyleSheet.create({
//   mainContainer: {flex: 1},
//   contentContainer: {
//     elevation: 13,
//     padding: 10,
//     backgroundColor: AppColors.white,
//     borderRadius: 12,
//     paddingHorizontal: 15,
//   },
//   topHeading: {
//     textAlign: 'center',
//     justifyContent: 'center',
//     color: AppColors.mainColor,
//     marginVertical: 15,
//     fontSize: 20,
//     fontWeight: "600",
//     fontFamily: AppFont.regularFont,
//   },
//   topText: {
//     marginVertical: 10,
//     textAlign: 'left',
//     // justifyContent: 'flex-start',
//     color: AppColors.silverGrey,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   middleText: {
//     // marginVertical: 5,
//     textAlign: 'left',
//     // justifyContent: 'flex-start',
//     color: AppColors.silverGrey,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   BottamText: {
//     textAlign: 'left',
//     justifyContent: 'flex-start',
//     color: AppColors.silverGrey,
//     fontSize: 18,
//     fontWeight: '400',
//     marginVertical: 15,
//     // marginBottom: 15,
//   },
//   button: {
//     marginVertical: 15,
//     paddingVertical: 3,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     backgroundColor: AppColors.mainColor,
//     alignSelf: 'flex-start',
//   },
//   buttonText: {color: AppColors.white},
// });
