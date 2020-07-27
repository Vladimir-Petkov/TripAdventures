import React, { Component, Fragment } from 'react';
import AuthPageNoTrips from './AuthPageNoTrips';
import SingleTrip from './SingleTrip';
// import 'Header.module.css';

class AuthPageWithTrips extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trips: []
        };
    };

    getTrips = async () => {
        const promise = await fetch(`http://localhost:9999/api/trips`);
        const trips = await promise.json();
        this.setState({
            trips
        });
    };

    renderOrigamis() {
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

    render() {
        const { trips } = this.state;

        return <Fragment >
            {trips ? <div id="treks-list">
                {this.renderOrigamis()}
            </div> : <AuthPageNoTrips />}
        </Fragment>
    };
};

export default AuthPageWithTrips;