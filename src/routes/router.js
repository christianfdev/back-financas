const router = require('express').Router();


const registersRouter = require('./registers');

router.use('/', registersRouter);

const profilesRouter = require('./profiles');

router.use('/', profilesRouter);

const authRouter = require('./auth');

router.use('/', authRouter);

module.exports = router;