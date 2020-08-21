import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { withRouter } from "react-router";
import userService from '../../Helpers/userService';
import UserContext from '../../../Context';
import { toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setusernameError] = useState(false);
    const [passwordError, setpasswordError] = useState(false);
    const context = useContext(UserContext);
    const history = useHistory();

    const handleUsernameBlur = () => {
        if (username.length < 4 || username.length > 8) {
            setusernameError(true);
        } else {
            setusernameError(false);
        };
    };

    const handlePasswordBlur = () => {
        if (password.length < 5 || password.length > 16) {
            setpasswordError(true);
        } else {
            setpasswordError(false);
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (usernameError || passwordError) {
            return
        }

        await userService('http://localhost:9999/api/user/login', {
            username,
            password
        }, (user) => {
            context.logIn(user);
            toast.success('Successfully Logged In');
            history.push('/')
        }, (e) => {
            toast.error('Wrong username or password, please try again later');
            setUsername('');
            setPassword('');
        }
        );
    };

    const mystyle = {
        textAlign: 'center',
        color: "red"
    };

    return <form onSubmit={handleSubmit} method="POST">
        <div className="text-center mb-4">
            <h1 className="h3 mb-3 font-weight-normal">Login</h1>
        </div>

        <div className="form-label-group">
            {usernameError ? <div style={mystyle} >Username must be between 4 and 8 characters long</div> : null}
            <label htmlFor="inputUsername">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                onBlur={handleUsernameBlur} className="form-control" required />
        </div>

        <div className="form-label-group">
            {passwordError ? <div style={mystyle} >Password must be between 5 and 16 characters long</div> : null}
            <label htmlFor="inputPassword">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handlePasswordBlur} className="form-control" required />
        </div>

        <br />
        <button className="btn btn-lg btn-dark btn-block" type="submit">Login</button>

        <div className="text-center mb-4">
            <p className="alreadyUser"> Don't have account? Then just register
        <Link to="/register"> Here</Link>!
    </p>
        </div>

        <p className="mt-5 mb-3 text-muted text-center">© TripAdventures - 2019.</p>
    </form>
};

export default withRouter(Login);