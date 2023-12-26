const router = require('express').Router();
const profileController = require('../controllers/profileController');
const userAuth = require("../middlewares/userAuth");

router.route('/profiles').post((req, res) => profileController.create(req, res));

router.route('/profiles').get(/*userAuth,*/(req, res) => profileController.getAll(req, res));

router.route('/profiles/:id').get(/*userAuth,*/(req, res) => profileController.get(req, res));

router.route('/profiles/:id').put(userAuth, (req, res) => profileController.update(req, res));


router.route('/profiles/:id').delete(userAuth, (req, res) => profileController.delete(req, res));

//Testando rota para recuperar o ID e criar registros
//Difere um pouco do get padrão pq não retorna algumas informações

router.route('/profiles/me/:id').get(userAuth, (req, res) => profileController.me(req, res));


module.exports = router;