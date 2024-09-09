import { RootState } from "../rootReducer";

export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export const selectUserContactDetails = (state: RootState) =>
  state.auth.userContactDetails;

export const selectMessage = (state: RootState) => state.auth.message;

export const selectError = (state: RootState) => state.auth.error;

