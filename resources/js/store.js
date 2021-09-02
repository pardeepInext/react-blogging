import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import blogSlice from './slices/blogSlice';
import mainSlice from './slices/mainSlice';
import categorySlice from './slices/categorySlice';
import userSlice from './slices/userSlice';
import notificationSlice from './slices/notificationSlice';

const store = configureStore({
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
    reducer: {
        blog: blogSlice,
        main: mainSlice,
        category: categorySlice,
        user: userSlice,
        notification: notificationSlice,
    }
})

export default store;