import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import userAuth from './slices/userAuthSlice';
import trustedDriverSlice from './slices/trustedDriverSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalSlice from './slices/globalSlice';
import {thunk} from 'redux-thunk';
import persistReducer from 'redux-persist/es/persistReducer';

const rootReducer = combineReducers({
  userAuth,
  trustedDriverSlice,
  globalSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['trustedDriverSlice'],
  whitelist: ['globalSlice', 'userAuth'],
};

const persistedreducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk];

const store = configureStore({
  reducer: persistedreducer,
  middleware: () => [...middleware],
});

export default store;
