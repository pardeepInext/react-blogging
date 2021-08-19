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
    const [blogs, setBlogs] = useState([]);
    const [lastPage, setLastPage] = useState();
    const [currentPage, setcurrentPage] = useState(page)
    const [isBlogFetch, setisBlogFetch] = useState(false);

    const fetchPost = async () => {
        setisBlogFetch(true);
        await axios.get(`/blogs?page=${currentPage}`)
            .then(res => {
                setBlogs(res.data.data);
                setisBlogFetch(false);
                setLastPage(res.data.meta.last_page);
                setcurrentPage(res.data.meta.current_page);
            })
            .catch(err => {
                setisBlogFetch(false);
                Notify.warning(`Blog API has errors ${err.message}`);
            });

    }

    useEffect(() => { fetchPost() }, [currentPage])

    return { blogs, lastPage, currentPage, isBlogFetch };
}




export { useContegories, useFetchBlog }