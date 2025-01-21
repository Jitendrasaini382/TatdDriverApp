import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import DriverLogin from '../../screens/DriverLogin';
import CheckDriverOtp from '../../screens/CheckDriverOtp';
import SplashScreen from '../../screens/SplashScreen';
import {AppColors} from '../../assets/Colors';
import {useSelector} from 'react-redux';
import CommanWebview from '../../screens/CommanWebview';

const Stack = createStackNavigator();

const PublicRoute = () => {
  const isSplash = useSelector(e => e?.trustedDriverSlice?.splash);

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
          screenOptions={{
            headerShown: false,
          }}>
          {isSplash && (
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
          )}

          <Stack.Screen name="DriverLogin" component={DriverLogin} />
          <Stack.Screen name="CheckDriverOtp" component={CheckDriverOtp} />
          <Stack.Screen name="CommanWebview" component={CommanWebview} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default PublicRoute;
