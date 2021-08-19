import React from 'react'
const Category = (props) => {

    const { figure, id, name } = props
    return (
        <div className="col-lg-3 col-sm-6 mb-2 mb-lg-0 px-1 test ms-1 me-1" style={{ width: '328px' }}>
            <article className="card bg-dark text-center text-white border-0 rounded-0">
                <img className="card-img rounded-0 img-fluid w-100" src={figure} alt="post-thumb" style={{ height: "374px" }} />
                <div className="card-img-overlay">
                    <div className="card-content" style={{ marginBottom: "0%" }}>
                        <p className="text-uppercase">{name}</p>
                        <h4 className="card-title mb-4"><a className="text-white" href="blog-single.html">All blogs of {name}</a></h4>
                        <a className="btn btn-outline-light" href="blog-single.html">read more</a>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default Category
