import React from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Register from './Components/Users/Register/Register';
import Login from './Components/Users/Login/Login';
import Profile from './Components/Users/Profile/Profile';
import CreateTrip from './Components/Trips/Create/Create';
import EditTrip from './Components/Trips/Edit/Edit';
import DeleteTrip from './Components/Trips/Delete/Delete';
import DetailsTrip from './Components/Trips/Details/Details';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile/:userid" component={Profile} />
          <Route path="/create" component={CreateTrip} />
          <Route path="/edit/:id" component={EditTrip} />
          <Route path="/delete/:id" component={DeleteTrip} />
          <Route path="/details/:id" component={DetailsTrip} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
