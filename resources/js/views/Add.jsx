import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Quill from 'quill';
import ReactQuill from 'react-quill';
import Cropper from 'cropperjs';
import 'react-quill/dist/quill.snow.css';
import 'cropperjs/src/css/cropper.css';
import axios from '../axios';
import { Notify } from 'notiflix';

const Add = () => {
    //let history = useHistory();

    const fileInput = useRef(null);
    const imageElm = useRef(null);
    const [imagePreview, setimagePreview] = useState("");
    const [imageErr, setimageErr] = useState("");
    const [categories, setcategories] = useState([]);
    const [isCategoryLoading, setisCategoryLoading] = useState(false);
    const [cropper, setCropper] = useState(null);
    const [isblogadded, setisblogadded] = useState(false);
    const [error, seterror] = useState({});
    const [file, setFile] = useState({});
    let history = useHistory();
    const [blogData, setblogData] = useState({
        category_id: "",
        discription: "",
        img: {},
        title: "",
        user_id: JSON.parse(localStorage.getItem('user')).id
    });

    const [module] = useState({
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']
        ]
    });
    const addblog = () => {
        setisblogadded(true);
        let formData = new FormData();
        formData.append('img', file);
        seterror({}); seterror

        for (let key in blogData) {
            formData.append(key, blogData[key]);
        }

        axios.post('blogs', formData, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                "content-type": "multipart/form-data"
            }
        })
            .then(res => {

                if (res.data.success) {
                    Notify.success(res.data.success);
                    history.push('/');
                } else seterror(res.data.errors);


                setisblogadded(false);
            })
            .catch(err => {
                Notify.failure(`ading blog ajax has error ${err.message}`)
                setisblogadded(false);
            })
    }
    const filePreview = (file) => {
        const reader = new FileReader();
        reader.onload = () => setimagePreview(reader.result);
        reader.readAsDataURL(file);
    }
    const changeImage = (e) => {
        setimageErr("");
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
            setFile(file)

        });
    }

    const fetchCategory = () => {
        setisCategoryLoading(true);
        axios.get('/categories', {
            headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}` },
        })
            .then(res => {
                setisCategoryLoading(false);
                setcategories(res.data.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        let cropper = new Cropper(imageElm.current, {
            aspectRatio: 1,
            viewMode: 3,
        });
        setCropper(cropper);
        return () => cropper.destroy();

    }, [imagePreview]);

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <>
            <section className="section">
                <div className="container">

                    {isCategoryLoading ? (
                        <i className="fas fa-spinner fa-pulse"></i>
                    ) : (
                        <>
                            <select className="form-control mb-2" style={{ width: "30%" }} value={blogData.category_id}
                                onChange={(e) => setblogData({ ...blogData, category_id: e.target.value })}
                            >
                                <option value={""}>--Select Category--</option>
                                {categories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}
                            </select>
                            {error.category_id && <span className="text-danger fw-bold">{error.category_id}</span>}
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
                                {error.title && <span className="text-danger fw-bold">{error.title}</span>}
                            </div>

                        </div>
                        <div className="col-6 row">
                            <div className="col-4">
                                <button className="btn btn-primary" onClick={() => fileInput.current.click()}>Add Image</button>
                            </div>
                            <div className="col-8">
                                <img src={imagePreview} className="img-fluid mb-1" style={{ objectFit: 'contain' }} ref={imageElm} />
                                <button className={`btn btn-sm btn-primary ${imagePreview.length <= 0 ? 'd-none' : ""}`} onClick={cropImage}>Crop</button>
                            </div>
                            <input type="file" ref={fileInput} className="d-none" onChange={changeImage} />
                            {imageErr.length > 0 && <span className="text-danger fw-bold">{imageErr}</span>}
                            {error.img && <span className="text-danger fw-bold">{error.img}</span>}
                        </div>
                        <div className="col-12 mb-3 p-1">
                            <ReactQuill value={blogData.discription} onChange={(value) => setblogData({ ...blogData, discription: value })} theme="snow"
                                modules={module}
                            />
                            {error.discription && <span className="text-danger fw-bold">{error.discription}</span>}
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary" onClick={addblog}>
                                {isblogadded ? <i className="fas fa-cog fa-spin"></i> : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Add
