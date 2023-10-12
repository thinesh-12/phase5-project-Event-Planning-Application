import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import CreateEvent from './components/CreateEvent';
import Dashboard from './components/Dashboard';
import EventDetails from './components/EventDetails';
import ManageGuests from './components/ManageGuests';
import RSVP from './components/RSVP';
import Auth from './components/Auth'; // 
import Navigation from './components/Navigation'; // 
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
            <Route path="/Authentication" component={Auth} /> {/* Register route */}
         
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
