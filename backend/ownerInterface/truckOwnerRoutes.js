const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const truckOwnerDbPath = path.join(__dirname, '..', '..', 'models', 'truckOwner.json');

// Middleware to parse JSON bodies
router.use(express.json());

// GET all truck owners
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(truckOwnerDbPath, 'utf8');
    const truckOwners = JSON.parse(data);
    res.json(truckOwners);
  } catch (error) {
    res.status(500).json({ message: 'Error reading truck owner data', error: error.message });
  }
});

// POST new truck owner
router.post('/', async (req, res) => {
  try {
    const { truck_id, driver_id, city_id, status } = req.body;
    
    if (!truck_id || !driver_id || !city_id || typeof status !== 'boolean') {
      return res.status(400).json({ message: 'Missing or invalid required fields' });
    }

    const newTruckOwner = { truck_id, driver_id, city_id, status };
    
    const data = await fs.readFile(truckOwnerDbPath, 'utf8');
    const truckOwners = JSON.parse(data);
    truckOwners.push(newTruckOwner);
    
    await fs.writeFile(truckOwnerDbPath, JSON.stringify(truckOwners, null, 2));
    
    res.status(201).json(newTruckOwner);
  } catch (error) {
    res.status(500).json({ message: 'Error adding new truck owner', error: error.message });
  }
});

// PUT (update) truck owner
router.put('/:truck_id', async (req, res) => {
  try {
    const { truck_id } = req.params;
    const { driver_id, city_id, status } = req.body;
    
    const data = await fs.readFile(truckOwnerDbPath, 'utf8');
    let truckOwners = JSON.parse(data);
    
    const index = truckOwners.findIndex(owner => owner.truck_id === truck_id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Truck owner not found' });
    }
    
    truckOwners[index] = { ...truckOwners[index], driver_id, city_id, status };
    
    await fs.writeFile(truckOwnerDbPath, JSON.stringify(truckOwners, null, 2));
    
    res.json(truckOwners[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating truck owner', error: error.message });
  }
});

// DELETE truck owner
router.delete('/:truck_id', async (req, res) => {
  try {
    const { truck_id } = req.params;
    
    const data = await fs.readFile(truckOwnerDbPath, 'utf8');
    let truckOwners = JSON.parse(data);
    
    const initialLength = truckOwners.length;
    truckOwners = truckOwners.filter(owner => owner.truck_id !== truck_id);
    
    if (truckOwners.length === initialLength) {
      return res.status(404).json({ message: 'Truck owner not found' });
    }
    
    await fs.writeFile(truckOwnerDbPath, JSON.stringify(truckOwners, null, 2));
    
    res.json({ message: 'Truck owner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting truck owner', error: error.message });
  }
});

module.exports = router;
