import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  isLoading: false,
  userContactDetails: null,
  error: "",
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createUserContactDetails(state, action) {
      state.userContactDetails = action.payload;
    },
    removeUserContactDetails(state) {
      state.userContactDetails = null;
    },
  },
});

export const { createUserContactDetails, removeUserContactDetails } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
