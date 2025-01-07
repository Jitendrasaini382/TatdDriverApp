import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';
import {DRIVER_EARNING} from '../../apis/Apis';

const DriverEarningModal = ({setIsModalVisible, bookingNumber}) => {
  const [tripDetails, setTripDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    viewEarningPopup();
  }, [bookingNumber]);

  const viewEarningPopup = async () => {
    try {
      const response = await DRIVER_EARNING({
        action: 'view_earning_popup',
        booking_number: bookingNumber,
      });
      // console.log(response, 'View Earning PopUp Data');
      setTripDetails(response.earning_details);
      setLoading(false);
    } catch (error) {
      console.log(error, 'View Earning PopUp error');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setIsModalVisible(false);

  return loading ? (
    <ActivityIndicator
      style={{flex: 1, alignContent: 'center'}}
      color={AppColors.mainColor}
    />
  ) : (
    <>
      <TouchableWithoutFeedback style={{flex:1}} onPress={closeModal}>
        <View style={styles.container}>
          <View style={styles.topContent}>
            <Text style={styles.headerText}>Package Details</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          {tripDetails && (
            <View style={styles.bottomContent}>
              <DetailRow label="Trip Type:" value={tripDetails.trip_type} />
              <DetailRow label="Booking Number:" value={bookingNumber} />
              <DetailRow label="Package:" value={tripDetails.package} />
              <DetailRow
                label={`Package Price : ${tripDetails.payment_mode}`}
                value={`Rs ${tripDetails.package_price}`}
              />
              <DetailRow label="GST : 5%" value={`Rs ${tripDetails.gst}`} />
              <DetailRow
                label="Commission : 20%"
                value={`Rs ${tripDetails.commission}`}
              />

              <View style={styles.dashedLine} />

              <DetailRow
                label="Net Earning:"
                value={`Rs ${tripDetails.net_earning}`}
              />

              <View style={styles.dashedLine} />

              <View style={styles.additionalInfoContainer}>
                {tripDetails.additional_charges &&
                  tripDetails.additional_charges.length > 0 &&
                  tripDetails.additional_charges.map((charge, index) => (
                    <InfoPoint
                      key={index}
                      text={charge}
                      style={index === 1 ? styles.highlightedText : null}
                    />
                  ))}
                <InfoPoint
                  text={`Return to TAT D- Rs. ${tripDetails.return_to_tatd}`}
                />
              </View>

              <View style={styles.solidLine} />
            </View>
          )}

          <TouchableOpacity
            onPress={closeModal}
            style={styles.closeModalButton}>
            <Text style={styles.closeModalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const DetailRow = ({label, value}) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const InfoPoint = ({text, style}) => (
  <Text style={[styles.infoText, style]}>{text}</Text>
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: AppColors.white,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: AppColors.mainColor,
    margin: 5,
  },
  topContent: {
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
  closeButton: {
    backgroundColor: AppColors.mainColor,
    borderRadius: 5,
  },
  closeButtonText: {
    color: AppColors.white,
    paddingHorizontal: 7,
    fontSize: 17,
    paddingVertical: 3,
  },
  bottomContent: {
    margin: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    color: AppColors.black,
    marginBottom: 10,
    fontFamily: AppFont.regularFont,
    fontSize: 13,
  },
  detailValue: {
    color: AppColors.black,
    marginBottom: 10,
    fontFamily: AppFont.regularFont,
    fontSize: 13,
  },
  dashedLine: {
    borderBottomWidth: 0.5,
    borderStyle: 'dashed',
    marginVertical: 10,
  },
  solidLine: {
    borderBottomWidth: 1,
    borderColor: '#808080',
  },
  additionalInfoContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  infoText: {
    color: AppColors.black,
    fontFamily: AppFont.regularFont,
    fontWeight: '500',
    marginBottom: 5,
  },
  highlightedText: {
    color: AppColors.mainColor,
    fontWeight: 'bold',
  },
  closeModalButton: {
    backgroundColor: AppColors.mainColor,
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  closeModalButtonText: {
    color: AppColors.white,
    fontWeight: 'bold',
  },
});

export default DriverEarningModal;
