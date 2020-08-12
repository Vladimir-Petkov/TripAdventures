import React, { Component } from 'react';
import getCookie from '../../Helpers/getCookie';
import { withRouter } from "react-router";
import { toast } from 'react-toastify';

class DeleteTrip extends Component {
    constructor() {
        super();

        this.state = {
            location: '',
            date: '',
            description: '',
            image: '',
            likes: 0
        };
    };

    componentDidMount() {
        this.getTrip();
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
                    likes: trip.likes
                })
            });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const id = this.props.match.params.id;
        const token = getCookie('x-auth-token');

        await fetch(`http://localhost:9999/api/trips/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }
        }).then(res => res.json())
            .then(() => {
                toast.success(`Successfully Delete Trip with Title: ${this.state.location}`);
                this.props.history.push('/');
            });
    };


    render() {
        const { location, date, description, image } = this.state;

        return <form className="create-trek" onSubmit={this.handleSubmit} method="post">
            <div className="text-center mb-4">
                <h1 className="h3 mb-3 font-weight-normal">Delete adventure!</h1>
            </div>

            <div className="form-label-group">
                <label htmlFor="inputTrekName">Location</label>
                <input type="text" value={location} className="form-control" disabled />
            </div>

            <div className="form-label-group">
                <label htmlFor="inputTrekDate">Date</label>
                <input type="date" value={date} className="form-control" disabled />
            </div>

            <div className="form-label-group">
                <label htmlFor="inputTrekDescription">Description</label>
                <textarea type="text" value={description} className="form-control" disabled ></textarea>
            </div>

            <div className="form-label-group">
                <label htmlFor="inputTrekImage">Image</label>
                <input type="text" value={image} className="form-control" disabled />
            </div>

            <br />
            <button className="btn btn-lg btn-dark btn-block" type="submit">Delete the trip</button>
        </form>
    }
};

export default withRouter(DeleteTrip);