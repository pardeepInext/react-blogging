import React, { useEffect, useState } from 'react';
import axios from './axios';
import { Notify } from 'notiflix';

const useContegories = () => {
    const [categories, setcategories] = useState([]);
    const [isCatLoading, setisCatLoading] = useState(false);
    const fetchCategory = async () => {
        setisCatLoading(true);
        await axios.get("/categories")
            .then(res => {
                setisCatLoading(false);
                setcategories(res.data.data);
            })
            .catch(err => {
                setisCatLoading(false);
                Notify.warning(`category API has errors ${err.message}`);
            });
    }

    useEffect(() => { fetchCategory() }, []);

    return { categories, isCatLoading };
}

const useFetchBlog = (page) => {
    // const [blogs, setBlogs] = useState([]);
    // const [lastPage, setLastPage] = useState();
    // const [currentPage, setcurrentPage] = useState(0);
    // const [isBlogFetch, setisBlogFetch] = useState(false);
    let id = JSON.parse(localStorage.getItem('user')).id;
    const [data, setData] = useState({ currentPage: 1, lastPage: 1, blogs: [], isBlogFetch: false })

    const fetchPost = async () => {
        setData({ ...data, isBlogFetch: true });
        await axios.get(`/blogs?page=${page}&current_user=${id}`)
            .then(res => {
                setData({ ...data, blogs: res.data.data, isBlogFetch: false, currentPage: res.data.current_page, lastPage: res.data.last_page })
            })
            .catch(err => {
                setisBlogFetch(false);
                Notify.warning(`Blog API has errors ${err.message}`);
            });

    }

    useEffect(() => { fetchPost() }, [page])
    console.log(data);
    return data;
}

const useForceUpdate = () => {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}


const useCustom = (counter) => {
    const [newCounter, setnewCounter] = useState(counter);

    useEffect(() => {
        setnewCounter(`new Counter is ${counter}`);
    }, [counter])

    return newCounter;

}


export { useContegories, useFetchBlog, useCustom, useForceUpdate }