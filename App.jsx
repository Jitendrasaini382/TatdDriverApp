import React from 'react';
import 'react-native-gesture-handler';
import Route from './src/routes/Routes';
import {LogBox, Text, TextInput} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {GlobalContextApi} from './src/context/GlobalContext';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react'; // Import PersistGate

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
LogBox.ignoreAllLogs();//Ignore all log notifications
const App = () => {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <GlobalContextApi> */}
        <Route />
        {/* </GlobalContextApi> */}
      </PersistGate>
    </Provider>
  );
};
export default App;
