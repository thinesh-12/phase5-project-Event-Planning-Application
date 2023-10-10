import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaListAlt, FaUserPlus, FaCheck } from 'react-icons/fa'; // Import React Icons

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <FaHome />
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/event" className="nav-link">
            <FaCalendarAlt />
            Event Details
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/create-event" className="nav-link">
            <FaListAlt />
            Create Event
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/manage-guests" className="nav-link">
            <FaUserPlus />
            Manage Guests
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/rsvp" className="nav-link">
            <FaCheck />
            RSVP
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
