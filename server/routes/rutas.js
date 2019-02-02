var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/passport');

const rutaCtrl = require('../controllers/rutas.controller');

// router.get('/', verifyToken, rutaCtrl.getRutas);
// router.post('/', verifyToken, rutaCtrl.createRuta); // regstro
// router.get('/:id', verifyToken, rutaCtrl.getRuta);
// router.put('/:id', verifyToken  rutaCtrl.updateRuta);
// router.put('/delete/:id', verifyToken, rutaCtrl.deleteRuta);


router.get('/', rutaCtrl.getRutas);
router.post('/', rutaCtrl.createRuta);
router.get('/:id', rutaCtrl.getRuta);
router.put('/:id', rutaCtrl.updateRuta);
router.put('/delete/:id', rutaCtrl.deleteRuta);

module.exports = router;