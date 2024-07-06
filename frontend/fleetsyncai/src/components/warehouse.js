//sticky
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const WarehouseDetails = ({ totalCapacity, availableCapacity, incomingTrucks, warehouseCity, pricePerTrip }) => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Warehouse</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Enter Inventory Details</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1">Total capacity</h3>
            <p>{totalCapacity}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1">Available capacity</h3>
            <p>{availableCapacity}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1">Approximate fuel</h3>
            <p>{incomingTrucks}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1">Warehouse city</h3>
            <p>{warehouseCity}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1">Drop Location</h3>
            <p>{pricePerTrip}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WarehouseDetails;