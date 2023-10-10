import React, { useState, useEffect } from 'react';
import './ManageGuests.css'; // Import the CSS file

const ManageGuests = ({ match }) => {
  const [event, setEvent] = useState(null);
  const [guests, setGuests] = useState([]);
  const [newGuestName, setNewGuestName] = useState('');

  // Assuming the event ID is passed as a URL parameter
  const eventId = match.params.id;

  useEffect(() => {
    // Replace this with an API call to fetch event details and guest list by eventId
    // For example, you can use Axios or the Fetch API
    fetch(`/api/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data.event);
        setGuests(data.guests);
      })
      .catch((error) => {
        console.error('Error fetching event and guest list:', error);
      });
  }, [eventId]);

  const handleAddGuest = () => {
    // Replace this with an API call to add a guest to the event's guest list
    // For example, you can use Axios or the Fetch API
    fetch(`/api/events/${eventId}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newGuestName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setGuests([...guests, data.newGuest]);
        setNewGuestName('');
      })
      .catch((error) => {
        console.error('Error adding guest:', error);
      });
  };

  const handleRemoveGuest = (guestId) => {
    // Replace this with an API call to remove a guest from the event's guest list
    // For example, you can use Axios or the Fetch API
    fetch(`/api/events/${eventId}/guests/${guestId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setGuests(guests.filter((guest) => guest.id !== guestId));
      })
      .catch((error) => {
        console.error('Error removing guest:', error);
      });
  };

  if (!event) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="manage-guests">
      <h2>Manage Guests for {event.title}</h2>
      <div className="guest-list">
        <h3>Guest List:</h3>
        <ul>
          {guests.map((guest) => (
            <li key={guest.id}>
              {guest.name}
              <button onClick={() => handleRemoveGuest(guest.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-guest">
        <h3>Add Guest:</h3>
        <input
          type="text"
          placeholder="Guest Name"
          value={newGuestName}
          onChange={(e) => setNewGuestName(e.target.value)}
        />
        <button onClick={handleAddGuest}>Add</button>
      </div>
    </div>
  );
};

export default ManageGuests;
