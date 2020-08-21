## The technologies

This application is built with [MongoDB](https://www.mongodb.com), [Express.js](https://expressjs.com), [React.js](https://reactjs.org) and [Node.js](https://nodejs.org/en/) - also known as the **MERN** stack.

## The application

### Idea

**TripAdventures** is a online travel agency. It provides a way to allow customers to create and like trips. Once you gather more like-minded people, we can organize your dream trip.

### Design

Layout looks good on laptops / desktops. The app has good ui and great ux!

### Endpoints

#### Users

* GET

    * `/profile`

* POST

    * `/register`
    
    * `/login`

    * `/logout`

#### Trips

* GET

    * `/`

    * `/details/:id`

* POST

    * `/create`

* PUT

    * `/edit/:id`
    
    * `/like/:id`

* DELETE

    * `/delete/:id`


### Functionalities

#### Guests (not logged in) are allowed to 

* _register_

* _login_

* _view guest home page_

#### Users (logged in) are allowed to 

* _logout_

* _view all trips_

* _view their profile page with own trips_

* _create trip_

* _edit their trip / those which they created_

* _delete their trip / those which they created_

* _like a trip / those which they are not created_
