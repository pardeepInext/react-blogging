import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

const initialState = {
    count: 0,
    notifications: {},
    loading: false,
    id: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).id,
    markreadloading: false,
};


export const fetchNotification = createAsyncThunk('notification/fetchNotification', async (args, { getState }) => {
    const state = getState();
    let id = state.notification.id == null ? state.user.currentUser.id : state.notification.id;
    const response = await axios.get(`notification/${id}`);
    return response;
});

export const markAsRead = createAsyncThunk('notification/markAsRead', async (id, { getState }) => {
    const state = getState();
    const repsonse = await axios.post('notification', { notification_id: id, id: state.notification.id });
});



export const notificationSlice = createSlice({
    initialState,
    name: 'notification',
    reducers: {
        liveCount: (state, action) => {
            state.count = state.count + action.payload;
        },
        liveNotification: (state, action) => {
            state.notifications.unshift(action.payload);
        }
    },
    extraReducers: {
        [fetchNotification.pending]: (state) => {
            state.loading = true;
        },
        [fetchNotification.fulfilled]: (state, action) => {
            state.count = action.payload.data.unreadcount;
            state.notifications = action.payload.data.notifications;
        },
        [fetchNotification.rejected]: (state, action) => {
            console.log(action.error.message);
        },
    }
})


export default notificationSlice.reducer;

export const { liveCount, liveNotification } = notificationSlice.actions;