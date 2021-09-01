import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { insertBlog } from '../slices/blogSlice';
import Cropper from 'cropperjs';
import 'react-quill/dist/quill.snow.css';
import 'cropperjs/dist/cropper.min.css';
import { Notify } from 'notiflix';
import axios from '../axios';
const Add = () => {
    const fileInput = useRef(null);
    const imageElm = useRef(null);
    const [imagePreview, setimagePreview] = useState("");
    const [imageErr, setimageErr] = useState("");
    const [cropper, setCropper] = useState(null);
    const [cropCount, setcropCount] = useState(0);
    const quillModule = useSelector(state => state.blog.quillModule);
    const category = useSelector(state => state.category);
    let history = useHistory();
    const dispatch = useDispatch();

    const addblog = useSelector(state => state.blog.addBlog);
    const [blogData, setblogData] = useState({
        category_id: "",
        discription: "",
        img: {},
        title: "",
        user_id: JSON.parse(localStorage.getItem('user')).id
    });

    const filePreview = (file) => {
        const reader = new FileReader();
        reader.onload = () => setimagePreview(reader.result);
        reader.readAsDataURL(file);
    }
    const changeImage = (e) => {
        setimageErr("");
        setcropCount(0);
        e.target.files[0].type.split("/")[0] != "image" ? setimageErr("File must be an image") : filePreview(e.target.files[0]);
    }

    const cropImage = () => {
        let canvas = cropper.getCroppedCanvas({
            width: 798,
            height: 345
        });
        canvas.toBlob((blob) => {
            let file = new File([blob], "test")
            filePreview(file);
            setblogData({ ...blogData, img: file });
            setcropCount(1);
        });
    }

    if (addblog.success) {
        Notify.success("Blog is added successfully");
        history.push('/');
    }

    const addBlog = () => {
        dispatch(insertBlog(blogData));
    }


    useEffect(() => {
        let cropper = new Cropper(imageElm.current, {
            aspectRatio: 1,
            viewMode: 3,
        });
        setCropper(cropper);
        if (cropCount > 0) cropper.destroy();
        return () => cropper.destroy();

    }, [imagePreview, cropCount]);


    return (
        <>
            <section className="section">
                <div className="container">

                    {category.status == 'loading' ? (
                        <i className="fas fa-spinner fa-pulse"></i>
                    ) : (
                        <>
                            <select className="form-control mb-2" style={{ width: "30%" }} value={blogData.category_id}
                                onChange={(e) => setblogData({ ...blogData, category_id: e.target.value })}
                            >
                                <option value={""}>--Select Category--</option>
                                {category.categories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}
                            </select>
                            {addblog.error.category_id && <span className="text-danger fw-bold">{addblog.error.category_id}</span>}
                        </>
                    )}

                    <div className="row mb-2">
                        <div className="col-6">
                            <div className="form-group">
                                <input type="text" className="form-control" id="exampleFormControlInput1"
                                    placeholder="add blog title"
                                    value={blogData.title}
                                    onChange={(e) => setblogData({ ...blogData, title: e.target.value })}
                                />
                                {addblog.error.title && <span className="text-danger fw-bold">{addblog.error.title}</span>}
                            </div>

                        </div>
                        <div className="col-6 row">
                            <div className="col-4">
                                <button className="btn btn-primary" onClick={() => fileInput.current.click()}>Add Image</button>
                            </div>
                            <div className="col-8">
                                <img src={imagePreview} className="img-fluid mb-1" style={{ objectFit: 'contain' }} ref={imageElm} />
                                {cropCount == 0 && <button className={`btn btn-sm btn-primary ${imagePreview.length <= 0 ? 'd-none' : ""}`} onClick={cropImage}>Crop</button>}
                            </div>
                            <input type="file" ref={fileInput} className="d-none" onChange={changeImage} />
                            {imageErr.length > 0 && <span className="text-danger fw-bold">{imageErr}</span>}
                            {addblog.img && <span className="text-danger fw-bold">{addblog.error.img}</span>}
                        </div>
                        <div className="col-12 mb-3 p-1">
                            <ReactQuill value={blogData.discription} onChange={(value) => setblogData({ ...blogData, discription: value })} theme="snow"
                                modules={quillModule}
                            />
                            {addblog.error.discription && <span className="text-danger fw-bold">{addblog.error.discription}</span>}
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary" onClick={addBlog}>
                                {addblog.isblogAdded ? <i className="fas fa-cog fa-spin"></i> : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Add
