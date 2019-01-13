var express = require('express');
var router = express.Router();

const permisoCtrl= require('../controllers/permisos.controller');

router.get('/', permisoCtrl.getPermisos);
router.post('/', permisoCtrl.createPermiso);
router.get('/:id', permisoCtrl.getPermiso);
router.put('/:id', permisoCtrl.updatePermiso);
router.put('/delete/:id', permisoCtrl.deletePermiso);


module.exports = router;