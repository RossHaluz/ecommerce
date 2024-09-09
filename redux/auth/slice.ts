import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoading: boolean;
  userContactDetails: any;
  error: string | null;
  message: string;
}

const initialState: AuthState = {
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
  extraReducers: (builder) => {
  
  },
});

export const { createUserContactDetails, removeUserContactDetails } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
