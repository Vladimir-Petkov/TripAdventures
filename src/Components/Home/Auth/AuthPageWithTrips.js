import React, { Component, Fragment } from 'react';
import AuthPageNoTrips from './AuthPageNoTrips';
import SingleTrip from './SingleTrip';
// import 'Header.module.css';

class AuthPageWithTrips extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trips: [],
            haveTrips: false
        };
    };

    getTrips = async () => {
        const promise = await fetch(`http://localhost:9999/api/trips`);
        const trips = await promise.json();
        this.setState({
            trips
        });
    };

    renderTrips() {
        const { trips } = this.state;

        return trips.map((trip, index) => {
            return (
                <SingleTrip key={trip._id} {...trip} />
            )
        });
    };

    componentDidMount() {
        this.getTrips();
    };

    componentDidUpdate() {
        const { trips, haveTrips } = this.state;

        if (trips.length > 0) {
            if (haveTrips) {
                return
            } else {
                this.setState({
                    haveTrips: true
                });
            }
        } else if (trips.length === 0) {
            if (haveTrips) {
                this.setState({
                    haveTrips: false
                });
            } else {
                return
            }
        }
    };

    render() {
        const { haveTrips } = this.state;

        return <Fragment >
            {haveTrips ? <div id="treks-list">
                {this.renderTrips()}
            </div> : <AuthPageNoTrips />}
        </Fragment>
    };
};

export default AuthPageWithTrips;