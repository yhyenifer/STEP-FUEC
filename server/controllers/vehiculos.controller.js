const Vehiculo = require('../models/vehiculos');

const vehiculoCtrl = {};

//listar Vehiculos
vehiculoCtrl.getVehiculos = async (req, res) => {
    const vehiculos = await Vehiculo.find({ state: "true" }).sort({ createdAt: -1 }); // ordenada desc
    res.json(vehiculos);
};

//crear vehiculo
vehiculoCtrl.createVehiculo = async (req, res) => {

    const vehiculo = new Vehiculo({

        plate: req.body.plate,
        model: req.body.model,
        year: req.body.year,
        lateral: req.body.lateral,
        class: req.body.class,
        passengers: req.body.passengers,
        operation_card: req.body.operation_card,
        exp_to: req.body.exp_to,
        exp_soat: req.body.exp_soat,
        exp_tech: req.body.exp_tech,
        exp_prev: req.body.exp_prev,
        GNV: req.body.GNV,
        exp_gnv: '',
        exp_rcc: req.body.exp_rcc,
        active: req.body.active,
        internal: req.body.internal,
        state: true

    });

    if (vehiculo.GNV) {
        vehiculo.exp_gnv = req.body.exp_gnv;
    }
    console.log(vehiculo);
    await vehiculo.save();
    res.json({ 'status': 'Vehiculo Guardado Exitosamente', success: 'true' });
};

// consultar por un vehiculo especifico
vehiculoCtrl.getVehiculo = async (req, res) => {
    const vehiculo = await Vehiculo.findById(req.params.id);
    res.json(vehiculo);
};


// actualizar un vehiculo especifico
vehiculoCtrl.updateVehiculo = async (req, res) => {

    const { id } = req.params;
    const newVehiculo = {

        plate: req.body.plate,
        model: req.body.model,
        year: req.body.year,
        lateral: req.body.lateral,
        class: req.body.class,
        passengers: req.body.passengers,
        operation_card: req.body.operation_card,
        exp_to: req.body.exp_to,
        exp_soat: req.body.exp_soat,
        exp_tech: req.body.exp_tech,
        exp_prev: req.body.exp_prev,
        GNV: req.body.GNV,
        exp_gnv: '',
        exp_rcc: req.body.exp_rcc,
        active: req.body.active,
        internal: req.body.internal,
        state: true
    }
    if (newVehiculo.GNV) {
        newVehiculo.exp_gnv = req.body.exp_gnv;
    }
    await Vehiculo.findByIdAndUpdate(id, { $set: newVehiculo }, { new: true });
    res.json({ status: 'Vehiculo Actualizado Exitosamente', success: 'true' });
};

// Eliminar un vehiculo especifico

vehiculoCtrl.deleteVehiculo = async (req, res) => {
    const { id } = req.params;
    const newState = {

        state: req.body.state
    }
    await Vehiculo.findByIdAndUpdate(id, { $set: newState }, { new: true });
    res.json({ status: 'Vehiculo Eliminado Exitosamente', success: 'true' });
};




module.exports = vehiculoCtrl;