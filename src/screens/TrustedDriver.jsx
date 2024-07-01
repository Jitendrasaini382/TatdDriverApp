import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {Marquee} from '@animatereactnative/marquee';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native';
import Header from '../components/Header';
import Modal from 'react-native-modal';
import OtrModal from '../components/modal/OtrModal';
import {AppColors} from '../assets/Colors';
import ToggleButton from '../components/ToggleButton';
import RatingModal from '../components/modal/RatingModal';
import BookingModal from '../components/modal/BookingModal';
import MainToggleModal from '../components/modal/MainToggleModal';
import BookingView from '../components/BookingView';
import AccordionTrainingVideo from '../components/TrainingVideos';
import MyBookingAgencyModal from '../components/modal/MyBookingAgencyModal';


const {width, height} = Dimensions.get('window');

const responsiveSize = size => {
  return (width / 411.42857142857144) * size;
};

const TrustedDriver = ({navigation}) => {
  const [currentView, setCurrentView] = useState('NOTIFICATIONS');
  const [toggleButton, setToggleButton] = useState(false);
  const [mainToggleModal, setMainToggleModal] = useState(false);
  const [mainToggleContent, setMainToggleContent] = useState(false);
  const [videosContent, setVideoContent] = useState(false);
  const [myBookingAgencyModal, setMyBookingAgencyModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);

  const MainToggleHandle = () => {
    if (!toggleButton) {
      setToggleButton(true);
      setMainToggleModal(true);
      setMainToggleContent(true);
    } else {
      setToggleButton(false);
      setMainToggleContent(false);
      setVideoContent(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header extraButton={true} />

      <ScrollView>
        <View style={styles.mainContainer}>
          {/* Marquee View */}
          <View style={styles.marqueeView}>
            <Marquee spacing={20} speed={0.5}>
              <Text style={styles.marqueeText}>
                Please watch the remaining training videos in a quiet place.
                After watching the videos, your ID will be unlocked following a
                question and answer session.
              </Text>
            </Marquee>
          </View>

          {/* Middle Container */}
          <View style={styles.middleContainer}>
            <View style={styles.middleContent}>
              {/* Top div */}
              <View style={styles.topView}>
                <View style={styles.topLeft}>
                  <Text style={styles.topLeftText}>20%</Text>
                  <Text style={styles.bottamLeftText}>Commission</Text>
                </View>
                <View style={styles.topRight}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DriverEarning')}>
                    <View style={styles.earningView}>
                      <Text style={styles.rupeeIcon}>
                        <Icon name="rupee" size={responsiveSize(7)} />
                        15115
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DriverNotifications')}>
                    <View style={styles.notification}>
                      <Icon
                        color="white"
                        size={responsiveSize(22.5)}
                        name="bell"
                      />
                      <Text style={styles.notificationCount}>0</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.toggleView}>
                    <ToggleSwitch
                      isOn={toggleButton}
                      onColor={AppColors.mainColor}
                      offColor={AppColors.greyColor}
                      size="medium"
                      onToggle={() => MainToggleHandle()}
                    />
                  </View>
                </View>
              </View>

              {/* Bottom div */}
              <View style={styles.bottamView}>
                <View style={styles.driverNameView}>
                  <Text style={styles.driverNameText}>MOHIT DHANAWAT</Text>
                </View>
                <View style={styles.bottamRightView}>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={styles.otrView}>
                      <Text style={styles.bottamRightText}>4</Text>
                      <Text style={styles.bottamRightText}>OTR</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setRatingModal(true)}>
                    <View style={styles.ratingView}>
                      <Text style={styles.bottamRightText}>4</Text>
                      <Text style={styles.bottamRightText}>Rating</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setBookingModal(true)}>
                    <View style={styles.bookingView}>
                      <Text style={styles.bottamRightText}>70 %</Text>
                      <Text style={styles.bottamRightText}>Booking</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Bottom div */}
            <View style={styles.bottamContent}>
              <TouchableOpacity
                onPress={() => setVideoContent(true)}
                style={[
                  styles.bottamContent1,
                  videosContent && {backgroundColor: AppColors.mainColor},
                ]}>
                <Text style={styles.absoulteText}>5</Text>
                <View style={styles.absoulteView}>
                  <Text
                    style={[
                      styles.bottamContent1Text,
                      videosContent && {color: 'white'},
                    ]}>
                    Training
                  </Text>
                  <Text
                    style={[
                      styles.bottamContent1Text,
                      videosContent && {color: 'white'},
                    ]}>
                    Videos
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('MyBonusStatusHistory')}
                style={styles.bottamContent2}>
                <Text style={styles.mainText}>My Bonus</Text>
                <Text style={styles.textIcon}>
                  <Icon name="rupee" size={responsiveSize(9)} /> 0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('AgentLogin')}
                style={styles.bottamContent3}>
                <Text style={styles.mainText}>Agent panel</Text>
                <Text style={styles.textIcon}>
                  <Icon name="rupee" size={responsiveSize(9)} /> 0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ClearMyDuePayment')}
                style={styles.bottamContent4}>
                <Text style={styles.mainText}>Clear My Due</Text>
                <Text style={styles.textIcon}>
                  <Icon name="rupee" size={responsiveSize(9)} /> 0
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Toggle Button */}
          <ToggleButton
            button1Label="Hindi"
            button2Label="English"
            onToggle={label => setCurrentView(label)}
          />

          {/* Main Toggle Content */}
          <View style={styles.toggleContentContainer}>
            {mainToggleContent ? (
              <BookingView setMyBookingAgencyModal={setMyBookingAgencyModal} />
            ) : videosContent ? (
              <AccordionTrainingVideo />
            ) : null}
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      <Modal
        backdropOpacity={0}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        isVisible={mainToggleModal}>
        <MainToggleModal setMainToggleModal={setMainToggleModal} />
      </Modal>

      <Modal
        backdropOpacity={0}
        onBackdropPress={() => setModalVisible(false)}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        isVisible={isModalVisible}>
        <OtrModal setModalVisible={setModalVisible} />
      </Modal>

      <Modal
        backdropOpacity={0}
        onBackdropPress={() => setRatingModal(false)}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        isVisible={ratingModal}>
        <RatingModal setRatingModal={setRatingModal} />
      </Modal>

      <Modal
        backdropOpacity={0}
        onBackdropPress={() => setBookingModal(false)}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        isVisible={bookingModal}>
        <BookingModal setBookingModal={setBookingModal} />
      </Modal>

      <Modal
        backdropOpacity={0}
        onBackdropPress={() => setMyBookingAgencyModal(false)}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        isVisible={myBookingAgencyModal}>
        <MyBookingAgencyModal
          setMyBookingAgencyModal={setMyBookingAgencyModal}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: responsiveSize(20),
  },
  marqueeView: {
    paddingHorizontal: '2%',
  },
  marqueeText: {
    color: AppColors.black,
    fontSize: responsiveSize(15),
    fontWeight: '400',
    lineHeight: responsiveSize(21),
    fontFamily: 'Roboto',
  },
  middleContainer: {
    margin: '4%',
    marginTop: 0,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderRadius: responsiveSize(10),
    borderColor: AppColors.mainColor,
    position: 'relative',
  },
  middleContent: {
    backgroundColor: AppColors.mainColor,
    paddingHorizontal: '3%',
    borderRadius: responsiveSize(6),
    marginBottom: responsiveSize(2),
  },
  topView: {
    paddingTop: '3%',
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLeft: {
    backgroundColor: AppColors.white,
    height: responsiveSize(70),
    width: responsiveSize(70),
    borderRadius: responsiveSize(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeftText: {
    color: AppColors.mainColor,
    fontSize: responsiveSize(25),
    fontWeight: '700',
    fontFamily: 'Roboto-Regular',
  },
  bottamLeftText: {
    color: AppColors.mainColor,
    fontSize: responsiveSize(9),
    fontWeight: '300',
    fontFamily: 'Roboto-Regular',
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent  : 'space-between'
  },
  earningView: {
    backgroundColor: 'rgb(255,255,255)',
    paddingHorizontal: responsiveSize(6),
    paddingVertical: responsiveSize(4),
    margin: responsiveSize(3),
  },
  rupeeIcon: {
    color: AppColors.mainColor,
    textAlign: 'center',
    padding: responsiveSize(2),
    fontSize: responsiveSize(7),
  },
  notification: {
    marginLeft: '2%',
  },
  notificationCount: {
    position: 'absolute',
    alignSelf: 'flex-end',
    backgroundColor: AppColors.greyColor,
    fontSize: responsiveSize(7),
    fontWeight: '400',
    padding: responsiveSize(3),
    paddingHorizontal: responsiveSize(5),
    color: 'rgb(256,256,256)',
  },
  toggleView: {
    backgroundColor: 'rgb(217, 217, 217)',
    borderRadius: responsiveSize(34),
    borderWidth: 1,
    borderColor: AppColors.greyColor,
    // marginLeft: '10%',
    marginRight: '2%',
  },
  bottamView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: responsiveSize(10),
  },
  driverNameView: {
    flex: 1,
  },
  driverNameText: {
    fontSize: responsiveSize(15),
    fontWeight: '500',
    letterSpacing: 0.3,
    fontFamily: 'Roboto',
    color: 'rgb(255,255,255)',
  },
  bottamRightView: {
    flexDirection: 'row',
  },
  otrView: {
    backgroundColor: AppColors.mainColor,
    borderWidth: 2,
    borderRadius: responsiveSize(7),
    borderColor: 'white',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(8),
    paddingVertical: responsiveSize(4),
    margin: responsiveSize(2),
  },
  bottamRightText: {
    fontSize: responsiveSize(8),
    fontWeight: '500',
    color: 'white',
  },
  ratingView: {
    backgroundColor: 'green',
    borderWidth: 2,
    borderRadius: responsiveSize(7),
    borderColor: 'white',
    alignItems: 'center',
    margin: responsiveSize(2),
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(4),
  },
  bookingView: {
    backgroundColor: 'green',
    borderWidth: 2,
    borderRadius: responsiveSize(7),
    borderColor: 'white',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(8),
    margin: responsiveSize(2),
    paddingVertical: responsiveSize(4),
  },
  bottamContent: {
    flexDirection: 'row',
    margin: responsiveSize(3),
  },
  bottamContent1: {
    backgroundColor: 'white',
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    margin: responsiveSize(1),
    flexDirection: 'row',
  },
  absoulteText: {
    color: 'white',
    backgroundColor: 'rgb(195, 31, 31)',
    fontSize: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    paddingVertical: 2,
  },
  absoulteView: {justifyContent: 'center', alignItems: 'center'},
  bottamContent1Text: {
    color: AppColors.mainColor,
    fontSize: 9,
    fontWeight: '400',
    textAlign: 'center',
  },

  bottamContent2: {
    backgroundColor: 'white',
    paddingBottom: 3,
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    margin: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  bottamContent3: {
    backgroundColor: 'white',
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    margin: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 3,
  },
  bottamContent4: {
    backgroundColor: 'yellow',
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    margin: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 3,
  },
  mainText: {
    color: AppColors.mainColor,
    fontSize: 9,
    fontWeight: '400',
    paddingTop: 5,
    // justifyContent: 'center',
    textAlign: 'center',
  },
  textIcon: {
    color: AppColors.mainColor,
    fontSize: 9,
    textAlign: 'center',
  },
});

export default TrustedDriver;

// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {Marquee} from '@animatereactnative/marquee';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import ToggleSwitch from 'toggle-switch-react-native';
// import Header from '../components/Header';
// import Modal from 'react-native-modal';
// import OtrModal from '../components/modal/OtrModal';
// import {Dimensions} from 'react-native';
// import {AppColors} from '../assets/Colors';
// import ToggleButton from '../components/ToggleButton';
// import RatingModal from '../components/modal/RatingModal';
// import BookingModal from '../components/modal/BookingModal';
// import MainToggleModal from '../components/modal/MainToggleModal';
// import BookingView from '../components/BookingView';
// import AccordionTrainingVideo from '../components/TrainingVideos';
// import MyBookingAgencyModal from '../components/modal/MyBookingAgencyModal';
// import MyBookingModal from '../components/MyBookingModal';
// const {width, height} = Dimensions.get('window');

// const TrustedDriver = ({navigation}) => {
//   const [currentView, setCurrentView] = useState('NOTIFICATIONS');

//   const [toggleButton, setToggleButton] = useState(false);
//   const [mainToggleModal, setMainToggleModal] = useState(false);
//   const [mainToggleContent, setMainToggleContent] = useState(false);
//   const [videosContent, setVideoContent] = useState(false);
//   const [myBookingAgencyModal, setMyBookingAgencyModal] = useState(false);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [bookingModal, setBookingModal] = useState(false);
//   const [ratingModal, setRatingModal] = useState(false);

//   // const [myBookingModal, setMyBookingModal] = useState(true);

//   // useEffect(()=>{
//   //   setMainToggleModal(true)
//   // },[])

//   const MainToggleHandle = () => {
//     if (!toggleButton) {
//       setToggleButton(true);
//       setMainToggleModal(true);
//       setMainToggleContent(true);
//     } else {
//       setToggleButton(false);
//       setMainToggleContent(false);
//       setVideoContent(false);
//     }
//   };

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white,}}>
//       {/* {myBookingModal ? <MyBookingModal/> : null    } */}

