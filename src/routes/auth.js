const router = require("express").Router();
const authController = require("../controllers/authController");

router.route('/login').post((req, res) => authController.login(req, res));

module.exports = router;