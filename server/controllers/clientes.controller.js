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