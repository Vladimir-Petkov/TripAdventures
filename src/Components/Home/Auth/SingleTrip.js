import React from 'react';
import { Link } from 'react-router-dom';

const SingleTrip = ({ _id, location, image }) => {

    const mystyle = {
        width: '15rem',
        height: '15rem'
    };

    return (
        <Link to={`/details/${_id}`} className="card overflow-hidden treksPlaceholder trek-details" style={mystyle}>
            <div className="card-body">
                <p className="card-text">{location}</p>
            </div>
            <img className="card-image"
                src={image}
                alt="" />
        </Link>
    )
};

export default SingleTrip;