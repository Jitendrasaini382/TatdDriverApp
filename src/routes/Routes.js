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
import { NoticeBoardDetailScreen } from '../components/AllNoticeBoardDetails';
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
          <Stack.Screen name="DriverLogin" component={DriverLogin} />
          <Stack.Screen name="CheckDriverOtp" component={CheckDriverOtp} />
          <Stack.Screen
            name="DriverNotifications"
            component={DriverNotifications}
          />
          <Stack.Screen name="DriverNotice" component={DriverNotice} />

          <Stack.Screen
            name="ClearMyDuePayment"
            component={ClearMyDuePayment}
          />
          <Stack.Screen name="TrustedDriver" component={TrustedDriver} />
          <Stack.Screen name="DriverEarning" component={DriverEarning} />
          <Stack.Screen
            name="MyBonusStatusHistory"
            component={MyBonusStatusHistory}
          />
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
          <Stack.Screen
            name="AgentCommisionAdded"
            component={AgentCommisionAdded}
          />
          <Stack.Screen name="SelectYourState" component={SelectYourState} />
          <Stack.Screen name="SelectYourCity" component={SelectYourCity} />
          <Stack.Screen name="AgentLeads" component={AgentLeads} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default Route;
