const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

const database = JSON.parse(fs.readFileSync('database.json'));

// Get all cities
app.get('/cities', (req, res) => {
  res.json(database.cities);
});

// Get warehouses by city_id
app.get('/cities/:city_id/warehouses', (req, res) => {
  const cityId = parseInt(req.params.city_id);
  const city = database.cities.find(c => c.city_id === cityId);
  if (city) {
    res.json(city.warehouses);
  } else {
    res.status(404).send('City not found');
  }
});

// Get warehouse by warehouse_id
app.get('/warehouses/:warehouse_id', (req, res) => {
  const warehouseId = parseInt(req.params.warehouse_id);
  let foundWarehouse = null;

  for (const city of database.cities) {
    const warehouse = city.warehouses.find(w => w.warehouse_id === warehouseId);
    if (warehouse) {
      foundWarehouse = warehouse;
      break;
    }
  }

  if (foundWarehouse) {
    res.json(foundWarehouse);
  } else {
    res.status(404).send('Warehouse not found');
  }
});

// Update warehouse availability
app.put('/warehouses/:warehouse_id/availability', (req, res) => {
  const warehouseId = parseInt(req.params.warehouse_id);
  const availability = req.body.availability;
  let foundWarehouse = null;

  for (const city of database.cities) {
    const warehouse = city.warehouses.find(w => w.warehouse_id === warehouseId);
    if (warehouse) {
      warehouse.availability = { ...warehouse.availability, ...availability };
      foundWarehouse = warehouse;
      break;
    }
  }

  if (foundWarehouse) {
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
    res.json(foundWarehouse);
  } else {
    res.status(404).send('Warehouse not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
