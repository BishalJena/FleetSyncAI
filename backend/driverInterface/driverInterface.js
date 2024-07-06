const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const driverDbPath = path.join(__dirname, '..', '..', 'models', 'driver.json');

// GET all drivers
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(driverDbPath, 'utf8');
    const drivers = JSON.parse(data);
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Error reading driver data', error: error.message });
  }
});

// POST new driver
router.post('/', async (req, res) => {
  try {
    const { driver_id, user_id } = req.body;
    
    if (!driver_id || !user_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newDriver = { driver_id, user_id };
    
    const data = await fs.readFile(driverDbPath, 'utf8');
    const drivers = JSON.parse(data);
    drivers.push(newDriver);
    
    await fs.writeFile(driverDbPath, JSON.stringify(drivers, null, 2));
    
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).json({ message: 'Error adding new driver', error: error.message });
  }
});

// PUT (update) driver
router.put('/:driver_id', async (req, res) => {
  try {
    const { driver_id } = req.params;
    const { user_id } = req.body;
    
    const data = await fs.readFile(driverDbPath, 'utf8');
    let drivers = JSON.parse(data);
    
    const index = drivers.findIndex(driver => driver.driver_id === driver_id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    
    drivers[index] = { ...drivers[index], user_id };
    
    await fs.writeFile(driverDbPath, JSON.stringify(drivers, null, 2));
    
    res.json(drivers[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating driver', error: error.message });
  }
});

// DELETE driver
router.delete('/:driver_id', async (req, res) => {
  try {
    const { driver_id } = req.params;
    
    const data = await fs.readFile(driverDbPath, 'utf8');
    let drivers = JSON.parse(data);
    
    const initialLength = drivers.length;
    drivers = drivers.filter(driver => driver.driver_id !== driver_id);
    
    if (drivers.length === initialLength) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    
    await fs.writeFile(driverDbPath, JSON.stringify(drivers, null, 2));
    
    res.json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting driver', error: error.message });
  }
});

module.exports = router;