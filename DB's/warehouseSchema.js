const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    available_space: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Warehouse', WarehouseSchema);