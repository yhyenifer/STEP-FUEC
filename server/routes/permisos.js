var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/passport');

const permisoCtrl = require('../controllers/permisos.controller');

router.get('/', verifyToken, permisoCtrl.getPermisos);
router.get('/contrato/:ct_id', verifyToken, permisoCtrl.getPermisosxContrato);
router.post('/', permisoCtrl.createPermiso);
router.get('/:id', verifyToken, permisoCtrl.getPermisos);
router.put('/:id', verifyToken, permisoCtrl.updatePermiso);
//router.put('/delete/:id', verifyToken, permisoCtrl.deletePermiso);


module.exports = router;