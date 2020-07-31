import React, { Component } from 'react';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            myTrips: [],
            myTripsLength: 0
        };
    };

    componentDidMount() {
        this.getUser(this.props.match.params.userid);
        this.myTrips(this.props.match.params.userid);
        this.renderTrips();
    };

    getUser = async (id) => {
        const response = await fetch(`http://localhost:9999/api/user?id=${id}`);

        if (!response.ok) {
            this.props.history.push('/')
        };

        const user = await response.json();

        this.setState({
            username: user.username
        });
    };

    myTrips = async (id) => {
        const response = await fetch(`http://localhost:9999/api/trips`);

        if (!response.ok) {
            this.props.history.push('/')
        };

        const trips = await response.json();

        const tripArr = [];

        trips.map((t) => {
            if (id === t.creatorId) {
                tripArr.push(t);
            } else {
                return null
            }
            return t;
        });

        this.setState({
            myTrips: tripArr,
            myTripsLength: tripArr.length
        });
    };

    renderTrips() {
        const { myTrips } = this.state;

        if (myTrips.length > 0) {
            return myTrips.map((trip) => {
                return <p key={trip._id} >{trip.location}</p>
            });
        } else {
            return <p>No treks</p>
        }
    };

    render() {
        const {
            username,
            myTripsLength
        } = this.state;

        if (username === null) {
            return (<div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>)
        };

        return <div className="profile col-md-6 text-center col-lg">
            <img className="profile-img" src="/images/user.png" alt='' />
            <br />
            <div className="profile-info">
                <p>Username: <span>{username}</span></p>
                <p className="infoType">Wished {myTripsLength} Trips</p>

                {this.renderTrips()}
            </div>
        </div>
    }
};

export default Profile;