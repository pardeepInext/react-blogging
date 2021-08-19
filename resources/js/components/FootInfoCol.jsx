import React from 'react'

const FootInfoCol = (props) => {
    const { header, first, second } = props
    return (
        <div className="col-md-3 col-sm-6 mb-4 mb-md-0">
            <h6>{header}</h6>
            <ul className="list-unstyled">
                <li className="font-secondary text-dark">{first}</li>
                <li className="font-secondary text-dark">{second}</li>
            </ul>
        </div>
    )
}

export default FootInfoCol
