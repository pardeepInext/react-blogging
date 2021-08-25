import React, { useEffect, useState } from "react";
import { Block, Notify } from "notiflix";
import axios from "../axios";
import Blog from "../components/Blog";
import Category from "../components/Category";
import { useFetchBlog, useCustom } from "../APIHooks";
import ReactHtmlParser from 'react-html-parser';
const Home = () => {
    Block.init({ svgColor: "#fd7e14" });
    let id = JSON.parse(localStorage.getItem('user')).id;
    const [data, setData] = useState({ currentPage: 1, lastPage: 1, isBlogFetch: false });
    const [blogs, setblogs] = useState([]);
    console.log(data);
    const categories = [
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
    ];

    const fetchPost = async () => {
        setData({ ...data, isBlogFetch: true });
        await axios.get(`/blogs?page=${data.currentPage}&current_user=${id}`)
            .then(res => {
                setblogs(res.data.data);
                setData({ isBlogFetch: false, currentPage: res.data.current_page, lastPage: res.data.last_page })
            })
            .catch(err => {
                setData({ isBlogFetch: false });
                Notify.warning(`Blog API has errors ${err.message}`);
            });

    }

    useEffect(() => {
        fetchPost();
    }, [data.currentPage]);


    const Paginate = () => {
        const html = [];
        for (let index = 1; index <= data.lastPage; index++)
            html.push(
                <li key={index} className="page-item">
                    <a
                        className={`page-link ${data.currentPage == index ? "active" : ""
                            }`}
                        onClick={() => setData({ ...data, currentPage: index })}
                    >
                        {index}
                    </a>
                </li>
            );

        return html;
    };

    return (
        <>
            <div className="container-fluid p-sm-0 category" id="category">
                <div className="content">
                    <div className="d-flex">
                        {categories.map((category) => (
                            <Category key={category.id} {...category} />
                        ))}
                    </div>
                </div>
            </div>
            <section className="section">
                <div className="container">
                    <div className="row blog-listing" id="blog-listing">
                        {data.isBlogFetch ? "loading..." : blogs.map((blog, key) => (
                            <Blog
                                {...blog}
                                key={blog.id}
                                blogClass={key % 2 === 0 ? "" : "article-right"}
                            />
                        ))}
                    </div>
                    <div className="row" id="blog-paginate">
                        <div className="col-12">
                            <nav>
                                <ul className="pagination justify-content-center align-items-center">
                                    <li className="page-item">
                                        <span className="page-link">
                                            &laquo; Previous
                                        </span>
                                    </li>
                                    <Paginate />
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            Next &raquo;
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
