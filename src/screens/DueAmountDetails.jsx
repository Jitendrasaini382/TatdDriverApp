import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import {Triangle_Icon} from '../assets/images';
import {DRIVER_BOOKING_INVOICE} from '../apis/Apis';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';

const DueAmountDetails = ({route, navigation}) => {
  const {bookingNumber} = route?.params;
  const [allInvoiceData, setAllInvoiceData] = useState(
    // {
    //   status_code: 200,
    //   msg_type: 'success',
    //   invoice_data: {
    //     category: 'Private Driver',
    //     customer_name: 'Kartik ',
    //     booking_number: '645254',
    //     pickup_address:
    //       'A-77, Shanti kunj Main Vasant Kunj New Delhi, Delhi 110070\r\n',
    //     drop_address: '',
    //     business_name: '',
    //     gstin: '',
    //     start_date: '19 Dec,2024',
    //     end_date: '20 Dec,2024',
    //     start_time: '08:34 PM',
    //     end_time: '12:18 AM',
    //     schedule_time: '06:00 PM',
    //     reach_time: '05:51 PM',
    //     start_kms: 0,
    //     end_kms: 0,
    //     total_charges: 1308,
    //     payment_mode: 'Cash',
    //     discount: [],
    //     igst_total: {
    //       igst_without_price: 1245.7100000000000363797880709171295166015625,
    //       igst: 62.28999999999999914734871708787977695465087890625,
    //     },
    //     paid: 0,
    //     balance_amount: 1308,
    //     company_details:
    //       'EXECUTION FORCE PRIVATE LIMITED \n Office No G-39, Vardhman Grand Market, Sector 3, Dwarka, \n New Delhi- 110078, GST- 07AAFCE8543G1ZJ',
    //     company_details_1: 'EXECUTION FORCE PRIVATE LIMITED',
    //     company_details_2:
    //       'Office No G-39, Vardhman Grand Market, Sector 3, Dwarka,',
    //     company_details_3: 'New Delhi- 110078, GST- 07AAFCE8543G1ZJ',
    //     tax_headers: ['SGST 2.5%', 'CGST 2.5%'],
    //   },
    //   charges: [
    //     {
    //       description: 'Package',
    //       unit: '8 hours',
    //       charges: 769.51999999999998181010596454143524169921875,
    //       igst: 38.47999999999999687361196265555918216705322265625,
    //       total_amount: 808,
    //     },
    //     {
    //       description: 'End Night Charges',
    //       unit: '1 Night',
    //       charges: 190.479999999999989768184605054557323455810546875,
    //       igst: 9.519999999999999573674358543939888477325439453125,
    //       total_amount: 200,
    //     },
    //     {
    //       description: 'Chauffeur Service',
    //       unit: 1,
    //       charges: 285.70999999999997953636921010911464691162109375,
    //       igst: 14.28999999999999914734871708787977695465087890625,
    //       total_amount: '300',
    //     },
    //   ],
    // },
    // {
    //   status_code: 200,
    //   msg_type: 'success',
    //   invoice_data: {
    //     category: 'Private Driver',
    //     customer_name: 'Pooja',
    //     booking_number: '646092',
    //     pickup_address: 'TESTING TESTING TESTING TESTING TESTING',
    //     drop_address: '',
    //     business_name: '',
    //     gstin: '',
    //     start_date: '24 Dec,2024',
    //     end_date: '24 Dec,2024',
    //     start_time: '11:32 AM',
    //     end_time: '11:32 AM',
    //     schedule_time: '08:00 AM',
    //     reach_time: '11:31 AM',
    //     start_kms: 0,
    //     end_kms: 0,
    //     total_charges: 610,
    //     payment_mode: 'Cash',
    //     discount: [],
    //     igst_total: {
    //       igst_without_price: 580.950000000000045474735088646411895751953125,
    //       igst: 29.050000000000000710542735760100185871124267578125,
    //     },
    //     paid: 0,
    //     balance_amount: 610,
    //     company_details:
    //       'EXECUTION FORCE PRIVATE LIMITED \n Office No G-39, Vardhman Grand Market, Sector 3, Dwarka, \n New Delhi- 110078, GST- 07AAFCE8543G1ZJ',
    //     company_details_1: 'EXECUTION FORCE PRIVATE LIMITED',
    //     company_details_2:
    //       'Office No G-39, Vardhman Grand Market, Sector 3, Dwarka,',
    //     company_details_3: 'New Delhi- 110078, GST- 07AAFCE8543G1ZJ',
    //     tax_headers: ['IGST 5%'],
    //   },
    //   charges: [
    //     {
    //       description: 'Package',
    //       unit: '5 hours',
    //       charges: 580.950000000000045474735088646411895751953125,
    //       igst: 29.050000000000000710542735760100185871124267578125,
    //       total_amount: 610,
    //     },
    //   ],
    // },
  );
  useEffect(() => {
    getInvoiceData(bookingNumber);
  }, []);

  const getInvoiceData = async number => {
    try {
      const response = await DRIVER_BOOKING_INVOICE({
        action: 'view_invoice',
        booking_number: number,
      });

      setAllInvoiceData(response);
      console.log(response, 'getInvoiceData Api response');
    } catch (response) {
      setAllInvoiceData(response.data);
      console.log(error, 'getInvoiceData Api error - Error');
    }
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Header backButton={true} />
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
                  }}>
                  {allInvoiceData?.invoice_data?.category}
                </Text>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    left: 20,
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
                  {allInvoiceData?.invoice_data?.start_date}
                </Text>
                <View style={{marginHorizontal: 20, paddingTop: 5}}>
                  <Text style={{color: '#ffffff', fontSize: 16}}>
                    {allInvoiceData?.invoice_data?.booking_number}
                  </Text>
                  <Text style={{color: '#ffffff', fontSize: 12}}>
                    Booking ID
                  </Text>
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginHorizontal: 5}}>
              <Text style={{color: '#ffffff', fontSize: 12}}>From:</Text>
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 12,
                  marginLeft: 10,
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
              <Text style={{color: '#ffffff', fontSize: 12, marginLeft: 5}}>
                To:
              </Text>
              <Text style={{color: '#ffffff', fontSize: 12, marginLeft: 10}}>
                {allInvoiceData?.invoice_data?.drop_address}
              </Text>
            </View>
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
                      {allInvoiceData?.invoice_data?.start_kms}
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

          <View style={{flexDirection: 'row', marginVertical: 5}}>
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
                  fontSize: 14,
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
                        fontSize: 14,
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
                        fontSize: 14,
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
                        fontSize: 14,
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

            {/* <View
              style={[
                styles.divider,
                {backgroundColor: 'gray', height: 0.5, marginVertical: 10},
              ]}
            /> */}
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
                <Text style={[styles.chargeText, {fontWeight: '600'}]}>
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
            <Text style={styles.advanceValue}>₹0</Text>
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
              fontSize: 10,
              alignSelf: 'center',
              textAlign: 'center',
              marginVertical: 15,
            }}>
            {allInvoiceData?.invoice_data?.company_details}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RateYourCustomer', {bookingNumber: bookingNumber})
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
          <Text style={{color: '#ffffff', fontSize: 14}}>
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
    marginHorizontal: 5,
  },
  timingColumn: {
    alignItems: 'center',
    // flex: 1,
  },
  timingLabel: {
    fontSize: 13,
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
    fontSize: 14,
    color: 'black',
  },
  advanceValue: {
    fontSize: 14,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
  },
  balanceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'right',
  },
});

export default DueAmountDetails;
