import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Modal,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import YoutubePlayer from 'react-native-youtube-iframe';

import Header from '../components/Header';
import {Address, CallingGif, Facebook_Icon} from '../assets/images';
const DutyReportUpdateScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleOntheway, setModalVisibleOntheway] = useState(false);
  const [modalVisibleRich, setModalVisibleRich] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [modalVisibleinput, setModalVisibleinput] = useState(false);
  const [modalVisibleonTimeRich, setModalVisibleonTimeRich] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const translateX = new Animated.Value(0);

  const [swiped, setSwiped] = useState(false);

  useEffect(() => {
    if (swiped) {
      setModalVisibleOntheway(true);
    }
  }, [swiped]);

  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationX: translateX}}],
    {useNativeDriver: true},
  );

  const onHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.state === 5) {
      if (nativeEvent.translationX > 150) {
        setSwiped(true);
        Animated.timing(translateX, {
          toValue: 200,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const handleCloseModal = () => {
    setModalVisibleOntheway(false);
    setSwiped(false);
  };
  return (
    <View style={{flex: 1}}>
      <Header backButton={true} />
      <ScrollView
        style={{backgroundColor: 'white', marginBottom: 20, height: '100%'}}>
        {/* //modal */}
        <View style={styles.mainModalcontainer}>
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView>
                  <Text style={styles.title}>Package Details</Text>
                  <View style={styles.row}>
                    <Text style={styles.label}>Trip Type:</Text>
                    <Text style={styles.value}>One Way Incity</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Package:</Text>
                    <Text style={styles.value}>5 KMs</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Package Price:Cash</Text>
                    <Text style={styles.value}>Rs 287</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>GST:</Text>
                    <Text style={styles.value}>5% Rs 13</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Commission:</Text>
                    <Text style={styles.value}>20% Rs 55</Text>
                  </View>
                  <View
                    style={{
                      borderStyle: 'dotted',
                      borderWidth: 1,
                      borderRadius: 1,
                      marginVertical: 5,
                    }}
                  />
                  <View style={styles.row}>
                    <Text style={styles.label}>Net Earning:</Text>
                    <Text style={styles.value}>Rs 219</Text>
                  </View>
                  <View
                    style={{
                      borderStyle: 'dotted',
                      borderWidth: 1,
                      borderRadius: 1,
                      marginVertical: 5,
                    }}
                  />
                  <View style={styles.list}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginVertical: 5,
                      }}>
                      <View style={styles.bullet} />
                      <Text style={styles.listItem}>
                        Overtime Charges - Rs 8 Per KM
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginVertical: 5,
                      }}>
                      <View style={styles.bullet} />
                      <Text style={styles.listItem}>
                        Night Charges - Rs 200 Applied only in case you travel
                        between 10:00 PM to 06:00 AM
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginVertical: 5,
                      }}>
                      <View style={styles.bullet} />
                      <Text style={styles.listItem}>
                        Return to TAT D - Rs 68
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.closeButton,
                      {
                        width: '50%',
                        marginHorizontal: '25%',
                        backgroundColor: '#16588e',
                      },
                    ]}
                    onPress={() => setModalVisible(false)}>
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
        {/* modal on the way */}
        <View style={styles.mainModalcontainer}>
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisibleOntheway}
            onRequestClose={() => setModalVisibleOntheway(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView>
                  <TouchableOpacity
                    style={styles.closeModalButton}
                    onPress={() => handleCloseModal()}>
                    <Icon name="close" size={20} color="white" />
                  </TouchableOpacity>
                  <View style={styles.titleView}>
                    <Text
                      style={{
                        fontFamily: 'Merriweather-Bold',
                        fontSize: 18,
                        color: 'white',
                      }}>
                      Guests are like God
                    </Text>
                  </View>
                  <View style={{marginVertical: 20}}>
                    <Text style={[styles.subTitle, {color: '#16588e'}]}>
                      I will reach on time
                    </Text>
                    <Image
                      source={Facebook_Icon}
                      resizeMode="contain"
                      style={{
                        height: 60,
                        width: 140,
                        alignSelf: 'center',
                        marginVertical: 10,
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      styles.title,
                      {color: '#16588e', fontWeight: '100', fontSize: 16},
                    ]}>
                    Customer's time is very valuable
                  </Text>
                  <TouchableOpacity
                    style={styles.onthewayButton}
                    // onPress={() => handleCloseModal()}
                    onPress={() => {
                      setModalVisibleOntheway(false), setModalVisibleRich(true);
                    }}>
                    <Text style={styles.buttonText}>On The Way</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
        {/* modal reach */}
        <View style={styles.mainModalcontainer}>
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisibleRich}
            onRequestClose={() => setModalVisibleRich(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView>
                  <TouchableOpacity
                    style={styles.closeModalButton}
                    onPress={() => setModalVisibleRich(false)}>
                    <Icon name="close" size={20} color="white" />
                  </TouchableOpacity>
                  <View style={styles.titleView}>
                    <Text
                      style={{
                        fontFamily: 'Merriweather-Bold',
                        fontSize: 18,
                        color: 'white',
                      }}>
                      Guests are like God
                    </Text>
                  </View>
                  <View style={{marginVertical: 20}}>
                    <Text style={[styles.subTitle, {color: '#16588e'}]}>
                      I have reached the customer's address.
                    </Text>
                  </View>
                  <View style={{marginVertical: 30}}>
                    <Text
                      style={[
                        styles.title,
                        {color: 'black', fontWeight: '100', fontSize: 16},
                      ]}>
                      And ready to provide excellent service.
                    </Text>
                    <TouchableOpacity
                      style={styles.onthewayButton}
                      onPress={() => {
                        setModalVisibleRich(false), setModalVisibleinput(true);
                      }}>
                      <Text style={styles.buttonText}>Reach</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
        {/* modal otp */}
        <View style={styles.mainModalcontainer}>
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisibleinput}
            onRequestClose={() => setModalVisibleinput(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView>
                  <TouchableOpacity
                    style={styles.closeModalButton}
                    onPress={() => setModalVisibleinput(false)}>
                    <Icon name="close" size={20} color="white" />
                  </TouchableOpacity>
                  <View style={styles.titleView}>
                    <Text
                      style={{
                        fontFamily: 'Merriweather-Bold',
                        fontSize: 18,
                        color: 'white',
                      }}>
                      Guests are like God
                    </Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Otp"
                    placeholderTextColor="#aaa"
                    value={inputValue}
                    onChangeText={text => setInputValue(text)}
                  />
                  <View style={{marginVertical: 5}}>
                    <View style={styles.textWrapper}>
                      <Text
                        style={styles.titleInput}
                        onLayout={event => {
                          const {width} = event.nativeEvent.layout;
                          setTextWidth(width);
                        }}>
                        Resend OTP?
                      </Text>
                      <View style={[styles.dividerInput, {width: textWidth}]} />
                    </View>
                    <TouchableOpacity
                      style={[styles.onthewayButton, {marginTop: '40%'}]}
                      onPress={() => setModalVisibleinput(false)}>
                      <Text style={[styles.buttonText]}>Start</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
        {/* on time reach modal */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisibleonTimeRich}
          onRequestClose={() => setModalVisibleonTimeRich(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                <TouchableOpacity
                  style={styles.closeModalButton}
                  onPress={() => setModalVisibleonTimeRich(false)}>
                  <Icon name="close" size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.onthewayButton}
                  onPress={() => setModalVisibleonTimeRich(false)}>
                  <Text style={styles.buttonText}>Reach</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
        {/* modal end */}
        <View style={styles.container}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'Merriweather-Bold',
            }}>
            Dudty Time- 02:00 PM, 16 Dec,2024
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 15,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'black', fontFamily: 'Merriweather-Bold'}}>
                Booking No:
              </Text>
              <Text style={{color: 'black', marginLeft: 5}}>#643312</Text>
            </View>
            <TouchableOpacity
              style={styles.packageButton}
              onPress={() => setModalVisible(true)}>
              <Text style={{color: 'black', paddingHorizontal: 10}}>
                Package Details
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.testingContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 10,
              }}>
              <Text style={{color: 'black', fontFamily: 'Merriweather-Bold'}}>
                Testing{' '}
              </Text>
              <Text style={{color: 'black', fontFamily: 'Merriweather-Bold'}}>
                One way Incity
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={Address}
                  resizeMode="contain"
                  style={{height: 20, width: 20}}
                />
                <Text style={{fontFamily: 'Merriweather-Bold'}}>
                  RZ 7 Pocket 1, Matiala
                </Text>
              </View>
              <Image
                source={CallingGif}
                resizeMode="contain"
                style={{height: 50, width: 50}}
              />
            </View>
            {/* <View style={{flexDirection:'row',alignItems:'center'}}>
<Image
 source={require('../../assets/images/interview/calling.gif')}
 resizeMode="contain"
 style={{height: 50, width: 50}}
 />
 <Text style={{color:'black',fontFamily: "Merriweather-Bold",}}>Testing Testing</Text>
</View> */}
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: 'black',
              borderRadius: 10,
              marginVertical: 10,
            }}>
            <View style={styles.radioContainer}>
              <View style={styles.firstRadioContainer}>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() =>
                    setSelectedOption('Have you talked to the customer')
                  }>
                  <View style={styles.radioCircle}>
                    {selectedOption === 'Have you talked to the customer' && (
                      <View style={styles.selectedRb} />
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={styles.radioText}>
                  Have you talked to the customer ?
                </Text>
              </View>
              <View style={styles.firstRadioContainer}>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() =>
                    setSelectedOption(
                      'Is the customer not picking up the phone',
                    )
                  }>
                  <View style={styles.radioCircle}>
                    {selectedOption ===
                      'Is the customer not picking up the phone' && (
                      <View style={styles.selectedRb} />
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={styles.radioText}>
                  Is the customer not picking up the phone ?
                </Text>
              </View>
              <View style={styles.firstRadioContainer}>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() =>
                    setSelectedOption('The Customer wants to cancel')
                  }>
                  <View style={styles.radioCircle}>
                    {selectedOption === 'The Customer wants to cancel' && (
                      <View style={styles.selectedRb} />
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={styles.radioText}>
                  The Customer wants to cancel ?
                </Text>
              </View>
            </View>
            <GestureHandlerRootView style={{}}>
              <View style={styles.swipeButtoncontainer}>
                <View style={styles.swipeButton}>
                  {/* Swipable Icon */}
                  <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}>
                    <Animated.View
                      style={[
                        styles.iconContainer,
                        {transform: [{translateX: translateX}]},
                      ]}>
                      <View style={styles.iconWrapper}>
                        <Icon name="east" size={20} color="white" />
                      </View>
                    </Animated.View>
                  </PanGestureHandler>
                  <TouchableOpacity
                    style={styles.textContainer}
                    onPress={() => setSwiped(true)}>
                    <Text style={styles.text1}>Swipe when leaving home</Text>
                    <Text
                      style={[styles.text2, {fontFamily: 'Merriweather-Bold'}]}>
                      On the way
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Success Message */}
                {/* {swiped && setModalVisibleOntheway(true)} */}
              </View>

              <View style={{margin: 20}}>
                <YoutubePlayer
                  height={200}
                  // autoPlay={false}
                  videoId={'SsG_qwb0zLs'}
                />
              </View>
            </GestureHandlerRootView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DutyReportUpdateScreen;

const styles = StyleSheet.create({
  input: {
    borderColor: '#c4c4be',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  container: {
    margin: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  packageButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 12,
    borderColor: 'gray',
    borderWidth: 1,
  },
  testingContainer: {
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  radioContainer: {
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginTop: 25,
  },
  firstRadioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondRadioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  radioText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
    marginHorizontal: 10,
    fontFamily: 'Merriweather-Bold',
  },
  radioTextCash: {
    fontSize: 18,
    color: 'grey',
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2c9dd1',
  },
  mainModalcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    // fontFamily: "Merriweather-Bold",
    fontFamily: 'Merriweather-Regular',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    // fontFamily: "Merriweather-Bold",
    fontFamily: 'AbhayaLibra-Medium',
  },
  divider: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  list: {
    marginTop: 10,
  },
  listItem: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Merriweather-Bold',
  },
  closeButton: {
    backgroundColor: '#007bff',
    marginTop: 20,
    padding: 12,
    borderRadius: 6,
  },
  closeModalButton: {
    backgroundColor: '#16588e',
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onthewayButton: {
    backgroundColor: '#16588e',
    marginTop: 20,
    padding: 12,
    borderRadius: 6,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '20%',
    marginBottom: 120,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginTop: 6,
    marginRight: 10,
  },
  swipeButtoncontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    overflow: 'hidden',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 20,
    paddingVertical: 20,
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  iconWrapper: {
    backgroundColor: '#16588e',
    borderRadius: 50,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: '30%',
  },
  text1: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Merriweather-Bold',
  },
  text2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Merriweather-Bold',
  },
  success: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  titleView: {
    backgroundColor: '#16588e',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    padding: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Merriweather-Bold',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    // fontFamily: "Merriweather-Bold",
  },
  textWrapper: {
    alignItems: 'center',
  },
  titleInput: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
  dividerInput: {
    marginTop: 2,
    height: 1,
    backgroundColor: 'black',
  },
});
