import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';
const {width} = Dimensions.get('window');

const PackageDetailsDutyReportUpdate = ({
  setPackageDetailsDutyReportUpdate,
  data,
}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback
        onPress={() => setPackageDetailsDutyReportUpdate(false)}>
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Package Details</Text>
              <TouchableOpacity
                onPress={() => setPackageDetailsDutyReportUpdate(false)}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.body}>
              {data?.Salary && (
                <View style={styles.row}>
                  <Text style={styles.label}>Salary</Text>
                  <Text style={styles.value}>Rs. {data?.Salary}</Text>
                </View>
              )}

              {data?.Working_Days && (
                <View style={styles.row}>
                  <Text style={styles.label}>Working Days:</Text>
                  <Text style={styles.value}>{data?.Working_Days}</Text>
                </View>
              )}

              {data?.Working_Hours && (
                <View style={styles.row}>
                  <Text style={styles.label}>Working Hours :</Text>
                  <Text style={styles.value}>{data?.Working_Hours}</Text>
                </View>
              )}

              {data?.Overtime && (
                <View style={styles.row}>
                  <Text style={styles.label}>Overtime :</Text>
                  <Text style={styles.value}>{data?.Overtime}</Text>
                </View>
              )}

              {data?.hours && data?.budget && (
                <View style={styles.container}>
                  <View style={styles.textContainer}>
                    <Text style={[styles.text, {fontSize: width * 0.045}]}>
                      Trial {data?.hours} hours - {data?.budget} Rs का है।
                    </Text>
                  </View>
                </View>
              )}

              {data?.message && (
                <View style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.messageText}>{data?.message}</Text>
                </View>
              )}

              {data?.budget !== undefined && (
                <View style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>
                    Return to TAT D - Rs. {data?.budget}
                  </Text>
                </View>
              )}

              {data?.trip_type && (
                <View style={styles.row}>
                  <Text style={styles.label}>Trip Type:</Text>
                  <Text style={styles.value}>{String(data?.trip_type)}</Text>
                </View>
              )}

              {data?.package && (
                <View style={styles.row}>
                  <Text style={styles.label}>Package:</Text>
                  <Text style={styles.value}>{String(data?.package)}</Text>
                </View>
              )}

              {data?.package_price !== undefined && (
                <View style={styles.row}>
                  <Text style={styles.label}>
                    Package Price: {String(data?.payment_mode || '')}
                  </Text>
                  <Text style={styles.value}>
                    {String(data?.package_price)}
                  </Text>
                </View>
              )}

              {data?.gst_amount !== undefined && (
                <View style={styles.row}>
                  <Text style={styles.label}>GST : 5%</Text>
                  <Text style={styles.value}>Rs {data?.gst_amount}</Text>
                </View>
              )}

              {data?.commision_amount !== undefined && (
                <View style={styles.row}>
                  <Text style={styles.label}>
                    Commission : {String(data?.commission || '')}
                  </Text>
                  <Text style={styles.value}>Rs {data?.commision_amount}</Text>
                </View>
              )}

              <View style={styles.divider} />

              {data?.supply_cost !== undefined && (
                <View style={styles.row}>
                  <Text style={styles.label}>Net Earning:</Text>
                  <Text style={styles.value}>Rs {data?.supply_cost}</Text>
                </View>
              )}

              <View style={styles.divider} />

              {data?.Overtime_Charges && (
                <View style={styles.container}>
                  <View style={styles.bullet} />
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>
                      {String(data?.Overtime_Charges)}
                    </Text>
                  </View>
                </View>
              )}

              {data?.Night_Charges && (
                <View style={styles.container}>
                  <View style={styles.bullet} />
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>
                      {String(data?.Night_Charges)}
                    </Text>
                  </View>
                </View>
              )}

              {data?.return_to_tatd && (
                <View style={styles.container}>
                  <View style={styles.bullet} />
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>
                      {String(data?.return_to_tatd)}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={() => setPackageDetailsDutyReportUpdate(false)}
              style={styles.payButton}>
              <Text style={styles.payButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: AppColors.mainColor,
    margin: 5,
  },
  header: {
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
  body: {
    margin: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: AppColors.black,
    marginBottom: 10,
    fontFamily: AppFont.regularFont,
    fontSize: 13,
  },
  value: {
    color: AppColors.black,
    marginBottom: 10,
    fontFamily: AppFont.regularFont,
    fontSize: 13,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 2,
  },
  bulletDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: AppColors.black,
    marginTop: 6,
  },
  messageText: {
    color: AppColors.mainColor,
    marginLeft: 10,
    fontFamily: AppFont.regularFont,
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
  bulletText: {
    color: AppColors.black,
    marginLeft: 10,
    fontFamily: AppFont.regularFont,
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderStyle: 'dashed',
    borderColor: AppColors.gray,
    marginVertical: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 2,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: AppColors.black,
    marginTop: 7,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    color: AppColors.mainColor,
    fontFamily: AppFont.regularFont,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: AppColors.mainColor,
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  payButtonText: {
    color: AppColors.white,
    fontWeight: 'bold',
  },
});

export default PackageDetailsDutyReportUpdate;
