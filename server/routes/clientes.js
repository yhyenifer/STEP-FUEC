var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/passport');

const clienteCtrl = require('../controllers/clientes.controller');

router.get('/', verifyToken, clienteCtrl.getClientes);
router.post('/', verifyToken, clienteCtrl.createCliente);
router.get('/:id', verifyToken, clienteCtrl.getCliente);
router.put('/:id', verifyToken, clienteCtrl.updateCliente);
router.put('/delete/:id', verifyToken, clienteCtrl.deleteCliente);


module.exports = router;