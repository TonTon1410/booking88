import React from 'react';
import { useParams } from 'react-router-dom';

const Booking11 = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Booking Page for Destination {id}</h1>
      {/* Add more booking details here */}
    </div>
  );
};

export default Booking11;