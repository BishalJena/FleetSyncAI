const mongoose = require('mongoose');

const TruckSchema = new mongoose.Schema({
    details: {
        type: String,
        required: true
    },
    current_location: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Truck', TruckSchema);