//       <Header extraButton={true} />

//       <ScrollView>
//         <View style={styles.mainContainer}>
//           {/* Marquee View */}
//           <View style={styles.marqueeView}>
//             <Marquee spacing={20} speed={0.5}>
//               <Text style={styles.marqueeText}>
//                 Please watch the remaining training videos in a quiet place.
//                 After watching the videos, your ID will be unlocked following a
//                 question and answer session.
//               </Text>
//             </Marquee>

//           </View>
//           {/* Middle Container */}
//           <View style={styles.middleContainer}>
//             <View style={styles.middleContent}>
//               {/* top div */}
//               <View style={styles.topView}>
//                 <View style={styles.topLeft}>
//                   <Text style={styles.topLeftText}>20%</Text>
//                   <Text style={styles.bottamLeftText}>Commission</Text>
//                 </View>
//                 <View style={styles.topRight}>
//                   <TouchableOpacity
//                     onPress={
//                       () => navigation.navigate('DriverEarning')
//                       // console.warn('rrrrr')
//                     }>
//                     <View style={styles.earningView}>
//                       <Text style={styles.rupeeIcon}>
//                         <Icon name="rupee" size={7} />15115
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => navigation.navigate('DriverNotifications')}>
//                     <View style={styles.notification}>
//                       <Icon color="white" size={22.5} name="bell" />

