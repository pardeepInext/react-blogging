import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import blogSlice from './slices/blogSlice';
import mainSlice from './slices/mainSlice';
import categorySlice from './slices/categorySlice';
import userSlice from './slices/userSlice';

const store = configureStore({
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
    reducer: {
        blog: blogSlice,
        main: mainSlice,
        category: categorySlice,
        user: userSlice,
    }
})

export default store;