import React, {useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';
import {EXPRESS_BOOKING_UPDATE} from '../../apis/Apis';
import {useDispatch, useSelector} from 'react-redux';
import {setExpressBookingModal} from '../../redux/slices/trustedDriverSlice';
import {TokenConstextApi} from '../../context/GlobalContext';

const ExpressBookingModal = () => {
  useEffect(() => {
    console.log('runnnnn12345678900987654321');
  }, []);

  const dispatch = useDispatch();
  // const {decodedToken, languageSwitch} = useContext(TokenConstextApi);

  const decodedToken = useSelector((e)=>e?.userAuth?.userProfile?.data)
  const languageSwitch = "Hindi"

  const expressBookingUpdate = async status => {
    try {
      const bookingUpdate = {
        action: 'update_trusted_driver',
        field: 'supply_visiability',
        current_language: languageSwitch,
        status: status,
      };
      const response = await EXPRESS_BOOKING_UPDATE(bookingUpdate);
      console.log(response, 'expressBookingUpdate response');
      dispatch(setExpressBookingModal(false));
    } catch (error) {
      console.error('Express Booking Update Error:', error);
    }
  };

  const renderContent = () => {
    if (languageSwitch == 'english') {
      return (
        <>
          <View style={styles.contentView}>
            <Text style={styles.contentText}>
              Are you available for any booking in the entire{' '}
              <Text style={styles.highlightText}>
                {decodedToken?.TrustedDriverData.zone}
              </Text>{' '}
              area in the next
              <Text style={styles.highlightText}> 30 minutes</Text>? If yes, you
              will be notified by SMS as soon as an Express booking comes in.
            </Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.contentText}>
              Please do not provide incorrect information to avoid wasting both
              your and our time.
            </Text>
          </View>
        </>
      );
    } else {
      return (
        <>
          <View style={styles.contentView}>
            <Text style={styles.contentText}>
              क्या आप अगले{' '}
              <Text style={styles.highlightText}>
                30 मिनट में पूरे {decodedToken?.TrustedDriverData.zone}{' '}
              </Text>
              क्षेत्र में कहीं की भी बुकिंग करने के लिए उपलब्ध है। यदि हाँ, तो
              Express बुकिंग बुकिंग आते ही
              <Text style={styles.highlightText}>
                {' '}
                आपको SMS द्वारा सूचित किया जाएगा।
              </Text>
              ?
            </Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.contentText}>
              कृपया गलत जानकारी मत देना जिससे आपका और हमारा दोनों को समय बर्बाद
              हो।
            </Text>
          </View>
        </>
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.mainView}>
          <View style={styles.mainTopView}>
            <View style={styles.mainTopContent}>
              <View style={styles.headingView}>
                <Text style={styles.headingText}>Next 30 Minutes</Text>
              </View>
              <View style={styles.triangleMainView}>
                <View style={styles.triangleView}></View>
                <View
                  style={[
                    styles.triangleView,
                    {transform: [{rotate: '270deg'}]},
                  ]}></View>
              </View>
            </View>
            <View>
              <Text style={styles.mainHeading}>
                {decodedToken?.driver_name}
              </Text>
            </View>
          </View>
        </View>
        {renderContent()}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => expressBookingUpdate(1)}
            style={styles.button}>
            <Text style={styles.buttonText}>
              {languageSwitch == 'english'
                ? 'I am available'
                : 'मैं उपलब्ध है।'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => expressBookingUpdate(0)}
            style={styles.button}>
            <Text style={styles.buttonText}>
              {languageSwitch == 'english'
                ? 'I am not available'
                : 'मैं उपलब्ध नहीं हूँ।'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    // margin: 15,
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
    // paddingRight: 6,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  headingView: {backgroundColor: AppColors.white, width: '80%', marginLeft: 0},
  headingText: {
    color: AppColors.mainColor,
    fontSize: 15,
    paddingLeft: 4,
    // fontWeight: '200',
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
    // lineHeight: 24.2,
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
    // lineHeight: 20,
    justifyContent: 'center',
    // textAlign: 'auto',
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
    paddingHorizontal: 15,
    backgroundColor: AppColors.mainColor,
    alignItems: 'center',
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 17,
  },
});

export default ExpressBookingModal;

// // import React, {useContext, useState} from 'react';
// // import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// // import {AppColors} from '../../assets/Colors';
// // import {AppFont} from '../../assets/FontsFamily';
// // import {EXPRESS_BOOKING_UPDATE} from '../../apis/Apis';
// // import {useDispatch} from 'react-redux';
// // import {setExpressBookingModal} from '../../redux/slices/trustedDriverSlice';
// // import {TokenConstextApi} from '../../context/GlobalContext';

// // const ExpressBookingModal = () => {
// //   const dispatch = useDispatch();
// //   const {decodedToken, languageSwitch} = useContext(TokenConstextApi);
// //   // console.log(decodedToken.driver_name, 'expressBookinggggggggggggggggggg');
// //   console.log(languageSwitch, 'expressBookinggggggggggggggggggg');

