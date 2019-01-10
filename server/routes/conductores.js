var express = require('express');
var router = express.Router();

const conductorCtrl = require('../controllers/conductores.controller');
router.get('/alert', conductorCtrl.getAlertasConductores);
router.get('/', conductorCtrl.getConductores);
router.post('/', conductorCtrl.createConductor);
router.get('/:id', conductorCtrl.getConductor);
router.put('/:id', conductorCtrl.updateConductor);
router.put('/delete/:id', conductorCtrl.deleteConductor);


module.exports = router;