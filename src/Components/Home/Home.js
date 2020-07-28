import React, { Component, Fragment } from 'react';
import UserContext from '../../Context';
import GuestPage from './Guest/GuestPage';
import AuthPageWithTrips from './Auth/AuthPageWithTrips';
// import 'Header.module.css';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            loggedIn: false,
            user: null
        };
    };
    static contextType = UserContext;

    componentDidMount() {
        const { loggedIn, user } = this.context;

        this.setState({
            loggedIn,
            user
        })
    }

    render() {
        const { loggedIn } = this.state;

        return <Fragment >
            {loggedIn ? <AuthPageWithTrips /> : <GuestPage />}
        </Fragment>
    };
};

export default Home;