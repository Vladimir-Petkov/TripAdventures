import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './Profile.css';
import { withRouter } from "react-router";

const Profile = () => {
    const [username, setUsername] = useState([]);
    const [myTrips, setmyTrips] = useState([]);
    const [myTripsLength, setmyTripsLength] = useState(0);
    const params = useParams();
    const history = useHistory();

    const getUser = useCallback(async () => {
        const id = params.id;
        const response = await fetch(`http://localhost:9999/api/user?id=${id}`);

        if (!response.ok) {
            history.push('/')
        };

        const user = await response.json();

        setUsername(user.username);
    }, [params.id, history]);

    const getMyTrips = useCallback(async () => {
        const id = params.id;
        const response = await fetch(`http://localhost:9999/api/trips`);

        if (!response.ok) {
            history.push('/')
        };

        const trips = await response.json();

        const myTripsArray = [];

        trips.map((t) => {
            if (id === t.creatorId) {
                myTripsArray.push(t);
            } else {
                return null
            }
            return t;
        });

        setmyTrips(myTripsArray);
        setmyTripsLength(myTripsArray.length);
    }, [params.id, history]);

    const renderTrips = () => {
        if (myTrips.length > 0) {
            return myTrips.map((trip) => {
                return <p key={trip._id} >{trip.location}</p>
            });
        } else {
            return <p>No Trips Created</p>
        }
    };

    useEffect(() => {
        getUser();
        getMyTrips();
    }, [getUser, getMyTrips]);

    return <div className="profile col-md-6 text-center col-lg">
        <img className="profile-img" src="/images/user.png" alt='' />
        <br />
        <div className="profile-info">
            <p>Username: <span>{username}</span></p>
            <p className="infoType">Wished {myTripsLength} Trips</p>

            {renderTrips()}
        </div>
    </div>
};

export default withRouter(Profile);