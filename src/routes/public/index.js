import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import DriverLogin from '../../screens/DriverLogin';
import CheckDriverOtp from '../../screens/CheckDriverOtp';

const Stack = createStackNavigator();

const PublicRoute = () => {
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
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="DriverLogin" component={DriverLogin} />
          <Stack.Screen name="CheckDriverOtp" component={CheckDriverOtp} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default PublicRoute;