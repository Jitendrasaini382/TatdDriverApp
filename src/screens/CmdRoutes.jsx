import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ClearMyDuePayment from './ClearMyDuePayment';
import AgentKyc from './AgentKyc';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from '../assets/Colors';
import Header from '../components/Header';

const Tab = createMaterialTopTabNavigator();

const CmdRoutes = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header backButton={true} />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: AppColors.mainColor,
          tabBarInactiveTintColor: '#777',
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            textTransform: 'capitalize',
          },
          tabBarStyle: {backgroundColor: '#fff'},
        }}>
        <Tab.Screen
          initialParams={{routeType: 'Tab'}}
          name="Clear My Due"
          component={ClearMyDuePayment}
        />
        <Tab.Screen
          initialParams={{routeType: 'Tab'}}
          name="Bank Details"
          component={AgentKyc}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default CmdRoutes;
