import {configureStore} from '@reduxjs/toolkit';
import trustedDriverReducer from './slices/trustedDriverSlice';

const store = configureStore({
  reducer: {
    trustedDriver: trustedDriverReducer,
  },
});

export default store;
