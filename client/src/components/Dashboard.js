import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Make an API request to fetch events from your backend
    axios.get('/api/events') // Replace '/api/events' with your actual backend API endpoint
      .then((response) => {
        // Assuming your backend returns an array of events in the response data
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <div className="dashboard">
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <div className="event-item">
              <h3>{event.title}</h3>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <a href={`/event/${event.id}`}>View Details</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
