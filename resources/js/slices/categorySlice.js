import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix';
import axios from '../axios';
const initialState = {
    categories: [],
    status: 'idle',
};

export const fetchCategory = createAsyncThunk('category/fetchCategory', async () => {
    const response = await axios.get('categories');
    return response;
})
export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchCategory.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchCategory.rejected]: (state, action) => {
            Notify.warning(`error in fetch category ${action.error.message}`);
        },
        [fetchCategory.fulfilled]: (state, action) => {
            state.status = "complete";
            state.categories = action.payload.data.data;
        }
    }


})

export default categorySlice.reducer;
