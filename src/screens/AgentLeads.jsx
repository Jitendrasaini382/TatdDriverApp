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
} from 'react-native';

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
import {AGENT_ADD_CUSTOMER, AGENT_REFERAL_URL} from '../apis/Apis';
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

  const [referralData, setreferralData] = useState(null);
  const agentReferal = async () => {
    try {
      const res = await AGENT_REFERAL_URL();
      console.log(res);
      setreferralData(res);
    } catch (err) {
      console.log(err);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(referralData?.referralurl);
    Alert.alert('Copied Successfully', `${referralData?.referralurl}`);
  };

  const openWhatsApp = () => {
    const message = `${referralData?.shareMessage} ${referralData?.referralurl}`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;

    Linking.openURL(url)
      .then(() => {})
      .catch(() => {
        Alert.alert('WhatsApp is not installed on your device');
      });
  };

  const openFacebookMessenger = () => {
    // if (!shareMessage || !referralUrl) {
    //   alert("Invalid referral data");
    //   return;
    // }

    const encodedMessage = encodeURIComponent(
      `${referralData?.shareMessage} - ${referralData?.referralurl}`,
    );

    // Messenger App Link
    const messengerUrl = `fb-messenger://share?link=${encodeURIComponent(
      referralData?.referralurl,
    )}`;

    // Web Fallback (if Messenger app is not installed)
    const fallbackUrl = `https://www.facebook.com/dialog/send?app_id=YOUR_APP_ID&link=${encodeURIComponent(
      referralData?.referralUrl,
    )}&redirect_uri=${encodeURIComponent(referralData?.referralurl)}`;

    Linking.openURL(messengerUrl)
      .then(() => {})
      .catch(() => {
        Linking.openURL(fallbackUrl)
          .then(() => {})
          .catch(() => {
            Alert.alert('Could not open Messenger');
          });
      });
  };

  const openTwitter = () => {
    const twitterUrl = `twitter://post?message=${referralData?.shareMessage}-${referralData?.referralurl}`; // You can customize the message by changing the text after 'message='
    const fallbackUrl = `https://twitter.com/intent/tweet?text=${referralData?.shareMessage}-${referralData?.referralurl}`; // URL to open Twitter in a browser

    Linking.openURL(twitterUrl)
      .then(() => {})
      .catch(() => {
        Linking.openURL(fallbackUrl)
          .then(() => {})
          .catch(() => {});
      });
  };

  const openLinkedIn = () => {
    const linkedInUrl = `linkedin://shareArticle?mini=true&url=${referralData?.shareMessage}-${referralData?.referralUrl}`;
    const fallbackUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${referralData?.shareMessage}- ${referralData?.referralUrl}`; // URL to open LinkedIn in a browser

    Linking.openURL(linkedInUrl)
      .then(() => {})
      .catch(() => {
        Linking.openURL(fallbackUrl)
          .then(() => {})
          .catch(() => {});
      });
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
      if(res?.status_code == 200){


        Alert.alert('', res?.message);
      }
      setMobile('');
    } catch (err) {
      setMobile('');
      // seterr('Failed to add customer. Please try again..');
      navigation.navigate("AgentPanel")
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
    color:AppColors.black
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
