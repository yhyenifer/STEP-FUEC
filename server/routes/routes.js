const express = require('express');
const router = express.Router();

router.get('/home', function(req,res,next){
    res.send('Pagina home');
    });
    module.exports = router;