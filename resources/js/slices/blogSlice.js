import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios';
import { Notify } from 'notiflix';
import history from '../history';
const initialState = {
    name: "test",
    currentPage: 1,
    lastPage: 0,
    status: 'idle',
    blogs: [],
    quillModule: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],

            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']
        ]
    },
    addBlog: {
        isblogAdded: false,
        error: {},
        success: false,
    }
}

export const fetchblogs = createAsyncThunk('blog/fetchBlogs', async (arg, { getState }) => {
    let state = getState();
    const response = await axios.get(`blogs?page=${state.blog.currentPage}`)
    return response;
});

export const insertBlog = createAsyncThunk('blog/insertBlog', async (blog) => {
    const formData = new FormData();
    for (const key in blog) formData.append(key, blog[key]);
    const response = await axios.post('blogs', formData);
    return response
});

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        page: (state, action) => {
            state.currentPage = action.payload
        },

    },
    extraReducers: {
        [fetchblogs.pending]: (state, action) => {
            state.status = "loading"
        },
        [fetchblogs.fulfilled]: (state, action) => {
            state.status = "completed";
            state.blogs = action.payload.data.data;
            state.lastPage = action.payload.data.last_page;
        },
        [fetchblogs.rejected]: (state, action) => {
            Notify.warning(action.error.message);
        },
        [insertBlog.pending]: (state, action) => {
            state.addBlog.isblogAdded = true;
        },
        [insertBlog.fulfilled]: (state, action) => {
            state.addBlog.isblogAdded = false;
            action.payload.data.success ? state.addBlog.success = true : state.addBlog.error = action.payload.data.errors;
        }
    }
});

export const { page } = blogSlice.actions;
export default blogSlice.reducer