//                       <Text style={styles.notificationCount}>0</Text>
//                     </View>
//                   </TouchableOpacity>

//                   <View style={styles.toggleView}>
//                     <ToggleSwitch
//                       isOn={toggleButton}
//                       onColor={AppColors.mainColor}
//                       offColor={AppColors.greyColor}
//                       size="medium"
//                       onToggle={() => MainToggleHandle()}
//                     />
//                   </View>
//                   <Modal
//                     backdropOpacity={0}
//                     // onBackdropPress={() => setMainToggleModal(false)}
//                     animationIn={'fadeInDown'}
//                     animationOut={'fadeOutUp'}
//                     isVisible={mainToggleModal}>
//                     <MainToggleModal setMainToggleModal={setMainToggleModal} />
//                   </Modal>
//                 </View>
//               </View>
//               {/* bottam div */}
//               <View style={styles.bottamView}>
//                 <View style={styles.driverNameView}>
//                   <Text style={styles.driverNameText}>MOHIT DHANAWAT</Text>
//                 </View>
//                 <View style={styles.bottamRightView}>
//                   <TouchableOpacity onPress={() => setModalVisible(true)}>
//                     <View style={styles.otrView}>
//                       <Text
//                         style={[
//                           styles.bottamRightText,
//                           {paddingHorizontal: 5, textAlign: 'center'},
//                         ]}>
//                         4
//                       </Text>
//                       <Text
//                         style={[
//                           styles.bottamRightText,
//                           {paddingHorizontal: 10, textAlign: 'center'},
//                         ]}>
//                         {' '}
//                         OTR
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                   <Modal
//                     backdropOpacity={0}
//                     onBackdropPress={() => setModalVisible(false)}
//                     animationIn={'fadeInDown'}
//                     animationOut={'fadeOutUp'}
//                     isVisible={isModalVisible}>
//                     <OtrModal setModalVisible={setModalVisible} />
//                     {/* <PackageDetails setModalVisible={setModalVisible} /> */}
//                     {/* <MyBookingAgencyModal setModalVisible={setModalVisible} /> */}
//                   </Modal>

