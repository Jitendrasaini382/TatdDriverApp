import React from 'react';
import 'react-native-gesture-handler';
import Route from './src/routes/Routes';
import {Provider} from 'react-redux';
import store from './src/redux/store';
const App = () => {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};
export default App;
