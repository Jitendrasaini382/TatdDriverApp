import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux'; // Import combineReducers from Redux
import userAuth from './slices/userAuthSlice';
import trustedDriverSlice from './slices/trustedDriverSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import globalSlice from './slices/globalSlice';

// Combine reducers correctly
const rootReducer = combineReducers({
  userAuth,
  trustedDriverSlice,
  globalSlice
});
const isDevelopment = process.env.NODE_ENV === 'development';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // You want to store the state in AsyncStorage
  blacklist: ['trustedDriverSlice',], // You can blacklist this slice if you don't want it persisted
  whitelist: ['globalSlice','userAuth'], // Persist only the 'userAuth' slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializableCheck warnings
      immutableCheck: isDevelopment, // Only enable in development
    }),
});

export const persistor = persistStore(store); // Create persistor

export default store;
