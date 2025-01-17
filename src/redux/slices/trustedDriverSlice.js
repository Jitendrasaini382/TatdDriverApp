import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentView: 'English',
  toggleButton: false,
  expressBookingModal: false,
  mainToggleContent: false,
  videosContent: false,
  myBookingAgencyModal: false,
  isModalVisible: false,
  bookingModal: false,
  ratingModal: false,
  myBookingModal: false,
  splash: true,
  isRefresh: false,
};

const trustedDriverSlice = createSlice({
  name: 'trustedDriver',
  initialState,
  reducers: {
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    setToggleButton: (state, action) => {
      state.toggleButton = action.payload;
    },
    setExpressBookingModal: (state, action) => {
      state.expressBookingModal = action.payload;
    },
    setMainToggleContent: (state, action) => {
      state.mainToggleContent = action.payload;
    },
    setVideosContent: (state, action) => {
      state.videosContent = action.payload;
    },
    setMyBookingAgencyModal: (state, action) => {
      state.myBookingAgencyModal = action.payload;
    },
    setModalVisible: (state, action) => {
      state.isModalVisible = action.payload;
    },
    setBookingModal: (state, action) => {
      state.bookingModal = action.payload;
    },
    setRatingModal: (state, action) => {
      state.ratingModal = action.payload;
    },
    setMyBookingModal: (state, action) => {
      state.myBookingModal = action.payload;
    },
    mainToggleHandle: state => {
      if (!state.toggleButton) {
        state.toggleButton = true;
        // state.expressBookingModal = true;
        state.mainToggleContent = true;
      } else {
        state.toggleButton = false;
        state.mainToggleContent = false;
        state.videosContent = false;
      }
    },
    setSplash: (state, action) => {
      state.splash = action.payload;
    },
    setIsRefresh: (state, action) => {
      state.isRefresh = action.payload;
    },
  },
});

export const {
  setCurrentView,
  setToggleButton,
  setExpressBookingModal,
  setMainToggleContent,
  setVideosContent,
  setMyBookingAgencyModal,
  setModalVisible,
  setBookingModal,
  setRatingModal,
  setMyBookingModal,
  mainToggleHandle,
  setSplash,
  setIsRefresh,
} = trustedDriverSlice.actions;

export default trustedDriverSlice.reducer;
