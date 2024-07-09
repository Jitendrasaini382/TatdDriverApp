import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import trustedDriverSlice from './slices/trustedDriverSlice';

const rootReducer = combineReducers({
  user: userSlice,
  trustedDriverSlice : trustedDriverSlice,
});

export default rootReducer;