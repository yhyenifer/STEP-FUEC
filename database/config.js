 
var mongoose = require('mongoose');
const URI = ('mongodb://localhost/step');
const URIREMOTE = ('mongodb://myDbAdmin:mipassword@162.243.0.166:27017/FUEC-dev');
mongoose.connect(URI)
.then(db => console.log('db  conectada'))
.catch(err => console.log(err));
module.exports = mongoose;