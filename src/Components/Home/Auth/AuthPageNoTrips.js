import React from 'react';
import { Link } from 'react-router-dom';

const AuthPageNoTrips = () => {
    return <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div id="fouronefour">
                    <img className="no-found-picture" src="/images/empty.jpg" alt='' />
                </div>
                <div className="no-found-template">
                    <h1>
                        There aren't any Trip, yet!</h1>
                    <h2>
                        What do you have in mind?</h2>
                    <div className="no-found-details">
                        Be the first explorer!
            </div>
                    <div className="actions">
                        <Link to='/create' className="btn btn-dark btn-lg">Create the first Trip? </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default AuthPageNoTrips;