//                   <TouchableOpacity onPress={() => setRatingModal(true)}>
//                     <View style={styles.ratingView}>
//                       <Text style={styles.bottamRightText}>4</Text>
//                       <Text style={styles.bottamRightText}> Rating</Text>
//                     </View>
//                   </TouchableOpacity>
//                   <Modal
//                     backdropOpacity={0}
//                     onBackdropPress={() => setRatingModal(false)}
//                     animationIn={'fadeInDown'}
//                     animationOut={'fadeOutUp'}
//                     isVisible={ratingModal}>
//                     <RatingModal setRatingModal={setRatingModal} />
//                   </Modal>

//                   <TouchableOpacity onPress={() => setBookingModal(true)}>
//                     <View style={styles.bookingView}>
//                       <Text style={styles.bottamRightText}>70 %</Text>
//                       <Text style={styles.bottamRightText}> Booking</Text>
//                     </View>
//                   </TouchableOpacity>
//                   <Modal
//                     backdropOpacity={0}
//                     onBackdropPress={() => setBookingModal(false)}
//                     animationIn={'fadeInDown'}
//                     animationOut={'fadeOutUp'}
//                     isVisible={bookingModal}>
//                     <BookingModal setBookingModal={setBookingModal} />
//                   </Modal>
//                 </View>
//               </View>
//             </View>

