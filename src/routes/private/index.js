import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import TrustedDriver from '../../screens/TrustedDriver';
// import DriverNotice from '../../screens/DriverNotice';
import DriverEarning from '../../screens/DriverEarning';
import MyBonusStatusHistory from '../../screens/MyBonusStatusHistory';
// import TicketsDriver from '../../screens/TicketsDriver';
import DutyReportUpdate from '../../screens/DutyReportUpdate';
import {NotificationDetailScreen} from '../../components/AllNotificationsDetails';
import {NoticeBoardDetailScreen} from '../../components/AllNoticeBoardDetails';
import AgentLogin from '../../screens/AgentLogin';
import CheckAgentOtp from '../../screens/CheckAgentOtp';
import AgentPanel from '../../screens/AgentPanel';
import AgentKyc from '../../screens/AgentKyc';
import AgentTrainig from '../../screens/AgentTrainig';
import AgentWallet from '../../screens/AgentWallet';
import AgentCommisionAdded from '../../screens/AgentCommisionAdded';
import SelectYourState from '../../screens/SelectYourState';
import SelectYourCity from '../../screens/SelectYourDist';
import AgentLeads from '../../screens/AgentLeads';
// import DriverNotifications from '../../screens/DriverNotification';
import ClearMyDuePayment from '../../screens/ClearMyDuePayment';
import SplashScreen from '../../screens/SplashScreen';
import {AppColors} from '../../assets/Colors';

const Stack = createStackNavigator();

const PrivateRoute = () => {
  return (
    <>
      <StatusBar
        animated={true}
        // backgroundColor="#d1bcff"
        backgroundColor={AppColors.mainColor}
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={false}
      />

      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="TrustedDriver" component={TrustedDriver} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          {/* <Stack.Screen
            name="DriverNotifications"
            component={DriverNotifications}
          /> */}
          {/* <Stack.Screen
            name="NotificationDetail"  
            component={NotificationDetailScreen}
            options={{
              title: 'Notification',
              headerBackTitle: 'Back',
            }}
          /> */}
          {/* <Stack.Screen name="DriverNotice" component={DriverNotice} /> */}
          <Stack.Screen
            name="NoticeBoardDetail"
            component={NoticeBoardDetailScreen}
            options={{
              title: 'NoticeBoard',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="ClearMyDuePayment"
            component={ClearMyDuePayment}
          />
          <Stack.Screen name="DriverEarning" component={DriverEarning} />
          <Stack.Screen
            name="MyBonusStatusHistory"
            component={MyBonusStatusHistory}
          />
          {/* <Stack.Screen name="TicketsDriver" component={TicketsDriver} /> */}
          <Stack.Screen name="DutyReportUpdate" component={DutyReportUpdate} />

          <Stack.Screen name="AgentLogin" component={AgentLogin} />
          <Stack.Screen name="CheckAgentOtp" component={CheckAgentOtp} />
          {/* <Stack.Screen name="AgentPanel" component={AgentPanel} /> */}
          {/* <Stack.Screen name="AgentKyc" component={AgentKyc} /> */}
          {/* <Stack.Screen name="AgentTrainig" component={AgentTrainig} /> */}
          {/* <Stack.Screen name="AgentWallet" component={AgentWallet} /> */}
          {/* <Stack.Screen
            name="AgentCommisionAdded"
            component={AgentCommisionAdded}
          /> */}
          {/* <Stack.Screen name="SelectYourState" component={SelectYourState} /> */}
          {/* <Stack.Screen name="SelectYourCity" component={SelectYourCity} /> */}
          {/* <Stack.Screen name="AgentLeads" component={AgentLeads} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default PrivateRoute;
