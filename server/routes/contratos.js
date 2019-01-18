var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/passport');

const contratoCtrl = require('../controllers/contratos.controller');

router.get('/', verifyToken, contratoCtrl.getContratos);
router.get('/alert', verifyToken, contratoCtrl.getAlertasContratos);
router.post('/:tipo_contrato', verifyToken, contratoCtrl.createContrato);
router.get('/:id', verifyToken, contratoCtrl.getContrato);
router.put('/:id', verifyToken, contratoCtrl.updateContrato);
router.put('/delete/:id', verifyToken, contratoCtrl.deleteContrato);


module.exports = router;