const Usuario = require('../models/usuarios');
var jwt = require('jsonwebtoken');
const usuarioCtrl = {};

//listar usuarios
usuarioCtrl.getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({ state: "true" }).sort({ createdAt: -1 }); // ordenada desc
    res.json(usuarios);
    // otra forma de hacerlo, para ver el error
    // Conductor.find()
    // .then(usuarios =>  res.json(usuarios))
    // .catch(err => console.log(err));

};

// crear usuario
usuarioCtrl.createUsuario = async (req, res) => {
    const usuario = new Usuario({
        username: req.body.username,
        name: req.body.name,
        password: Usuario.hashPassword(req.body.password),
        role: req.body.role,
        state: true

    });
    console.log(usuario);
    await usuario.save();
    res.json({ 'status': 'Usuario Guardado Exitosamente', 'success': 'true' });
};

// consultar por un usuario especifico
usuarioCtrl.getUsuario = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    res.json(usuario);
};


// actualizar un usuario especifico
usuarioCtrl.updateUsuario = async (req, res) => {
    const { id } = req.params;
    const newUsuario = {
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
        state: true
    }
    await Usuario.findByIdAndUpdate(id, { $set: newUsuario }, { new: true });
    res.json({ status: 'Usuario Actualizado Exitosamente' });
};

// Eliminar un usuario especifico
usuarioCtrl.deleteUsuario = async (req, res) => {
    const { id } = req.params;
    const newState = {
        state: req.body.state
    }
    await Usuario.findByIdAndUpdate(id, { $set: newState }, { new: true });
    res.json({ status: 'Usuario Eliminado Exitosamente', success: 'true' });
};

usuarioCtrl.login = (req, res) => {

    let promise = Usuario.findOne({ username: req.body.username }).exec();

    promise.then(function (doc) {

        if (doc) {
            if (doc.isValid(req.body.password)) {
                // generate token
                let token = jwt.sign({ username: doc.username }, 'stepSecretFuec', { expiresIn: '3h' });

                return res.status(200).json({ token: token, success: true });

            } else {
                return res.status(200).json({ message: ' Credenciales Incorrectas', success: false });
            }
        }
        else {
            return res.status(200).json({ message: 'El nombre de usuario no esta registrado', success: false })
        }
    });

    promise.catch(function (err) {
        return res.status(200).json({ message: 'Some internal error', success: false });
    })

};

var decodedToken = '';
function verifyToken(req, res, next) {
    let token = req.query.token;

    jwt.verify(token, 'secret', function (err, tokendata) {
        if (err) {
            return res.status(400).json({ message: ' Unauthorized request' });
        }
        if (tokendata) {
            decodedToken = tokendata;
            next();
        }
    })
}
module.exports = usuarioCtrl;