import React, { useState, useEffect } from 'react';

const RSVP = ({ match }) => {
  const [event, setEvent] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState(null);

  // Assuming the event ID is passed as a URL parameter
  const eventId = match.params.id;

  useEffect(() => {
    // Replace this with an API call to fetch event details and RSVP status by eventId
    // For example, you can use Axios or the Fetch API
    fetch(`/api/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data.event);
        setRsvpStatus(data.rsvpStatus);
      })
      .catch((error) => {
        console.error('Error fetching event and RSVP status:', error);
      });
  }, [eventId]);

  const handleRsvp = (status) => {
    // Replace this with an API call to update the RSVP status for the event
    // For example, you can use Axios or the Fetch API
    fetch(`/api/events/${eventId}/rsvp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRsvpStatus(data.updatedRsvpStatus);
      })
      .catch((error) => {
        console.error('Error updating RSVP status:', error);
      });
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rsvp">
      <h2>RSVP for {event.title}</h2>
      <div className="event-details">
        <h3>Event Details:</h3>
        <p>Title: {event.title}</p>
        <p>Date: {event.date}</p>
        <p>Location: {event.location}</p>
      </div>
      <div className="rsvp-status">
        <h3>Your RSVP Status:</h3>
        <p>Status: {rsvpStatus || 'Not RSVPed'}</p>
      </div>
      <div className="rsvp-actions">
        <h3>RSVP Actions:</h3>
        <button onClick={() => handleRsvp('Going')}>RSVP Going</button>
        <button onClick={() => handleRsvp('Not Going')}>RSVP Not Going</button>
      </div>
    </div>
  );
};

export default RSVP;
