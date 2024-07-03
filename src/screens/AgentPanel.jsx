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
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../components/Header';
import Modal from 'react-native-modal';
import {AppColors} from '../assets/Colors';
import {ArrowFadeBlue, LeftArrow} from '../assets/images';
import AgentPanelModal from '../components/modal/AgentPanelModal';

const {width, height} = Dimensions.get('window');

const responsiveSize = size => {
  return (width / 411.42857142857144) * size;
};

const AgentPanel = ({navigation}) => {
  const [myNetworkData, setMyNetworkData] = useState(true);
  const [agentPanelModal, setAgentPanelModal] = useState(false);
  useEffect(() => {
    [setAgentPanelModal(true)];
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header backButton={true} />

      <ScrollView>
        <View style={styles.mainContainer}>
          {/* Marquee View */}

          {/* Middle Container */}
          <View style={styles.middleContainer}>
            <View style={styles.middleContent}>
              {/* Top div */}
              <View style={styles.topView}>
                <TouchableOpacity
                //   onPress={() => navigation.navigate('AgentWallet')}
                  style={styles.topLeft}>
                  <Text style={styles.topLeftText}>
                    <Icon name="rupee" color="white" size={15} style={{}} />0
                  </Text>
                  {/* <Text style={styles.bottamLeftText}>Commission</Text> */}
                </TouchableOpacity>
                <View style={styles.topRight}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: AppColors.mainColor,
                      borderRadius: 8,
                      //   padding: 10,
                      paddingHorizontal: 15,
                      paddingVertical: 7,
                      flexDirection: 'row',
                      //   alignItems: 'center',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <Icon
                      name="plus"
                      color="white"
                      size={10}
                      style={{margin: 5}}
                    />
                    <Image
                      source={ArrowFadeBlue}
                      style={{
                        width: 16,
                        height: 16,
                        transform: [{rotate: '180deg'}],
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bottom div */}
              <View style={styles.bottamView}>
                <View style={styles.driverNameView}>
                  <Text style={styles.driverNameText}>MOHIT DHANAWAT</Text>
                </View>
                <View style={styles.bottamRightView}>
                  {/* <TouchableOpacity
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 10,
                    }}>
                    <Text style={{color: '#939393'}}>0</Text>
                    <Text style={{color: '#939393'}}>My Network</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 10,
                    }}>
                    <Text style={{color: '#939393'}}>0</Text>
                    <Text style={{color: '#939393'}}>My Leads</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 10,
                    }}
                    onPress={() => setMyNetworkData(true)}>
                    <Text
                      style={{color: myNetworkData ? '#16588e' : '#939393'}}>
                      0
                    </Text>
                    <Text
                      style={{color: myNetworkData ? '#16588e' : '#939393'}}>
                      My Network
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 10,
                    }}
                    onPress={() => setMyNetworkData(false)}>
                    <Text
                      style={{color: myNetworkData ? '#939393' : '#16588e'}}>
                      0
                    </Text>
                    <Text
                      style={{color: myNetworkData ? '#939393' : '#16588e'}}>
                      My Leads
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Bottom div */}
            <View style={styles.bottamContent}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AgentKyc')}
                style={styles.bottamContent2}>
                <Text style={styles.mainText}>My Bank</Text>
                <Text style={styles.textIcon}>Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('AgentTrainig')}
                style={styles.bottamContent1}>
                <Text style={styles.absoulteText}>3</Text>
                <View style={styles.absoulteView}>
                  <Text style={[styles.bottamContent1Text, ,]}>Training</Text>
                  <Text style={[styles.bottamContent1Text]}>Videos</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => navigation.navigate('AgentWallet')}
                style={styles.bottamContent3}>
                <Text style={styles.mainText}>Wallet Balance</Text>
                <Text style={styles.textIcon}>
                  <Icon name="rupee" size={responsiveSize(9)} /> 0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => navigation.navigate('#')}
                style={styles.bottamContent4}>
                <Text style={styles.mainText}>My Earning</Text>
                <Text style={styles.textIcon}>
                  <Icon name="rupee" size={responsiveSize(9)} /> 0
                </Text>
              </TouchableOpacity>
            </View>
          </View>

         
          <View style={styles.toggleContentContainer}>
          
          </View>
          <Modal
            backdropOpacity={0}
            onBackdropPress={() => setAgentPanelModal(false)}
            animationIn={'fadeInDown'}
            animationOut={'fadeOutUp'}
            isVisible={agentPanelModal}>
            <AgentPanelModal setAgentPanelModal={setAgentPanelModal} />
          </Modal>
        </View>
      </ScrollView>
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
    paddingHorizontal: '3%',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.mainColor,
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
    backgroundColor: AppColors.mainColor,
    height: responsiveSize(70),
    width: responsiveSize(70),
    borderRadius: responsiveSize(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeftText: {
    color: AppColors.white,
    fontSize: responsiveSize(15),
    fontWeight: '500',
    fontFamily: 'Roboto-Regular',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.white,
  },
  bottamLeftText: {
    color: AppColors.mainColor,
    fontSize: responsiveSize(9),
    fontWeight: '300',
    fontFamily: 'Roboto-Regular',
  },
  topRight: {
    alignItems: 'center',
  },
  earningView: {
    paddingHorizontal: responsiveSize(6),
    paddingVertical: responsiveSize(4),
    margin: responsiveSize(5),
  },
  rupeeIcon: {
    color: AppColors.mainColor,
    textAlign: 'center',
    padding: responsiveSize(2),
    fontSize: responsiveSize(7),
  },
  notification: {
    margin: responsiveSize(5),
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

  bottamView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: responsiveSize(10),
  },
  driverNameView: {
    flex: 1,
    justifyContent: 'center',
  },
  driverNameText: {
    fontSize: responsiveSize(15),
    fontWeight: '500',
    letterSpacing: 0.3,
    fontFamily: 'Roboto',
    color: '#939393',
  },
  bottamRightView: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    // backgroundColor: 'yellow',
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

export default AgentPanel;

