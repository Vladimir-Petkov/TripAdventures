import React, { useContext } from 'react';
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
  Route,
  Redirect
} from "react-router-dom";
import UserContext from './Context';
import ErrorPage from './Components/Error/Error';

const App = (props) => {
  const context = useContext(UserContext);
  const loggedIn = context.loggedIn;

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register">
            {!loggedIn ? (<Register />) : (<Redirect to="/" />)}
          </Route>
          <Route path="/login">
            {!loggedIn ? (<Login />) : (<Redirect to="/" />)}
          </Route>
          <Route path="/profile/:id">
            {loggedIn ? (<Profile />) : (<Redirect to="/login" />)}
          </Route>
          <Route path="/create">
            {loggedIn ? (<CreateTrip />) : (<Redirect to="/login" />)}
          </Route>
          <Route path="/edit/:id">
            {loggedIn ? (<EditTrip />) : (<Redirect to="/login" />)}
          </Route>
          <Route path="/delete/:id">
            {loggedIn ? (<DeleteTrip />) : (<Redirect to="/login" />)}
          </Route>
          <Route path="/details/:id">
            {loggedIn ? (<DetailsTrip />) : (<Redirect to="/login" />)}
          </Route>
          <Route path='*' component={ErrorPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
