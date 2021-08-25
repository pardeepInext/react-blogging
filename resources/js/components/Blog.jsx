import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from '../axios';
const Blog = (props) => {
    const { category, discription, blog_date, figure, id, title, blogClass, likes_count, like_status_count } =
        props;

    const [isLike, setIsLike] = useState(like_status_count);
    const [likes, setlikes] = useState(likes_count);
    const [isLiking, setisLiking] = useState(false);
    let user_id = JSON.parse(localStorage.getItem('user')).id;

    const toggleLike = async () => {
        setisLiking(true);
        await axios.post('likes', { user_id: user_id, blog_id: id })
            .then(res => {
                setisLiking(false);
                setIsLike(!isLike);
                setlikes(res.data.likesCount);
            })
    }

    return (
        <div className="col-12 mb-100">
            <article
                data-target="article"
                className={`article-full-width ${blogClass}`}
            >
                <div className="post-image">
                    <img className="img-fluid" src={figure} alt="post-thumb" />
                </div>
                <div className="post-content">
                    <ul className="list-inline d-flex justify-content-between border-bottom post-meta pb-2 mb-4">
                        <li className="list-inline-item">
                            <i className="far fa-calendar me-2"></i>
                            {blog_date}
                        </li>
                        <li className="list-inline-item">
                            <i className="fas fa-tags me-2"></i>
                            <span className="eta">{category.name}</span>
                        </li>
                        <li className="list-inline-item">
                            {isLiking ? <i className="fas fa-spinner fa-spin me-2" style={{ color: 'red' }}></i> : <i className={`${isLike ? `fas fa-heart` : `far fa-heart`} me-2 `} style={{ color: 'red', cursor: 'pointer' }} onClick={toggleLike}></i>}
                            <span className="eta">{likes}</span>
                        </li>
                    </ul>
                    <h4 className="mb-4">
                        <Link className="text-dark" to={`blog/${category.id}`}>
                            {title}
                        </Link>
                    </h4>
                    <p className="mb-0 post-summary">
                        {discription.length > 100
                            ? `${discription.substring(0, 100)}....`
                            : discription}
                    </p>
                    <Link
                        className="btn btn-transparent mb-4"
                        to={`blog/${category.id}`}
                    >
                        Continue...
                    </Link>
                </div>
            </article>
        </div>
    );
};

export default Blog;
