import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Linking,
  Alert,
  ScrollView,
  Clipboard,
  Platform,
} from 'react-native';
import Share from 'react-native-share';

import Modal from 'react-native-modal';

import AgentLeadsModal from '../components/modal/AgentLeadsModal';
import {
  Copy_Icon,
  WhatsApp_Icon,
  Facebook_Icon,
  Twitter_Icon,
  Linkedin_Icon,
} from '../assets/images';
import {AppFont} from '../assets/FontsFamily';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {useRoute} from '@react-navigation/native';
import {
  AGENT_ADD_CUSTOMER,
  AGENT_REFERAL_ICON_CLICK,
  AGENT_REFERAL_URL,
} from '../apis/Apis';
import {useSelector} from 'react-redux';
import {Keyboard} from 'react-native';

const AgentLeads = ({navigation}) => {
  const route = useRoute();
  const [mobile, setMobile] = useState('');
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const [agentLeadsModal, setAgentLeadsModal] = useState(false);

  useEffect(() => {
    setAgentLeadsModal(true);
    agentReferal();
  }, []);

  const [referralData, setreferralData] = useState({});

  const agentReferal = async () => {
    try {
      const res = await AGENT_REFERAL_URL({
        user_type : Platform.OS
      });

      setreferralData(res);
    } catch (err) {
      console.log(err);
    }
  };

  const clickRefreralIcon = async (icon, url) => {
    try {
      const res = await AGENT_REFERAL_ICON_CLICK({
        sent_mode: icon,
        referral_url: url,
      });
    } catch (err) {
      console.log(err);
    }
  };
  //

  const copyToClipboard = () => {
    Clipboard.setString(referralData?.referralurl);
    clickRefreralIcon('Copy', referralData?.referralurl);
    Alert.alert('Copied Successfully', `${referralData?.referralurl}`);
  };

  const openWhatsApp = async () => {
    const shareOptions = {
      title: 'Share via WhatsApp',
      message: referralData?.shareMessage,
      url: referralData?.referralurl,
      social: Share.Social.WHATSAPP,
    };

    try {
      const res = await Share.shareSingle(shareOptions);
      clickRefreralIcon('WhatsApp', shareOptions?.url);
      console.log('WhatsApp Share Success:', res);
    } catch (err) {
      console.log('WhatsApp Share Error:', err);
    }
  };

  const openFacebookMessenger = async () => {
    const shareOptions = {
      title: 'Share via Facebook',
      message: referralData?.shareMessage,
      url: referralData?.referralurl,
      social: Share.Social.FACEBOOK,
    };

    try {
      const res = await Share.shareSingle(shareOptions);
      clickRefreralIcon('Facebook', shareOptions?.url);
      console.log('Facebook Share Success:', res);
    } catch (err) {
      console.log('Facebook Share Error:', err);
    }
  };

  const openTwitter = async () => {
    const shareOptions = {
      title: 'Share via Twitter',
      message: referralData?.shareMessage,
      url: referralData?.referralurl,
      social: Share.Social.TWITTER,
    };

    try {
      const res = await Share.shareSingle(shareOptions);
      clickRefreralIcon('Twitter', shareOptions?.url);
      console.log('Twitter Share Success:', res);
    } catch (err) {
      console.log('Twitter Share Error:', err);
    }
  };

  const openLinkedIn = async () => {
    const shareOptions = {
      title: 'Share via Twitter',
      message: referralData?.shareMessage,
      url: referralData?.referralurl,
      social: Share.Social.LINKEDIN,
    };

    try {
      const res = await Share.shareSingle(shareOptions);
      clickRefreralIcon('LinkedIn', shareOptions?.url);
      console.log('Twitter Share Success:', res);
    } catch (err) {
      console.log('Twitter Share Error:', err);
    }
  };

  const [err, seterr] = useState('');
  const addCustomer = async () => {
    try {
      if (mobile.trim().length == 0) {
        seterr('Please enter a mobile number.');
        return;
      }

      if (mobile.length !== 10) {
        seterr('Please enter a valid 10-digit mobile number.');
        return;
      }

      seterr('');
      Keyboard.dismiss();
      const res = await AGENT_ADD_CUSTOMER({
        customer_mobile: mobile,
        city: route?.params?.city || '',
        lead_type: 'Driver',
        current_language: languageSwitch,
        zone: route?.params?.zone || '',
      });
      if (res?.status_code == 200) {
        Alert.alert('', res?.message);
      }
      setMobile('');
    } catch (err) {
      setMobile('');
      // seterr('Failed to add customer. Please try again..');
      navigation.navigate('AgentPanel');
    } finally {
      // setLoading(false); // Stop loading
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton={true} />

      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.contentContainer}>
        <View style={styles.topView}>
          <Text style={styles.title}>ADD YOUR DRIVER</Text>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={e => {
                setMobile(e);
                // console.log('e')
              }}
              inputMode="numeric"
              maxLength={10}
              value={mobile}
              style={styles.input}
              placeholder="Driver का नंबर ?"
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              onPress={() => {
                addCustomer();
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
          <Text style={{color: 'red', fontSize: 14, marginVertical: 5}}>
            {err}
          </Text>
        </View>
        <View style={styles.middleView}>
          <View style={styles.middleLeftView}>
            <Text style={styles.middleLeftText}>OR</Text>
          </View>
          <View>
            <TouchableOpacity onPress={copyToClipboard}>
              <Image style={styles.imageCopyIcon} source={Copy_Icon} />
            </TouchableOpacity>

            <Text style={styles.middleRightText}>Copy</Text>
          </View>
        </View>
        <View style={styles.bottamView}>
          <View style={styles.iconView}>
            <TouchableOpacity onPress={openWhatsApp}>
              <Image style={styles.ImageIcon} source={WhatsApp_Icon} />
            </TouchableOpacity>
            <Text style={styles.textIcon}>Whatsapp</Text>
          </View>
          <View style={styles.iconView}>
            <TouchableOpacity onPress={openFacebookMessenger}>
              <Image style={styles.ImageIcon} source={Facebook_Icon} />
            </TouchableOpacity>
            <Text style={styles.textIcon}>Facebook</Text>
          </View>
          <View style={styles.iconView}>
            <TouchableOpacity onPress={openLinkedIn}>
              <Image style={styles.ImageIcon} source={Linkedin_Icon} />
            </TouchableOpacity>
            <Text style={styles.textIcon}>Linkedin</Text>
          </View>
          <View style={styles.iconView}>
            <TouchableOpacity onPress={openTwitter}>
              <Image style={styles.ImageIcon} source={Twitter_Icon} />
            </TouchableOpacity>
            <Text style={styles.textIcon}>Twitter</Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        backdropOpacity={0}
        onBackdropPress={() => setAgentLeadsModal(false)}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        isVisible={agentLeadsModal}>
        <AgentLeadsModal
          setAgentLeadsModal={setAgentLeadsModal}
          data={route?.params?.data?.popup_message}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default AgentLeads;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: AppColors.white},

  contentContainer: {margin: 20, marginTop: 40},
  topView: {
    backgroundColor: AppColors.white,
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    marginBottom: 35,
    textAlign: 'center',
    color: AppColors.black,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color: AppColors.black,
  },
  middleView: {
    marginVertical: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleLeftView: {
    height: 30,
    width: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.black,
    marginRight: 10,
  },
  middleLeftText: {color: AppColors.black, fontFamily: AppFont.regularFont},
  imageCopyIcon: {width: 35, height: 35, marginLeft: 10},
  middleRightText: {
    paddingTop: 5,
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
    marginLeft: 10,
  },
  bottamView: {
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconView: {justifyContent: 'center', alignItems: 'center'},
  ImageIcon: {width: 35, height: 35},
  textIcon: {color: AppColors.black, paddingTop: 10},
  button: {
    backgroundColor: '#FF9800',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: AppColors.white,
    fontWeight: 'bold',
  },
});
