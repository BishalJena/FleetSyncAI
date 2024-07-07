// sticky
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DriverDetails = ({ pickup, drop, fuel, date_of_pickup, date_of_drop }) => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome Driver</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">New Ride Details</h2>
        <p className="text-gray-600">{date_of_pickup} - {date_of_drop}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1">Pickup Location</h3>
            <p>{pickup}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1">Drop Location</h3>
            <p>{drop}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1">Approximate fuel</h3>
            <p>{fuel} litres</p>
          </CardContent>
        </Card>
      </div>
      <Button className="w-full">Show Map</Button>
    </div>
  );
};

export default DriverDetails;
