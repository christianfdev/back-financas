const router = require('express').Router();

const registerController = require('../controllers/registerController');

router
    .route('/registers')
    .post((req, res) => registerController.create(req,res));

router
    .route('/registers')
    .get((req, res) => registerController.getAll(req, res));

router
    .route('/registers/:id')
    .get((req, res) => registerController.get(req, res));

router
    .route('/registers/:id')
    .delete((req, res) => registerController.delete(req, res));

router
    .route('/registers/:id')
    .put((req, res) => registerController.update(req, res));


module.exports = router;