// //   const expressBookingUpdate = async status => {
// //     // console.log(status, 'statussraus');
// //     try {
// //       const bookingUpdate = {
// //         action: 'update_supply',
// //         field: 'supply_visiability',
// //         status: status,
// //       };
// //       const response = await EXPRESS_BOOKING_UPDATE(bookingUpdate);
// //       console.log(bookingUpdate, ' send Status');
// //       console.log(response, 'expressBookingUpdate response');
// //       dispatch(setExpressBookingModal(true));
// //     } catch (error) {
// //       console.log(error, 'expressBookingUpdate error');
// //     }
// //   };

// //   return (
// //     <>
// //       <View style={styles.mainContainer}>
// //         <View style={styles.contentContainer}>
// //           <View style={styles.mainView}>
// //             <View style={styles.mainTopView}>
// //               <View style={styles.mainTopContent}>
// //                 <View style={styles.headingView}>
// //                   <Text style={styles.headingText}>Next 30 Minutes</Text>
// //                 </View>
// //                 <View style={styles.triangleMainView}>
// //                   <View style={styles.triangleView}></View>
// //                   <View
// //                     style={[
// //                       styles.triangleView,
// //                       {transform: [{rotate: '270deg'}]},
// //                     ]}></View>
// //                 </View>
// //               </View>

// //               <View>
// //                 <Text style={styles.mainHeading}>
// //                   {decodedToken && decodedToken.driver_name}
// //                 </Text>
// //               </View>
// //             </View>
// //           </View>
// //           {languageSwitch === 'english' ? (
// //             <>
// //               <View style={{marginVertical: 15, marginHorizontal: 3}}>
// //                 <Text style={{color: AppColors.black, fontSize: 15}}>
// //                   Are you available for any booking in the entire{' '}
// //                   <Text style={{color: AppColors.mainColor, fontWeight: 'bold'}}>
// //                     {' '}
// //                     {decodedToken && decodedToken.TrustedDriverData.zone}{' '}
// //                   </Text>
// //                   area in the next
// //                   <Text style={{color: AppColors.mainColor, fontWeight: 'bold'}}>
// //                     {' '}
// //                     30 minutes
// //                   </Text>{' '}
// //                   ? If yes, you will be notified by SMS as soon as an Express
// //                   booking comes in.
// //                 </Text>
// //               </View>
// //               <View style={{marginVertical: 15, marginHorizontal: 3}}>
// //                 <Text style={{color: AppColors.black, fontSize: 15}}>
// //                   Please do not provide incorrect information to avoid wasting
// //                   both your and our time.
// //                 </Text>
// //               </View>

// //               <View style={{flexDirection: 'row', padding: 5, margin: 5}}>
// //                 <TouchableOpacity
// //                   onPress={() => expressBookingUpdate(1)}
// //                   style={{flex: 1}}>
// //                   <View
// //                     style={{
// //                       margin: 5,
// //                       borderRadius: 8,
// //                       paddingVertical: 10,
// //                       paddingHorizontal: 30,
// //                       backgroundColor: AppColors.mainColor,
// //                     }}>
// //                     <Text style={{color: AppColors.white}}>I am available</Text>
// //                   </View>
// //                 </TouchableOpacity>

// //                 <TouchableOpacity
// //                   onPress={() => expressBookingUpdate(0)}
// //                   style={{flex: 1}}>
// //                   <View
// //                     style={{
// //                       margin: 5,
// //                       borderRadius: 8,
// //                       paddingVertical: 10,
// //                       paddingHorizontal: 20,
// //                       backgroundColor: AppColors.mainColor,
// //                     }}>
// //                     <Text style={{color: AppColors.white}}>
// //                       I am not available
// //                     </Text>
// //                   </View>
// //                 </TouchableOpacity>
// //               </View>
// //             </>
// //           ) : (
// //             <>
// //               <View style={{marginVertical: 15, marginHorizontal: 3}}>
// //                 <Text style={{color: AppColors.black, fontSize: 15}}>
// //                   क्या आप अगले{' '}
// //                   <Text
// //                     style={{color: AppColors.mainColor, fontWeight: 'bold'}}>
// //                     30 मिनट में पूरे{' '}
// //                     {decodedToken && decodedToken.TrustedDriverData.zone}{' '}
// //                   </Text>
// //                   क्षेत्र में कहीं की भी बुकिंग करने के लिए उपलब्ध है। यदि हाँ,
// //                   तो Express बुकिंग बुकिंग आते ही
// //                   <Text
// //                     style={{color: AppColors.mainColor, fontWeight: 'bold'}}>
// //                     {' '}
// //                     आपको SMS द्वारा सूचित किया जाएगा।
// //                   </Text>
// //                   ?
// //                 </Text>
// //               </View>
// //               <View style={{marginVertical: 15, marginHorizontal: 3}}>
// //                 <Text style={{color: AppColors.black, fontSize: 15}}>
// //                   कृपया गलत जानकारी मत देना जिससे आपका और हमारा दोनों को समय
// //                   बर्बाद हो।
// //                 </Text>
// //               </View>

