import React from 'react';
import {
  Dimensions,
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

const ClearMyDuePaymentModal = ({setMyDuePaymentModal, tripDetails}) => {
  if (!tripDetails) return null;

  // console.log(tripDetails, 'tripDetails >>>>>>>>>>>>>>>>>>>>>>>>>>');

  const ggg = {
    booking_type: 'Permanent',
    line1: 'Salary - Rs ',
    line2: 'Working Days - ',
    line3: 'Working Hours - ',
    line4: ' Overtime - 90 Rs Per Hour',
    line5: 'Trial 1 hours - 234 Rs का है। ',
    line6: 'ध्यान रहे - हमे कस्टमर की परेशानी कम करनी है उसे बढ़ाना नहीं।',
    status_code: 200,
  };

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
          {tripDetails?.line1 && (
            <View
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
                {tripDetails?.line1}
              </Text>
              {/* <Text
                  style={{
                    color: AppColors.black,
                    marginBottom: 10,
                    fontFamily: AppFont.regularFont,
                    fontSize: 13,
                  }}>
                  Rs. {tripDetails?.Salary}
                </Text> */}
            </View>
          )}
          {tripDetails?.line2 && (
            <View
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
                {tripDetails?.line2}
              </Text>
              {/* <Text
                  style={{
                    color: AppColors.black,
                    marginBottom: 10,
                    fontFamily: AppFont.regularFont,
                    fontSize: 13,
                  }}>
                  {tripDetails?.Working_Days}
                </Text> */}
            </View>
          )}
          {tripDetails?.line3 && (
            <View
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
                {tripDetails?.line3}
              </Text>
              {/* <Text
                  style={{
                    color: AppColors.black,
                    marginBottom: 10,
                    fontFamily: AppFont.regularFont,
                    fontSize: 13,
                  }}>
                  {tripDetails?.Working_Hours}
                </Text> */}
            </View>
          )}
          {tripDetails?.line4 && (
            <View
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
                {tripDetails?.line4}
              </Text>
              {/* <Text
                  style={{
                    color: AppColors.black,
                    marginBottom: 10,
                    fontFamily: AppFont.regularFont,
                    fontSize: 13,
                  }}>
                  {tripDetails?.Overtime}
                </Text> */}
            </View>
          )}

          {tripDetails?.line5 && (
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

          {/* <View
            style={{
              marginTop: 10,
              marginBottom: 20,
            }}> */}
          {tripDetails?.line6 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start', // Ensures alignment
                // marginVertical: 2, // Consistent spacing
                marginTop: 2,
              }}>
              <View
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: AppColors.black,
                  marginTop: 6, // Align dot with text
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
          {/* </View> */}

          {tripDetails?.booking_type && (
            <DetailRow label="Trip Type:" value={tripDetails?.booking_type} />
          )}
          {tripDetails?.package && (
            <DetailRow label="Package:" value={tripDetails?.package} />
          )}
          {tripDetails?.package_price && (
            <DetailRow
              label="Package Price : Cash"
              value={`Rs ${tripDetails.package_price}`}
            />
          )}
          {tripDetails?.gst_price && (
            <DetailRow
              label="GST : 5%"
              value={`Rs ${tripDetails?.gst_price}`}
            />
          )}
          {tripDetails?.commision_amount && (
            <DetailRow
              label="Commission : 20%"
              value={`Rs ${tripDetails?.commision_amount}`}
            />
          )}

          {tripDetails?.net_earning && (
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
            {tripDetails?.overtime_charges_line && (
              <BulletPoint text={tripDetails?.overtime_charges_line} />
            )}
            {tripDetails?.night_charges_line && (
              <BulletPoint text={tripDetails?.night_charges_line} />
            )}
            {tripDetails?.return_to_tatd && (
              <BulletPoint text={tripDetails?.return_to_tatd} />
            )}
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
