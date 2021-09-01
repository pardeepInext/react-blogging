import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogin: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
});

export default userSlice.reducer;