// //               <View style={{flexDirection: 'row', padding: 5, margin: 5}}>
// //                 <TouchableOpacity
// //                   onPress={() => expressBookingUpdate(1)}
// //                   style={{flex: 1}}>
// //                   <View
// //                     style={{
// //                       margin: 5,
// //                       alignItems: 'center',
// //                       borderRadius: 8,
// //                       paddingVertical: 10,
// //                       paddingHorizontal: 30,
// //                       backgroundColor: AppColors.mainColor,
// //                     }}>
// //                     <Text style={{color: AppColors.white, fontSize: 17}}>
// //                       मैं उपलब्ध है।
// //                     </Text>
// //                   </View>
// //                 </TouchableOpacity>

// //                 <TouchableOpacity
// //                   onPress={() => expressBookingUpdate(0)}
// //                   style={{flex: 1}}>
// //                   <View
// //                     style={{
// //                       margin: 5,
// //                       borderRadius: 8,
// //                       alignItems: 'center',
// //                       paddingVertical: 10,
// //                       paddingHorizontal: 20,
// //                       backgroundColor: AppColors.mainColor,
// //                     }}>
// //                     <Text style={{color: AppColors.white, fontSize: 17}}>
// //                       मैं उपलब्ध नहीं हूँ।
// //                     </Text>
// //                   </View>
// //                 </TouchableOpacity>
// //               </View>
// //             </>
// //           )}
// //         </View>
// //       </View>
// //     </>
// //   );
// // };

// // const styles = StyleSheet.create({
// // mainContainer: {flex: 1},
// // contentContainer: {
// //   // flex: 1,
// //   backgroundColor: AppColors.white,
// //   justifyContent: 'flex-start',
// //   justifyContent: 'center',
// //   alignItems: 'center',
// //   height: 'auto',
// //   padding: 15,
// //   marginTop: 10,
// // },
// // mainView: {
// //   // margin: 15,
// //   backgroundColor: AppColors.white,
// //   borderRadius: 8,
// //   borderColor: AppColors.mainColor,
// //   width: '100%',
// // },
// // mainTopView: {
// //   backgroundColor: AppColors.mainColor,
// //   borderRadius: 8,
// //   marginBottom: 12,
// //   display: 'flex',
// //   flexDirection: 'column',
// // },
// // mainTopContent: {
// //   // paddingRight: 6,
// //   paddingVertical: 10,
// //   flexDirection: 'row',
// // },
// // headingView: {backgroundColor: AppColors.white, width: '80%', marginLeft: 0},
// // headingText: {
// //   color: AppColors.mainColor,
// //   fontSize: 15,
// //   paddingLeft: 4,
// //   // fontWeight: '200',
// //   fontFamily: 'Poppins-Regular',
// // },
// // triangleMainView: {display: 'flex', flexDirection: 'column'},
// // triangleView: {
// //   backgroundColor: 'transparent',
// //   borderStyle: 'solid',
// //   borderRightWidth: 12,
// //   borderTopWidth: 12,
// //   borderRightColor: 'transparent',
// //   borderTopColor: AppColors.white,
// // },
// // mainHeading: {
// //   fontSize: 27,
// //   marginTop: 20,
// //   marginBottom: 10,
// //   paddingBottom: 10,
// //   fontWeight: '500',
// //   textAlign: 'center',
// //   letterSpacing: 0.3,
// //   color: 'rgb(255, 255, 255)',
// //   // lineHeight: 24.2,
// //   fontFamily: AppFont.regularFont,
// // },
// // mainMiddleView: {
// //   margin: 30,
// //   marginTop: 50,
// //   justifyContent: 'center',
// //   alignItems: 'center',
// //   display: 'flex',
// //   flexDirection: 'row',
// //   marginLeft: 30,
// // },
// // iconView: {
// //   borderWidth: 1,
// //   borderColor: AppColors.greyColor,
// //   height: 36,
// //   padding: 10,
// //   backgroundColor: 'rgba(0,0,0,0)',
// // },
// // inputView: {
// //   borderTopWidth: 1,
// //   borderRightWidth: 1,
// //   borderBottomWidth: 1,
// //   borderRightColor: AppColors.greyColor,
// //   borderTopColor: AppColors.greyColor,
// //   borderBlockColor: AppColors.greyColor,
// //   height: 36,
// //   width: '90%',
// // },
// // inputText: {
// //   height: 36,
// //   fontSize: 14,
// //   color: AppColors.black,
// //   // lineHeight: 20,
// //   justifyContent: 'center',
// //   // textAlign: 'auto',
// //   textAlign: 'left',
// // },
// // btnView: {
// //   backgroundColor: AppColors.mainColor,
// //   alignItems: 'center',
// //   borderRadius: 5,
// //   justifyContent: 'center',
// //   paddingTop: 8,
// //   paddingBottom: 8,
// //   paddingLeft: 10,
// //   paddingRight: 10,
// //   alignSelf: 'center',
// //   marginBottom: 40,
// //   width: '40%',
// // },

// // btnText: {
// //   fontSize: 14,
// //   color: AppColors.white,
// //   fontWeight: '400',
// //   fontFamily: AppFont.regularFont,
// // },
// // });

// // export default ExpressBookingModal;
