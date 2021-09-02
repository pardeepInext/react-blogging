import React, { useEffect } from 'react'
import Notification from '../components/Notification';
import { useSelector, useDispatch } from 'react-redux';
const Notifications = () => {
    // const { notifications } = props;
    // const markAsRead = (id) => {
    //     console.log(id);
    // }
    const notification = useSelector(state => state.notification);
    return (
        <>
            <section className="section">
                <div className="container">
                    {notification.loading && notification.notifications.map(notification => <Notification key={notification.id} {...notification} />)}
                </div>
            </section>
        </>
    )
}

export default Notifications
