import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../assets/Colors';
import { AppFont } from '../../assets/FontsFamily';

const PackageDetailsDutyReportUpdate = ({
  setPackageDetailsDutyReportUpdate,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => setPackageDetailsDutyReportUpdate(false)}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: AppColors.white,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: AppColors.mainColor,
          }}>
          {/* top content */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20,
              alignItems: 'center',
              //   marginBottom: 20,
            }}>
            <Text
              style={{
                color: AppColors.black,
                fontSize: 17,
                fontWeight: 'bold',
                fontFamily: AppFont.regularFont,
              }}>
              Package Details
            </Text>
            <TouchableOpacity
              onPress={() => setPackageDetailsDutyReportUpdate(false)}
              style={{backgroundColor: AppColors.mainColor, borderRadius: 5}}>
              <Text
                style={{
                  color: AppColors.white,
                  paddingHorizontal: 7,
                  fontSize: 17,
                  paddingVertical: 3,
                }}>
                X
              </Text>
            </TouchableOpacity>
          </View>

          {/* bottam Content */}

          <View style={{margin: 30}}>
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
                Trip Type:
              </Text>
              <Text
                style={{
                  color: AppColors.black,
                  marginBottom: 10,
                  fontFamily: AppFont.regularFont,
                  fontSize: 13,
                }}>
                {/* {tripDetails.type} */}
                Round Trip
              </Text>
            </View>
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
                Package:
              </Text>
              <Text
                style={{
                  color: AppColors.black,
                  marginBottom: 10,
                  fontFamily: AppFont.regularFont,
                  fontSize: 13,
                }}>
                10 Hours
              </Text>
            </View>
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
                Package Price : Cash
              </Text>
              <Text
                style={{
                  color: AppColors.black,
                  marginBottom: 10,
                  fontFamily: AppFont.regularFont,
                  fontSize: 13,
                }}>
                100
              </Text>
            </View>
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
                GST : 5%
              </Text>
              <Text
                style={{
                  color: AppColors.black,
                  marginBottom: 10,
                  fontFamily: AppFont.regularFont,
                  fontSize: 13,
                }}>
                Rs 61
              </Text>
            </View>
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
                Commission : 20%
              </Text>
              <Text
                style={{
                  color: AppColors.black,
                  marginBottom: 10,
                  fontFamily: AppFont.regularFont,
                  fontSize: 13,
                }}>
                Rs 246
              </Text>
            </View>
            <View
              style={{borderBottomWidth: 0.5, borderStyle: 'dashed'}}></View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text
                style={{
                  color: AppColors.black,
                  marginBottom: 10,
                  fontFamily: AppFont.regularFont,
                  fontSize: 13,
                }}>
                Net Earning:
              </Text>
              <Text
                style={{
                  color: AppColors.black,
                  marginBottom: 10,
                  fontFamily: AppFont.regularFont,
                  fontSize: 13,
                }}>
                Rs 985
              </Text>
            </View>
            <View
              style={{borderBottomWidth: 0.5, borderStyle: 'dashed'}}></View>
            <View
              style={{
                marginTop: 10,
                marginBottom: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 2,
                }}>
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: AppColors.black,
                  }}
                />
                <Text
                  style={{
                    color: AppColors.black,
                    marginLeft: 10,
                    fontFamily: AppFont.regularFont,
                    fontWeight: 'bold',
                  }}>
                  Overtime Charges- Rs 2 Per Minute
                </Text>
              </View>

              <View style={styles.container}>
                <View style={styles.bullet} />
                <View style={styles.textContainer}>
                  <Text style={styles.text}>
                    Night Charges - Rs 200 Applied only incase you travel in
                    between 10:00 PM to 06:00 AM
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 2,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: AppColors.black,
                  }}
                />
                <Text
                  style={{
                    color: AppColors.black,
                    marginLeft: 10,
                    fontFamily: AppFont.regularFont,
                    fontWeight: 'bold',
                  }}>
                  Return to TAT D- Rs. 307
                </Text>
              </View>
            </View>
            <View style={{borderBottomWidth: 1, borderColor: '#808080'}}></View>
          </View>

          {/* bottam content button  */}

          <TouchableOpacity
            onPress={() => setPackageDetailsDutyReportUpdate(false)}
            style={styles.payButton}>
            <Text style={styles.payButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
