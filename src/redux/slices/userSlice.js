import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  username: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {setUsername, setLoggedIn} = userSlice.actions;
export default userSlice.reducer;
