import {
  Dimensions,
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
            margin: 5,
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
            {data?.Salary && (
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
                  Salary
                </Text>
                <Text
                  style={{
                    color: AppColors.black,
                    marginBottom: 10,
                    fontFamily: AppFont.regularFont,
                    fontSize: 13,
                  }}>
                  Rs. {data?.Salary}
                </Text>
              </View>
            )}
            {data?.Working_Days && (
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
                  Working Days:
                </Text>
                <Text
                  style={{
                    color: AppColors.black,
                    marginBottom: 10,
                    fontFamily: AppFont.regularFont,
                    fontSize: 13,
                  }}>
                  {data?.Working_Days}
                </Text>
              </View>
            )}
            {data?.Working_Hours && (
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
                  Working Hours :
                </Text>
                <Text
                  style={{
                    color: AppColors.black,
                    marginBottom: 10,
                    fontFamily: AppFont.regularFont,
                    fontSize: 13,
                  }}>
                  {data?.Working_Hours}
                </Text>
              </View>
            )}
            {data?.Overtime && (
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
                  Overtime :
                </Text>
                <Text
                  style={{
                    color: AppColors.black,
                    marginBottom: 10,
                    fontFamily: AppFont.regularFont,
                    fontSize: 13,
                  }}>
                  {data?.Overtime}
                </Text>
              </View>
            )}

            {data?.hours && data?.budget && (
              <View style={styles.container}>
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.text,
                      {color: AppColors.black, fontSize: width * 0.045},
                    ]}>
                    Trial {data?.hours} hours - {data?.budget} Rs का है।
                  </Text>
                </View>
              </View>
            )}

            <View
              style={{
                marginTop: 10,
                marginBottom: 20,
              }}>
              {data?.message && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start', // Ensures alignment
                    // marginVertical: 2, // Consistent spacing
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
                    {data?.message}
                  </Text>
                </View>
              )}

              {data?.budget && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start', // Ensures alignment
                    marginVertical: 2, // Consistent spacing
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
                      color: AppColors.black,
                      marginLeft: 10,
                      fontSize: width * 0.04,

                      fontFamily: AppFont.regularFont,
                      fontWeight: 'bold',
                    }}>
                    Return to TAT D - Rs. {data?.budget}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: AppColors.gray,
                    }}
                  />
                </View>
              )}
            </View>

            {/* </View>
          <View style={{margin: 30}}> */}
            {data?.trip_type && (
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
                  {data?.trip_type}
                </Text>
              </View>
            )}
            {data?.package && (
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
                  {data?.package}
                </Text>
              </View>
            )}
            {data?.package_price && (
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
                  Package Price : {data?.payment_mode}
                </Text>
                <Text
                  style={{
                    color: AppColors.black,
                    marginBottom: 10,
                    fontFamily: AppFont.regularFont,
                    fontSize: 13,
                  }}>
                  {data?.package_price}
                </Text>
              </View>
            )}
            {data?.gst_amount && (
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
                  Rs {data?.gst_amount}
                </Text>
              </View>
            )}
            {data?.commision_amount && (
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
                  Commission : {data?.commission}
                </Text>
                <Text
                  style={{
                    color: AppColors.black,
                    marginBottom: 10,
                    fontFamily: AppFont.regularFont,
                    fontSize: 13,
                  }}>
                  Rs {data?.commision_amount}
                </Text>
              </View>
            )}
            <View
              style={{borderBottomWidth: 0.5, borderStyle: 'dashed'}}></View>

            {data?.supply_cost && (
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
                  Rs {data?.supply_cost}
                </Text>
              </View>
            )}
            <View
              style={{borderBottomWidth: 0.5, borderStyle: 'dashed'}}></View>
            <View
              style={{
                marginTop: 10,
                marginBottom: 20,
              }}>
              {data?.Overtime_Charges && (
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
                    {data?.Overtime_Charges}
                  </Text>
                </View>
              )}

              {data?.Night_Charges && (
                <View style={styles.container}>
                  <View style={styles.bullet} />
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{data?.Night_Charges}</Text>
                  </View>
                </View>
              )}

              {data?.return_to_tatd && (
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
                    {data?.return_to_tatd}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: AppColors.gray,
                    }}
                  />
                </View>
              )}
            </View>
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
