import React, { useEffect, useState } from 'react';
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
import {GET_AGENT_SELECT_STATE} from '../apis/Apis';

const SelectYourState = ({navigation}) => {
  // const states = [
  //   'Delhi',
  //   'Haryana',
  //   'Karnataka',
  //   'Maharashtra',
  //   'Telangana',
  //   'Uttar Pradesh',
  // ];
  const [states,setstates]=useState([])
  const[loader,setloader]=useState(false)
  const getstates = async () => {
    try {
      const res = await GET_AGENT_SELECT_STATE();
      
      setstates(res?.cities)
      console.log(res);
    } catch (err) {
      console.log(err);
    }finally{
      setloader(false)
    }
  };
  useEffect(()=>{
    setloader(true)
    getstates()
  },[])

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header backButton={true} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select Your State</Text>
        </View>
        {
          loader ? <ActivityIndicator size={"large"} color={AppColors.mainColor}/>:
          <View style={[styles.buttonContainer, {marginTop: 10}]}>
          {states?.map((state, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectYourCity', {state})}
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
        }
      
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
    borderBottomWidth: 0.5,
    borderBottomColor: AppColors.white,
  },
  arrowImage: {width: 18, height: 18},
});

export default SelectYourState;
