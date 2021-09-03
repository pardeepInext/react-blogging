import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

const initialState = {
    login: {
        loading: false,
        error: {},

    },
    socialauth: {
        loading: false,
    },
    register: {
        loading: false,
        error: {},
    },
    isAuth: false,
    currentUser: {},
    // id: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).id == 'null' ? currentUser.id : JSON.parse(localStorage.getItem('user')).id,
}

export const userLogin = createAsyncThunk('user/userLogin', async (args) => {
    const response = await axios.post('login', args);
    return response;
});

export const socialAuth = createAsyncThunk('user/socialAuth', async (args) => {
    const response = await axios.post('socialauth', args);
    return response;
});

export const userRegister = createAsyncThunk('user/userRegister', async (args) => {
    const response = await axios.post('register', args);
    return response;
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: {
        [userLogin.pending]: (state) => {
            state.login.loading = true;
        },
        [userLogin.fulfilled]: (state, action) => {
            state.login.loading = false;
            if (action.payload.data.success) {
                state.isAuth = true
                localStorage.setItem('user', JSON.stringify(action.payload.data.user));
                state.currentUser = action.payload.data.user;
            } else state.login.error = action.payload.data.error;
        },
        [userLogin.rejected]: (state, action) => {

        },
        [socialAuth.pending]: (state) => {
            state.socialauth.loading = true;
        },
        [socialAuth.fulfilled]: (state, action) => {
            state.socialauth.loading = false;
            state.isAuth = true;
            localStorage.setItem('user', JSON.stringify(action.payload.data.user));
            state.currentUser = action.payload.data.user;
        },
        [userRegister.pending]: (state) => {
            state.register.loading = true;
        },
        [userRegister.fulfilled]: (state, action) => {
            state.register.loading = false;
            if (action.payload.data.success) {
                state.isAuth = true;
                localStorage.setItem('user', JSON.stringify(action.payload.data.user));
                state.currentUser = action.payload.data.user;
            } else state.register.error = action.payload.data.error;
        }
    }
});

export default userSlice.reducer;