//             {/* bottam div */}

//             <View style={styles.bottamContent}>
//               <TouchableOpacity
//                 onPress={() => setVideoContent(true)}
//                 style={[
//                   styles.bottamContent1,
//                   videosContent && {backgroundColor: AppColors.mainColor},
//                 ]}>
//                 <Text style={styles.absoulteText}>5</Text>
//                 <View style={styles.absoulteView}>
//                   <Text
//                     style={[
//                       styles.bottamContent1Text,
//                       videosContent && {color: 'white'},
//                     ]}>
//                     Training
//                   </Text>
//                   <Text
//                     style={[
//                       styles.bottamContent1Text,
//                       videosContent && {color: 'white'},
//                     ]}>
//                     Videos
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('MyBonusStatusHistory')}
//                 style={styles.bottamContent2}>
//                 <Text style={styles.mainText}>My Bonus</Text>
//                 <Text style={styles.textIcon}>
//                   <Icon name="rupee" size={9} /> 0
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('AgentLogin')}
//                 style={styles.bottamContent3}>
//                 <Text style={styles.mainText}>Agent panel</Text>
//                 <Text style={styles.textIcon}>
//                   <Icon name="rupee" size={9} /> 0
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('ClearMyDuePayment')}
//                 style={styles.bottamContent4}>
//                 <Text style={styles.mainText}>Clear My Due</Text>
//                 <Text style={styles.textIcon}>
//                   <Icon name="rupee" size={9} /> 0
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//       {/* {myBookingModal ? <MyBookingModal/> : null    } */}

