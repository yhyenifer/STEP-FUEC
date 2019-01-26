const Pasajero = require('../models/pasajeros');

const pasajeroCtrl = {};

//listar pasajeros
pasajeroCtrl.getPasajeros = async (req, res) => {
    const pasajeros = await Pasajero.find({ state: "true" }).sort({ createdAt: -1 }); // ordenada desc
    res.json(pasajeros);
    // otra forma de hacerlo, para ver el error
    // Pasajero.find()
    // .then(pasajeros =>  res.json(pasajeros))
    // .catch(err => console.log(err));

};

//listar pasajeros por contrato
pasajeroCtrl.getPasajerosxContrato = async (req, res) => {
    const pasajeros = await Pasajero.find(req.params);
    res.json(pasajeros);
};

async function validar_cedula(cedula) {
    return await Pasajero.find({ numero_identificacion: cedula, state: 'true' });
}

// crear pasajero
pasajeroCtrl.createPasajero = async (req, res) => {
    const validacion = await validar_cedula(req.body.numero_identificacion);
    if (validacion == 0) {
        const pasajero = new Pasajero({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            numero_identificacion: req.body.numero_identificacion,
            direccion: req.body.direccion,
            ciudad: req.body.ciudad,
            telefono: req.body.telefono,
            correo_elect: req.body.correo_elect,
            state: true

        });

        await pasajero.save();
        res.json({
            status: 'Pasajero Guardado Exitosamente', success: 'true'
        });
    } else {
        res.json({ status: 'El pasajero ya existe', success: 'false' });

    }
};

// consultar por un pasajero especifico
pasajeroCtrl.getPasajero = async (req, res) => {
    const pasajero = await Pasajero.findById(req.params.id);
    res.json(pasajero);
};


// actualizar un pasajero especifico
pasajeroCtrl.updatePasajero = async (req, res) => {
    const { id } = req.params;
    const validacion = await validar_cedula(req.body.numero_identificacion);
    console.log(validacion);
    if (validacion != 0) {
        console.log("entre en el primer if");
        validacion.map(async dato => {
            console.log("estoy en map");
            if (id == dato._id) {
                console.log("entre en el segundo if");
                const newPasajero = {

                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    numero_identificacion: req.body.numero_identificacion,
                    direccion: req.body.direccion,
                    ciudad: req.body.ciudad,
                    telefono: req.body.telefono,
                    correo_elect: req.body.correo_elect,
                    state: true
                }
                await Pasajero.findByIdAndUpdate(id, { $set: newPasajero }, { new: true });
                res.json({ status: 'Pasajero Actualizado Exitosamente' });

            }
            else {
                res.json({ status: 'El pasajero ya existe', success: 'false' });
            }
        });

    }
    else {
        res.json({ status: 'El pasajero no existe', success: 'false' });

    }
};

// Eliminar un pasajero especifico
pasajeroCtrl.deletePasajero = async (req, res) => {
    const { id } = req.params;
    const newState = {
        state: req.body.state
    }
    await Pasajero.findByIdAndUpdate(id, { $set: newState }, { new: true });
    res.json({ status: 'Pasajero Eliminado Exitosamente', success: 'true' });
};

module.exports = pasajeroCtrl;