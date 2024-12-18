import React, { useState } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import Header from '../components/Header';
import { Facebook_Icon } from '../assets/images';

const DueScreen = () => {
    const [textWidth, setTextWidth] = useState(0); 
  return (
<>
  <Header />        
            <View style={styles.mainContainer}>
      <View style={styles.dueContainer}>
        <View style={styles.header}>
          <View style={styles.trustedContainer}>
            <Text style={styles.trustedText}>Trusted & Trained Driver</Text>
            <View style={styles.iconContainer}>
              <Image
                source={Facebook_Icon}
                resizeMode={'cover'}
                style={styles.icon}
              />
            </View>
          </View>
          <View style={styles.dueTextContainer}>
            <Text style={styles.dueText}>Due</Text>
          </View>
        </View>
        <View style={{alignItems:'center',justifyContent:'center',marginVertical:60}}>
        <Text style={styles.duePrice}>₹ 159</Text>
        <Text style={{color:'blue',}}
         onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setTextWidth(width);
          }}
        >View Invoice</Text>
         <View
          style={[
            styles.dividerInput,
            { width: textWidth },
          ]}
        />
        <View style={{borderWidth:1,borderColor:'grey',marginTop:20,borderRadius:5}}>
        <Text style={{color:'black',margin:5,fontWeight:'600',paddingHorizontal:10}}>
        Collect ₹159 from the customer
        </Text>
        </View>
        </View>
      </View>
    </View>
    </>
  );
}

export default DueScreen;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'white',height:'100%',
    },
    dueContainer: {
   margin:20,
   borderBottomWidth:2,
      borderLeftColor: '#16588e',
      borderRightColor: '#16588e',
      borderBottomColor: '#16588e',
      borderLeftWidth:2,
      borderRightWidth:2,
      borderRadius:10,
    },
    header: {
      backgroundColor: '#16588e',
      height: 100,
      justifyContent: 'space-between',
      borderRadius:7,
      borderColor: '#16588e',
    },
    trustedContainer: {
   marginVertical:7,
      height: 20,
      width: '78%',
      backgroundColor: 'white',
    },
    trustedText: {
      position: 'absolute',
      color: '#16588e',
     marginLeft:5,
      fontFamily: 'Roboto',
    },
    iconContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      left: 20,
    },
    icon: {
      width: 20,
      height: 20,
     borderLeftWidth:1,
      borderLeftColor: 'white',
    },
    dueTextContainer: {
      alignItems: 'center',
     marginBottom:10
    },
  dueText:{
    color:'white',
    fontSize:20,
    fontWeight:'800'
  },
  duePrice:{
    color:'grey',
    alignSelf:'center',
    justifyContent:'center',
    fontSize:20,
    fontWeight:'500',
    marginVertical:10
    //alignItems:'center'
  },
  dividerInput: {
    height: 1.2, 
    backgroundColor: 'black',
  },
  });
