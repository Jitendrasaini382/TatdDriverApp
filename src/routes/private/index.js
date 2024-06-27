import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import TrustedDriver from '../../screens/TrustedDriver';
import DriverNotification from '../../screens/DriverNotification';

const Stack = createStackNavigator();

const PrivateRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="TrustedDriver" component={TrustedDriver} />
        <Stack.Screen
          name="DriverNotification"
          component={DriverNotification}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default PrivateRoute;
