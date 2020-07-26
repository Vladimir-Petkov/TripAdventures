const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.trips.get);

router.post('/:id', controllers.trips.getOne);

router.post('/', auth(), controllers.trips.post);

router.put('/:id', auth(), controllers.trips.put);

router.delete('/:id', auth(), controllers.trips.delete);

module.exports = router;