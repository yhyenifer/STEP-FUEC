var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/passport');

const vehiculoCtrl = require('../controllers/vehiculos.controller');

router.get('/', verifyToken, vehiculoCtrl.getVehiculos);
router.post('/', verifyToken, vehiculoCtrl.createVehiculo);
router.get('/alert', verifyToken, vehiculoCtrl.getAlertasVehiculos);
router.get('/:id', verifyToken, vehiculoCtrl.getVehiculo);
router.put('/:id', verifyToken, vehiculoCtrl.updateVehiculo);
router.put('/delete/:id', verifyToken, vehiculoCtrl.deleteVehiculo);


module.exports = router;