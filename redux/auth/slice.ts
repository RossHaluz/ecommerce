import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser } from "./operetions";

interface AuthState {
  isLoading: boolean;
  isLoging: boolean;
  user: any;
  token: string | null;
  userContactDetails: any;
  error: string | null;
  message: string;
}

const initialState: AuthState = {
  isLoading: false,
  isLoging: false,
  user: null,
  token: null,
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
    builder
      .addCase(registerUser.pending, (state, __) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoging = true;
        state.token = action.payload.newUser.token;
        state.user = action.payload.newUser;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const { createUserContactDetails, removeUserContactDetails } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
