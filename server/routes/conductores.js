var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/passport');

const conductorCtrl = require('../controllers/conductores.controller');

// router.get('/alert', verifyToken, conductorCtrl.getAlertasConductores);
// router.get('/', verifyToken, conductorCtrl.getConductores);
// router.post('/', verifyToken, conductorCtrl.createConductor);
// router.get('/:id', verifyToken, conductorCtrl.getConductor);
// router.put('/:id', verifyToken, conductorCtrl.updateConductor);
// router.post('/disponible', verifiyToken, conductorCtrl.ConductoresDisponibles);
// router.put('/delete/:id', verifyToken, conductorCtrl.deleteConductor);


router.get('/alert', conductorCtrl.getAlertasConductores);
router.get('/', conductorCtrl.getConductores);
router.post('/', conductorCtrl.createConductor);
router.get('/:id', conductorCtrl.getConductor);
router.put('/:id', conductorCtrl.updateConductor);
router.post('/disponible', conductorCtrl.ConductoresDisponibles);
router.put('/delete/:id', conductorCtrl.deleteConductor);


module.exports = router;