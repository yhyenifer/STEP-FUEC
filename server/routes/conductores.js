var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/passport');

const conductorCtrl = require('../controllers/conductores.controller');
router.get('/alert', verifyToken, conductorCtrl.getAlertasConductores);
router.get('/', verifyToken, conductorCtrl.getConductores);
router.post('/', verifyToken, conductorCtrl.createConductor);
router.get('/:id', verifyToken, conductorCtrl.getConductor);
router.put('/:id', verifyToken, conductorCtrl.updateConductor);
router.put('/delete/:id', verifyToken, conductorCtrl.deleteConductor);


module.exports = router;