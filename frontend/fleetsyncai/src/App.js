import React, { useState } from 'react';
import DriverDetails from './DriverDetails';
import WarehouseDetails from './WarehouseDetails';
import BookingDetails from './BookingDetails';
import ConfirmationScreen from './ConfirmationScreen';

const App = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Fetch data from SQL database here

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return <ConfirmationScreen />;
  }

  return (
    <div>
      <DriverDetails {...driverData} />
      <WarehouseDetails {...warehouseData} />
      <BookingDetails {...bookingData} onConfirm={handleConfirm} />
    </div>
  );
};

export default App;