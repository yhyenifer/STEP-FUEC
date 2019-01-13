const Cliente = require('../models/clientes');

const clienteCtrl = {};

//listar clientes
clienteCtrl.getClientes = async (req, res) => {

    const clientes = await Cliente.find({ state: "true" });
    res.json(clientes);
    // otra forma de hacerlo, para ver el error
    // Cliente.find()
    // .then(usuarios =>  res.json(clientes))
    // .catch(err => console.log(err));

};

async function validar_numId(numeroIdentificacion) {
    return await Cliente.find({ numero_identificacion: numeroIdentificacion, state: 'true' });
}

// crear cliente
clienteCtrl.createCliente = async (req, res) => {
    console.log('guardar');
    console.log(req.body);
    const validacion = await validar_numId(req.body.numero_identificacion);
    if (validacion == 0) {
        const cliente = new Cliente({
            tipo_identif: req.body.tipo_identif,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            numero_identificacion: req.body.numero_identificacion,
            lugar_exp_ced: req.body.lugar_exp_ced,
            tipo_cooperacion: req.body.tipo_cooperacion,
            digito_verif: req.body.digito_verif,
            nombre_estable: req.body.nombre_estable,
            nombre_rep_legal: req.body.nombre_rep_legal,
            direccion: req.body.direccion,
            ciudad: req.body.ciudad,
            telefono: req.body.telefono,
            correo_elect: req.body.correo_elect,
            state: true

        });

        await cliente.save();
        res.json({
            status: 'Cliente Guardado Exitosamente', success: 'true'
        });
    } else {
        res.json({ status: 'Verificar la identificacion del cliente, la ingresada, ya existe', success: 'false' });

    }
};

// consultar por un cliente especifico
clienteCtrl.getCliente = async (req, res) => {
    const cliente = await Cliente.findById(req.params.id);
    res.json(cliente);
};


// actualizar un cliente especifico
clienteCtrl.updateCliente = async (req, res) => {
    const { id } = req.params;
    const validacion = await validar_numId(req.body.numero_identificacion);
    if (validacion != 0) {
        validacion.map(async dato => {

            if (id == dato._id) {

                const newCliente = {
                    _id: req.body._id,
                    tipo_identif: req.body.tipo_identif,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    numero_identificacion: req.body.numero_identificacion,
                    lugar_exp_ced: req.body.lugar_exp_ced,
                    tipo_cooperacion: req.body.tipo_cooperacion,
                    digito_verif: req.body.digito_verif,
                    nombre_estable: req.body.nombre_estable,
                    nombre_rep_legal: req.body.nombre_rep_legal,
                    direccion: req.body.direccion,
                    ciudad: req.body.ciudad,
                    telefono: req.body.telefono,
                    correo_elect: req.body.correo_elect,
                    state: true
                }
                await Cliente.findByIdAndUpdate(id, { $set: newCliente }, { new: true });
                res.json({ status: 'Cliente Actualizado Exitosamente' });
            }
            else {
                res.json({ status: 'Verificar la cedula del cliente, la ingresada, ya existe', success: 'false' });
            }
        });
    }
    else {
        res.json({ status: 'El cliente no esta creado', success: 'false' });
    }
};






// Eliminar un cliente especifico
clienteCtrl.deleteCliente = async (req, res) => {
    const { id } = req.params;
    const newState = {
        state: req.body.state
    }
    await Cliente.findByIdAndUpdate(id, { $set: newState }, { new: true });
    res.json({ status: 'Cliente Eliminado Exitosamente' });
};



module.exports = clienteCtrl;