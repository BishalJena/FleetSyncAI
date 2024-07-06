const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    booking_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    warehouse_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: true
    },
    arrival_time: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Schedule', ScheduleSchema);
