import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../Helpers/userService';
import UserContext from '../../../Context';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            rePassword: '',
            usernameError: false,
            passwordError: false,
            rePasswordError: false
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

    handleRepasswordBlur = () => {
        const { password, rePassword } = this.state;

        if (password !== rePassword) {
            this.setState({ rePasswordError: true });
        } else {
            this.setState({ rePasswordError: false });
        }
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password, usernameError, passwordError, rePasswordError } = this.state;

        if (usernameError || passwordError || rePasswordError) {
            return
        }
    
        await userService('http://localhost:9999/api/user/register', {
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
        const { username, password, rePassword, usernameError, passwordError, rePasswordError } = this.state;

        const mystyle = {
            textAlign: 'center',
            color: "red"
        };

        return <form onSubmit={this.handleSubmit} method="POST">
            <div className="text-center mb-4">
                <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                <p>Join our family and make a wish!</p>
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

            <div className="form-label-group">
                {rePasswordError ? <div style={mystyle} >Repeat Password does not match password!</div> : null}
                <label htmlFor="inputRePassword">Re-Password</label>
                <input type="password" value={rePassword} onChange={(e) => this.onChange(e, 'rePassword')} onBlur={this.handleRepasswordBlur} className="form-control" required />
            </div>

            <br />
            <button className="btn btn-lg btn-dark btn-block" type="submit">Register</button>

            <div className="text-center mb-4">
                <p className="alreadyUser"> Already have account? Then just login
                <Link to="/login"> Here</Link>!
            </p>
            </div>

            <p className="mt-5 mb-3 text-muted text-center">© TripAdventures - 2020.</p>
        </form>
    }
};

export default Register;