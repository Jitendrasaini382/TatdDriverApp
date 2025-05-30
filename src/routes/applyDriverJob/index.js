import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {createRef} from 'react';
import SplashScreen from '../../screens/SplashScreen';
import {AppColors} from '../../assets/Colors';
import {useSelector} from 'react-redux';
import ErrorBoundry from '../../utils/ErrorBoundry';
import ApplyForDriverJob from '../../screens/applyForDriverJob/ApplyForDriverJobs';
import RazorPayPaymentScreenDriverJob from '../../screens/applyForDriverJob/RazorPayPaymentScreenDriverJob';
import RegistrationSuccess from '../../screens/applyForDriverJob/RegistrationSuccess';

const Stack = createStackNavigator();
export const navigationRef = createRef();
const ApplyDriverJobRoute = () => {
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
      <Stack.Navigator
        initialRouteName={SplashScreen}
        screenOptions={{headerShown: false}}>
        {isSplash && (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        )}

        <Stack.Screen name="ApplyForDriverJobs">
          {props => <ErrorBoundry Component={ApplyForDriverJob} {...props} />}
        </Stack.Screen>

        <Stack.Screen name="RazorPayPaymentScreenDriverJob">
          {props => (
            <ErrorBoundry
              Component={RazorPayPaymentScreenDriverJob}
              {...props}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RegistrationSuccess">
          {props => <ErrorBoundry Component={RegistrationSuccess} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default ApplyDriverJobRoute;
