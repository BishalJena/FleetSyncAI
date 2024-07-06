const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const warehouseFile = path.join('/home/srikrrishn/Desktop/Hackathon/Freight_management/models', 'warehouse.json');

// Helper function to read the warehouse file
const readWarehouses = () => {
  const data = fs.readFileSync(warehouseFile);
  return JSON.parse(data);
};

// Helper function to write to the warehouse file
const writeWarehouses = (warehouses) => {
  fs.writeFileSync(warehouseFile, JSON.stringify(warehouses, null, 2));
};

// Get all warehouses
app.get('/warehouses', (req, res) => {
  const warehouses = readWarehouses();
  res.json(warehouses);
});

// Get warehouse by ID
app.get('/warehouses/:id', (req, res) => {
  const warehouses = readWarehouses();
  const warehouse = warehouses.find(w => w.warehouse_id === parseInt(req.params.id));
  if (warehouse) {
    res.json(warehouse);
  } else {
    res.status(404).send('Warehouse not found');
  }
});

// Create a new warehouse
app.post('/warehouses', (req, res) => {
  const warehouses = readWarehouses();
  const newWarehouse = req.body;
  newWarehouse.warehouse_id = warehouses.length ? Math.max(...warehouses.map(w => w.warehouse_id)) + 1 : 1;
  warehouses.push(newWarehouse);
  writeWarehouses(warehouses);
  res.status(201).json(newWarehouse);
});

// Update a warehouse
app.put('/warehouses/:id', (req, res) => {
  const warehouses = readWarehouses();
  const index = warehouses.findIndex(w => w.warehouse_id === parseInt(req.params.id));
  if (index !== -1) {
    warehouses[index] = { ...warehouses[index], ...req.body };
    writeWarehouses(warehouses);
    res.json(warehouses[index]);
  } else {
    res.status(404).send('Warehouse not found');
  }
});

// Delete a warehouse
app.delete('/warehouses/:id', (req, res) => {
  let warehouses = readWarehouses();
  const newWarehouses = warehouses.filter(w => w.warehouse_id !== parseInt(req.params.id));
  if (warehouses.length === newWarehouses.length) {
    res.status(404).send('Warehouse not found');
  } else {
    writeWarehouses(newWarehouses);
    res.status(204).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
