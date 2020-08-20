const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        models.Trips.find().sort('-likes').populate('creator')
            .then((trips) => res.send(trips))
            .catch(next);
    },

    getOne: function (req, res, next) {
        const { id } = req.params;

        models.Trips.findById(id)
            .then((trips) => res.send(trips))
            .catch(next);
    },

    post: (req, res, next) => {
        const { location, date, description, image, likes } = req.body;
        const { _id, username } = req.user;

        models.Trips.create({ location, date, description, image, likes, creatorId: _id, usernameCreator: username })
            .then((createdTrip) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { trips: createdTrip } }),
                    models.Trips.findOne({ _id: createdTrip._id })
                ]);
            })
            .then(([modifiedObj, tripObj]) => {
                res.send(tripObj);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const { location, date, description, image, likes, usernameCreator, creatorId, id } = req.body;

        models.Trips.findByIdAndUpdate(id, { location, date, description, image, likes, usernameCreator, creatorId })
            .then((updatedTrip) => res.send(updatedTrip))
            .catch(next)
    },

    delete: (req, res, next) => {
        const { id } = req.params;

        models.Trips.deleteOne({ _id: id })
            .then((removedTrip) => res.send(removedTrip))
            .catch(next)
    }
};