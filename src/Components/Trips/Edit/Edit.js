import React, { Component } from 'react';
import getCookie from '../../Helpers/getCookie';

class EditTrip extends Component {
    constructor() {
        super();

        this.state = {
            location: '',
            date: '',
            description: '',
            image: '',
            locationError: false,
            descriptionError: false,
            imageError: false
        };
    };

    componentDidMount() {
        this.getTrip();
    };

    onChange = (event, type) => {
        const newState = {};
        newState[type] = event.target.value;

        this.setState(newState);
    };

    handleLocationBlur = () => {
        const { location } = this.state;

        if (location.length < 3 || location.length > 12) {
            this.setState({ locationError: true });
        } else {
            this.setState({ locationError: false });
        }
    };

    handleDescriptionBlur = () => {
        const { description } = this.state;

        if (description.length < 10 || description.length > 150) {
            this.setState({ descriptionError: true });
        } else {
            this.setState({ descriptionError: false });
        }
    };

    handleImageBlur = () => {
        const { image } = this.state;

        if (image === '') {
            this.setState({ imageError: true });
        } else {
            this.setState({ imageError: false });
        }
    };

    getTrip = async () => {
        const id = "5f1dcb7bbbd88e302cf93a7f";
        const token = getCookie('x-auth-token');

        const data = {
            id,
            token
        }

        await fetch(`http://localhost:9999/api/trips/${id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
            .then((trip) => {
                this.setState({
                    location: trip.location,
                    date: trip.date,
                    description: trip.description,
                    image: trip.image
                })
            });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { location, date, description, image, locationError, descriptionError, imageError } = this.state;

        if (locationError || descriptionError || imageError) {
            return
        };

        const token = getCookie('x-auth-token');
        const id = "5f1dcb7bbbd88e302cf93a7f";

        const data = {
            location,
            date,
            description,
            image,
            token
        };

        await fetch(`http://localhost:9999/api/trips/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
            .then((r) => {
                this.props.history.push('/');
            });
    };


    render() {
        const { location, date, description, image, locationError, descriptionError, imageError } = this.state;

        const mystyle = {
            textAlign: 'center',
            color: "red"
        };

        return <form className="create-trek" onSubmit={this.handleSubmit} method="post">
            <div className="text-center mb-4">
                <h1 className="h3 mb-3 font-weight-normal">Edit adventure!</h1>
                <p>Edit up the following information!</p>
            </div>

            <div className="form-label-group">
                {locationError ? <div style={mystyle} >Location must be between 3 and 12 characters long</div> : null}
                <label htmlFor="inputTrekName">Location</label>
                <input type="text" value={location} onChange={(e) => this.onChange(e, 'location')}
                    onBlur={this.handleLocationBlur} className="form-control" required />
            </div>

            <div className="form-label-group">
                <label htmlFor="inputTrekDate">Date</label>
                <input type="date" value={date} onChange={(e) => this.onChange(e, 'date')}
                    onBlur={this.handleDateBlur} className="form-control" required />
            </div>

            <div className="form-label-group">
                {descriptionError ? <div style={mystyle} >Description must be between 10 and 150 characters long</div> : null}
                <label htmlFor="inputTrekDescription">Description</label>
                <textarea type="text" value={description} onChange={(e) => this.onChange(e, 'description')}
                    onBlur={this.handleDescriptionBlur} className="form-control" required ></textarea>
            </div>

            <div className="form-label-group">
                {imageError ? <div style={mystyle} >Image is required and must start with https://</div> : null}
                <label htmlFor="inputTrekImage">Image</label>
                <input type="text" value={image} onChange={(e) => this.onChange(e, 'image')}
                    onBlur={this.handleImageBlur} className="form-control" required />
            </div>
            {/* <div style={{ display: "none" }}>
                <input name="organizer" value="" />
                <input name="likes" value="" />
            </div> */}

            <br />
            <button className="btn btn-lg btn-dark btn-block" type="submit">Edit the trek</button>
        </form>
    }
};

export default EditTrip;