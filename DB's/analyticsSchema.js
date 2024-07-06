const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    optimization_result: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Analytics', AnalyticsSchema);