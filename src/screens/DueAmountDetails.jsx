import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import {Triangle_Icon} from '../assets/images';
import {DRIVER_BOOKING_INVOICE, WAITING_MINUTE_INSERT} from '../apis/Apis';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddIcon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';

const DueAmountDetails = ({route, navigation}) => {
  const {bookingNumber} = route?.params;
  const [loader, setLoader] = useState(false);
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const [allInvoiceData, setAllInvoiceData] = useState();

  useEffect(() => {
    setLoader(true);
    getInvoiceData(bookingNumber);
  }, []);

  const getInvoiceData = async number => {
    try {
      const response = await DRIVER_BOOKING_INVOICE({
        action: 'view_invoice',
        booking_number: number,
      });

      setAllInvoiceData(response);
    } catch (response) {
    } finally {
      setLoader(false);
    }
  };
  const [isShowExtraMinutesModal, setisShowExtraMinutesModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const addWaitingMinutes = async () => {
    try {
      const res = await WAITING_MINUTE_INSERT({
        action: 'overtime_minutes',
        booking_id: bookingNumber,
        overtime_minutes: inputValue,
        current_language: languageSwitch,
      });

      if (res?.status_code == '200') {
        Alert.alert(res?.message);
      }

      getInvoiceData(bookingNumber);
      setisShowExtraMinutesModal(false);
      setInputValue('');
    } catch (error) {}
  };

  if (loader) {
    return (
      <ActivityIndicator
        size={'small'}
        style={{flex: 1, alignContent: 'center'}}
        color={AppColors.mainColor}
      />
    );
  }

  return (
    <SafeAreaView>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isShowExtraMinutesModal}
        onRequestClose={() => setisShowExtraMinutesModal(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              borderRadius: 10,
              padding: 20,
              elevation: 5,
            }}>
            {/* <ScrollView> */}
            <TouchableOpacity
              style={{
                backgroundColor: '#16588e',
                borderRadius: 20,
                marginBottom: 20,
                alignSelf: 'flex-end',
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setisShowExtraMinutesModal(false)}>
              <Icon name="close" size={20} color="white" />
            </TouchableOpacity>

            <View
              style={{
                backgroundColor: AppColors.mainColor,
                height: 100,
                justifyContent: 'space-between',
                borderRadius: 7,
                borderColor: AppColors.mainColor,
              }}>
              <View
                style={{
                  marginVertical: 7,
                  height: 20,
                  width: '78%',
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    position: 'absolute',
                    color: AppColors.mainColor,
                    marginLeft: 10,
                    fontFamily: 'Roboto',
                  }}>
                  Verified & Experienced Driver
                </Text>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    left: 15,
                  }}>
                  <Image
                    source={Triangle_Icon}
                    resizeMode={'cover'}
                    style={{
                      width: 20,
                      height: 20,
                      borderLeftWidth: 1,
                      borderLeftColor: 'white',
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: '800',
                  }}>
                  Waiting Minutes
                </Text>
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <TextInput
                style={{
                  height: 45,
                  borderColor: AppColors.black,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  color: AppColors.black,
                  fontSize: 14,
                  fontFamily: AppFont.regularFont,
                }}
                keyboardType="numeric"
                onChangeText={e => setInputValue(e)}
                placeholder="Enter your extra minutes.."
                placeholderTextColor={AppColors.black}
              />
            </View>

            <View style={{marginVertical: 30}}>
              <TouchableOpacity
                disabled={!inputValue && inputValue?.length == 0}
                style={{
                  backgroundColor: '#16588e',
                  marginTop: 20,
                  padding: 12,
                  borderRadius: 6,
                  width: '60%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: '20%',
                  marginBottom: 120,
                }}
                onPress={() => {
                  addWaitingMinutes();
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
            {/* </ScrollView> */}
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container}>
        <Header backButton={true} />
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            {allInvoiceData?.invoice_data?.waiting_minutes_eligibility == 1 && (
              <TouchableOpacity
                onPress={() => setisShowExtraMinutesModal(true)}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  backgroundColor: AppColors.mainColor,
                  borderRadius: 6,
                }}>
                <Text
                  style={{
                    color: AppColors.white,
                    fontSize: 14,
                    fontWeight: 'bold',
                    fontFamily: AppFont.regularFont,
                  }}>
                  <AddIcon size={14} name="pluscircleo" /> Waiting Minutes
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Text
            style={{
              color: AppColors.black,
              fontSize: 12,
              fontFamily: AppFont.regularFont,
            }}>
            {/* Customer Name:{' '} */}
            <Text
              style={{
                fontSize: 16,
                color: AppColors.mainColor,
                fontWeight: 'bold',
              }}>
              {allInvoiceData?.invoice_data?.customer_name}
            </Text>
          </Text>
        </View>
        <View
          style={{
            borderColor: AppColors.mainColor,
            borderWidth: 2,
            margin: 10,
            borderRadius: 10,
          }}>
          <View
            style={{
              backgroundColor: AppColors.mainColor,
              justifyContent: 'space-between',
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderColor: AppColors.mainColor,
              padding: 10,
              //margin:10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 3,
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 20,
                  width: '48%',
                  backgroundColor: '#ffffff',
                }}>
                <Text
                  style={{
                    position: 'absolute',
                    color: AppColors.mainColor,
                    marginLeft: 5,
                    fontSize: 12,
                    paddingVertical: 3,
                    justifyContent: 'center',
                  }}>
                  {allInvoiceData?.invoice_data?.category}
                </Text>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    left: 15,
                  }}>
                  <Image
                    source={Triangle_Icon}
                    resizeMode={'cover'}
                    style={{
                      width: 20,
                      height: 20,
                      borderLeftWidth: 1,
                      borderLeftColor: '#ffffff',
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#ffffff', fontSize: 12}}>
                  Booking ID :{' '}
                </Text>
                <View style={{marginHorizontal: 10}}>
                  <Text style={{color: '#ffffff', fontSize: 16}}>
                    {allInvoiceData?.invoice_data?.booking_number}
                  </Text>
                  {/* <Text style={{color: '#ffffff', fontSize: 12}}>
                    Booking ID
                  </Text> */}
                </View>
              </View>
            </View>

            {/* <View style={{flexDirection: 'row', margin: 10}}>
              <Text style={{color: '#ffffff', fontSize: 12}}>From:</Text>
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 12,
                  marginLeft: 10,
                  flex: 1,
                }}>
                {allInvoiceData?.invoice_data?.pickup_address}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <Text
                style={{color: '#ffffff', fontSize: 12, marginHorizontal: 10}}>
                To:
              </Text>
              <Text style={{color: '#ffffff', fontSize: 12, marginLeft: 10}}>
                {allInvoiceData?.invoice_data?.drop_address}
              </Text>
            </View> */}
          </View>

          {/* Timings Section */}
          <View style={styles.timingsSection}>
            <View style={styles.dateRow}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.dateText}>
                  {allInvoiceData?.invoice_data?.start_date}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.dateText}>
                  {allInvoiceData?.invoice_data?.end_date}
                </Text>
              </View>
            </View>

            <View style={styles.timingsRow}>
              <View style={[styles.timingColumn, {gap: 10}]}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.timingLabel}>Reporting</Text>
                  <Text style={styles.timingValue}>
                    {allInvoiceData?.invoice_data?.schedule_time}
                  </Text>
                </View>
                {allInvoiceData?.invoice_data?.start_kms > 0 && (
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.timingLabel}>Start KMS</Text>
                    <Text style={styles.timingValue}>
                      {allInvoiceData?.invoice_data?.start_kms}
                    </Text>
                  </View>
                )}
              </View>
              <View style={[styles.timingColumn, {gap: 10}]}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.timingLabel}>Reach</Text>
                  <Text style={styles.timingValue}>
                    {allInvoiceData?.invoice_data?.reach_time}
                  </Text>
                </View>
                {allInvoiceData?.invoice_data?.start_kms > 0 && (
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.timingLabel}>End KMS</Text>
                    <Text style={styles.timingValue}>
                      {allInvoiceData?.invoice_data?.end_kms}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.timingColumn}>
                <Text style={styles.timingLabel}>Start</Text>
                <Text style={styles.timingValue}>
                  {allInvoiceData?.invoice_data?.start_time}
                </Text>
              </View>
              <View style={styles.timingColumn}>
                <Text style={styles.timingLabel}>End</Text>
                <Text style={styles.timingValue}>
                  {allInvoiceData?.invoice_data?.end_time}
                </Text>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', margin: 5, marginTop: 30}}>
            {/* Description Column */}
            <View style={{flex: 0.2, alignItems: 'center'}}>
              <Text></Text>
            </View>

            {/* Unit Header */}
            <View style={{flex: 0.16, alignItems: 'center'}}>
              <Text
                style={{
                  color: AppColors.black,
                  fontFamily: AppFont.regularFont,
                  fontSize: 14,
                }}>
                Unit
              </Text>
            </View>

            {/* Charges Header */}
            <View style={{flex: 0.16, alignItems: 'center'}}>
              <Text
                style={{
                  color: AppColors.black,
                  fontFamily: AppFont.regularFont,
                  fontSize: 14,
                }}>
                Charges
              </Text>
            </View>

            {/* Tax Headers */}
            <View
              style={{flex: 0.32, alignItems: 'center', flexDirection: 'row'}}>
              {allInvoiceData?.invoice_data?.tax_headers?.length == 1 ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text style={styles.chargeHeaderText}>IGST</Text>
                  <Text style={styles.chargeHeaderText}>5%</Text>
                </View>
              ) : (
                <>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                    }}>
                    <Text style={styles.chargeHeaderText}>SGST</Text>
                    <Text style={styles.chargeHeaderText}>2.5%</Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                    }}>
                    <Text style={styles.chargeHeaderText}>CGST</Text>
                    <Text style={styles.chargeHeaderText}>2.5%</Text>
                  </View>
                </>
              )}
            </View>

            {/* Total Header */}
            <View style={{flex: 0.16, alignItems: 'center'}}>
              <Text
                style={{
                  color: AppColors.black,
                  fontFamily: AppFont.regularFont,
                  fontSize: 12,
                }}>
                Total
              </Text>
            </View>
          </View>

          {/* Charges Section */}
          <View style={styles.chargesSection}>
            <View
              style={[
                styles.divider,
                {backgroundColor: 'grey', height: 0.5, marginVertical: 10},
              ]}
            />
            {allInvoiceData?.charges?.map((row, index) => (
              <>
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                    marginHorizontal: 5,
                  }}>
                  {/* Description */}
                  <View style={{flex: 0.2}}>
                    <Text
                      // lineBreakMode="tail"
                      style={{
                        color: AppColors.black,
                        fontFamily: AppFont.regularFont,
                        fontSize: 12,
                      }}>
                      {row?.description}
                    </Text>
                  </View>

                  {/* Unit */}
                  <View style={{flex: 0.16, alignItems: 'center'}}>
                    <Text
                      style={{
                        color: AppColors.black,
                        fontFamily: AppFont.regularFont,
                        fontSize: 12,
                      }}>
                      {row?.unit}
                    </Text>
                  </View>

                  {/* Charges */}
                  <View style={{flex: 0.16, alignItems: 'center'}}>
                    <Text
                      style={{
                        color: AppColors.black,
                        fontFamily: AppFont.regularFont,
                        fontSize: 12,
                      }}>
                      {row?.charges}
                    </Text>
                  </View>

                  {/* Taxes */}
                  <View
                    style={{
                      flex: 0.33,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    {allInvoiceData?.invoice_data?.tax_headers?.length == 1 ? (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 1,
                        }}>
                        <Text style={styles.chargeText}>{row?.igst}</Text>
                      </View>
                    ) : (
                      <>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                          }}>
                          <Text style={styles.chargeText}>
                            {(row?.igst / 2).toFixed(2)}
                          </Text>
                        </View>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                          }}>
                          <Text style={styles.chargeText}>
                            {(row?.igst / 2).toFixed(2)}
                          </Text>
                        </View>
                      </>
                    )}
                  </View>

                  {/* Total */}
                  <View style={{flex: 0.16, alignItems: 'center'}}>
                    <Text
                      style={{
                        color: AppColors.black,
                        fontFamily: AppFont.regularFont,
                        fontSize: 12,
                      }}>
                      ₹ {row?.total_amount}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.divider,
                    {backgroundColor: 'gray', height: 0.5, marginVertical: 10},
                  ]}
                />
              </>
            ))}

            {/*  */}

            {allInvoiceData?.invoice_data?.discount?.coupon_discount && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                    marginHorizontal: 5,
                  }}>
                  {/* Total Charges Label */}
                  <Text
                    style={[styles.chargeText, {flex: 0.2, fontWeight: '600'}]}>
                    {allInvoiceData?.invoice_data?.discount?.description}
                  </Text>

                  {/* Empty Unit Column */}
                  <View style={{flex: 0.16, alignItems: 'center'}}>
                    <Text style={[styles.chargeText]}>
                      {allInvoiceData?.invoice_data?.discount?.unit}
                    </Text>
                  </View>

                  {/* Charges Column */}
                  <Text
                    style={[
                      styles.chargeText,
                      {flex: 0.16, textAlign: 'center'},
                    ]}>
                    {''}
                  </Text>

                  {/* Taxes Column */}
                  <View style={{flex: 0.32, flexDirection: 'row'}}></View>

                  {/* Total Amount Column */}
                  <View style={{flex: 0.16, alignItems: 'center'}}>
                    <Text style={[styles.chargeText, {fontWeight: '600'}]}>
                      ₹{' '}
                      {allInvoiceData?.invoice_data?.discount?.coupon_discount}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.divider,
                    {backgroundColor: 'grey', height: 0.5, marginVertical: 10},
                  ]}
                />
              </>
            )}

            {/*  */}

            <View
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                marginHorizontal: 5,
              }}>
              {/* Total Charges Label */}
              <Text style={[styles.chargeText, {flex: 0.2, fontWeight: '600'}]}>
                Total Charges
              </Text>

              {/* Empty Unit Column */}
              <View style={{flex: 0.16, alignItems: 'center'}}>
                <Text style={[styles.chargeText]}>{''}</Text>
              </View>

              {/* Charges Column */}
              <Text
                style={[styles.chargeText, {flex: 0.16, textAlign: 'center'}]}>
                {allInvoiceData?.invoice_data?.igst_total?.igst_without_price}
              </Text>

              {/* Taxes Column */}
              <View style={{flex: 0.32, flexDirection: 'row'}}>
                {allInvoiceData?.invoice_data?.tax_headers?.length == 1 ? (
                  <Text
                    style={[styles.chargeText, {flex: 1, textAlign: 'center'}]}>
                    {allInvoiceData?.invoice_data?.igst_total?.igst}
                  </Text>
                ) : (
                  <>
                    <Text
                      style={[
                        styles.chargeText,
                        {flex: 1, textAlign: 'center'},
                      ]}>
                      {(
                        allInvoiceData?.invoice_data?.igst_total?.igst / 2
                      ).toFixed(2)}
                    </Text>
                    <Text
                      style={[
                        styles.chargeText,
                        {flex: 1, textAlign: 'center'},
                      ]}>
                      {(
                        allInvoiceData?.invoice_data?.igst_total?.igst / 2
                      ).toFixed(2)}
                    </Text>
                  </>
                )}
              </View>

              {/* Total Amount Column */}
              <View style={{flex: 0.16, alignItems: 'center'}}>
                <Text
                  style={[
                    styles.chargeText,
                    {fontWeight: '600', fontSize: 15},
                  ]}>
                  ₹ {allInvoiceData?.invoice_data?.total_charges}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.divider,
              {backgroundColor: 'grey', height: 0.5, marginVertical: 10},
            ]}
          />
          {/* Advance Section */}
          <View style={styles.advanceSection}>
            <Text style={styles.advanceLabel}>Advance</Text>
            <Text style={styles.advanceValue}>
              ₹ {allInvoiceData?.invoice_data?.paid}
            </Text>
          </View>
          <View
            style={[
              styles.divider,
              {backgroundColor: 'grey', height: 0.5, marginVertical: 10},
            ]}
          />
          {/* Balance Section */}
          <View style={styles.balanceSection}>
            <Text style={styles.balanceLabel}>Balance Amount</Text>
            <Text style={styles.balanceValue}>
              {allInvoiceData?.invoice_data?.total_charges}
            </Text>
          </View>
          <View
            style={[
              styles.divider,
              {backgroundColor: 'grey', height: 0.5, marginVertical: 10},
            ]}
          />

          <Text
            style={{
              color: 'black',
              fontSize: 12,
              alignSelf: 'center',
              textAlign: 'center',
              marginVertical: 15,
            }}>
            {allInvoiceData?.invoice_data?.company_details}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RateYourCustomer', {
              bookingNumber: bookingNumber,
            })
          }
          style={{
            backgroundColor: AppColors.mainColor,
            padding: 10,
            alignItems: 'center',
            borderRadius: 5,
            width: '90%',
            marginHorizontal: '5%',
            marginVertical: 30,
            //alignSelf:'center'
          }}>
          <Text style={{color: '#ffffff', fontSize: 15}}>
            Rate Your Customer
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#004d99',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerDate: {
    fontSize: 14,
    color: '#ffffff',
  },
  bookingID: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'right',
  },
  bookingIDLabel: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'right',
  },
  addressSection: {
    marginTop: 10,
  },
  addressText: {
    fontSize: 14,
    color: '#ffffff',
  },
  addressDetail: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 10,
  },
  timingsSection: {
    //padding: 10,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    padding: 10,
  },
  dateText: {
    fontSize: 12,
    color: 'black',
    marginHorizontal: 5,
  },
  timingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  timingColumn: {
    alignItems: 'center',
    // flex: 1,
  },
  timingLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  timingValue: {
    fontSize: 12,
    color: 'black',
  },
  chargesSection: {
    // borderWidth: 1,
    // borderColor: '#dddddd',
    //margin: 10,
    // padding: 10,
  },
  divider: {
    width: '100%',
  },

  chargesHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    marginLeft: '23%',
    padding: 10,
  },
  chargeHeaderText: {
    fontSize: 12,
    fontWeight: '50',
    color: 'black',
  },
  chargeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 5,
    padding: 10,
  },
  chargeText: {
    fontSize: 12,
    color: 'black',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //borderTopWidth: 1,
    borderColor: '#dddddd',
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  advanceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //borderTopWidth: 1,
    borderColor: '#dddddd',
    // marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  advanceLabel: {
    fontSize: 12,
    color: 'black',
  },
  advanceValue: {
    fontSize: 12,
    color: 'black',
    textAlign: 'right',
  },
  balanceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //borderTopWidth: 1,
    borderColor: '#dddddd',
    // marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'blue',
  },
  balanceValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'right',
  },
});

export default DueAmountDetails;
