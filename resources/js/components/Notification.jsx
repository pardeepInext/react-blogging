import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const Notification = (notification) => {
    const { data, id, read_at, markAsRead } = notification;
    let userId = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).id;
    return (
        <div className="alert alert-primary mb-5 notification-alert" role="alert" >
            {data.user && (<figure className="figure">
                <img src={data.user.profile_image} className="figure-img rounded-circle notification-img" alt="..." />
                <figcaption className="figure-caption text-center">{data.user.name}</figcaption>
            </figure>)}
            {typeof read_at == "object" ? <a className="float-end" onClick={() => markAsRead(id)}>Mark As Read</a> : (<span className="float-end"><i className="fas fa-check"></i>Read</span>)}
            <hr />
            <p>Likes your <Link to={`/blog/${data.blog.id}`}>{data.blog.title}</Link></p>
        </div >

    )
}

export default Notification
