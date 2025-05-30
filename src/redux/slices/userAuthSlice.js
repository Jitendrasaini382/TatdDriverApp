import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  jwt: null,
  refreshToken: null,
  login: false,
  userProfile: null,
  isFcmSent: false,
  isDeviceInfo: false,
  isRegistered: false,
  driverNumber: null,
};

const userAuth = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    // Action to update specific state keys dynamically
    setUserAuthStates: (state, action) => {
      const {key, value} = action.payload;
      state[key] = value;
    },
    resetUserAuthState: state => {
      state.jwt = null;
      state.refreshToken = null;
      state.login = false;
      state.userProfile = null;
      state.isFcmSent = false;
      state.isDeviceInfo = false;
      state.isRegistered = false;
    },
  },
});

export const {setUserAuthStates, resetUserAuthState} = userAuth.actions;

export default userAuth.reducer;
