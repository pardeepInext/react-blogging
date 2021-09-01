import React, { useState, useEffect, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { fetchCategory } from '../slices/categorySlice';
import axios from '../axios';

/* views */
// import Home from "../views/Home";
const Home = React.lazy(() => import("../views/Home"));
import Blog from "../views/Blog";
import Notifications from "../views/Notifications";
import Login from "../views/Login";
import Register from "../views/Register";
import Add from '../views/Add';
import { useSelector, useDispatch } from 'react-redux';
const titleCase = (str) => {
    let title = str.length > 1 ? str.substring(1) : "parsa";
    return title.charAt(0).toUpperCase() + title.slice(1);
};

const App = () => {
    let location = useLocation();
    const dispatch = useDispatch();
    const categoyStatus = useSelector(state => state.category.status)
    // let currentKey = location.pathname.split("/")[1] || "/";
    const [currentUser, setcurrentUser] = useState(localStorage.getItem('user'))
    const changeUser = (user) => setcurrentUser(user);
    const [unreadCount, setunreadCount] = useState(0);
    const [notifications, setnotifications] = useState([]);
    const [isNotificationLoading, setisNotificationLoading] = useState(false);
    const [newNotification, setnewNotification] = useState(0);
    /* changing title for routes */
    let id = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).id;
    useEffect(() => {
        document.title = titleCase(location.pathname);
        scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        if (categoyStatus == 'idle') dispatch(fetchCategory());
    }, [dispatch, categoyStatus]);

    const fetchNotifications = async () => {
        setisNotificationLoading(true);
        await axios.get(`notification/${id}`)
            .then(res => {
                setisNotificationLoading(false);
                setnotifications(res.data.notifications);
                setunreadCount(res.data.unreadcount);
            })
            .catch();
    }


    useEffect(() => { localStorage.getItem('user') && fetchNotifications() }, []);


    // useEffect(() => {

    //     Echo.private(`like.${id}`)
    //         .notification((notification) => {
    //             setnewNotification(newNotification + 1);
    //         });
    // }, [newNotification, notifications]);

    return (
        <>

            <Header unreadCount={unreadCount} newNotification={newNotification} />
            <Suspense fallback={<div>Loading...</div>}>
                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        classNames="fade"
                        timeout={300}
                    >
                        <Switch>
                            <Route path="/" exact >
                                {currentUser ? <Home /> : <Redirect to={'/login'} />}
                            </Route>
                            <Route path="   :id" component={Blog} exact />
                            <Route
                                path="/notification"
                                exact
                            >
                                {currentUser ? <Notifications notifications={notifications} /> : <Redirect to={'/login'} />}
                            </Route>
                            <Route path="/add" exact >
                                {currentUser ? <Add /> : <Redirect to={'/login'} />}
                            </Route>

                            <Route path="/login" exact >
                                {!currentUser ? <Login changeUser={changeUser} /> : <Redirect to={'/'} />}
                            </Route>
                            <Route path="/register" exact>
                                {!currentUser ? <Register changeUser={changeUser} /> : <Redirect to={'/'} />}
                            </Route>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </Suspense>
            <Footer />
        </>
    );
};

export default App;
