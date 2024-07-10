import {ActivityIndicator, StatusBar, View} from 'react-native';
import TrustedDriver from '../screens/TrustedDriver';
import CheckDriverOtp from '../screens/CheckDriverOtp';
import DriverLogin from '../screens/DriverLogin';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DriverEarning from '../screens/DriverEarning';
import DriverNotifications from '../screens/DriverNotification';
import ClearMyDuePayment from '../screens/ClearMyDuePayment';
import AgentLogin from '../screens/AgentLogin';
import MyBonusStatusHistory from '../screens/MyBonusStatusHistory';
import TicketsDriver from '../screens/TicketsDriver';
import DutyReportUpdate from '../screens/DutyReportUpdate';
import {NotificationDetailScreen} from '../components/AllNotificationsDetails';
import CheckAgentOtp from '../screens/CheckAgentOtp';
import AgentPanel from '../screens/AgentPanel';
import AgentKyc from '../screens/AgentKyc';
import AgentTrainig from '../screens/AgentTrainig';
import AgentWallet from '../screens/AgentWallet';
import AgentCommisionAdded from '../screens/AgentCommisionAdded';
import SelectYourState from '../screens/SelectYourState';
import SelectYourCity from '../screens/SelectYourDist';
import AgentLeads from '../screens/AgentLeads';
import DriverNotice from '../screens/DriverNotice';
import {NoticeBoardDetailScreen} from '../components/AllNoticeBoardDetails';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const Route = () => {
  const [initialRoute, setInitialRoute] = useState('DriverLogin');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('refresh_token');
        // console.log(token, 'tttttttttttttttttttttttttttttt');
        if (token) {
          setInitialRoute('TrustedDriver');
        }
      } catch (error) {
        console.error('Error checking token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
   return  (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#d1bcff" />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#d1bcff"
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={false}
      />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="DriverLogin" component={DriverLogin} />
          <Stack.Screen name="CheckDriverOtp" component={CheckDriverOtp} />
          <Stack.Screen name="TrustedDriver" component={TrustedDriver} />
          <Stack.Screen name="DriverNotifications" component={DriverNotifications} />
          <Stack.Screen name="DriverNotice" component={DriverNotice} />
          <Stack.Screen name="ClearMyDuePayment" component={ClearMyDuePayment} />
          <Stack.Screen name="DriverEarning" component={DriverEarning} />
          <Stack.Screen name="MyBonusStatusHistory" component={MyBonusStatusHistory} />
          <Stack.Screen name="TicketsDriver" component={TicketsDriver} />
          <Stack.Screen name="DutyReportUpdate" component={DutyReportUpdate} />
          <Stack.Screen
            name="NotificationDetail"
            component={NotificationDetailScreen}
            options={{
              title: 'Notification',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="NoticeBoardDetail"
            component={NoticeBoardDetailScreen}
            options={{
              title: 'NoticeBoard',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen name="AgentLogin" component={AgentLogin} />
          <Stack.Screen name="CheckAgentOtp" component={CheckAgentOtp} />
          <Stack.Screen name="AgentPanel" component={AgentPanel} />
          <Stack.Screen name="AgentKyc" component={AgentKyc} />
          <Stack.Screen name="AgentTrainig" component={AgentTrainig} />
          <Stack.Screen name="AgentWallet" component={AgentWallet} />
          <Stack.Screen name="AgentCommisionAdded" component={AgentCommisionAdded} />
          <Stack.Screen name="SelectYourState" component={SelectYourState} />
          <Stack.Screen name="SelectYourCity" component={SelectYourCity} />
          <Stack.Screen name="AgentLeads" component={AgentLeads} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Route;





















// import {ActivityIndicator, StatusBar, View} from 'react-native';
// import PrivateRoute from './private';
// import PublicRoute from './public';
// import TrustedDriver from '../screens/TrustedDriver';
// import CheckDriverOtp from '../screens/CheckDriverOtp';
// import DriverLogin from '../screens/DriverLogin';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import DriverEarning from '../screens/DriverEarning';
// import DriverNotifications from '../screens/DriverNotification';
// import ClearMyDuePayment from '../screens/ClearMyDuePayment';
// import AgentLogin from '../screens/AgentLogin';
// import MyBonusStatusHistory from '../screens/MyBonusStatusHistory';
// import TicketsDriver from '../screens/TicketsDriver';
// import DutyReportUpdate from '../screens/DutyReportUpdate';
// import {NotificationDetailScreen} from '../components/AllNotificationsDetails';
// import CheckAgentOtp from '../screens/CheckAgentOtp';
// import AgentPanel from '../screens/AgentPanel';
// import AgentKyc from '../screens/AgentKyc';
// import AgentTrainig from '../screens/AgentTrainig';
// import AgentWallet from '../screens/AgentWallet';
// import AgentCommisionAdded from '../screens/AgentCommisionAdded';
// import SelectYourState from '../screens/SelectYourState';
// import SelectYourCity from '../screens/SelectYourDist';
// import AgentLeads from '../screens/AgentLeads';
// import DriverNotice from '../screens/DriverNotice';
// import {NoticeBoardDetailScreen} from '../components/AllNoticeBoardDetails';
// import {useCallback, useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // import {NoticeBoardDetailScreen} from '../components/AllNoticeBoardDetails';

// const Stack = createStackNavigator();

// const Route = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isToken, setIsToken] = useState(true);

//   const [isLoading, setIsLoading] = useState(true);

//   const getTokens = useCallback(async () => {
//     try {
//       const [refreshToken, jwtToken] = await Promise.all([
//         AsyncStorage.getItem('refresh_token'),

//         AsyncStorage.getItem('jwt'),
//       ]);

//       console.log(refreshToken, 'refresh_tokenmm');

//       console.log(jwtToken, 'jwt_tokenmm');

//       setIsToken(true);
//       setIsAuthenticated(!!refreshToken && !!jwtToken);
//     } catch (error) {
//       console.error('Error retrieving tokens:', error);

//       setIsAuthenticated(false);
//       setIsToken(false);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     getTokens();
//   }, [getTokens]);

//   console.log(isAuthenticated, 'ttttt');

  // if (isLoading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size="large" color="#d1bcff" />
  //     </View>
  //   );
  // }

//   // const getTokens = async () => {
//   //   try {
//   //     const refreshToken = await AsyncStorage.getItem('refresh_token');
//   //     const jwtToken = await AsyncStorage.getItem('jwt');

//   //     console.log(refreshToken, 'refresh_tokenmm');
//   //     console.log(jwtToken, 'jwt_tokenmm');

//   //     // return {refreshToken, jwtToken};
//   //   } catch (error) {
//   //     console.error('Error retrieving tokens:', error);
//   //     return null;
//   //   }
//   // };

//   // useEffect(()=>{
//   //   getTokens()
//   // } , [])

//   return (
//     <>
//       <StatusBar
//         animated={true}
//         backgroundColor="#d1bcff"
//         barStyle="dark-content"
//         showHideTransition="slide"
//         hidden={false}
//       />
//       {/* <PublicRoute/>
//     <PrivateRoute/> */}

//       <NavigationContainer>
//         <Stack.Navigator
//           screenOptions={{
//             headerShown: false,
//           }}>
//           {isToken ? (
//             <Stack.Screen name="DriverLogin" component={DriverLogin} />
//           ) : (
//             <Stack.Screen name="TrustedDriver" component={TrustedDriver} />
//           )}

//           {isAuthenticated ? (
//             <Stack.Screen name="TrustedDriver" component={TrustedDriver} />
//           ) : (
//             <Stack.Screen name="DriverLogin" component={DriverLogin} />
//           )}
//           {/* <Stack.Screen name="DriverLogin" component={DriverLogin} /> */}
//           <Stack.Screen name="CheckDriverOtp" component={CheckDriverOtp} />
//           <Stack.Screen
//             name="DriverNotifications"
//             component={DriverNotifications}
//           />
//           <Stack.Screen name="DriverNotice" component={DriverNotice} />

//           <Stack.Screen
//             name="ClearMyDuePayment"
//             component={ClearMyDuePayment}
//           />
//           <Stack.Screen name="DriverEarning" component={DriverEarning} />
//           <Stack.Screen
//             name="MyBonusStatusHistory"
//             component={MyBonusStatusHistory}
//           />
//           <Stack.Screen name="TicketsDriver" component={TicketsDriver} />

//           <Stack.Screen name="DutyReportUpdate" component={DutyReportUpdate} />
//           <Stack.Screen
//             name="NotificationDetail"
//             component={NotificationDetailScreen}
//             options={{
//               title: 'Notification',
//               headerBackTitle: 'Back',
//             }}
//           />
//           <Stack.Screen
//             name="NoticeBoardDetail"
//             component={NoticeBoardDetailScreen}
//             options={{
//               title: 'NoticeBoard',
//               headerBackTitle: 'Back',
//             }}
//           />

//           <Stack.Screen name="AgentLogin" component={AgentLogin} />
//           <Stack.Screen name="CheckAgentOtp" component={CheckAgentOtp} />
//           <Stack.Screen name="AgentPanel" component={AgentPanel} />
//           <Stack.Screen name="AgentKyc" component={AgentKyc} />
//           <Stack.Screen name="AgentTrainig" component={AgentTrainig} />
//           <Stack.Screen name="AgentWallet" component={AgentWallet} />
//           <Stack.Screen
//             name="AgentCommisionAdded"
//             component={AgentCommisionAdded}
//           />
//           <Stack.Screen name="SelectYourState" component={SelectYourState} />
//           <Stack.Screen name="SelectYourCity" component={SelectYourCity} />
//           <Stack.Screen name="AgentLeads" component={AgentLeads} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
// };
// export default Route;
