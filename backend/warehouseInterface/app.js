const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

const databasePath = 'warehouseDatabase.json';
let database = JSON.parse(fs.readFileSync(databasePath, 'utf8'));

// Helper function to save database
const saveDatabase = () => {
  fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
};

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
  const { availability } = req.body;
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
    saveDatabase();
    res.json(foundWarehouse);
  } else {
    res.status(404).send('Warehouse not found');
  }
});

// Add a new city
app.post('/cities', (req, res) => {
  const newCity = req.body;
  if (database.cities.find(city => city.city_id === newCity.city_id)) {
    res.status(400).send('City with the same city_id already exists');
  } else {
    database.cities.push(newCity);
    saveDatabase();
    res.status(201).json(newCity);
  }
});

// Add a new warehouse to a city
app.post('/cities/:city_id/warehouses', (req, res) => {
  const cityId = parseInt(req.params.city_id);
  const city = database.cities.find(c => c.city_id === cityId);
  if (!city) {
    res.status(404).send('City not found');
  } else {
    const newWarehouse = req.body;
    if (city.warehouses.find(warehouse => warehouse.warehouse_id === newWarehouse.warehouse_id)) {
      res.status(400).send('Warehouse with the same warehouse_id already exists in this city');
    } else {
      city.warehouses.push(newWarehouse);
      saveDatabase();
      res.status(201).json(newWarehouse);
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
