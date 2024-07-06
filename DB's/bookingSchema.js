const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    truck_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck'
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
