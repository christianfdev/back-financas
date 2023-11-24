const router = require('express').Router();


const registersRouter = require('./registers');

router.use('/', registersRouter);

module.exports = router;