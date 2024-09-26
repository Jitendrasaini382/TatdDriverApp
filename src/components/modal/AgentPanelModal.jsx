import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';

const AgentPanelModal = ({setAgentPanelModal}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Important Alert</Text>
          </View>
          <TouchableOpacity
            onPress={() => setAgentPanelModal(false)}
            style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{margin: 20, backgroundColor: '#c3d7de', borderRadius: 10}}>
          <View style={{padding: 10}}>
            <Text
              style={{
                color: AppColors.black,
                fontSize: 14,
                fontWeight: '500',
                fontFamily: AppFont.regularFont,
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
                color: AppColors.black,
                fontSize: 14,
                fontWeight: '500',
                fontFamily: AppFont.regularFont,
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
                color: AppColors.black,
                fontSize: 14,
                fontWeight: '500',
                fontFamily: AppFont.regularFont,
                letterSpacing: 0.3,
                marginBottom: 10,
                lineHeight: 20,
                fontWeight: '600',
              }}>
              Referral bonuses are paid every Wednesday provided your dues with
              the company exceed Rs 50.
            </Text>
            <TouchableOpacity
              onPress={() => setAgentPanelModal(false)}
              style={{
                backgroundColor: AppColors.gray,
                alignSelf: 'flex-start',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  paddingVertical: 4,
                  fontWeight: 'bold',
                  paddingHorizontal: 14,
                  color: AppColors.black,
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
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.gray,
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
    color: AppColors.mainColor,
    fontFamily: AppFont.regularFont,
  },
  closeButton: {
    backgroundColor: AppColors.gray,
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
  },
  closeButtonText: {
    color: AppColors.black,
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    fontFamily: 'Inheritance',
  },
});

export default AgentPanelModal;
