import React, { useState, useEffect, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { fetchCategory } from '../slices/categorySlice';
import { fetchNotification, liveCount, liveNotification } from '../slices/notificationSlice';

/* views */
// import Home from "../views/Home";
const Home = React.lazy(() => import("../views/Home"));
import Blog from "../views/Blog";
import Notifications from "../views/Notifications";
import Login from "../views/Login";
import Register from "../views/Register";
import Add from '../views/Add';
import Profile from '../views/Profile';
import { useSelector, useDispatch } from 'react-redux';

const titleCase = (str) => {
    let title = str.length > 1 ? str.substring(1) : "parsa";
    return title.charAt(0).toUpperCase() + title.slice(1);
};

const App = () => {
    let location = useLocation();
    const dispatch = useDispatch();
    const categoyStatus = useSelector(state => state.category.status)
    const [currentUser] = useState(localStorage.getItem('user'))
    const isAuth = useSelector(state => state.user.isAuth);
    const user = useSelector(state => state.user.currentUser);

    /* changing title for routes */

    let id = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).id;
    useEffect(() => {
        document.title = titleCase(location.pathname);
        scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        if (categoyStatus == 'idle') dispatch(fetchCategory());
        if (currentUser || isAuth) dispatch(fetchNotification());

        if (isAuth || currentUser) {
            id = currentUser == null ? user.id : JSON.parse(currentUser).id;
            Echo.private(`like.${id}`)
                .notification((notification) => {
                    dispatch(liveCount(1));
                    dispatch(liveNotification(notification))
                });
        }

    }, [isAuth]);



    return (
        <>

            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        classNames="fade"
                        timeout={300}
                    >
                        <Switch>
                            <Route path="/" exact >
                                {currentUser || isAuth ? <Home /> : <Redirect to={'/login'} />}
                            </Route>
                            <Route path="/blog/:id" component={Blog} exact />
                            <Route
                                path="/notification"
                                exact
                            >
                                {currentUser || isAuth ? <Notifications /> : <Redirect to={'/login'} />}
                            </Route>
                            <Route path="/add" exact >
                                {currentUser || isAuth ? <Add /> : <Redirect to={'/login'} />}
                            </Route>
                            <Route path="/profile" exact >
                                {currentUser || isAuth ? <Profile /> : <Redirect to={'/login'} />}
                            </Route>

                            <Route path="/login" exact >
                                {!currentUser || !isAuth ? <Login /> : <Redirect to={'/'} />}
                            </Route>
                            <Route path="/register" exact>
                                {!currentUser || !isAuth ? <Register /> : <Redirect to={'/'} />}
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
