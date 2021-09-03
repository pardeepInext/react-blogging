import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { socialAuth } from '../slices/userSlice';
import { GoogleLogin } from "react-google-login";
const SocialLogin = () => {
    const socialauth = useSelector(state => state.user.socialauth);
    const dispatch = useDispatch();

    const responseGoogle = (e) => {
        const user = {
            name: e.profileObj.name, image: e.profileObj.imageUrl, email: e.profileObj.email
            , provider_id: e.profileObj.googleId
        };
        console.log(e);
        dispatch(socialAuth(user));
    };

    return (
        <>
            <div className="row mb-4 px-3 d-flex justify-content-center">
                <h6 className="mb-0 me-4 mt-2" style={{ width: '30%' }}>Sign in with</h6>
                <GoogleLogin
                    clientId="524551911775-7mui0ta4pbe4tnnfelrofid55suc1im5.apps.googleusercontent.com"
                    buttonText="Login"
                    render={(renderProps) => (
                        <button
                            onClick={renderProps.onClick}
                            className="facebook btn-primary text-center me-3"
                            disabled={socialauth.loading}
                        >
                            {socialauth.loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fab fa-google"></i>}
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
        </>
    )
}

export default SocialLogin
