import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../Helpers/userService';
import UserContext from '../../../Context';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            usernameError: false,
            passwordError: false,
        };
    };

    static contextType = UserContext;

    onChange = (event, type) => {
        const newState = {};
        newState[type] = event.target.value;

        this.setState(newState);
    };

    handleUsernameBlur = () => {
        const { username } = this.state;

        if (username.length < 4 || username.length > 8) {
            this.setState({ usernameError: true });
        } else {
            this.setState({ usernameError: false });
        }
    };

    handlePasswordBlur = () => {
        const { password } = this.state;

        if (password.length < 5 || password.length > 16) {
            this.setState({ passwordError: true });
        } else {
            this.setState({ passwordError: false });
        }
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password, usernameError, passwordError } = this.state;

        if (usernameError || passwordError) {
            return
        }

        await userService('http://localhost:9999/api/user/login', {
                username,
                password
            }, (user) => {
                this.context.logIn(user);
                this.props.history.push('/');
            }, (e) => {
                console.log('Error', e);
            }
        )
    };

    render() {
        const { username, password, usernameError, passwordError } = this.state;

        const mystyle = {
            textAlign: 'center',
            color: "red"
        };

        return <form onSubmit={this.handleSubmit} method="POST">
            <div className="text-center mb-4">
                <h1 className="h3 mb-3 font-weight-normal">Login</h1>
            </div>

            <div className="form-label-group">
                {usernameError ? <div style={mystyle} >Username must be between 4 and 8 characters long</div> : null}
                <label htmlFor="inputUsername">Username</label>
                <input type="text" value={username} onChange={(e) => this.onChange(e, 'username')}
                    onBlur={this.handleUsernameBlur} className="form-control" required />
            </div>

            <div className="form-label-group">
                {passwordError ? <div style={mystyle} >Password must be between 5 and 16 characters long</div> : null}
                <label htmlFor="inputPassword">Password</label>
                <input type="password" value={password} onChange={(e) => this.onChange(e, 'password')} onBlur={this.handlePasswordBlur} className="form-control" required />
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
    }
};

export default Login;