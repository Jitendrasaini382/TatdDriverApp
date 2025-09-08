import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RightArrow_White} from '../assets/images';
import Header from '../components/Header';
import {AppColors} from '../assets/Colors';
import {AppFont} from '../assets/FontsFamily';
import {GET_AGENT_SELECT_STATE} from '../apis/Apis';

const SelectYourState = ({navigation}) => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStates = async () => {
    try {
      const res = await GET_AGENT_SELECT_STATE();
      setStates(res?.cities || []);
      console.log(res);
    } catch (error) {
      console.log('Error fetching states:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getStates();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header backButton={true} />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={AppColors.mainColor} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <View
            style={{
              borderWidth: 1,
              padding: 20,
              borderRadius: 15,
              marginBottom: 10,
              borderColor: AppColors.mainColor,
            }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Select Your State</Text>
            </View>

            <View style={styles.buttonContainer}>
              {states?.map((state, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate('SelectYourCity', {state})
                  }>
                  <Text style={styles.buttonText}>{state}</Text>
                  <Image
                    source={RightArrow_White}
                    style={styles.arrowImage}
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 15,
  },
  titleContainer: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    color: AppColors.mainColor,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.mainColor,
    paddingBottom: 5,
  },
  buttonContainer: {
    marginTop: 10,
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
  arrowImage: {
    width: 18,
    height: 18,
  },
});

export default SelectYourState;
