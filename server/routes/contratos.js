var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/passport');

const contratoCtrl = require('../controllers/contratos.controller');

router.get('/', verifyToken, contratoCtrl.getContratos);
router.get('/cliente/:id_cliente', verifyToken, contratoCtrl.getContratosxCliente);
router.get('/numero/:ct_number', verifyToken, contratoCtrl.getContratosxNumero);
router.get('/tipo/:tipo_contrato', verifyToken, contratoCtrl.getContratosxTipo);
router.get('/alert', verifyToken, contratoCtrl.getAlertasContratos);
router.post('/:tipo_contrato', contratoCtrl.createContrato);
router.get('/:id', verifyToken, contratoCtrl.getContrato);
router.put('/:id', verifyToken, contratoCtrl.updateContrato);
router.put('/delete/:id', verifyToken, contratoCtrl.deleteContrato);


module.exports = router;