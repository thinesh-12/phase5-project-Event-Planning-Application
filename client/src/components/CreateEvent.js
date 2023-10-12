import React, { useState } from 'react';

function CreateEvent() {
  // Initialize state to store form input values
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the form data to your backend API here
   
 const eventData = {
      name: eventName,
      date: eventDate,
      location: eventLocation,
    };
    // Reset the form fields after submission
    setEventName('');
    setEventDate('');
    setEventLocation('');
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="eventDate">Event Date:</label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="eventLocation">Event Location:</label>
          <input
            type="text"
            id="eventLocation"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEvent;
