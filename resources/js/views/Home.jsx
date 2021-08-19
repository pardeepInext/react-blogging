import React, { useEffect, useState } from "react";
import { Block } from "notiflix";
import axios from "../axios";
import Blog from "../components/Blog";
import Category from "../components/Category";
import { useContegories, useFetchBlog } from "../APIHooks";
const Home = () => {
    Block.init({ svgColor: "#fd7e14" });
    const { categories, isCatLoading } = useContegories();
    const [page, setpage] = useState(1);
    const { blogs, lastPage, currentPage, isBlogFetch } = useFetchBlog(page);

    isCatLoading ? Block.hourglass("#category") : Block.remove("#category");

    isBlogFetch
        ? Block.hourglass("#blog-listing")
        : Block.remove("#blog-listing");

    const Paginate = () => {
        const html = [];
        for (let index = 1; index <= lastPage; index++)
            html.push(
                <li key={index} className="page-item">
                    <a
                        className={`page-link ${
                            currentPage == index ? "active" : ""
                        }`}
                        onClick={() => {
                            setpage(index);
                            console.log(page);
                        }}
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
                    <div className="row" id="blog-listing">
                        {blogs.map((blog, key) => (
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
