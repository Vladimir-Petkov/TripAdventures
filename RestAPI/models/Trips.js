const mongoose = require('mongoose');

const trippsShema = new mongoose.Schema({

    location: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    date: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    description: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    image: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    creator: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = new mongoose.model('Trips', trippsShema);