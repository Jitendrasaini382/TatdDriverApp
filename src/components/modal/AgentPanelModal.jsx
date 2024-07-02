import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const AgentPanelModal = ({setAgentPanelModal}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Important Alert</Text>
          </View>
          <TouchableOpacity 
          onPress={()=>setAgentPanelModal(false)}
          style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{margin: 20, backgroundColor: '#c3d7de', borderRadius: 10}}>
          <View style={{padding: 10}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Roboto-Regular',
                letterSpacing: 0.3,
                marginBottom: 10,
                lineHeight: 20,
                fontWeight: '600',
              }}>
              The agent panel connects your trusted Service Partners with the
              company for better customer service. Reliable Service Partners
              keep your tat d agency running, benefiting you for life.
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Roboto-Regular',
                letterSpacing: 0.3,
                marginBottom: 10,
                lineHeight: 20,
                fontWeight: '600',
              }}>
              Earn Rs 250 per Service Partner you connect, plus a 1% referral
              commission on their bookings for 6 months.
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Roboto-Regular',
                letterSpacing: 0.3,
                marginBottom: 10,
                lineHeight: 20,
                fontWeight: '600',
              }}>
              Referral bonuses are paid every Wednesday provided your dues with
              the company exceed Rs 50.
            </Text>
            <TouchableOpacity
          onPress={()=>setAgentPanelModal(false)}
              style={{
                backgroundColor: '#d9d9d9',
                alignSelf: 'flex-start',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  paddingVertical: 4,
                  fontWeight: 'bold',
                  paddingHorizontal: 14,
                  color: 'black',
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 15,
    marginTop: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#195788',
    fontFamily: 'Roboto-Regular',
  },
  closeButton: {
    backgroundColor: '#d9d9d9',
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    fontFamily: 'Inheritance',
  },
});

export default AgentPanelModal;
