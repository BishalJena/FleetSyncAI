import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BookingDetails = ({ sourcePlace, destinationPlace, deadline, capacityOfMaal, pricePerDay, onConfirm }) => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Booking</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Enter Books Details</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1">Source</h3>
            <p>{sourcePlace}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1">Drop</h3>
            <p>{destinationPlace}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1">Deadline</h3>
            <p>{deadline}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1">Amount of goods (tonnes)</h3>
            <p>{capacityOfMaal}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1">Rate/day</h3>
            <p>{pricePerDay}</p>
          </CardContent>
        </Card>
      </div>
      <Button className="w-full" onClick={onConfirm}>Confirm</Button>
    </div>
  );
};

export default BookingDetails;
