var express = require('express');
var router = express.Router();

const vehiculoCtrl = require('../controllers/vehiculos.controller');

router.get('/', vehiculoCtrl.getVehiculos);
router.post('/', vehiculoCtrl.createVehiculo);
router.get('/alert', vehiculoCtrl.getAlertasVehiculos);
router.get('/:id', vehiculoCtrl.getVehiculo);
router.put('/:id', vehiculoCtrl.updateVehiculo);
router.put('/delete/:id', vehiculoCtrl.deleteVehiculo);


module.exports = router;