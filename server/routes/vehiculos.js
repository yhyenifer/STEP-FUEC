var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/passport');

const vehiculoCtrl = require('../controllers/vehiculos.controller');

// router.get('/', verifyToken, vehiculoCtrl.getVehiculos);
// router.post('/', verifyToken, vehiculoCtrl.createVehiculo);
// router.get('/alert', verifyToken, vehiculoCtrl.getAlertasVehiculos);
//router.get('/disponible', verifyToken, vehiculoCtrl.getVehiculosDisponibles);
// router.get('/:id', verifyToken, vehiculoCtrl.getVehiculo);
// router.put('/:id', verifyToken, vehiculoCtrl.updateVehiculo);
// router.post('/disponible', verifyToken, vehiculoCtrl.VehiculosDisponibles);
// router.put('/delete/:id', verifyToken, vehiculoCtrl.deleteVehiculo);

router.get('/', vehiculoCtrl.getVehiculos);
router.post('/', vehiculoCtrl.createVehiculo);
router.get('/alert', vehiculoCtrl.getAlertasVehiculos);
router.get('/:id', vehiculoCtrl.getVehiculo);
router.put('/:id', vehiculoCtrl.updateVehiculo);
router.post('/disponible', vehiculoCtrl.VehiculosDisponibles);
router.put('/delete/:id', vehiculoCtrl.deleteVehiculo);


module.exports = router;