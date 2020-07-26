const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        models.Trips.find().populate('creator')
            .then((trips) => res.send(trips))
            .catch(next);
    },

    getOne: function (req, res, next) {
        const { id } = req.body;

        models.Trips.findById(id)
            .then((trips) => res.send(trips))
            .catch(next);
    },

    post: (req, res, next) => {
        const { location, date, description, image } = req.body;
        const { _id } = req.user;

        models.Trips.create({ location, date, description, image, creator: _id })
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
        const { location, date, description, image, id } = req.body;

        models.Trips.updateOne({ id: id }, { location, date, description, image })
            .then((updatedTrip) => res.send(updatedTrip))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Trips.deleteOne({ _id: id })
            .then((removedTrip) => res.send(removedTrip))
            .catch(next)
    }
};