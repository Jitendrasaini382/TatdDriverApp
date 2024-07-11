import React from 'react';
import 'react-native-gesture-handler';
import Route from './src/routes/Routes';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import { GlobalContextApi } from './src/context/GlobalContext';
const App = () => {
  return (
    <Provider store={store}>
      <GlobalContextApi>
        <Route />
      </GlobalContextApi>
    </Provider>
  );
};
export default App;
