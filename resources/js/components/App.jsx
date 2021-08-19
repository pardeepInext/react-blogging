import React, { useState, useEffect, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
                            <Route path="/" component={Home} exact />
                            <Route path="/blog/:id" component={Blog} />
                            <Route
                                path="/categories"
                                component={Categories}
                                exact
                            />
                            <Route path="/contact" component={Contact} exact />
                            <Route path="/login" component={Login} exact />
                            <Route
                                path="/register"
                                component={Register}
                                exact
                            />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </Suspense>
            <Footer />
        </>
    );
};

export default App;
