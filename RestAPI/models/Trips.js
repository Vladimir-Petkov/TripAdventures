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

    likes: {
        type: mongoose.Schema.Types.Number,
        min: 0,
        required: true
    },

    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    usernameCreator: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});

module.exports = new mongoose.model('Trips', trippsShema);