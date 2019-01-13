const Usuario = require('../models/usuarios');

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

async function validar_alias(alias) {
    return await Usuario.find({ username: alias, state: 'true' });
}

// crear usuario
usuarioCtrl.createUsuario = async (req, res) => {
    const validacion = await validar_alias(req.body.username);
    if (validacion == 0) {
        const usuario = new Usuario({
            username: req.body.username,
            name: req.body.name,
            password: req.body.password,
            role: req.body.role,
            state: true

        });

        await usuario.save();
        res.json({
            status: 'Usuario Guardado Exitosamente', success: 'true'
        });
    } else {
        res.json({ status: 'Alias ya existe', success: 'false' });

    }
};

// consultar por un usuario especifico
usuarioCtrl.getUsuario = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    res.json(usuario);
};


// actualizar un usuario especifico
usuarioCtrl.updateUsuario = async (req, res) => {
    const { id } = req.params;
    const validacion = await validar_alias(req.body.username);
    if (validacion != 0) {
        validacion.map(async dato => {
            if (id == dato._id) {
                const newUsuario = {
                    _id: req.body._id,
                    username: req.body.username,
                    name: req.body.name,
                    password: req.body.password,
                    role: req.body.role,
                    state: true
                }
                await Usuario.findByIdAndUpdate(id, { $set: newUsuario }, { new: true });
                res.json({ status: 'Usuario Actualizado Exitosamente' });

            }
            else {
                res.json({ status: 'Alias ya existe', success: 'false' });
            }
        });

    }
    else {
        res.json({ status: 'El alias no existe', success: 'false' });

    }
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



module.exports = usuarioCtrl;