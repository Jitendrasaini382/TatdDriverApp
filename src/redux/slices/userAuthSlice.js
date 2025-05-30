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
    resetUserAuthState: () => initialState,
  },
});

export const {setUserAuthStates, resetUserAuthState} = userAuth.actions;

export default userAuth.reducer;
