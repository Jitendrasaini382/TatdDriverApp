import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';
const {width} = Dimensions.get('window');

const DetailRow = ({label, value}) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const BulletPoint = ({text}) =>
  typeof text === 'string' ? (
    <View style={styles.bulletPointRow}>
      <View style={styles.bullet} />
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  ) : null;

const ClearMyDuePaymentModal = ({setMyDuePaymentModal, tripDetails}) => {
  if (!tripDetails) return null;

  // console.log(tripDetails, 'tripDetails >>>>>>>>>>>>>>>>>>>>>>>>>>');

  return (
    <SafeAreaView style={{flex:1}} >  
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
          {[
            tripDetails?.line1,
            tripDetails?.line2,
            tripDetails?.line3,
            tripDetails?.line4,
          ].map(
            (line, index) =>
              typeof line === 'string' && (
                <View
                  key={`line-${index}`}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: AppColors.black,
                      marginBottom: 10,
                      fontFamily: AppFont.regularFont,
                      fontSize: 13,
                    }}>
                    {line}
                  </Text>
                </View>
              ),
          )}

          {typeof tripDetails?.line5 === 'string' && (
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.text,
                    {color: AppColors.black, fontSize: width * 0.045},
                  ]}>
                  {tripDetails?.line5}
                </Text>
              </View>
            </View>
          )}

          {typeof tripDetails?.line6 === 'string' && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 2,
              }}>
              <View
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: AppColors.black,
                  marginTop: 6,
                }}
              />
              <Text
                style={{
                  color: AppColors.mainColor,
                  marginLeft: 10,
                  fontFamily: AppFont.regularFont,
                  fontWeight: 'bold',
                  fontSize: width * 0.045,
                }}>
                {tripDetails?.line6}
              </Text>
            </View>
          )}

          {typeof tripDetails?.booking_type === 'string' && (
            <DetailRow label="Trip Type:" value={tripDetails?.booking_type} />
          )}
          {typeof tripDetails?.package === 'string' && (
            <DetailRow label="Package:" value={tripDetails?.package} />
          )}
          {typeof tripDetails?.package_price === 'string' && (
            <DetailRow
              label="Package Price : Cash"
              value={`Rs ${tripDetails?.package_price}`}
            />
          )}
          {typeof tripDetails?.gst_price === 'string' && (
            <DetailRow label="GST : 5%" value={`Rs ${tripDetails?.gst_price}`} />
          )}
          {typeof tripDetails?.commision_amount === 'number' && (
            <DetailRow
              label={`Commission : ${tripDetails?.commission}%`}
              value={`Rs ${tripDetails?.commision_amount}`}
            />
          )}
          {typeof tripDetails?.net_earning === 'string' && (
            <>
              <View style={styles.divider} />
              <DetailRow
                label="Net Earning:"
                value={`Rs ${tripDetails?.net_earning}`}
              />
              <View style={styles.divider} />
            </>
          )}

          <View style={styles.bulletPointContainer}>
            <BulletPoint text={tripDetails?.overtime_charges_line} />
            <BulletPoint text={tripDetails?.night_charges_line} />
            <BulletPoint text={tripDetails?.return_to_tatd} />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setMyDuePaymentModal(false)}
          style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

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
