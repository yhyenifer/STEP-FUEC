var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/passport');

const pasajeroCtrl = require('../controllers/pasajeros.controller');

router.get('/', verifyToken, pasajeroCtrl.getPasajeros);
router.post('/', verifyToken, pasajeroCtrl.createPasajero);
router.get('/:id', verifyToken, pasajeroCtrl.getPasajero);
router.put('/:id', verifyToken, pasajeroCtrl.updatePasajero);
router.put('/delete/:id', verifyToken, pasajeroCtrl.deletePasajero);


module.exports = router;