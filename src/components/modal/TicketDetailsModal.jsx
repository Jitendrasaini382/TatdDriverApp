import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {AppColors} from '../../assets/Colors';
import {AppFont} from '../../assets/FontsFamily';
import {TICKETS_DRIVER} from '../../apis/Apis';

const TicketDetailsModal = ({setTicketDetailsModal, ticketId}) => {
  const [ticketDetails, setTicketDetails] = useState({});
  const [field, setField] = useState({
    action: 'show_single_ticket_data',
    ticket_id: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setField(prevField => ({
      ...prevField,
      ticket_id: ticketId,
    }));
  }, [ticketId]);

  useEffect(() => {
    if (field.ticket_id) {
      getSingleTicketData();
    }
  }, [field]);

  const getSingleTicketData = async () => {
    setIsLoading(true);
    try {
      const response = await TICKETS_DRIVER(field);
      if (response.status_code === 200) {
        setTicketDetails(response.ticket_data);
      } else if (response.status_code === 500) {
        Alert.alert('No Data Available');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch ticket data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        size="smal"
        color={AppColors.mainColor}
        style={{flex: 1}}
      />
    );
  }

  const renderDetailItem = (label, value) => {
    return (
      <View style={styles.contentView}>
        <Text style={styles.leftSectionText}>{label}</Text>
        <Text style={styles.rightSectionText}>{value}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => setTicketDetailsModal(false)}
        style={styles.closeButton}>
        <Icon name="close" size={12} />
      </TouchableOpacity>
      <Text style={styles.title}>Ticket Details</Text>

      <View style={styles.contentContainer}>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsInnerContainer}>
            {renderDetailItem('Ticket ID :', ticketDetails.id)}
            {renderDetailItem('Created Date', ticketDetails.timestamp)}
            {renderDetailItem('Booking Number :', ticketDetails.booking_id)}
            {renderDetailItem('Status :', ticketDetails.ticket_status)}
            {renderDetailItem(
              'Description:',
              ticketDetails.support_require_for,
            )}
            {renderDetailItem('Closure Remark:', ticketDetails.closure_remarks)}
            {renderDetailItem('Closure Date', ticketDetails.closure_timestamp)}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 1,
  },
  closeButton: {
    backgroundColor: AppColors.silverGrey,
    height: 20,
    width: 20,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: AppColors.black,
    marginLeft: 20,
    fontFamily: AppFont.regularFont,
  },
  contentContainer: {
    margin: 20,
    flexDirection: 'row',
  },
  detailsContainer: {
    flex: 1,
    elevation: 1,
  },
  detailsInnerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,
    shadowColor: 'white',
    backgroundColor: '#f7f7f7',
  },
  contentView: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
  },
  leftSectionText: {
    color: AppColors.black,
    justifyContent: 'center',
    marginLeft: 7,
    alignContent: 'flex-start',
    fontSize: 17,
    padding: 5,
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    flex: 1,
    paddingVertical: 10,
    fontFamily: AppFont.regularFont,
  },
  rightSectionText: {
    flex: 2,
    color: AppColors.black,
    justifyContent: 'center',
    marginLeft: 7,
    fontSize: 15,
    fontFamily: AppFont.regularFont,
    letterSpacing: 0.4,
    borderLeftWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    alignContent: 'flex-start',
    padding: 5,
    paddingVertical: 10,
    paddingLeft: 10,
  },
});

export default TicketDetailsModal;
