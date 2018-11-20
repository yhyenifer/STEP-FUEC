var express = require('express');
var router = express.Router();

const usuarioCtrl= require('../controllers/usuarios.controller');

router.get('/', usuarioCtrl.getUsuario);
router.post('/', usuarioCtrl.createUsuario);
router.get('/:id', usuarioCtrl.getUsuario);
router.put('/:id', usuarioCtrl.updateUsuario);
router.put('/delete/:id', usuarioCtrl.deleteUsuario);


module.exports = router;