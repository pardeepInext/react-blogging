import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";
import axios from '../axios';
import { Notify } from 'notiflix';
const Login = (props) => {
    const [isShow, setisShow] = useState(false);
    const [loginData, setloginData] = useState({ email: "", password: "" });
    const [isLogin, setisLogin] = useState(false);
    const [error, seterror] = useState({})
    let history = useHistory();

    const socialLogin = async (user) => {
        setisLogin(true);
        await axios.post(`socialauth`, user)
            .then(res => {
                setisLogin(false);
                if (res.data.success) {
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    props.changeUser(JSON.stringify(res.data.user));
                    history.push('/');
                }
            })
            .catch(err => {
                setisLogin(false);
                console.log(err);
            });
    }

    const responseGoogle = (e) => {
        const user = {
            name: e.profileObj.name, image: e.profileObj.imageUrl, email: e.profileObj.email
            , provider_id: e.profileObj.googleId
        };
        socialLogin(user)
    };



    const login = async () => {
        setisLogin(true);
        await axios.post(`login`, loginData)
            .then(res => {
                setisLogin(false);
                if (res.data.success) {
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    history.go('/');
                } else seterror(res.data.error);
            })
            .catch(err => {
                setisLogin(false);
            })
    };
    return (
        <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
            <div className="card card0 border-0">
                <div className="row d-flex">
                    <div className="col-lg-6">
                        <div className="card1 pb-5">
                            <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                                <img
                                    src="https://i.imgur.com/uNGdWHi.png"
                                    className="image"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card2 card border-0 px-4 py-5">
                            <div className="row mb-4 px-3">
                                <h6 className="mb-0 mr-4 mt-2">Sign in with</h6>
                                <GoogleLogin
                                    clientId="524551911775-7mui0ta4pbe4tnnfelrofid55suc1im5.apps.googleusercontent.com"
                                    buttonText="Login"
                                    render={(renderProps) => (
                                        <button
                                            onClick={renderProps.onClick}
                                            className="facebook text-center me-3"
                                            disabled={isLogin}
                                        >
                                            {isLogin ? <i className="fas fa-spinner fa-spin"></i> : <i className="fab fa-google"></i>}
                                        </button>
                                    )}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={"single_host_origin"}
                                />
                            </div>
                            <div className="row px-3 mb-4">
                                <div className="line" />
                                <small className="or text-center">Or</small>
                                <div className="line" />
                            </div>
                            <div className="row px-3 mb-4">
                                <label className="mb-1">
                                    <h6 className="mb-0 text-sm">
                                        Email Address
                                    </h6>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter a valid email address"
                                    value={loginData.email}
                                    onChange={(e) =>
                                        setloginData({
                                            ...loginData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                                {error.email ? <span className="fw-bold text-danger">{error.email}</span> : ""}
                            </div>
                            <div className="row px-3">
                                <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Password</h6>
                                </label>
                                <input
                                    type={isShow ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter password"
                                    value={loginData.password}
                                    onChange={(e) =>
                                        setloginData({
                                            ...loginData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                                {error.password ? <span className="fw-bold text-danger">{error.password}</span> : ""}
                            </div>
                            <div className="row px-3 mb-4">
                                <a
                                    className="ml-auto mb-0 text-sm float-end"
                                    onClick={() =>
                                        setisShow((prevState) => !prevState)
                                    }
                                >
                                    {isShow ? "Hide" : "Show"}
                                </a>
                                <a href="#" className="ml-auto mb-0 text-sm">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="row mb-3 px-3">
                                <button
                                    type="button"
                                    className="btn btn-blue text-center"
                                    onClick={login}
                                    disabled={isLogin}
                                >
                                    {isLogin ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
                                </button>
                            </div>
                            <div className="row mb-4 px-3">
                                <small className="font-weight-bold">
                                    Don't have an account?
                                    <Link
                                        className="text-danger "
                                        to="register"
                                    >
                                        Register
                                    </Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