//           {/* ToGGle Button */}
//           <ToggleButton
//             button1Label="Hindi"
//             button2Label="English"
//             onToggle={label => setCurrentView(label)}
//           />

//           {/* main Toggle Content */}

//           <View style={{marginTop: 15, margin: 15}}>
//             {mainToggleContent ? (
//               <BookingView setMyBookingAgencyModal={setMyBookingAgencyModal} />
//             ) : videosContent ? (
//               <AccordionTrainingVideo />
//             ) : null}
//             <Modal
//               backdropOpacity={0}
//               onBackdropPress={() => setMyBookingAgencyModal(false)}
//               animationIn={'fadeInDown'}
//               animationOut={'fadeOutUp'}
//               isVisible={myBookingAgencyModal}>
//               {/* <OtrModal setModalVisible={setModalVisible} /> */}
//               {/* <PackageDetails setModalVisible={setModalVisible} /> */}
//               <MyBookingAgencyModal
//                 setMyBookingAgencyModal={setMyBookingAgencyModal}
//               />
//             </Modal>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default TrustedDriver;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//     display: 'flex',
//     flexDirection: 'column',
//     marginVertical: 20,
//   },
//   marqueeView: {
//     paddingLeft: 7,
//     paddingRight: 7,
//   },
//   marqueeText: {
//     color: AppColors.black,
//     fontSize: 15,
//     fontWeight: '400',
//     lineHeight: 21,
//     fontFamily: 'Roboto',
//   },
//   middleContainer: {
//     margin: 15,
//     // flex: 1,
//     marginTop: 0,
//     backgroundColor: AppColors.white,
//     borderWidth: 1,
//     borderRadius: 10,
//     borderColor: AppColors.mainColor,
//     // width: '92%',
//     position: "relative"
//   },
//   middleContent: {
//     backgroundColor: AppColors.mainColor,
//     paddingHorizontal: 10,
//     //   width: '100%',
//     borderRadius: 6,
//     marginBottom: 2,
//     display: 'flex',
//     flexDirection: 'column',
//     //   paddingLeft: 10,
//   },
//   topView: {
//     // paddingRight: 6,
//     paddingTop: 10,
//     // paddingBottom: 10,
//     marginBottom: 12,
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   topLeft: {
//     backgroundColor: AppColors.white,
//     height: 70,
//     width: 70,
//     borderRadius: 50,
//     marginLeft: '',
//     display: 'flex',
//   },
//   topLeftText: {
//     // flex: 1,
//     color: AppColors.mainColor,
//     // lineHeight: 40,
//     fontSize: 25,
//     fontWeight: '700',
//     fontFamily: 'Roboto-Regular',
//     textAlign: 'center',
//     paddingTop: 15,
//     paddingRight: 10,
//   },
//   bottamLeftText: {
//     flex: 1,
//     color: AppColors.mainColor,
//     fontSize: 9,
//     fontWeight: '300',
//     fontFamily: 'Roboto-Regular',
//     textAlign: 'center',
//     // marginTop: -5,
//   },
//   topRight: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     // alignContent: 'space-between',
//     alignItems: 'flex-start',
//     // paddingTop: -20,
//     paddingBottom: 45,
//   },
//   earningView: {
//     backgroundColor: 'rgb(255,255,255)',
//     // height: 30,
//     // width: 30,
//     // marginVertical: 2,
//     paddingHorizontal: 6,
//     paddingVertical: 4,
//     margin: 3,
//   },
//   rupeeIcon: {
//     color: AppColors.mainColor,
//     textAlign: 'center',
//     padding: 2,
//     fontSize: 7,
//   },
//   notification: {marginLeft: '2%'},
//   notificationCount: {
//     position: 'absolute',
//     alignSelf: 'flex-end',
//     backgroundColor: 'grey',
//     fontSize: 7,
//     fontWeight: '400',
//     padding: 3,
//     paddingHorizontal: 5,
//     color: 'rgb(256,256,256)',
//   },
//   toggleView: {
//     backgroundColor: 'rgb(217, 217, 217)',
//     borderRadius: 34,
//     borderWidth: 1,
//     // borderStartWidth : 5,
//     borderColor: 'grey',
//     //  margin: 5,
//     marginVertical: 'auto',
//     // marginTop: 3,
//     // marginRight: 5,
//     marginLeft: '10%',
//     marginRight: '2%',
//   },
//   bottamView: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingBottom: 10,
//     alignSelf: 'center',
//   },
//   driverNameView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     //   marginBottom: 35,
//     alignSelf: 'center',
//     // marginRight: 100
//   },
//   driverNameText: {
//     fontSize: 15,
//     fontWeight: '500',
//     letterSpacing: 0.3,
//     fontFamily: 'Roboto',
//     color: 'rgb(255,255,255)',
//   },

//   bottamRightView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     flex: 1,
//   },
//   otrView: {
//     backgroundColor: AppColors.mainColor,
//     borderWidth: 2,
//     borderRadius: 7,
//     borderColor: 'white',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     margin: 2,
//   },
//   bottamRightText: {
//     fontSize: 8,
//     fontWeight: '500',
//   },
//   ratingView: {
//     backgroundColor: 'green',
//     borderWidth: 2,
//     borderRadius: 7,
//     borderColor: 'white',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     margin: 2,
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//   },
//   bookingView: {
//     backgroundColor: 'green',
//     borderWidth: 2,
//     borderRadius: 7,
//     borderColor: 'white',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     margin: 2,
//     paddingVertical: 4,
//   },
//   bottamContent: {
//     display: 'flex',
//     margin: 3,
//     flexDirection: 'row',
//   },
//   bottamContent1: {
//     backgroundColor: 'white',
//     flex: 1,
//     borderWidth: 1,
//     borderColor: AppColors.mainColor,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 1,
//     display: 'flex',
//     flexDirection: 'row',
//   },
// absoulteText: {
//   color: 'white',
//   backgroundColor: 'rgb(195, 31, 31)',
//   fontSize: 8,
//   alignSelf: 'flex-start',
//   paddingHorizontal: 4,
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   paddingVertical: 2,
// },
// absoulteView: {justifyContent: 'center', alignItems: 'center'},
// bottamContent1Text: {
//   color: AppColors.mainColor,
//   fontSize: 9,
//   fontWeight: '400',
//   textAlign: 'center',
// },

// bottamContent2: {
//   backgroundColor: 'white',
//   paddingBottom: 3,
//   flex: 1,
//   borderWidth: 1,
//   borderColor: AppColors.mainColor,
//   margin: 1,
//   display: 'flex',
//   flexDirection: 'column',
// },
// bottamContent3: {
//   backgroundColor: 'white',
//   flex: 1,
//   borderWidth: 1,
//   borderColor: AppColors.mainColor,
//   margin: 1,
//   display: 'flex',
//   flexDirection: 'column',
//   paddingBottom: 3,
// },
// bottamContent4: {
//   backgroundColor: 'yellow',
//   flex: 1,
//   borderWidth: 1,
//   borderColor: AppColors.mainColor,
//   margin: 1,
//   display: 'flex',
//   flexDirection: 'column',
//   paddingBottom: 3,
// },
// mainText: {
//   color: AppColors.mainColor,
//   fontSize: 9,
//   fontWeight: '400',
//   paddingTop: 5,
//   // justifyContent: 'center',
//   textAlign: 'center',
// },
// textIcon: {
//   color: AppColors.mainColor,
//   fontSize: 9,
//   textAlign: 'center',
// },
// });
