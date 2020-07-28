import React, { Component } from 'react';
// import 'Header.module.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import UserContext from '../../Context';

class Header extends Component {

    static contextType = UserContext;

    logout = () => {
        this.context.logOut();
    };

    render() {
        const { loggedIn, user } = this.context;

        return <nav className="site-header sticky-top py-1">
            <div className="container d-flex flex-column flex-md-row justify-content-between">
                <Link className="py-3" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="none" stroke="currentColor"
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="d-block mx-auto" role="img"
                        viewBox="0 0 70.617 70.617" focusable="false">
                        <title>TripAdventures</title>
                        <path d="M70.031,46.254L51.69,27.912c-0.78-0.781-2.047-0.781-2.828,0l-7.281,7.28L28.028,21.639
    c-0.75-0.75-2.078-0.75-2.828,0L0.586,46.253c-0.572,0.572-0.743,1.433-0.434,2.18S1.191,49.667,2,49.667l29.936-0.003
    c0.531,0,1.039-0.211,1.414-0.586l8.231-8.229l8.232,8.232c0.375,0.375,0.884,0.586,1.414,0.586l17.39,0.001
    c0.809,0,1.538-0.487,1.848-1.234S70.604,46.826,70.031,46.254z" />
                    </svg>
                </Link>

                {loggedIn && <Link className="py-3 d-none d-md-inline-block" to="/create">Create Trip</Link>}
                {loggedIn && <Link className="py-3 d-none d-md-inline-block" to={`/profile/${user.id}`}>Hello, {user.username}</Link>}
                {loggedIn && <a className="py-3 d-none d-md-inline-block" href="/" onClick={this.logout}>Logout</a>}
                {!loggedIn && <Link className="py-3 d-none d-md-inline-block" to="/login">Login</Link>}
                {!loggedIn && <Link className="py-3 d-none d-md-inline-block" to="/register" >Register</Link>}
            </div>
        </nav>
    }
};

export default withRouter(Header);