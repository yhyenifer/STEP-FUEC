var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/passport');

const pasajeroCtrl = require('../controllers/pasajeros.controller');

router.get('/', verifyToken, pasajeroCtrl.getPasajeros);
router.get('/pasajero/:ct_id', verifyToken, pasajeroCtrl.getPasajerosxContrato);
router.post('/', verifyToken, pasajeroCtrl.createPasajero);
router.get('/:id', verifyToken, pasajeroCtrl.getPasajero);
router.put('/:id', verifyToken, pasajeroCtrl.updatePasajero);
router.put('/delete/:id', verifyToken, pasajeroCtrl.deletePasajero);

// router.get('/', pasajeroCtrl.getPasajeros);
// router.get('/pasajero/:ct_id', pasajeroCtrl.getPasajerosxContrato);
// router.post('/', pasajeroCtrl.createPasajero);
// router.get('/:id', pasajeroCtrl.getPasajero);
// router.put('/:id', pasajeroCtrl.updatePasajero);
// router.put('/delete/:id', pasajeroCtrl.deletePasajero);


module.exports = router;