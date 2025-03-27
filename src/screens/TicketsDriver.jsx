import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  RefreshControl,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';

import Header from '../components/Header';
import {AppFont} from '../assets/FontsFamily';
import {AppColors} from '../assets/Colors';
import {TICKETS_DRIVER} from '../apis/Apis';
import TicketDetails from '../components/modal/TicketDetailsModal';
import AccordionData from '../components/AccordianData';
import {useSelector} from 'react-redux';

import {Skeleton} from '@rneui/base';
import {Button} from 'react-native';
import {useRoute} from '@react-navigation/native';

const TicketsDriver = ({navigation}) => {
  const route = useRoute();
  const {bookingNumber} = route?.params || '';
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const [ticketDetailsModal, setTicketDetailsModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [ticketData, setTicketData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [buttonShow, setButtonShow] = useState(false);
  const [showButtonText, setShowButtonText] = useState('');
  const [error, setError] = useState('');
  const [showButton, setshowButton] = useState(false);
  const [offset, setOffset] = useState(0);

  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);

  const [field, setField] = useState({
    action: 'create_driver_ticket',
    remarks: '',
    tbooking_id: bookingNumber,
    cuurent_language: languageSwitch,
  });
  const [checkField, setCheckField] = useState({
    action: 'check_booking_number',
    tbooking_id: bookingNumber,
    current_language: languageSwitch,
  });

  const handleChange = (name, value) => {
    setField({...field, [name]: value});
    setCheckField({...checkField, [name]: value});
  };

  const showDriverTicket = async data => {
    setLoader(true);
    try {
      const response = await TICKETS_DRIVER({
        action: 'show_driver_ticket',
        offset: offset + data,
        limit: 10,
      });

      if (response?.load_more_flag == '1') {
        setshowButton(true);
      } else {
        setshowButton(false);
      }
      setOffset(prevOffset => prevOffset + data);
      setTicketData(prevTickets => [...prevTickets, ...response?.tickets]);
    } catch (err) {
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const checkOpenTicket = async () => {
    try {
      const response = await TICKETS_DRIVER({action: 'open_ticket'});
      if (
        response.status_code == 200 &&
        response.message === 'no_open_ticket_found'
      ) {
        setButtonShow(true);
        setShowButtonText('');
      } else {
        setButtonShow(false);
        setShowButtonText(response.message);
      }
    } catch (err) {}
  };

  useEffect(() => {
    showDriverTicket(0);
  }, []);

  useEffect(() => {
    checkOpenTicket();
  }, [
    showButtonText,
    buttonShow,
    createTicketModal,
    ticketDetailsModal,
    selectedTicketId,
    field,
    checkField,
  ]);

  const onRefresh = async () => {
    setTicketData([]);
    setRefreshing(true);
    await Promise.all([showDriverTicket(0), checkOpenTicket()]).catch();
    setRefreshing(false);
  };

  const handleTicketPress = useCallback(
    id => {
      setTicketDetailsModal(true);
      setSelectedTicketId(id);
    },
    [setSelectedTicketId],
  );

  const handleCreateTicket = async () => {
    if (!field?.remarks) {
      setError(
        languageSwitch == 'hindi'
          ? 'कृपया अपनी समस्या लिखें।'
          : 'Please Enter Your Problem',
      );
      return;
    }

    if (field?.remarks?.length < 50) {
      setError(
        languageSwitch == 'hindi'
          ? 'कृपया पूरी समस्या सही से बताएं।'
          : 'Please Enter Minimum 50 Characters.',
      );
      return;
    }

    Keyboard.dismiss();

    try {
      // If booking number exists, validate it
      if (field?.tbooking_id) {
        const checkResponse = await TICKETS_DRIVER(checkField);

        if (
          checkResponse?.status_code == 200 &&
          checkResponse?.message === 'valid_booking_id'
        ) {
          await createTicket();
        } else {
          Alert.alert('Error', checkResponse.message);
          setError('');
        }
      } else {
        await createTicket();
      }
    } catch (error) {
      Alert.alert('Error', 'Internal server error');
    }
  };

  // Utility function to create a ticket
  const createTicket = async () => {
    try {
      const createResponse = await TICKETS_DRIVER(field);

      if (createResponse?.status_code == 200) {
        checkOpenTicket();

        setCreateTicketModal(false);

        showDriverTicket();

        resetFields();
        setError('');

        Alert.alert('', createResponse.message, [
          {
            text: 'OK',
            onPress: () => {
              setCreateTicketModal(false);
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Internal server error');
      }
    } catch (error) {}
  };

  // Utility function to reset fields
  const resetFields = () => {
    field.remarks = '';
    field.tbooking_id = '';
  };

  const renderItem = useCallback(
    ({id, timestamp, ticket_status}, index) => (
      <TouchableOpacity
        onPress={() => handleTicketPress(id)}
        // key={id}
        style={[styles.row, index === 0 && styles.firstRow]}>
        <View style={styles.cell}>
          <Text style={styles.cellText}>{id}</Text>
        </View>
        <View style={[styles.cell2, styles.middleCell]}>
          <Text style={styles.cellText}>{timestamp}</Text>
        </View>
        <View style={styles.cell}>
          <View
            style={[
              styles.statusButton,
              index === 0 && styles.firstStatusButton,
            ]}>
            <Text
              style={[
                styles.statusText,
                index === 0 && styles.firstStatusText,
              ]}>
              {ticket_status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [handleTicketPress],
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header backButton={true} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyboardShouldPersistTaps="always"
        style={styles.scrollView}>
        <AccordionData />
        {buttonShow ? (
          <TouchableOpacity
            onPress={() => setCreateTicketModal(true)}
            style={styles.button}>
            <Text style={styles.buttonText}>Create Ticket</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.showButtonView}>
            <Text style={styles.showbtnText}>{showButtonText}</Text>
          </View>
        )}

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => setCreateTicketModal(false)}
          animationIn="fadeInDown"
          animationOut="fadeOutUp"
          isVisible={createTicketModal}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              backgroundColor: AppColors.white,
              padding: 10,
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#e7e7e7',
            }}>
            <View
              style={{
                margin: 10,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#e7e7e7',
                padding: 20,
                position: 'relative',
              }}>
              <TouchableOpacity
                onPress={() => setCreateTicketModal(false)}
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#e0e0e0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 15, color: '#333', fontWeight: 'bold'}}>
                  ×
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginBottom: 20,
                  color: '#333',
                }}>
                Create Ticket
              </Text>

              <Text style={{fontSize: 16, marginBottom: 5, color: '#666'}}>
                Booking Number:
              </Text>
              <TextInput
                style={{
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 15,
                  borderWidth: 1,
                  fontSize: 18,
                  borderColor: '#e7e7e7',
                  color: AppColors.black,
                }}
                placeholder={
                  languageSwitch == 'english'
                    ? 'Share Your Booking Number'
                    : 'अपनी बुकिंग नंबर साझा करें।'
                }
                onChangeText={value => handleChange('tbooking_id', value)}
                placeholderTextColor="#6c757d"
                value={field.tbooking_id}
              />

              <Text style={{fontSize: 16, marginBottom: 5, color: '#666'}}>
                Description:
              </Text>
              <TextInput
                style={{
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 15,
                  borderWidth: 1,
                  fontSize: 18,
                  textAlignVertical: 'top',
                  borderColor: '#e7e7e7',
                  color: AppColors.black,
                }}
                placeholder={
                  languageSwitch == 'english'
                    ? 'Please provide detailed information about your issue. We will promptly address your inquiry.'
                    : 'कृपया अपनी समस्या के बारे में पूरी जानकारी प्रदान करें ? हम जल्द से जल्द आपकी enquiry का समाधान करेंगे।'
                }
                placeholderTextColor={AppColors.silverGrey}
                multiline
                value={field.remarks}
                onChangeText={value => handleChange('remarks', value)}
              />
              <Text style={{color: 'red'}}>{error}</Text>

              <TouchableOpacity
                onPress={handleCreateTicket}
                style={{
                  backgroundColor: '#007bff',
                  borderRadius: 5,
                  padding: 15,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: AppColors.white,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Create
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          backdropOpacity={0}
          onBackdropPress={() => setTicketDetailsModal(false)}
          animationIn="bounce"
          animationOut="fadeOutUp"
          isVisible={ticketDetailsModal}>
          <TicketDetails
            setTicketDetailsModal={setTicketDetailsModal}
            ticketId={selectedTicketId}
          />
        </Modal>

        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerCell1}>
              <Text style={styles.headerText}>Ticket ID</Text>
            </View>
            <View style={[styles.headerCell2, styles.middleHeaderCell]}>
              <Text style={styles.headerText}>Created Date</Text>
            </View>
            <View style={styles.headerCell3}>
              <Text style={styles.headerText}>Status</Text>
            </View>
          </View>

          {loader ? (
            <>
              <FlatList
                contentContainerStyle={{
                  marginVertical: 15,
                  paddingHorizontal: 15,
                }}
                data={Array.from(
                  {length: Math.floor(Math.random() * 10) + 1},
                  () => ({}),
                )}
                ItemSeparatorComponent={() => {
                  return <View style={{height: 10}} />;
                }}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <Skeleton
                        animation="pulse"
                        key={index}
                        height={60}
                        style={{
                          flex: 1,
                          borderRadius: 10,
                        }}
                      />
                    </>
                  );
                }}
              />
            </>
          ) : (
            ticketData && ticketData.map(renderItem)
          )}
          {showButton ? (
            <View style={{marginVertical: 10, alignSelf: 'center'}}>
              <Button title="Load More " onPress={() => showDriverTicket(10)} />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    margin: 15,
    flex: 1,
  },
  safeAreaView: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: AppColors.white,
  },
  container: {
    borderWidth: 1,
    marginTop: 10,
    flex: 1,
    borderColor: AppColors.borderColor,
    backgroundColor: AppColors.white,
  },
  header: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: AppColors.borderColor,

    backgroundColor: '#f8f8f8',
  },
  headerCell1: {
    flex: 1,
    padding: 10,
  },
  headerCell2: {
    flex: 1.8,
    padding: 10,
  },
  headerCell3: {
    flex: 1,
    padding: 10,
  },
  middleHeaderCell: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: AppColors.borderColor,
  },
  headerText: {
    color: '#888',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: AppColors.borderColor,
  },
  firstRow: {
    backgroundColor: '#f0f8ff',
  },
  cell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  cell2: {
    flex: 1.8,
    padding: 10,
    justifyContent: 'center',
  },

  middleCell: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: AppColors.borderColor,
  },
  cellText: {
    color: '#333',
  },
  statusButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  firstStatusButton: {
    backgroundColor: '#1e90ff',
  },
  statusText: {
    color: '#333',
    fontSize: 15,
  },
  firstStatusText: {
    color: AppColors.white,
  },

  bottamView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    backgroundColor: '#f7f7f7',
    borderColor: AppColors.borderColor,
  },
  bottamText: {
    color: 'rgb(65, 84, 98)',
    fontFamily: AppFont.regularFont,
    padding: 5,
  },
  button: {
    backgroundColor: '#00A1E0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 15,
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  showButtonView: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 5,
    backgroundColor: '#e0e0e0',
  },
  showbtnText: {color: AppColors.black, fontWeight: '500', fontSize: 15},
});

export default TicketsDriver;
