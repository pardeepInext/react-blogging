import React, { useEffect } from 'react'
import Notification from '../components/Notification';
import { useForceUpdate } from '../APIHooks';
let id = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).id;
const Notifications = (props) => {
    const { notifications } = props;
    const markAsRead = (id) => {
        console.log(id);
    }

    return (
        <>
            <section className="section">
                <div className="container">
                    {notifications.map(notification => <Notification key={notification.id} {...notification} markAsRead={markAsRead} />)}
                </div>
            </section>
        </>
    )
}

export default Notifications
