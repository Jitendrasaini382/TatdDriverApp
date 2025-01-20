import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';
import {EXPRESS_BOOKING_UPDATE} from '../../apis/Apis';
import {useDispatch, useSelector} from 'react-redux';
import {setExpressBookingModal} from '../../redux/slices/trustedDriverSlice';
import {Triangle_Icon} from '../../assets/images';

const ExpressBookingModal = ({data}) => {
  const dispatch = useDispatch();
  const decodedToken = useSelector(e => e?.userAuth?.userProfile?.data);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const isDataValid = data && Object.keys(data).length > 0;

  if (!isDataValid) {
    return null;
  }

  const expressBookingUpdate = async status => {
    try {
      const bookingUpdate = {
        action: 'update_trusted_driver',
        field: 'supply_visiability',
        current_language: languageSwitch,
        status: status,
      };
      const response = await EXPRESS_BOOKING_UPDATE(bookingUpdate);
      dispatch(setExpressBookingModal(false));
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.mainView}>
          <View style={styles.mainTopView}>
            <View style={styles.mainTopContent}>
              <View style={styles.headingView}>
                <Text style={styles.headingText}>{data?.title}</Text>
              </View>
              <View style={styles.triangleMainView}>
                <Image source={Triangle_Icon} />
              </View>
            </View>
            <View>
              <Text style={styles.mainHeading}>
                {decodedToken?.driver_name}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.contentView}>
          <Text style={styles.contentText}>{data?.message}</Text>
        </View>
        <View style={styles.contentView}>
          <Text style={styles.contentText}>{data?.warning}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => expressBookingUpdate(1)}
            style={styles.button}>
            <Text style={styles.buttonText}>{data?.buttons?.available}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => expressBookingUpdate(0)}
            style={styles.button}>
            <Text style={styles.buttonText}>
              {data?.buttons?.not_available}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  contentContainer: {
    // flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: AppColors.white,
    justifyContent: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    padding: 15,
    marginTop: 10,
  },
  mainView: {
    backgroundColor: AppColors.white,
    borderRadius: 8,
    borderColor: AppColors.mainColor,
    width: '100%',
  },
  mainTopView: {
    backgroundColor: AppColors.mainColor,
    borderRadius: 8,
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'column',
  },
  mainTopContent: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  headingView: {backgroundColor: AppColors.white, width: '80%', marginLeft: 0},
  headingText: {
    color: AppColors.mainColor,
    fontSize: 15,
    paddingLeft: 4,
    fontFamily: 'Poppins-Regular',
  },
  triangleMainView: {display: 'flex', flexDirection: 'column'},
  triangleView: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 12,
    borderTopWidth: 12,
    borderRightColor: 'transparent',
    borderTopColor: AppColors.white,
  },
  mainHeading: {
    fontSize: 27,
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 10,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: 'rgb(255, 255, 255)',
    fontFamily: AppFont.regularFont,
  },
  mainMiddleView: {
    margin: 30,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 30,
  },
  iconView: {
    borderWidth: 1,
    borderColor: AppColors.greyColor,
    height: 36,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  inputView: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRightColor: AppColors.greyColor,
    borderTopColor: AppColors.greyColor,
    borderBlockColor: AppColors.greyColor,
    height: 36,
    width: '90%',
  },
  inputText: {
    height: 36,
    fontSize: 14,
    color: AppColors.black,
    justifyContent: 'center',
    textAlign: 'left',
  },
  btnView: {
    backgroundColor: AppColors.mainColor,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center',
    marginBottom: 40,
    width: '40%',
  },

  btnText: {
    fontSize: 14,
    color: AppColors.white,
    fontWeight: '400',
    fontFamily: AppFont.regularFont,
  },

  contentView: {
    marginVertical: 10,
    marginHorizontal: 3,
  },
  contentText: {
    color: AppColors.black,
    fontSize: 17,
  },
  highlightText: {
    color: AppColors.mainColor,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 5,
    margin: 3,
  },
  button: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: AppColors.mainColor,
    alignItems: 'center',
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 15,
  },
});

export default ExpressBookingModal;
