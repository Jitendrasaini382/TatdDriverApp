import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import DriverLogin from '../../screens/DriverLogin';
import CheckDriverOtp from '../../screens/CheckDriverOtp';
import SplashScreen from '../../screens/SplashScreen';
import {AppColors} from '../../assets/Colors';
import {useSelector} from 'react-redux';
import ErrorBoundry from '../../utils/ErrorBoundry';

const Stack = createStackNavigator();

const PublicRoute = () => {
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
        screenOptions={{
          headerShown: false,
        }}>
        {isSplash && (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        )}

        <Stack.Screen name="DriverLogin">
          {props => <ErrorBoundry Component={DriverLogin} {...props} />}
        </Stack.Screen>

        <Stack.Screen name="CheckDriverOtp">
          {props => <ErrorBoundry Component={CheckDriverOtp} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
};
export default PublicRoute;
