import React, { useState, useEffect } from 'react';

const EventDetails = ({ match }) => {
  const [event, setEvent] = useState(null);

  // Assuming the event ID is passed as a URL parameter
  const eventId = match.params.id;

  useEffect(() => {
    // Replace this with an API call to fetch event details by eventId
    // For example, you can use Axios or the Fetch API
    fetch(`/api/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
      })
      .catch((error) => {
        console.error('Error fetching event details:', error);
      });
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
      <p>Description: {event.description}</p>
      {/* Add more event details as needed */}
    </div>
  );
};

export default EventDetails;
