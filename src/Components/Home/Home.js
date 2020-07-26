import React, { Component } from 'react';
import UserContext from '../../Context';
// import 'Header.module.css';

class Home extends Component {
    static contextType = UserContext;

    render() {
        console.log(this.context);

        
        return (
            <div className="home d-md-flex flex-md-equal  my-md-3 pl-md-3" >
                <div style={{ padding: 10 }} className="col-md-7">
                    <h2 className="featurette-heading">Here you will find the treks you've <span className="text-highlighted">always dreamed
              about!</span></h2>
                    <p className="lead">1. Join our family.</p>
                    <p style={{ padding: 5 }} className="lead">2. Request the trek you've always wanted.</p>
                    <p style={{ padding: 10 }} className="lead">3. Find people who like your idea.</p>
                    <p className="lead">If you find enough supporters, we will organize everything for you!</p>
                </div>
                <div className="col-md-5">
                    <img className="home-picture" src="/images/mountainLogo.png" alt='' />
                </div>
            </div>
        )
    };
};

export default Home;