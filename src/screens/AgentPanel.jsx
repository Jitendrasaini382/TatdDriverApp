import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../components/Header';
import Modal from 'react-native-modal';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import {ArrowFadeBlue} from '../assets/images';
import {Linking} from 'react-native';

import AgentPanelModal from '../components/modal/AgentPanelModal';

const {width, height} = Dimensions.get('window');

const responsiveSize = size => {
  return (width / 411.42857142857144) * size;
};

const MyNetworkDATA = [
  {phone: '9595856995', date: '02 Jun 2024 17:51 PM', amount: '283 Rs'},
  {phone: '9500551047', date: '29 Mar 2024 10:39 AM', amount: '55 Rs'},
  {phone: '961007344', date: '09 Apr 2024 07:35 AM', amount: '119 Rs'},
  {phone: '909794411', date: '02 Jan 2024 09:06 AM', amount: '28 Rs'},
  {phone: '901966369', date: '03 Oct 2023 14:52 PM', amount: '67 Rs'},
  {phone: '968992293', date: '17 Jun 2024 17:34 PM', amount: '143 Rs'},
  {phone: '9717253684', date: '04 Aug 2023 15:51 PM', amount: '255 Rs'},
];

const MyLeadsDATA = [
  {phone: '900000000', date: '02 Jan 2024 09:06 AM', amount: '28 Rs'},
  {phone: '901966369', date: '03 Oct 2023 14:52 PM', amount: '67 Rs'},
  {phone: '968992293', date: '17 Jun 2024 17:34 PM', amount: '143 Rs'},
  {phone: '9717253684', date: '04 Aug 2023 15:51 PM', amount: '1255 Rs'},
];

const AgentPanel = ({navigation}) => {
  const [myNetworkData, setMyNetworkData] = useState(true);
  const [agentPanelModal, setAgentPanelModal] = useState(false);
  useEffect(() => {
    [setAgentPanelModal(true)];
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header backButton={true} />

      <View style={styles.mainContainer}>
        {/* Middle Container */}
        <View style={styles.middleContainer}>
          <View style={styles.middleContent}>
            {/* Top div */}
            <View style={styles.topView}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AgentWallet')}
                style={styles.topLeft}>
                <Text style={styles.topLeftText}>
                  <Icon
                    name="rupee"
                    color={AppColors.white}
                    size={15}
                    style={{}}
                  />
                  0
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
                <Text style={styles.driverNameText}>MOHIT DHANAWAT</Text>
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
                    7
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
                    4
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
              onPress={() => navigation.navigate('AgentWallet')}
              style={styles.bottamContent3}>
              <Text style={styles.mainText}>Wallet Balance</Text>
              <Text style={styles.textIcon}>
                <Icon name="rupee" size={responsiveSize(9)} /> 0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('AgentWallet')}
              style={styles.bottamContent4}>
              <Text style={styles.mainText}>My Earning</Text>
              <Text style={styles.textIcon}>
                <Icon name="rupee" size={responsiveSize(9)} /> 0
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* showing Data View */}
        <View style={styles.bottamContainer}>
          <ShowDataList data={myNetworkData ? MyNetworkDATA : MyLeadsDATA} />
        </View>

        {/* Modals */}

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => setAgentPanelModal(false)}
          animationIn={'fadeInDown'}
          animationOut={'fadeOutUp'}
          isVisible={agentPanelModal}>
          <AgentPanelModal setAgentPanelModal={setAgentPanelModal} />
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const ListItem = ({phone, date, amount}) => (
  <View style={styles.containerList}>
    <View style={styles.leftView}>
      <Text style={styles.phoneText}>{phone}</Text>
      <Text style={styles.dateText}>{date}</Text>
    </View>
    <View style={styles.rightView}>
      <Text style={styles.amountText}>{amount}</Text>
      <TouchableOpacity onPress={openWhatsApp}>
        <Icon color={AppColors.whatsAppIconColor} name="whatsapp" />
      </TouchableOpacity>
    </View>
  </View>
);

const openWhatsApp = () => {
  let url = 'whatsapp://send?phone=+919810360792&text=Hello';
  Linking.openURL(url);
};

const ShowDataList = ({data}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <ListItem {...item} />}
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
  },
  containerList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginHorizontal: 1,
  },
  dateText: {
    fontSize: 14,
    color: '#a5a5a5',
    marginHorizontal: 8,
  },
  rightView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 14,
    color: '#a5a5a5',
    marginRight: 15,
  },
});

export default AgentPanel;
