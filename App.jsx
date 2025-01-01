import React from 'react';
import 'react-native-gesture-handler';
import Route from './src/routes/Routes';
import {LogBox, Text, TextInput} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
LogBox.ignoreAllLogs();

const App = () => {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Route />
      </PersistGate>
    </Provider>
  );
};
export default App;
