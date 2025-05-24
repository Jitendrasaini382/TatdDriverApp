import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import {GET_AGENT_SELECT_STATE} from '../../apis/Apis';
import {RightArrow_White} from '../../assets/images';

const SelectYourStatePartnerInterface = ({navigation}) => {
  const [states, setstates] = useState([
    'Delhi',
    'Haryana',
    'Karnataka',
    'Maharashtra',
    'Tamil Nadu',
    'Telangana',
    'Uttar Pradesh',
  ]);
  const [loader, setloader] = useState(false);
  const getstates = async () => {
    try {
      const res = await GET_AGENT_SELECT_STATE();
      console.log(res, '====');

      setstates(res?.cities);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setloader(false);
    }
  };
  // useEffect(() => {
  //   setloader(true);
  //   getstates();
  // }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header backButton={true} isAuthenticated={false} />
      {loader ? (
        <ActivityIndicator
          size={'large'}
          color={'#16588e'}
          style={{flex: 1, alignContent: 'center'}}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Select Your State</Text>
          </View>
          <View style={[styles.buttonContainer, {marginTop: 10}]}>
            {states?.map((state, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SelectYourCityPartnerInterface', {state})
                }
                key={index}
                style={styles.button}>
                <Text style={styles.buttonText}>{state}</Text>
                <Image
                  style={styles.arrowImage}
                  resizeMode="center"
                  source={RightArrow_White}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    padding: 25,
    borderWidth: 1,
    borderColor: '#16588e',
    borderRadius: 15,
    margin: 25,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    paddingBottom: 5,
    color: '#16588e',
    fontWeight: 'bold',
    borderBottomColor: '#16588e',
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: '#005a8c',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    borderBottomColor: 'white',
  },
  arrowImage: {width: 18, height: 18},
});

export default SelectYourStatePartnerInterface;
