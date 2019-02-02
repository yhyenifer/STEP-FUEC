
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var expressSession = require('express-session');
var connectMongo = require('connect-mongo')(expressSession);
var morgan = require('morgan');
var port = 8000;
var app = express();
app.set('port', process.env.PORT || port);
const { mongoose } = require('./database/config');
const cookieParser = require('cookie-parser');
// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//adding middlewre - cors
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(morgan('dev'));  // interpreta lo que esta solicitando el usuario
app.use(express.json()); // interpreta json

// set static folder
app.use(express.static(path.join(__dirname, 'client')));
//body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// autenticacion

//routes backend
//app.use('/', index);
app.use('/api/conductores', require('./server/routes/conductores'));
app.use('/api/vehiculos', require('./server/routes/vehiculos'));
app.use('/api/permisos', require('./server/routes/permisos'));
app.use('/api/pasajeros', require('./server/routes/pasajeros'));
app.use('/api/usuarios', require('./server/routes/usuarios'));
app.use('/api/clientes', require('./server/routes/clientes'));
app.use('/api/rutas', require('./server/routes/rutas'));
app.use('/api/contratos', require('./server/routes/contratos'));


app.listen(app.get('port'), function () {
    console.log('Servidor STEP Activo por el puerto: ' + app.get('port'));
});
