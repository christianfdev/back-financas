const router = require('express').Router();


const registersRouter = require('./registers');

router.use('/', registersRouter);

const profilesRouter = require('./profiles');

router.use('/', profilesRouter);

module.exports = router;