import React, { useState } from 'react';
import axios from 'axios';

const BookingComponent = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/book', {
        source,
        destination,
        time
      });
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Book a Truck</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="text"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button type="submit">Book</button>
      </form>
      {response && (
        <div>
          <h2>Booking Successful</h2>
          <p>Optimized Route: {response.optimized_route}</p>
        </div>
      )}
    </div>
  );
};

export default BookingComponent;
