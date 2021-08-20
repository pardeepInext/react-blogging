import React, { useState, useEffect, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PrivateRoute from '../components/PrivateRoute';
/* views */
//import Home from "../views/Home";
const Home = React.lazy(() => import("../views/Home"));
import Blog from "../views/Blog";
import Categories from "../views/Categories";
import Contact from "../views/Contact";
import Login from "../views/Login";
import Register from "../views/Register";

const titleCase = (str) => {
    let title = str.length > 1 ? str.substring(1) : "parsa";
    return title.charAt(0).toUpperCase() + title.slice(1);
};

const App = () => {
    let location = useLocation();
    let currentKey = location.pathname.split("/")[1] || "/";
    const [currentUser, setcurrentUser] = useState(localStorage.getItem('user'))
    const changeUser = (user) => setcurrentUser(user);
    /* changing title for routes */
    useEffect(() => {
        document.title = titleCase(location.pathname);
        scrollTo(0, 0);
    }, [location]);
    return (
        <>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <TransitionGroup>
                    <CSSTransition
                        key={currentKey}
                        classNames="fade"
                        timeout={300}
                    >
                        <Switch>
                            <Route path="/" exact >
                                {currentUser ? <Home /> : <Redirect to={'/login'} />}
                            </Route>
                            <Route path="/blog/:id" component={Blog} exact />
                            <Route
                                path="/categories"
                                exact
                            >
                                {currentUser ? <Categories /> : <Redirect to={'/login'} />}
                            </Route>
                            <Route path="/contact" exact >
                                {currentUser ? <Contact /> : <Redirect to={'/login'} />}
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
