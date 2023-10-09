import React from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <DashboardIcon />
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/event" className="nav-link">
            <EventIcon />
            Event Details
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/create-event" className="nav-link">
            <PlaylistAddCheckIcon />
            Create Event
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/manage-guests" className="nav-link">
            <PersonAddIcon />
            Manage Guests
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/rsvp" className="nav-link">
            <PlaylistAddCheckIcon />
            RSVP
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
