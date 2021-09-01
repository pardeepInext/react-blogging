import React from "react";
import { Link } from "react-router-dom";
const RelatedPost = (props) => {
    const { id, title, user, blog_date, figure, discription } = props;
    return (
        <div className="media mb-4">
            <div className="post-thumb-sm me-3">
                <img className="img-fluid" src={figure} alt="post-thumb" />
            </div>
            <div className="media-body">
                <ul className="list-inline d-flex justify-content-between mb-2">
                    <li className="list-inline-item">
                        Post By {user ? user.name : "Loading.."}
                    </li>
                    <li className="list-inline-item">{blog_date}</li>
                </ul>
                <h6>
                    <Link className="text-dark" to={`/blog/${id}`}>
                        {discription.length > 30
                            ? discription.substr(0, 30)
                            : discription}
                    </Link>
                </h6>
            </div>
        </div>
    );
};

export default RelatedPost;
