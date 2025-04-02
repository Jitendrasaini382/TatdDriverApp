import {StatusBar} from 'react-native';
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
import ClearMyDuePayment from '../../screens/ClearMyDuePayment';
import SplashScreen from '../../screens/SplashScreen';
import {AppColors} from '../../assets/Colors';
import RateYourCustomerFeedback from '../../screens/RateYourCustomerFeedback';
import RateYourCustomer from '../../screens/RateYourCustomer';
import {useSelector} from 'react-redux';
import DueAmountDetails from '../../screens/DueAmountDetails';
import RateUsAtSocialMedia from '../../screens/RateUsAtSocialMedia';
import DueAmount from '../../screens/DueAmount';
import RedirectPopUp from '../../screens/RedirectPopUp';
import TenMinuteDriverApply from '../../screens/TenMinuteDriverApply';
import AgentPanel from '../../screens/AgentPanel';
import AgentKyc from '../../screens/AgentKyc';
import AgentWallet from '../../screens/AgentWallet';
import SelectYourState from '../../screens/SelectYourState';
import SelectYourCity from '../../screens/SelectYourCity';
import AgentTraining from '../../screens/AgentTraining';
import AgentLeads from '../../screens/AgentLeads';
import AgentCommisionAdded from '../../screens/AgentCommisionAdded';
import CheckAgentOtp from '../../screens/CheckAgentOtp';
import RazorPayPaymentScreen from '../../screens/RazorPayPaymentScreen';
import ThankYouDriverDue from '../../screens/ThankYouDriverDue';
import PremiumDriver from '../../screens/PremiumDriver';
import PremiumDriverRegistration from '../../screens/PremiumDriverRegistration';
import PremiumDriverRegistrationProcess from '../../screens/PremiumDriverRegistrationProcess';
import DriverTrainingModulePhaseThree from '../../screens/DriverTrainingModulePhaseThree';
import DriverTrainingModulePhaseTwo from '../../screens/DriverTrainingModulePhaseTwo';
import DriverTrainingModulePhaseOne from '../../screens/DriverTrainingModulePhaseOne';
import AadharVerification from '../../screens/AadharVerification';
import AadharVerifyOtp from '../../screens/AadharVerifyOtp';
import CompleteVerification from '../../screens/CompleteVerification';
import DriverDocumentsUploads from '../../screens/DriverDocumentsUploads';
import AddNewVerifier from '../../screens/AddNewVerifier';
import ErrorBoundry from '../../utils/ErrorBoundry';
import LocalseAwarenessPartnerRegistration from '../../screens/LocalseAwarenessPartnerRegistration';
import LocalseAwarenessAgentRegistration from '../../screens/LocalseAwarenessAgentRegistration';

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
      <Stack.Navigator
        initialRouteName={SplashScreen}
        screenOptions={{headerShown: false}}>
        {isSplash && (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        )}

        <Stack.Screen name="TrustedDriver">
          {props => <ErrorBoundry Component={TrustedDriver} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="DriverNotifications">
          {props => <ErrorBoundry Component={DriverNotifications} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="NotificationDetail">
          {props => (
            <ErrorBoundry Component={NotificationDetailScreen} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="DriverNotice">
          {props => <ErrorBoundry Component={DriverNotice} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="DueAmountDetails">
          {props => <ErrorBoundry Component={DueAmountDetails} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="NoticeBoardDetail">
          {props => (
            <ErrorBoundry Component={NoticeBoardDetailScreen} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="ClearMyDuePayment">
          {props => <ErrorBoundry Component={ClearMyDuePayment} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="DriverEarning">
          {props => <ErrorBoundry Component={DriverEarning} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="MyBonusStatusHistory">
          {props => (
            <ErrorBoundry Component={MyBonusStatusHistory} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="TicketsDriver">
          {props => <ErrorBoundry Component={TicketsDriver} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="DutyReportUpdate">
          {props => <ErrorBoundry Component={DutyReportUpdate} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AgentLogin">
          {props => <ErrorBoundry Component={AgentLogin} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="DueAmount">
          {props => <ErrorBoundry Component={DueAmount} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="RateUsAtSocialMedia">
          {props => <ErrorBoundry Component={RateUsAtSocialMedia} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="RateYourCustomer">
          {props => <ErrorBoundry Component={RateYourCustomer} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="RateYourCustomerFeedback">
          {props => (
            <ErrorBoundry Component={RateYourCustomerFeedback} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="RedirectPopUp">
          {props => <ErrorBoundry Component={RedirectPopUp} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TenMinuteDriverApply">
          {props => (
            <ErrorBoundry Component={TenMinuteDriverApply} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="AgentPanel">
          {props => <ErrorBoundry Component={AgentPanel} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AgentKyc">
          {props => <ErrorBoundry Component={AgentKyc} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AgentWallet">
          {props => <ErrorBoundry Component={AgentWallet} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SelectYourState">
          {props => <ErrorBoundry Component={SelectYourState} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SelectYourCity">
          {props => <ErrorBoundry Component={SelectYourCity} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AgentTraining">
          {props => <ErrorBoundry Component={AgentTraining} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="CheckAgentOtp">
          {props => <ErrorBoundry Component={CheckAgentOtp} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ThankYouDriverDue">
          {props => <ErrorBoundry Component={ThankYouDriverDue} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="RazorPayPaymentScreen">
          {props => (
            <ErrorBoundry Component={RazorPayPaymentScreen} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="AgentCommisionAdded">
          {props => <ErrorBoundry Component={AgentCommisionAdded} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AgentLeads">
          {props => <ErrorBoundry Component={AgentLeads} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="PremiumDriver">
          {props => <ErrorBoundry Component={PremiumDriver} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="PremiumDriverRegistration">
          {props => (
            <ErrorBoundry Component={PremiumDriverRegistration} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="PremiumDriverRegistrationProcess">
          {props => (
            <ErrorBoundry
              Component={PremiumDriverRegistrationProcess}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="DriverTrainingModulePhaseOne">
          {props => (
            <ErrorBoundry Component={DriverTrainingModulePhaseOne} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="DriverTrainingModulePhaseTwo">
          {props => (
            <ErrorBoundry Component={DriverTrainingModulePhaseTwo} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="DriverTrainingModulePhaseThree">
          {props => (
            <ErrorBoundry
              Component={DriverTrainingModulePhaseThree}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AadharVerification">
          {props => <ErrorBoundry Component={AadharVerification} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AadharVerifyOtp">
          {props => <ErrorBoundry Component={AadharVerifyOtp} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="DriverDocumentsUploads">
          {props => (
            <ErrorBoundry Component={DriverDocumentsUploads} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="CompleteVerification">
          {props => (
            <ErrorBoundry Component={CompleteVerification} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddNewVerifier">
          {props => <ErrorBoundry Component={AddNewVerifier} {...props} />}
        </Stack.Screen>

        <Stack.Screen name="LocalseAwarenessPartnerRegistration">
          {props => (
            <ErrorBoundry
              Component={LocalseAwarenessPartnerRegistration}
              {...props}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="LocalseAwarenessAgentRegistration">
          {props => (
            <ErrorBoundry
              Component={LocalseAwarenessAgentRegistration}
              {...props}
            />
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </>
  );
};

export default PrivateRoute;
