
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var expressSession = require('express-session');
var connectMongo = require('connect-mongo')(expressSession);

var morgan = require('morgan');

var port = 8000;

var app = express();
app.set('port', process.env.PORT  || port);
// database
// var mongoose = require('mongoose');

// mongoose.connect('mongodb://myDbAdmin:mipassword@162.243.0.166:27017/FUEC-dev')
// .then(db =>  console.log("Connected to Database"))
// .catch((err) => console.log("Not Connected to Database ERROR! ", err));

const {mongoose} = require('./database/config');




// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//adding middlewre - cors
app.use(cors());
app.use(morgan('dev'));  // interpreta lo que esta solicitando el usuario
app.use(express.json()); // interpreta json

// set static folder
app.use(express.static(path.join(__dirname, 'client')));

//body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));

//routes backend
//app.use('/', index);
app.use('/api/conductores', require('./server/routes/conductores'));

app.listen(app.get('port'), function () {
    console.log('Servidor STEP Activo por el puerto: '+ app.get('port'));
    
});
