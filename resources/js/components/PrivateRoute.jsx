import React from "react";
import { Redirect, useLocation } from "react-router-dom";
const PrivateRoute = ({ user, children }) => {
    const { location } = useLocation();

    return user.hasOwnProperty("name") ? { children } : <Redirect to={'/login'} />;
};

export default PrivateRoute;
