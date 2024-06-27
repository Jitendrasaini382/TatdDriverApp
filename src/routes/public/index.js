import { createStackNavigator } from '@react-navigation/stack';
import DriverLogin from '../../screens/DriverLogin';
import CheckDriverOtp from '../../screens/CheckDriverOtp';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const PublicRoute =()=> {
  return (
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
        headerShown:false
    }}>
      <Stack.Screen name="DriverLogin" component={DriverLogin} />
      <Stack.Screen name="CheckDriverOtp" component={CheckDriverOtp} />
    </Stack.Navigator>

    </NavigationContainer>
  );
}
export default PublicRoute