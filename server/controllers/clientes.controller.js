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

// crear cliente
clienteCtrl.createCliente = async (req, res) => {
    const cliente = new Cliente({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        nombre_estable: req.body.nombre_estable,
        tipo_identif: req.body.tipo_identif,
        numero_identificacion: req.body.numero_identificacion,
        digito_verif: req.body.digito_verif,
        nombre_rep_legal: req.body.nombre_rep_legal, 
        direccion: req.body.direccion,
        ciudad: req.body.ciudad,
        telefono: req.body.telefono,
        correo_elect: req.body.correo_elect,
        state: true
    
    });
    console.log(cliente);
    await cliente.save();
    res.json({ 'status': 'Cliente Guardado Exitosamente' });
};

// consultar por un cliente especifico
clienteCtrl.getCliente = async (req, res) => {
    const cliente = await Cliente.findById(req.params.id);
    res.json(cliente);
};


// actualizar un cliente especifico
clienteCtrl.updateCliente = async (req, res) => {
    const { id } = req.params;
    const newCliente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        nombre_estable: req.body.nombre_estable,
        tipo_identif: req.body.tipo_identif,
        numero_identificacion: req.body.numero_identificacion,
        digito_verif: req.body.digito_verif,
        nombre_rep_legal: req.body.nombre_rep_legal, 
        direccion: req.body.direccion,
        ciudad: req.body.ciudad,
        telefono: req.body.telefono,
        correo_elect: req.body.correo_elect,
        state: true
    
    }
    await Cliente.findByIdAndUpdate(id, { $set: newCliente }, { new: true });
    res.json({ status: 'Cliente Actualizado Exitosamente' });
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