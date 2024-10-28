import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistPartial } from "redux-persist/es/persistReducer";

export interface AuthState extends PersistPartial {
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
  _persist: { version: -1, rehydrated: false },
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
