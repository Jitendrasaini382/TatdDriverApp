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
import {RightArrow_White} from '../assets/images';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import {GET_AGENT_SELECT_CITY} from '../apis/Apis';
import {useSelector} from 'react-redux';

const SelectYourCity = ({route, navigation}) => {
  const {state} = route.params;
  const languageSwitch = useSelector(e => e?.globalSlice?.languageSwitch);
  const [data, setData] = useState({});

  const [cities, setCities] = useState([]);
  const [loader, setLoader] = useState(false);
  const getCities = async () => {
    try {
      const res = await GET_AGENT_SELECT_CITY({
        state,
        current_language: languageSwitch,
        lead_type: 'Driver',
      });
      console.log(res);
      setData(res);
      setCities(res?.zones);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    setLoader(true);
    getCities();
  }, []);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header backButton={true} />

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select Your City</Text>
        </View>
        {loader ? (
          <ActivityIndicator color={AppColors.mainColor} size={'large'} />
        ) : (
          <View style={[styles.buttonContainer, {marginTop: 10}]}>
            {cities.map((city, index) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AgentLeads', {data: data});
                }}
                key={index}
                style={styles.button}>
                <Text style={styles.buttonText}>{city}</Text>
                <Image
                  style={styles.arrowImage}
                  resizeMode="center"
                  source={RightArrow_White}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  container: {
    padding: 25,
    borderWidth: 1,
    borderColor: AppColors.mainColor,
    borderRadius: 15,
    margin: 25,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    paddingBottom: 5,
    color: AppColors.mainColor,
    // fontFamily: AppFont.regularFont,
    fontWeight: 'bold',
    // textDecorationLine:"underline",
    borderBottomColor: AppColors.mainColor,
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
    fontFamily: AppFont.regularFont,
  },
  arrowImage: {width: 18, height: 18},
});

export default SelectYourCity;
