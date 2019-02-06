
var mongoose = require('mongoose');
const URI = ('mongodb://localhost/step');
//esta base de datos es la de pruebas
const URIREMOTE = ('mongodb://AdminSammy:AdminSammysSecurePassword@162.243.0.166:27017/FUEC-dev');
mongoose.connect(URIREMOTE)
    .then(db => console.log('db  conectada'))
    .catch(err => console.log(err));
module.exports = mongoose;