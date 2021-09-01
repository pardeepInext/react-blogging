import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
const AuthImage = () => {
    const baseUrl = useSelector(state => state.main.baseUrl);
    return (
        <div className="col-lg-6">
            <div className="card1 pb-5">
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                    <img
                        src={`${baseUrl}images/login.png`}
                        className="image"
                    />
                </div>
            </div>
        </div>
    )
}

export default AuthImage
