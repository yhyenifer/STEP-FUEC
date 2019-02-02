const Ruta = require('../models/rutas');

const rutaCtrl = {};

//listar rutas
rutaCtrl.getRutas = async (req, res) => {

    const rutas = await Ruta.find({ state: "true" });
    res.json(rutas);
};

async function validar_rutaExist(nombre_ruta) {
    return await Ruta.find({ nombre_ruta: nombre_ruta, state: 'true' });
}

// crear ruta
rutaCtrl.createRuta = async (req, res) => {
    const validacion = await validar_rutaExist(req.body.nombre_ruta);
    if (validacion == 0) {
        const ruta = new Ruta({
            nombre_ruta: req.body.nombre_ruta,
            descripcion_ruta: req.body.descripcion_ruta,
            state: true

        });

        await ruta.save();
        res.json({
            status: 'Ruta Guardada Exitosamente', success: 'true'
        });
    } else {
        res.json({ status: 'Verificar el nombre de la ruta, el ingresado, ya existe', success: 'false' });

    }
};

// consultar por una ruta especifica
rutaCtrl.getRuta = async (req, res) => {
    const ruta = await Ruta.findById(req.params.id);
    res.json(ruta);
};


// actualizar una ruta especifica
rutaCtrl.updateRuta = async (req, res) => {
    const { id } = req.params;
    const validacion = await validar_rutaExist(req.body.nombre_ruta);
    if (validacion != 0) {
        validacion.map(async dato => {

            if (id == dato._id) {

                const newRuta = {
                    _id: req.body._id,
                    nombre_ruta: req.body.nombre_ruta,
                    descripcion_ruta: req.body.descripcion_ruta,
                    state: true
                }
                await Ruta.findByIdAndUpdate(id, { $set: newRuta }, { new: true });
                res.json({ status: 'Ruta Actualizada Exitosamente.' });
            }
            else {
                res.json({ status: 'Verificar el nombre de la ruta, el ingresado, ya existe.', success: 'false' });
            }
        });
    }
    else {
        res.json({ status: 'La ruta no existe.', success: 'false' });
    }
};






// Eliminar una ruta especifica
rutaCtrl.deleteRuta = async (req, res) => {
    const { id } = req.params;
    const newState = {
        state: req.body.state
    }
    await Ruta.findByIdAndUpdate(id, { $set: newState }, { new: true });
    res.json({ status: 'Ruta Eliminada Exitosamente' });
};



module.exports = rutaCtrl;