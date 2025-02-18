import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {createRef} from 'react';
import TrustedDriver from '../../screens/TrustedDriver';
import DriverNotice from '../../screens/DriverNotice';
import DriverEarning from '../../screens/DriverEarning';
import MyBonusStatusHistory from '../../screens/MyBonusStatusHistory';
import TicketsDriver from '../../screens/TicketsDriver';
import DutyReportUpdate from '../../screens/DutyReportUpdate';
import {NotificationDetailScreen} from '../../components/AllNotificationsDetails';
import {NoticeBoardDetailScreen} from '../../components/AllNoticeBoardDetails';
import AgentLogin from '../../screens/AgentLogin';
import DriverNotifications from '../../screens/DriverNotification';
import SplashScreen from '../../screens/SplashScreen';
import {AppColors} from '../../assets/Colors';
import RateYourCustomerFeedback from '../../screens/RateYourCustomerFeedback';
import RateYourCustomer from '../../screens/RateYourCustomer';
import {useSelector} from 'react-redux';
import DueAmountDetails from '../../screens/DueAmountDetails';
import RateUsAtSocialMedia from '../../screens/RateUsAtSocialMedia';
import DueAmount from '../../screens/DueAmount';
import RedirectPopUp from '../../screens/RedirectPopUp';
// import {navigationRef} from '../../utils/navigationRef';
import TenMinuteDriverApply from '../../screens/TenMinuteDriverApply';

const Stack = createStackNavigator();
export const navigationRef = createRef();
const PrivateRoute = () => {
  const isSplash = useSelector(e => e?.trustedDriverSlice?.splash);
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={AppColors.mainColor}
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={false}
      />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={SplashScreen}
          screenOptions={{
            headerShown: false,
          }}>
          {isSplash && (
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
          )}
          <Stack.Screen name="TrustedDriver" component={TrustedDriver} />
          <Stack.Screen
            name="DriverNotifications"
            component={DriverNotifications}
          />
          <Stack.Screen
            name="NotificationDetail"
            component={NotificationDetailScreen}
            options={{
              title: 'Notification',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen name="DriverNotice" component={DriverNotice} />
          <Stack.Screen name="DueAmountDetails" component={DueAmountDetails} />
          <Stack.Screen
            name="NoticeBoardDetail"
            component={NoticeBoardDetailScreen}
            options={{
              title: 'NoticeBoard',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen name="DriverEarning" component={DriverEarning} />
          <Stack.Screen
            name="MyBonusStatusHistory"
            component={MyBonusStatusHistory}
          />
          <Stack.Screen name="TicketsDriver" component={TicketsDriver} />
          <Stack.Screen name="DutyReportUpdate" component={DutyReportUpdate} />
          <Stack.Screen name="AgentLogin" component={AgentLogin} />
          <Stack.Screen name="DueAmount" component={DueAmount} />
          <Stack.Screen
            name="RateUsAtSocialMedia"
            component={RateUsAtSocialMedia}
          />
          <Stack.Screen name="RateYourCustomer" component={RateYourCustomer} />
          <Stack.Screen
            name="RateYourCustomerFeedback"
            component={RateYourCustomerFeedback}
          />
          <Stack.Screen name="RedirectPopUp" component={RedirectPopUp} />
          <Stack.Screen
            name="TenMinuteDriverApply"
            component={TenMinuteDriverApply}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default PrivateRoute;
