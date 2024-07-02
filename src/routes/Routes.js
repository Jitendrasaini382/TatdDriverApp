import {StatusBar} from 'react-native';
import PrivateRoute from './private';
import PublicRoute from './public';
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
import DutyReportUpdateProcess from '../screens/DutyReportUpdate/DutyReportUpdateProcess';
import {NotificationDetailScreen} from '../components/AllNotificationsDetails';
import DutyReportUpdateCancel from '../screens/DutyReportUpdate/DutyReportUpdateCancel';
import CheckAgentOtp from '../screens/CheckAgentOtp';
import AgentPanel from '../screens/AgentPanel';
// import {NoticeBoardDetailScreen} from '../components/AllNoticeBoardDetails';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#d1bcff"
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={false}
      />
      {/* <PublicRoute/>
    <PrivateRoute/> */}

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="TrustedDriver" component={TrustedDriver} />
          <Stack.Screen name="DriverLogin" component={DriverLogin} />
          <Stack.Screen name="CheckDriverOtp" component={CheckDriverOtp} />
          <Stack.Screen
            name="DriverNotifications"
            component={DriverNotifications}
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
          <Stack.Screen name="TicketsDriver" component={TicketsDriver} />
         
          <Stack.Screen
            name="DutyReportUpdateProcess"
            component={DutyReportUpdateProcess}
          />
           <Stack.Screen
            name="DutyReportUpdateCancel"
            component={DutyReportUpdateCancel}
          />
          
          <Stack.Screen name="DutyReportUpdate" component={DutyReportUpdate} />
          <Stack.Screen
            name="NotificationDetail"
            component={NotificationDetailScreen}
            options={{
              title: 'Notification',
              headerBackTitle: 'Back',
            }}
          />
          {/* <Stack.Screen
            name="NoticeBoardDetail"
            component={NoticeBoardDetailScreen}
            options={{
              title: 'NoticeBoard',
              headerBackTitle: 'Back',
            }}
          /> */}

<Stack.Screen name="AgentLogin" component={AgentLogin} />
<Stack.Screen name="CheckAgentOtp" component={CheckAgentOtp} />
<Stack.Screen name="AgentPanel" component={AgentPanel} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default Route;
