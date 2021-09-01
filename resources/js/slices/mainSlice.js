import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [
        {
            id: 1,
            name: "Nature",
            figure: "cat-01.jpg",
        },
        {
            id: 2,
            name: "Lifestyle",
            figure: "cat-02.jpg",
        },
        {
            id: 3,
            name: "Artical",
            figure: "cat-03.jpg",
        },
        {
            id: 4,
            name: "Fashion",
            figure: "cat-04.jpg",
        },
        {
            id: 5,
            name: "Nature",
            figure: "cat-05.jpg",
        },
        {
            id: 6,
            name: "Philosophy",
            figure: "cat-06.jpg",
        },
        {
            id: 7,
            name: "Digital",
            figure: "cat-07.jpg",
        },
    ],
    baseUrl: document.querySelector('meta[name="asset"]').content,
}
const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {

    }
});

export default mainSlice.reducer;