import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
    searchQuery: string;
    searchItems: any
}

const  initialState = {
    searchQuery: '',
    searchItems: []
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
    }
})

export const searchReducer = searchSlice.reducer;