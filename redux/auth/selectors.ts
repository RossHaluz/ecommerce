
export const selectIsLoading = (state: any) => state.auth.isLoading;

export const selectUserContactDetails = (state: any) =>
  state.auth.userContactDetails;

export const selectMessage = (state: any) => state.auth.message;

export const selectError = (state: any) => state.auth.error;
