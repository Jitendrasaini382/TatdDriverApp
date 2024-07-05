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
  Clipboard,
  Alert,
  ScrollView,
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

const AgentLeads = () => {
  const [agentLeadsModal, setAgentLeadsModal] = useState(false);

  //   useEffect(() => {
  //     setAgentLeadsModal(true);
  //   }, []);

  const textToCopy =
    "Hi! I'm inviting you to use this referral link - https://tatd.in/driver-interface.php?referrer=ODExODgxMzE0OA%3D%3D";

  const copyToClipboard = () => {
    Clipboard.setString(textToCopy);
    Alert.alert(
      "Hi! I'm inviting you to use this referral link - https://tatd.in/driver-interface.php?referrer=ODExODgxMzE0OA%3D%3D",
    );
  };

  const openWhatsApp = () => {
    let url =
      "whatsapp://send?text=Hi! I'm inviting you to use this referral link - https://tatd.in/driver-interface.php?referrer=ODExODgxMzE0OA%3D%3D";
    Linking.openURL(url)
      .then(() => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        console.log('Make sure WhatsApp is installed on your device');
      });
  };

  const openFacebookMessenger = () => {
    const messengerUrl =
      "fb-messenger://share?link=Hi! I'm inviting you to use this referral link - https://tatd.in/driver-interface.php?referrer=ODExODgxMzE0OA%3D%3D";
    const fallbackUrl =
      "https://www.facebook.com/dialog/send?link=I'm inviting you to use this referral link - https://tatd.in/driver-interface.php?referrer=ODExODgxMzE0OA%3D%3D";

    Linking.openURL(messengerUrl)
      .then(() => {
        console.log('Facebook Messenger Opened');
      })
      .catch(() => {
        console.log('Facebook Messenger is not installed. Opening browser...');
        Linking.openURL(fallbackUrl)
          .then(() => {
            console.log('Opened Facebook Messenger in browser');
          })
          .catch(() => {
            console.log('Failed to open Facebook Messenger in browser');
          });
      });
  };

  const openTwitter = () => {
    const twitterUrl =
      "twitter://post?message=Hi! I'm inviting you to use this referral link - https://tatd.in/driver-interface.php?referrer=ODExODgxMzE0OA%3D%3D"; // You can customize the message by changing the text after 'message='
    const fallbackUrl =
      "https://twitter.com/intent/tweet?text=Hi! I'm inviting you to use this referral link - https://tatd.in/driver-interface.php?referrer=ODExODgxMzE0OA%3D%3D"; // URL to open Twitter in a browser

    Linking.openURL(twitterUrl)
      .then(() => {
        console.log('Twitter Opened');
      })
      .catch(() => {
        console.log('Twitter is not installed. Opening browser...');
        Linking.openURL(fallbackUrl)
          .then(() => {
            console.log('Opened Twitter in browser');
          })
          .catch(() => {
            console.log('Failed to open Twitter in browser');
          });
      });
  };

  const openLinkedIn = () => {
    const linkedInUrl =
      "linkedin://shareArticle?mini=true&url=Hi! I'm inviting you to use this referral link - https://tatd.in/driver-interface.php?referrer=ODExODgxMzE0OA%3D%3D"; // You can customize the message by changing the text after 'url='
    const fallbackUrl =
      "https://www.linkedin.com/shareArticle?mini=true&url=Hi! I'm inviting you to use this referral link - https://tatd.in/driver-interface.php?referrer=ODExODgxMzE0OA%3D%3D"; // URL to open LinkedIn in a browser

    Linking.openURL(linkedInUrl)
      .then(() => {
        console.log('LinkedIn Opened');
      })
      .catch(() => {
        console.log('LinkedIn is not installed. Opening browser...');
        Linking.openURL(fallbackUrl)
          .then(() => {
            console.log('Opened LinkedIn in browser');
          })
          .catch(() => {
            console.log('Failed to open LinkedIn in browser');
          });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backButton={true} />

      <ScrollView style={styles.contentContainer}>
        <View style={styles.topView}>
          <Text style={styles.title}>ADD YOUR DRIVER</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Driver का नंबर ?"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.middleView}>
          <View style={styles.middleLeftView}>
            <Text style={{color: 'black', fontFamily: AppFont.regularFont}}>
              OR
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={copyToClipboard}>
              <Image
                style={{width: 35, height: 35, marginLeft: 10}}
                source={Copy_Icon}
              />
            </TouchableOpacity>

            <Text
              style={{
                paddingTop: 5,
                color: 'black',
                fontFamily: AppFont.regularFont,
                marginLeft: 10,
              }}>
              Copy
            </Text>
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
        <AgentLeadsModal setAgentLeadsModal={setAgentLeadsModal} />
      </Modal>
    </SafeAreaView>
  );
};

export default AgentLeads;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},

  contentContainer: {margin: 20, marginTop: 40},
  topView: {
    backgroundColor: 'white',
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
    color: 'black',
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
    borderColor: 'black',
    marginRight: 10,
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
  textIcon: {color: 'black', paddingTop: 10},
  button: {
    backgroundColor: '#FF9800',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
