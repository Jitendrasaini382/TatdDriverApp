import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import { AppFont } from '../../assets/FontsFamily';

const DetailRow = ({label, value}) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const ClearMyDuePaymentModal = ({setMyDuePaymentModal, tripDetails}) => {
  if (!tripDetails) return null;

  return (
    <ScrollView>
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Package Details</Text>
          <TouchableOpacity
            onPress={() => setMyDuePaymentModal(false)}
            style={styles.closeIcon}>
            <Text style={styles.closeIconText}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <DetailRow label="Trip Type:" value={tripDetails.tripType} />
          <DetailRow label="Package:" value={tripDetails.package} />
          <DetailRow label="Package Price : Cash" value={`Rs ${tripDetails.amount}`} />
          <DetailRow label="GST : 5%" value={`Rs ${tripDetails.gst}`} />
          <DetailRow label="Commission : 20%" value={`Rs ${tripDetails.gst}`} />
          <View style={styles.divider} />
          <DetailRow label="Net Earning:" value={`Rs ${tripDetails.gst}`} />
          <View style={styles.divider} />

          <View style={styles.bulletPointContainer}>
            <BulletPoint text="Overtime Charges- Rs 2 Per Minute" />
            <BulletPoint text="Night Charges - Rs 200 Applied only in case you travel between 10:00 PM to 06:00 AM" />
            <BulletPoint text="Return to TAT D- Rs. 307" />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setMyDuePaymentModal(false)}
          style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const BulletPoint = ({text}) => (
  <View style={styles.bulletPointRow}>
    <View style={styles.bullet} />
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: AppColors.mainColor,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: AppColors.black,
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: AppFont.regularFont,
  },
  closeIcon: {
    backgroundColor: AppColors.mainColor,
    borderRadius: 5,
    padding: 5,
  },
  closeIconText: {
    color: AppColors.white,
    fontSize: 17,
  },
  contentContainer: {
    margin: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
    fontSize: 13,
  },
  detailValue: {
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
    fontSize: 13,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderStyle: 'dashed',
    marginVertical: 10,
  },
  bulletPointContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  bulletPointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: AppColors.black,
  },
  bulletText: {
    color: AppColors.black,
    marginLeft: 10,
    fontFamily: AppFont.regularFont,
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    backgroundColor: AppColors.mainColor,
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  closeButtonText: {
    color: AppColors.white,
    fontWeight: 'bold',
  },
});


export default ClearMyDuePaymentModal;
