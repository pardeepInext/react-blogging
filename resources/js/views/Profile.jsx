import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popover, Modal } from 'bootstrap';
import Cropper from 'cropperjs';

import 'cropperjs/dist/cropper.min.css';

const Profile = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const [user, setuser] = useState(localStorage.getItem('user'));
    const [pichover, setpichover] = useState(false);
    const nameRef = useRef(null);
    const nameFormRef = useRef(null);
    const modalRef = useRef(null);
    const imgElm = useRef(null);
    const [name, setname] = useState("");
    const [popoverShow, setpopoverShow] = useState(false);
    const [imagePreview, setimagePreview] = useState("");
    const [cropper, setcropper] = useState(null);
    const [modal, setmodal] = useState(null);
    const [popover, setpopover] = useState(null);

    const imageChange = (e) => {
        const reader = new FileReader;
        reader.onload = () => setimagePreview(reader.result);
        reader.readAsDataURL(e.target.files[0]);

        modal.show();

        // modalRef.current.addEventListener('show.bs.modal', () => {

        //     cropper.destroy();

        //     let cropper = new Cropper(imgElm.current, {
        //         aspectRatio: 16 / 9,
        //         viewMode: 3,
        //     });
        //     setcropper(cropper);
        // });

    }

    const updateName = () => {
        console.log("hello");
    }

    useEffect(() => {
        const currentuser = user ? JSON.parse(user) : currentUser;
        setuser(currentuser);

        let namePopover = new Popover(nameRef.current, {
            animation: true,
            html: true,
            content: nameFormRef.current,
            trigger: 'click'
        });
        setpopover(namePopover)
        const modal = new Modal(modalRef.current, {
            backdrop: "static",
            keyboard: true,
            focus: true,
        });

        setmodal(modal);

        nameRef.current.addEventListener('hide.bs.popover', () => setpopoverShow(false));
        nameRef.current.addEventListener('shown.bs.popover', () => setpopoverShow(true));

        return () => {
            // nameRef.current.removeEventListener('hide.bs.popover');
            // nameRef.current.removeEventListener("shown.bs.popover");
        }

    }, []);


    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-4 d-flex flex-column align-items-center profile-column">
                        <div className={`rounded mx-auto d-block profile-pic ${pichover && 'profile-pic-hover'}`} onMouseEnter={() => setpichover(true)} onMouseLeave={() => setpichover(false)}>
                            <label className={`-label ${pichover && 'profile-lable-hover'}`} htmlFor="img-file">
                                <i className="fas fa-camera-retro" style={{ color: '#fff' }}></i>
                            </label>
                            <img src={user.profile_image} />
                            <input type="file" id="img-file" className="d-none" onChange={imageChange} accept="image" />
                        </div>
                        <span className="eta my-1">{user.name} <i className="fas fa-pencil-alt" ref={nameRef} id="name"></i></span>
                        {typeof user.provider_id == 'string' ? <span className="eta my-1">{user.email}</span> : <span className="my-1">Social Login</span>}
                    </div>
                    <div className="col-8">
                    </div>
                </div>
            </div>
            <div ref={nameFormRef} className={popoverShow ? "" : "d-none"}>
                <button type="button" className="btn-sm btn-close float-end" aria-label="Close" style={{ cursor: 'pointer' }} onClick={() => console.log("hello")}></button>
                <div className={`form-inline position-relative ml-lg-4 ${popoverShow ? "" : "d-none"}`}>
                    <input className="form-control" type="text" placeholder="enter new name" value={name} onChange={e => setname(e.target.value)} />
                    <button className="btn btn-primary" onClick={updateName}>Update</button>
                </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <img src={imagePreview} className="img-fluid mx-auto d-block" ref={imgElm} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" >Crop</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </section >
    )
}

export default Profile
