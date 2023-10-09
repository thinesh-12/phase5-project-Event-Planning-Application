import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CreateEvent from './components/CreateEvent';
import Dashboard from './components/Dashboard';
import EventDetails from './components/EventDetails';
import ManageGuests from './components/ManageGuests';
import RSVP from './components/RSVP';
import Register from './components/Register'; // Import the Register component
import Login from './components/Login'; // Import the Login component
import Navigation from './components/Navigation'; // Import the Navigation component
import './App.css'; // Import the CSS file

function App() {
  return (
    <Router>
      <div>
        <Navigation /> {/* Include the Navigation component */}
        <div className="container"> {/* Add this container div */}
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/create-event" component={CreateEvent} />
            <Route path="/event/:eventId" component={EventDetails} />
            <Route path="/manage-guests/:eventId" component={ManageGuests} />
            <Route path="/rsvp/:eventId" component={RSVP} />
            <Route path="/register" component={Register} /> {/* Register route */}
            <Route path="/login" component={Login} /> {/* Login route */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
