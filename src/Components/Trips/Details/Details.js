import React, { Component } from 'react';
import './Details.css';
import getCookie from '../../Helpers/getCookie';
import { Link, withRouter } from 'react-router-dom';
import UserContext from '../../../Context';
import { toast } from 'react-toastify';

class DetailsTrip extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: '',
            date: '',
            description: '',
            image: '',
            tripId: '',
            likes: [],
            creatorId: '',
            usernameCreator: '',
            currentUser: '',
            id: this.props.match.params.id,
            isCreator: false,
            isLiked: false
        };
    };

    static contextType = UserContext;

    componentDidMount() {
        const { user } = this.context;

        this.setState({
            currentUser: user
        });

        this.getTrip();
    };

    componentDidUpdate() {
        const { creatorId, currentUser, isCreator } = this.state;

        if (creatorId === currentUser.id) {
            if (isCreator) {
                return;
            } else {
                this.setState({
                    isCreator: true
                });
            };
        };
    };

    getTrip = async () => {
        const id = this.props.match.params.id;
        const token = getCookie('x-auth-token');

        await fetch(`http://localhost:9999/api/trips/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(res => res.json())
            .then((trip) => {
                this.setState({
                    location: trip.location,
                    date: trip.date,
                    description: trip.description,
                    image: trip.image,
                    likes: trip.likes,
                    tripId: trip._id,
                    usernameCreator: trip.usernameCreator,
                    creatorId: trip.creatorId
                })
            });
        this.state.likes.forEach((e) => {
            if (e === this.state.currentUser.id) {
                this.setState({ isLiked: true });
                return
            }
        })
    };

    likeTrip = async () => {
        const { location, date, description, image, likes, usernameCreator, creatorId } = this.state;

        const id = this.props.match.params.id;
        const token = getCookie('x-auth-token');

        await this.setState({ likes: likes.push(this.state.currentUser.id) });

        const data = {
            id, location, date, description, image, likes, usernameCreator, creatorId
        };

        await fetch(`http://localhost:9999/api/trips/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
            .then((trip) => {
                toast.success(`Successfully Like a Trip with Title: ${trip.location}`);
                this.setState({
                    location: trip.location,
                    date: trip.date,
                    description: trip.description,
                    image: trip.image,
                    likes: trip.likes,
                    tripId: trip._id,
                    usernameCreator: trip.usernameCreator,
                    creatorId: trip.creatorId
                });
            });

        this.getTrip();
    };

    render() {
        const { location, date, description, image, tripId, isCreator, usernameCreator, likes, isLiked } = this.state;

        return <div className="single-trek-details text-center">
            <div className="col-md-12 text-center overflow-hidden">
                <img className="details-img"
                    src={image} alt="" />
                <div className="overflow-hidden">
                    <h2 className="display-5">{location}</h2>
                    <p className="infoType">Description:</p>
                    <p className="trek-description">{description}</p>
                    <p className="infoType">Date: <span>{date}</span>
                    </p>
                    <p className="infoType">Likes: <span>{likes.length}</span>
                    </p>
                    <p className="infoType">Organizer: <span>{usernameCreator}</span>
                    </p>
                </div>

                {isCreator ? <div className="buttons-together">
                    <Link className="a-button" to={`/edit/${tripId}`}>
                        <svg version="1.1" id="edit-button" width="30px" xmlns="http://www.w3.org/2000/svg"
                            x="0px" y="0px" viewBox="0 0 293.129 293.129"
                        >

                            <path
                                d="M162.179,140.514c3.377-1.727,7.139-2.64,11.042-2.64c6.468,0,12.549,2.511,17.133,7.071l9.868-9.867
                c24.42,8.56,52.664,3.08,72.186-16.441c16.426-16.426,22.904-39.026,19.446-60.329c-0.381-2.346-2.042-4.281-4.303-5.011
                c-2.261-0.731-4.743-0.137-6.423,1.544l-14.652,14.652c-11.932,11.932-31.279,11.932-43.211,0
                c-11.933-11.932-11.933-31.279,0-43.211l14.652-14.652c1.681-1.681,2.28-4.163,1.548-6.425c-0.731-2.263-2.669-3.92-5.016-4.301
                c-21.302-3.458-43.903,3.02-60.328,19.446c-19.812,19.812-25.144,48.604-16.032,73.269l-21.402,21.402L162.179,140.514z" />
                            <path d="M123.179,179.296l-25.385-25.385L9.029,242.675c-11.542,11.542-11.542,30.255,0,41.797
                c11.542,11.542,30.255,11.542,41.797,0l76.521-76.52C119.629,200.193,118.238,188.479,123.179,179.296z" />
                            <path d="M179.795,155.597c-1.815-1.815-4.195-2.723-6.574-2.723s-4.759,0.908-6.574,2.723l-5.299,5.299L66.956,66.504l4.412-4.412
                c4.02-4.019,3.521-10.686-1.061-14.06L31.795,19.669c-3.701-2.725-8.837-2.338-12.087,0.912L3.356,36.934
                c-3.25,3.25-3.637,8.387-0.912,12.087l28.362,38.512c3.374,4.581,10.037,5.085,14.06,1.061l4.412-4.413l94.392,94.392l-5.672,5.672
                c-3.631,3.631-3.631,9.517,0,13.148l87.079,87.079c11.542,11.542,30.255,11.542,41.797,0c11.542-11.542,11.542-30.255,0-41.797
                L179.795,155.597z" />

                        </svg>
                  Edit the trip
                </Link>
                    <Link className="a-button" to={`/delete/${tripId}`}>
                        <svg version="1.1" width="30px" id="remove-button" xmlns="http://www.w3.org/2000/svg"
                            x="0px" y="0px" viewBox="0 0 507.2 507.2"
                        >
                            <circle cx="253.6" cy="253.6" r="253.6" />
                            <path
                                d="M147.2,368L284,504.8c115.2-13.6,206.4-104,220.8-219.2L367.2,148L147.2,368z" />
                            <path d="M373.6,309.6c11.2,11.2,11.2,30.4,0,41.6l-22.4,22.4c-11.2,11.2-30.4,11.2-41.6,0l-176-176
            c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L373.6,309.6z" />
                            <path d="M280.8,216L216,280.8l93.6,92.8c11.2,11.2,30.4,11.2,41.6,0l23.2-23.2c11.2-11.2,11.2-30.4,0-41.6
            L280.8,216z" />
                            <path d="M309.6,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6L197.6,373.6
            c-11.2,11.2-30.4,11.2-41.6,0l-22.4-22.4c-11.2-11.2-11.2-30.4,0-41.6L309.6,133.6z" />
                        </svg>
                  Delete the trip
                </Link>
                </div > : isLiked ? <span id="mySpan">You liked it already</span> : <Link className="a-button" to={`/details/${tripId}`} onClick={this.likeTrip}>
                    <svg version="1.1" width="30px" id="like-button" xmlns="http://www.w3.org/2000/svg"
                        x="0px" y="0px" viewBox="0 0 50 50"
                    >
                        <path d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543
               c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503
               c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z" />
                        <path d="M6,18.078c-0.553,0-1-0.447-1-1c0-5.514,4.486-10,10-10c0.553,0,1,0.447,1,1s-0.447,1-1,1
               c-4.411,0-8,3.589-8,8C7,17.631,6.553,18.078,6,18.078z" />
                    </svg>
                  Like trip</Link>}
            </div >
        </div >
    }
};

export default withRouter(DetailsTrip);