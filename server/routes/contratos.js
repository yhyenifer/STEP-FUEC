var express = require('express');
var router = express.Router();

const contratoCtrl = require('../controllers/contratos.controller');

router.get('/', contratoCtrl.getContratos);
router.get('/alert', contratoCtrl.getAlertasContratos);
router.post('/:tipo_contrato', contratoCtrl.createContrato);
router.get('/:id', contratoCtrl.getContrato);
//router.put('/:id', contratoCtrl.updateContrato);
router.put('/delete/:id', contratoCtrl.deleteContrato);


module.exports = router;