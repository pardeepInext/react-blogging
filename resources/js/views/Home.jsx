import React, { useEffect, useState } from "react";
import { Block } from "notiflix";
import Blog from "../components/Blog";
import Category from "../components/Category";
import { useSelector, useDispatch } from 'react-redux';
import { fetchblogs, page } from '../slices/blogSlice';
const Home = () => {
    Block.init({ svgColor: "#fd7e14" });
    const blog = useSelector(state => state.blog);
    const main = useSelector(state => state.main);
    const category = useSelector(state => state.category)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchblogs());
    }, [blog.currentPage, dispatch]);

    useEffect(() => {
        blog.status == "loading" ? Block.arrows('.blog-listing') : Block.remove('.blog-listing');
    }, [blog.status]);


    const Paginate = () => {
        const html = [];
        for (let index = 1; index <= blog.lastPage; index++)
            html.push(
                <li key={index} className="page-item">
                    <a
                        className={`page-link ${blog.currentPage == index ? "active" : ""
                            }`}
                        onClick={() => dispatch(page(index))}
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
                        {category.status == 'complete' && category.categories.map((category) => (
                            <Category key={category.id} {...category} />
                        ))}
                    </div>
                </div>
            </div>
            <section className="section">
                <div className="container">
                    <div className="row blog-listing">
                        {blog.blogs.length > 0 && blog.blogs.map((blog, key) => (
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
