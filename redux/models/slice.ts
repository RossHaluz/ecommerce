import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getModels } from "./operetions";

const initialState: any = {
  isLoading: false,
  models: [],
  currentModel: null,
  model: null,
  error: null,
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setSelectModel(
      state,
      action: PayloadAction<{ id: string; name: string } | null>
    ) {
      state.currentModel = action.payload;
    },
    removeSelectedModel(state) {
      state.currentModel = null;
    },
    setModel(
      state,
      action: PayloadAction<{ id: string; name: string } | null>
    ) {
      state.model = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getModels.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getModels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.models = action.payload;
      })
      .addCase(getModels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectModel, removeSelectedModel, setModel } =
  modelSlice.actions;

export const modelReducer = modelSlice.reducer;
