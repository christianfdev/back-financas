const router = require('express').Router();

const profileController = require('../controllers/profileController');

router
    .route('/profiles')
    .post((req, res) => profileController.create(req, res));


router
    .route('/profiles')
    .get((req, res) => profileController.getAll(req, res));

router
    .route('/profiles/:id')
    .get((req, res) => profileController.get(req, res));

router
    .route('/profiles/:id')
    .put((req, res) => profileController.update(req, res));



module.exports = router;