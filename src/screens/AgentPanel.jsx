import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Pressable,
  Modal,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AppFont} from '../assets/FontsFamily';
import {ArrowFadeBlue, CallingGif, Headerlogo} from '../assets/images';
import {Linking} from 'react-native';

import AgentPanelModal from '../components/modal/AgentPanelModal';
import {
  GET_AGENT_NERTWORK_AND_LEADS,
  GET_ALL_AGENT_PANEL_INFO,
  PARTNER_AGENT_ONBOOKING_CALL_SUPPORT,
} from '../apis/Apis';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const responsiveSize = size => {
  return (width / 411.42857142857144) * size;
};

const AgentPanel = ({navigation}) => {
  const [myNetworkData, setMyNetworkData] = useState(true);
  const [allAgentInfo, setAllAgentInfo] = useState(null);
  const [agentPanelModal, setAgentPanelModal] = useState(false);
  const [networkAndLeadsData, setnetworkAndLeadsData] = useState(null);
  const [leadsLoader, setleadsLoader] = useState(false);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const showNeedHelp = useSelector(e => e?.trustedDriverSlice?.isNeedHelpShow);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setAgentPanelModal(true);
    setleadsLoader(true);
    getAllAgentInfo();
    getNetworkAndLeads();
  }, [languageSwitch]);

  const getAllAgentInfo = async () => {
    try {
      const response = await GET_ALL_AGENT_PANEL_INFO({
        current_language: languageSwitch,
      });

      setAllAgentInfo(response);
    } catch (error) {
    } finally {
      setleadsLoader(false);
      setRefreshing(false);
    }
  };
  const getNetworkAndLeads = async () => {
    try {
      // Fetch update popup data
      const response = await GET_AGENT_NERTWORK_AND_LEADS();
      setnetworkAndLeadsData(response);
    } catch (error) {
    } finally {
      setleadsLoader(false);
      setRefreshing(false);
    }
  };

  const handleLogoPress = () => {
    navigation.navigate('TrustedDriver');
  };

  const viewRef = useRef(null); // Reference to the View
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const showPopover = () => {
    if (viewRef.current) {
      viewRef.current.measure((fx, fy, width, height, px, py) => {
        console.log({x: px, y: py, width, height});
        setPopoverPosition({x: px, y: py + height + 10, width, height}); // y + height se popover neeche show hoga
        setPopoverVisible(true);
      });
    }
  };

  const handlecallPress = async () => {
    try {
      const response = await PARTNER_AGENT_ONBOOKING_CALL_SUPPORT({
        action: 'agent_call_support',
        current_language: languageSwitch,
      });

      if (
        response?.status_code == 200 &&
        response?.success_message?.success_message
      ) {
        setPopoverVisible(false);
        Alert.alert('', response?.success_message?.success_message);
      }
    } catch (error) {
      console.error('Error in PARTNER_ONBOOKING_CALL_SUPPORT:', error);
    } finally {
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <Header backButton={true} /> */}

      <View
        style={{
          backgroundColor: AppColors.white,
          flexDirection: 'row',
          // elevation: 5,
          // borderBottomWidth:0.3,
          // borderBottomColor:"black",
          justifyContent: 'space-between',

        }}>
        <View
          style={{
            backgroundColor: AppColors.white,
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          <Pressable
            onPress={handleLogoPress}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 5,
              marginTop: 10,
            }}>
            <Image
              source={Headerlogo}
              style={{resizeMode: 'contain', height: 70, width: 140}}
            />
          </Pressable>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {showNeedHelp && (
            <TouchableOpacity
              ref={viewRef}
              onPress={showPopover}
              style={{
                margin: 5,
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: AppColors.mainColor,
              }}>
              <Text
                style={{
                  padding: 7,
                  fontSize: 12,
                  fontWeight: '500',
                  color: AppColors.white,
                }}>
                {languageSwitch === 'english' ? 'Need Help?' : 'मदद चाहिए?'}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              margin: 5,
              marginRight: 17,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 5,
              borderColor: 'rgb(204,204,204)',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: AppColors.black, margin: 5, opacity: 0.8}}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {leadsLoader ? (
        <ActivityIndicator
          size={'large'}
          color={AppColors.mainColor}
          style={{flex: 1, alignContent: 'center'}}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                getAllAgentInfo();
                getNetworkAndLeads();
              }}
            />
          }>
          <View style={styles.mainContainer}>
            {/* Middle Container */}
            <View style={styles.middleContainer}>
              <View style={styles.middleContent}>
                {/* Top div */}
                <View style={styles.topView}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('AgentWallet');
                    }}
                    style={styles.topLeft}>
                    <Text style={styles.topLeftText}>
                      <Icon
                        name="rupee"
                        color={AppColors.white}
                        size={15}
                        style={{}}
                      />
                      {allAgentInfo?.my_earning}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.topRight}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SelectYourState')}
                      style={styles.btnView}>
                      <Icon
                        name="plus"
                        color={AppColors.white}
                        size={10}
                        style={styles.iconStyle}
                      />
                      <Image source={ArrowFadeBlue} style={styles.arrowImage} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Bottom div */}
                <View style={styles.bottamView}>
                  <View style={styles.driverNameView}>
                    <Text style={styles.driverNameText}>
                      {allAgentInfo?.driver_name}
                    </Text>
                  </View>
                  <View style={styles.bottamRightView}>
                    <TouchableOpacity
                      style={styles.rightBottam}
                      onPress={() => setMyNetworkData(true)}>
                      <Text
                        style={{
                          color: myNetworkData
                            ? AppColors.mainColor
                            : AppColors.silverGrey,
                        }}>
                        {allAgentInfo?.my_network}
                      </Text>
                      <Text
                        style={{
                          color: myNetworkData
                            ? AppColors.mainColor
                            : AppColors.silverGrey,
                        }}>
                        My Network
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rightBottam}
                      onPress={() => setMyNetworkData(false)}>
                      <Text
                        style={{
                          color: myNetworkData
                            ? AppColors.silverGrey
                            : AppColors.mainColor,
                        }}>
                        {allAgentInfo?.my_leads}
                      </Text>
                      <Text
                        style={{
                          color: myNetworkData
                            ? AppColors.silverGrey
                            : AppColors.mainColor,
                        }}>
                        My Leads
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Bottom div */}
              <View style={styles.bottamContent}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AgentKyc', {
                      redirect: 'AgentPanel',
                    });
                  }}
                  style={styles.bottamContent2}>
                  <Text style={styles.mainText}>My Bank</Text>
                  <Text style={styles.textIcon}>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AgentTraining')}
                  style={styles.bottamContent1}>
                  <Text style={styles.absoulteText}>
                    {allAgentInfo?.training_video_unseen}
                  </Text>
                  <View style={styles.absoulteView}>
                    <Text style={[styles.bottamContent1Text]}>Training</Text>
                    <Text style={[styles.bottamContent1Text]}>Videos</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // return false;
                    navigation.navigate('AgentWallet');
                  }}
                  style={styles.bottamContent3}>
                  <Text style={styles.mainText}>Wallet Balance</Text>
                  <Text style={styles.textIcon}>
                    <Icon name="rupee" size={responsiveSize(9)} />{' '}
                    {allAgentInfo?.my_balance_earning}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // return false;
                    navigation.navigate('AgentWallet');
                  }}
                  style={styles.bottamContent4}>
                  <Text style={styles.mainText}>My Earning</Text>
                  <Text style={styles.textIcon}>
                    <Icon name="rupee" size={responsiveSize(9)} />{' '}
                    {allAgentInfo?.my_earning}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* showing Data View */}
            {leadsLoader ? (
              <ActivityIndicator size={'large'} color={AppColors.mainColor} />
            ) : (
              <View style={styles.bottamContainer}>
                <ShowDataList
                  data={
                    myNetworkData
                      ? networkAndLeadsData?.my_network
                      : networkAndLeadsData?.my_leads
                  }
                  myNetworkData={myNetworkData}
                  navigation={navigation}
                />
              </View>
            )}
          </View>
        </ScrollView>
      )}
      <Modal
        transparent
        onRequestClose={() => setPopoverVisible(false)}
        visible={popoverVisible}
        animationType="fade">
        <TouchableOpacity
          style={{flex: 1, backgroundColor: 'rgba(121, 129, 116, 0.48)'}}
          activeOpacity={1}
          onPress={() => setPopoverVisible(false)}>
          <View
            style={{
              position: 'absolute',
              top: popoverPosition.y,
              // left: popoverPosition.x - 200, // Adjust left offset as per design
              width: '50%',
              // width: 160,
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              // paddingVertical: 4,
              borderRadius: 8,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}>
            {/* Arrow Pointer */}
            <View
              style={{
                position: 'absolute',
                top: -10,
                left: 150,
                width: 0,
                height: 0,
                borderLeftWidth: 10,
                borderRightWidth: 10,
                borderBottomWidth: 10,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: '#fff',
              }}
            />

            {/* <TouchableOpacity
              onPress={() => {
                setPopoverVisible(false);
                navigation.navigate('TicketsDriver');
              }}
              style={{
                flexDirection: 'row', // Row layout
                alignItems: 'center', // Center align items
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontSize: 16, color: '#333'}}>Create Ticket</Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: AppColors.white,
                  borderRadius: 20,
                  overflow: 'hidden',
                  elevation: 5,
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={HelpImage}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => {
                handlecallPress();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                paddingHorizontal: 12,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontSize: 16, color: '#333'}}>Call Support</Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: AppColors.white,
                  borderRadius: 20,
                  overflow: 'hidden',
                  elevation: 5,
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={CallingGif}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        transparent
        backdropOpacity={0}
        onRequestClose={() => setAgentPanelModal(false)}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        visible={agentPanelModal}>
        <AgentPanelModal
          setAgentPanelModal={setAgentPanelModal}
          data={allAgentInfo}
        />
      </Modal>
    </SafeAreaView>
  );
};

const ListItem = ({customer_number, datetime, total_earning, navigation}) => (
  <View style={styles.containerList}>
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('AgentWallet', {
          from: 'myNetwork',
          customer_number: customer_number,
        });
      }}
      style={{flex: 0.35, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.phoneText}>{customer_number}</Text>
    </TouchableOpacity>
    <View style={{flex: 0.35, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.dateText}>{datetime}</Text>
    </View>
    <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.amountText}>{total_earning} Rs</Text>
    </View>

    <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => openWhatsApp(customer_number)}>
        <Icon color={AppColors.whatsAppIconColor} size={18} name="whatsapp" />
      </TouchableOpacity>
    </View>
  </View>
);

const ListItem2 = ({customer_number, datetime, total_earning}) => (
  <View style={styles.containerList}>
    <View style={{flex: 0.35, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.phoneText}>{customer_number}</Text>
    </View>
    <View style={{flex: 0.35, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.dateText}>{datetime}</Text>
    </View>
    <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.amountText}>{total_earning} Rs</Text>
    </View>

    <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => openWhatsApp(customer_number)}>
        <Icon color={AppColors.whatsAppIconColor} size={18} name="whatsapp" />
      </TouchableOpacity>
    </View>
  </View>
);

const openWhatsApp = phoneNumber => {
  let number = phoneNumber.replace(/\D/g, '');

  if (number.length >= 10) {
    let message = encodeURIComponent('Hello! 👋');
    let url = `https://wa.me/${number}?text=${message}`;
    Linking.openURL(url).catch(() => {
      // Alert.alert('Error', 'Could not open WhatsApp');
    });
  } else {
    // Alert.alert('Invalid Number', 'Please enter a valid phone number');
  }
};

const ShowDataList = ({data, navigation, myNetworkData}) => {
  return (
    <FlatList
      data={data}
      ListEmptyComponent={() => {
        return (
          <>
            <Text
              style={{
                textAlign: 'center',
                color: AppColors.black,
                fontSize: 14,
              }}>
              {myNetworkData ? 'No network data found' : 'No leads data found'}
            </Text>
          </>
        );
      }}
      renderItem={({item}) =>
        myNetworkData ? (
          <ListItem {...item} navigation={navigation} />
        ) : (
          <ListItem2 {...item} />
        )
      }
      keyExtractor={item => item.phone}
      contentContainerStyle={{
        paddingVertical: 5,
      }}
    />
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  mainContainer: {
    flex: 1,
    margin: 20,
    backgroundColor: AppColors.white,
    marginVertical: responsiveSize(20),
  },

  middleContainer: {
    marginTop: 0,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderRadius: responsiveSize(10),
    borderColor: AppColors.mainColor,
    position: 'relative',
  },
  rightBottam: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
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
    fontFamily: AppFont.regularFont,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.white,
  },
  topRight: {
    alignItems: 'center',
  },
  btnView: {
    backgroundColor: AppColors.mainColor,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  iconStyle: {margin: 5, marginRight: 10},
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
    borderColor: AppColors.white,
    alignItems: 'center',
    paddingHorizontal: responsiveSize(8),
    paddingVertical: responsiveSize(4),
    margin: responsiveSize(2),
  },
  bottamRightText: {
    fontSize: responsiveSize(8),
    fontWeight: '500',
    color: AppColors.white,
  },
  ratingView: {
    backgroundColor: 'green',
    borderWidth: 2,
    borderRadius: responsiveSize(7),
    borderColor: AppColors.white,
    alignItems: 'center',
    margin: responsiveSize(2),
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(4),
  },
  bookingView: {
    backgroundColor: 'green',
    borderWidth: 2,
    borderRadius: responsiveSize(7),
    borderColor: AppColors.white,
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
    backgroundColor: AppColors.white,
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    margin: responsiveSize(1),
    flexDirection: 'row',
  },
  absoulteText: {
    color: AppColors.white,
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
    backgroundColor: AppColors.white,
    paddingBottom: 3,
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    margin: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  bottamContent3: {
    backgroundColor: AppColors.white,
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    margin: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 3,
  },
  bottamContent4: {
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
    textAlign: 'center',
  },
  textIcon: {
    color: AppColors.mainColor,
    fontSize: 9,
    textAlign: 'center',
  },
  arrowImage: {
    width: 16,
    height: 16,
    transform: [{rotate: '180deg'}],
  },
  bottamContainer: {
    padding: 10,
    borderWidth: 2,
    marginTop: 30,
    borderColor: AppColors.mainColor,
    borderRadius: 8,
    flex: 1,
  },
  containerList: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  leftView: {flexDirection: 'row'},
  phoneText: {
    fontSize: 15,
    color: '#878787',
    fontWeight: 'bold',
    // marginHorizontal: 1,
  },
  dateText: {
    fontSize: 14,
    color: '#a5a5a5',
    // marginHorizontal: 8,
  },
  rightView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 14,
    color: '#a5a5a5',
    // marginRight: 15,
  },
});

export default AgentPanel;
