const Conductor = require('../models/conductores');

const conductorCtrl = {};

//listar consuctores
conductorCtrl.getConductores = async (req, res) => {
    const conductores = await Conductor.find();
    res.json(conductores);
    // otra forma de hacerlo, para ver el error
    // Conductor.find()
    // .then(conductores =>  res.json( conductores))
    // .catch(err => console.log(err));

};

// crear conductor
conductorCtrl.createConductor = async (req, res) => {
    const conductor = new Conductor(req.body);
    console.log(conductor);
    await conductor.save();
    res.json({ 'status': 'Conductor Guardado Exitosamente' });
};

// consultar por un conductor especifico
conductorCtrl.getConductor = async (req, res) => {
    const conductor = await Conductor.findById(req.params.id);
    res.json(conductor);
};


// actualizar un conductor especifico
conductorCtrl.updateConductor = async (req, res) => {
    const { id } = req.params;
    const newConductor = {
        name: req.body.name,
        CC: req.body.CC
    }
    await Conductor.findByIdAndUpdate(id, { $set: newConductor }, { new: true });
    res.json({ status: 'Conductor Actualizado Exitosamente' });
};

// Eliminar un conductor especifico
conductorCtrl.deleteConductor = async (req, res) => {
    // se debe actualizar el estado y no eliminarlo -> pendiente cambiar
    await Conductor.findByIdAndRemove(req.params.id); // de esta forma lo elimina completo
    res.json({ status: 'Conductor Eliminado Exitosamente' });
};




module.exports = conductorCtrl;