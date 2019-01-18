var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/passport');

const usuarioCtrl = require('../controllers/usuarios.controller');

router.get('/', verifyToken, usuarioCtrl.getUsuarios);
router.post('/', verifyToken, usuarioCtrl.createUsuario);
router.post('/login', usuarioCtrl.login);
router.get('/:id', verifyToken, usuarioCtrl.getUsuario);
router.put('/:id', verifyToken, usuarioCtrl.updateUsuario);
router.put('/delete/:id', verifyToken, usuarioCtrl.deleteUsuario);


module.exports = router;