var express = require('express');
var router = express.Router();

const clienteCtrl= require('../controllers/clientes.controller');

router.get('/', clienteCtrl.getClientes);
router.post('/', clienteCtrl.createCliente);
router.get('/:id', clienteCtrl.getCliente);
router.put('/:id', clienteCtrl.updateCliente);
router.put('/delete/:id', clienteCtrl.deleteCliente);


module.exports = router;