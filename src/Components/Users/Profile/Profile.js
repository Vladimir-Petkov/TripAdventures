import React, { Component } from 'react';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null
        };
    };

    componentDidMount() {
        this.getUser(this.props.match.params.userid);
    };

    getUser = async (id) => {
        const response = await fetch(`http://localhost:9999/api/user?id=${id}`);

        if (!response.ok) {
            this.props.history.push('/error')
        };

        const user = await response.json();
        this.setState({
            username: user.username
        });
    };

    render() {
        const {
            username
        } = this.state;

        if (username === null) {
            return (<div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>)
        };

        return <div className="profile col-md-6 text-center col-lg">
            <img className="profile-img" src="/images/user.png" alt='' />
            <div className="profile-info">
                <p>Username: <small>{username}</small></p>
                <p className="infoType">Wished 0 treks =)</p>
                <p>Everest Base Camp</p>
                <p>Langtang and Gosainkund</p>
                <p>No treks</p>
            </div>
        </div>
    }
};

export default Profile;