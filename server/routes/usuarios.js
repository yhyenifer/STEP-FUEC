var express = require('express');
var router = express.Router();

const usuarioCtrl = require('../controllers/usuarios.controller');

router.get('/', usuarioCtrl.getUsuarios);
router.post('/', usuarioCtrl.createUsuario);
router.post('/login', usuarioCtrl.login);
router.get('/:id', usuarioCtrl.getUsuario);
router.put('/:id', usuarioCtrl.updateUsuario);
router.put('/delete/:id', usuarioCtrl.deleteUsuario);


module.exports = router;