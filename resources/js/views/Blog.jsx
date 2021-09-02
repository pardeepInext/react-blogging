import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Block } from "notiflix";
import RelatedPost from "../components/RelatedPost";
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlog } from '../slices/blogSlice';

const Blog = () => {
    const { id } = useParams();

    const blog = useSelector(state => state.blog.blog.data);
    const loading = useSelector(state => state.blog.blog.loading);
    const dispatch = useDispatch();
    console.log("hello")
    useEffect(() => {
        loading ? Block.arrows(".blog-details") : Block.remove(".blog-details");
    }, [loading]);

    useEffect(() => {
        dispatch(fetchBlog(id));
    }, []);

    return (
        <>
            <section className="section bg-secondary">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h4>{blog.title}</h4>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container blog-details">
                    <div className="row">
                        <div className="col-lg-8">
                            <ul className="list-inline d-flex justify-content-between py-3">
                                <li className="list-inline-item">
                                    <i className="fas fa-user me-2"></i>
                                    Post by{" "}
                                    {blog.user ? blog.user.name : "Loading.."}
                                </li>
                                <li className="list-inline-item">
                                    <i className="far fa-calendar me-2"></i>
                                    {blog.blog_date}
                                </li>
                            </ul>
                            <img
                                src={blog.figure}
                                alt="post-thumb"
                                className="w-100 img-fluid mb-4"
                            />
                            <div className="content pb-1" dangerouslySetInnerHTML={{ __html: blog.discription }}></div>
                        </div>
                        <div className="col-lg-4">
                            <div className="widget">
                                <h6 className="mb-4">Related  Post</h6>
                                {blog.related_post ? (
                                    blog.related_post.length > 0 ?
                                        blog.related_post.map((relatedPost) => (
                                            <RelatedPost
                                                key={relatedPost.id}
                                                {...relatedPost}
                                            />
                                        ))
                                        : <h5>No Related Post Available</h5>)
                                    : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Blog;
