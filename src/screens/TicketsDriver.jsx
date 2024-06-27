import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import AccordionTop from '../components/AccordianTop';
import AccordionBottam from '../components/AccordianBottam';
import TicketList from '../components/CreateTicket';

const TicketsDriver = () => {
  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
      <Header backButton={true} />

      <ScrollView style={{margin: 15}}>
        <AccordionTop />
        <AccordionBottam />
        {/* button */}

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create Ticket</Text>
        </TouchableOpacity>

        {/* <View style={styles.bottamView}>
          <View style={{flex: 1, borderColor: 'rgb(204, 204, 204)',}}>
            <Text style={styles.bottamText}>Ticket ID</Text>
          </View>
          <View
            style={{
                flex: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: 'rgb(204, 204, 204)',
            }}>
            <Text style={styles.bottamText}>Created Date</Text>
          </View>
          <View style={{flex: 1, borderColor: 'rgb(204, 204, 204)'}}>
            <Text style={styles.bottamText}>Status</Text>
          </View>
        </View> */}

        <TicketList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TicketsDriver;

const styles = StyleSheet.create({
  bottamView: {
    // marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    backgroundColor: '#f7f7f7',
    borderColor: 'rgb(204, 204, 204)',
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
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// <View
// style={{
//   padding: 5,
//   margin: 5,
//   elevation: 5,
//   backgroundColor: 'white',
// }}>
// <View
//   style={{
//     //   padding: 5,
//     //   margin: 5,
//     //   elevation: 5,
//     //   backgroundColor: 'white',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 5,
//     alignItems: 'center',
//   }}>
//   <Text style={{color: 'black'}}> Information Related To Work</Text>
//   {/* <Text> */}
//   <Icon on name="plus" size={15} color={AppColors.mainColor} />
//   {/* </Text> */}
// </View>
// <View
//   style={{
//     //   padding: 5,
//     //   margin: 5,
//     //   elevation: 5,
//     paddingHorizontal: 5,
//     //   backgroundColor: 'white',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   }}>
//   <Text style={{color: 'black'}}> Information Related To Work</Text>
//   {/* <Text> */}
//   <Icon on name="plus" size={15} color={AppColors.mainColor} />
//   {/* </Text> */}
// </View>
// <View
//   style={{
//     //   padding: 5,
//     //   margin: 5,
//     //   elevation: 5,
//     //   backgroundColor: 'white',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 5,
//     alignItems: 'center',
//   }}>
//   <Text style={{color: 'black'}}> Information Related To Work</Text>
//   {/* <Text> */}
//   <Icon on name="plus" size={15} color={AppColors.mainColor} />
//   {/* </Text> */}
// </View>
// <View
//   style={{
//     //   padding: 5,
//     //   margin: 5,
//     //   elevation: 5,
//     paddingHorizontal: 5,
//     //   backgroundColor: 'white',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   }}>
//   <Text style={{color: 'black'}}> Information Related To Work</Text>
//   {/* <Text> */}
//   <Icon on name="plus" size={15} color={AppColors.mainColor} />
//   {/* </Text> */}
// </View>
// </View>

// <View
// style={{
//   padding: 5,
//   margin: 5,
//   elevation: 5,
//   backgroundColor: 'white',
// }}>
// <View
//   style={{
//     //   padding: 5,
//     //   margin: 5,
//     //   elevation: 5,
//     //   backgroundColor: 'white',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 5,
//     alignItems: 'center',
//   }}>
//   <Text style={{color: 'black'}}> Information Related To Work</Text>
//   {/* <Text> */}
//   <Icon on name="plus" size={15} color={AppColors.mainColor} />
//   {/* </Text> */}
// </View>
// <View
//   style={{
//     //   padding: 5,
//     //   margin: 5,
//     //   elevation: 5,
//     paddingHorizontal: 5,
//     //   backgroundColor: 'white',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   }}>
//   <Text style={{color: 'black'}}> Information Related To Work</Text>
//   {/* <Text> */}
//   <Icon on name="plus" size={15} color={AppColors.mainColor} />
//   {/* </Text> */}
// </View>
// </View>
