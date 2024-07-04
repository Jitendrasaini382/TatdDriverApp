import {SafeAreaView,
  Image,
  StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import AgentLeadsModal from '../components/modal/AgentLeadsModal';
import { Copy_Icon, WhatsApp_Icon } from '../assets/images';
import { AppFont } from '../assets/FontsFamily';
import Header from '../components/Header';

const AgentLeads = () => {
  const [agentLeadsModal, setAgentLeadsModal] = useState(false);

  useEffect(() => {
    setAgentLeadsModal(true);
  }, []);

  return (
    <SafeAreaView style={{flex:1, backgroundColor: "white"}} >
        <Header  backButton={true} />
      <View style={styles.container}>
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
      <View
        style={{
          marginVertical: 50,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'black',
            marginRight: 10,
          }}>
          <Text style={{color: 'black', fontFamily: AppFont.regularFont}}>
            OR
          </Text>
        </View>
        <View>
          {/* <Icon name="copy" size={35} color={'blue'} /> */}
          <Image style={{width: 35, height: 35}} source={Copy_Icon} />

          <Text
            style={{
              paddingTop: 5,
              color: 'black',
              fontFamily: AppFont.regularFont,
            }}>
            Copy
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRadius: 10,
          padding: 20,
          width: '90%',
          alignSelf: 'center',
          borderWidth: 1,
          paddingVertical: 40,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{width: 30, height: 30}} source={WhatsApp_Icon} />
          <Text style={{color: 'black', paddingTop: 10}}>Whatsapp</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{width: 30, height: 30}} source={WhatsApp_Icon} />
          <Text style={{color: 'black', paddingTop: 10}}>Whatsapp</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{width: 30, height: 30}} source={WhatsApp_Icon} />
          <Text style={{color: 'black', paddingTop: 10}}>Whatsapp</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{width: 30, height: 30}} source={WhatsApp_Icon} />
          <Text style={{color: 'black', paddingTop: 10}}>Whatsapp</Text>
        </View>
      </View>

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
  container: {
    borderRadius: 10,
    padding: 20,
    width: '90%',
    marginTop:30,
    alignSelf: 'center',
    borderWidth: 1,
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
