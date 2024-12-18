// src/redux/slices/globalSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  languageSwitch: 'hindi',
  ticketsData: [],
  faqData: [],
  rating: 0,
  buttonShow: false,
  showButtonText: '',
  storedRating: null,
  notificationData: [],
};

const globalSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    // Update a specific state key dynamically
    setGlobalState: (state, action) => {
      const { key, value } = action.payload;
      if (state.hasOwnProperty(key)) {
        state[key] = value;
      }
    },

    // Actions for specific state updates
    setLanguageSwitch: (state, action) => {
      state.languageSwitch = action.payload;
    },
    setTicketsData: (state, action) => {
      state.ticketsData = action.payload;
    },
    setFaqData: (state, action) => {
      state.faqData = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setButtonShow: (state, action) => {
      state.buttonShow = action.payload;
    },
    setShowButtonText: (state, action) => {
      state.showButtonText = action.payload;
    },
    setStoredRating: (state, action) => {
      state.storedRating = action.payload;
    },
    setNotificationData: (state, action) => {
      state.notificationData = action.payload;
    },
  },
});

export const {
  setGlobalState,
  setLanguageSwitch,
  setTicketsData,
  setFaqData,
  setRating,
  setButtonShow,
  setShowButtonText,
  setStoredRating,
  setNotificationData,
} = globalSlice.actions;

export default globalSlice.reducer;
