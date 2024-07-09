import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentView: 'NOTIFICATIONS',
  toggleButton: false,
  mainToggleModal: false,
  mainToggleContent: false,
  videosContent: false,
  myBookingAgencyModal: false,
  isModalVisible: false,
  bookingModal: false,
  ratingModal: false,
  myBookingModal: false,
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
    setMainToggleModal: (state, action) => {
      state.mainToggleModal = action.payload;
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
        state.mainToggleModal = true;
        state.mainToggleContent = true;
      } else {
        state.toggleButton = false;
        state.mainToggleContent = false;
        state.videosContent = false;
      }
    },
  },
});

export const {
  setCurrentView,
  setToggleButton,
  setMainToggleModal,
  setMainToggleContent,
  setVideosContent,
  setMyBookingAgencyModal,
  setModalVisible,
  setBookingModal,
  setRatingModal,
  setMyBookingModal,
  mainToggleHandle,
} = trustedDriverSlice.actions;

export default trustedDriverSlice.reducer;
