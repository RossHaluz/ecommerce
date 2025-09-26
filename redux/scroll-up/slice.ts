import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isShow: false
}

const scrollUpSlice = createSlice({
    name: 'scrollUp',
    initialState,
    reducers: {
        handleIsShowScrollUp(state, action){
            state.isShow = action.payload
        }
    }
});

export const { handleIsShowScrollUp } = scrollUpSlice.actions;

export const scrollUpReducer = scrollUpSlice.reducer;