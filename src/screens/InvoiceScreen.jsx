import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Header from '../../components/Header';

const InvoiceScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Header />
        <View
          style={{
            borderColor: '#16588e',
            borderWidth: 2,
            margin: 10,
            borderRadius: 10,
          }}>
          <View
            style={{
              backgroundColor: '#16588e',
              justifyContent: 'space-between',
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderColor: '#16588e',
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
                  //marginVertical: 7,
                  height: 20,
                  width: '48%',
                  backgroundColor: '#ffffff',
                }}>
                <Text
                  style={{
                    position: 'absolute',
                    color: '#16588e',
                    marginLeft: 5,
                    fontSize: 12,
                    paddingVertical: 3,
                  }}>
                  Private Driver
                </Text>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    left: 20,
                  }}>
                  <Image
                    source={require('../../assets/images/rt_icon.png')}
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
                <Text style={{color: '#ffffff', fontSize: 12}}>Start Date</Text>
                <View style={{marginHorizontal: 20, paddingTop: 5}}>
                  <Text style={{color: '#ffffff', fontSize: 16}}>123456</Text>
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
                Pickup Address
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
                Drop Address
              </Text>
            </View>
          </View>

          {/* Timings Section */}
          <View style={styles.timingsSection}>
            <View style={styles.dateRow}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.dateText}>19 Dec</Text>
                <Text style={styles.dateText}>2024</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.dateText}>19 Dec</Text>
                <Text style={styles.dateText}>2024</Text>
              </View>
            </View>
            <View style={styles.timingsRow}>
              <View style={styles.timingColumn}>
                <Text style={styles.timingLabel}>Reporting</Text>
                <Text style={styles.timingValue}>08:00 PM</Text>
              </View>
              <View style={styles.timingColumn}>
                <Text style={styles.timingLabel}>Reach</Text>
                <Text style={styles.timingValue}>10:38 AM</Text>
              </View>
              <View style={styles.timingColumn}>
                <Text style={styles.timingLabel}>Start</Text>
                <Text style={styles.timingValue}>10:39 AM</Text>
              </View>
              <View style={styles.timingColumn}>
                <Text style={styles.timingLabel}>End</Text>
                <Text style={styles.timingValue}>10:39 AM</Text>
              </View>
            </View>
          </View>

          {/* Charges Section */}
          <View style={styles.chargesSection}>
            <View style={styles.chargesHeaderRow}>
              <Text style={styles.chargeHeaderText}>Unit</Text>
              <Text style={styles.chargeHeaderText}>Charges</Text>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.chargeHeaderText}>SGST</Text>
                <Text style={styles.chargeHeaderText}>2.5%</Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.chargeHeaderText}>CGST</Text>
                <Text style={styles.chargeHeaderText}>2.5%</Text>
              </View>
              <Text style={styles.chargeHeaderText}>Total</Text>
            </View>
            <View
              style={[
                styles.divider,
                {backgroundColor: 'grey', height: 0.5, marginVertical: 10},
              ]}
            />
            <View style={styles.chargeRow}>
              <Text style={styles.chargeText}>Package</Text>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.chargeText}>1</Text>
                <Text style={styles.chargeText}>hours</Text>
              </View>

              <Text style={styles.chargeText}>246.67</Text>
              <Text style={styles.chargeText}>6.17</Text>
              <Text style={styles.chargeText}>6.17</Text>
              <Text style={styles.chargeText}>₹259</Text>
            </View>
            <View
              style={[
                styles.divider,
                {backgroundColor: 'gray', height: 0.5, marginVertical: 10},
              ]}
            />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Charges</Text>
              <Text style={styles.totalValue}>₹259</Text>
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
            <Text style={styles.balanceValue}>₹259</Text>
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
              marginVertical: 15,
            }}>
            EXECUTION FORCE PRIVATE LIMITED
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => console.log('Rate Your Experience')}
          style={{
            backgroundColor: '#16588e',
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
    marginHorizontal: 15,
  },
  timingColumn: {
    alignItems: 'center',
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
    marginHorizontal: 10,
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
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: 'blue',
  },
  balanceValue: {
    fontSize: 12,
    fontWeight: '400',
    color: '#007bff',
    textAlign: 'right',
  },
});

export default InvoiceScreen;
