const Conductor = require('../models/conductores');

const conductorCtrl = {};


//listar conductores
conductorCtrl.getConductores = async (req, res) => {
    const conductores = await Conductor.find({ state: "true" });
    res.json(conductores);
    // otra forma de hacerlo, para ver el error
    // Conductor.find()
    // .then(conductores =>  res.json( conductores))
    // .catch(err => console.log(err));

};
async function validar_cedula(cedula) {
    return await Conductor.find({ CC: cedula });
}



// crear conductor
conductorCtrl.createConductor = async (req, res) => {
    console.log('guardar');
    console.log(req.body);
    const validacion = await validar_cedula(req.body.CC);
    if (validacion == 0) {
        const conductor = new Conductor({
            name: req.body.name,
            CC: req.body.CC,
            active: req.body.active,
            internal: req.body.internal,
            license: req.body.license,
            license_expiration: req.body.license_expiration,
            health_expiration: req.body.health_expiration,
            drug_expiration: req.body.drug_expiration,
            simit_expiration: req.body.simit_expiration,
            health_exam_expiration: req.body.health_exam_expiration,
            driving_exam_expiration: req.body.driving_exam_expiration,
            automotive_law_expiration: req.body.automotive_law_expiration,
            transit_law_expiration: req.body.transit_law_expiration,
            law_tips_expiration: req.body.law_tips_expiration,
            accident_expiration: req.body.accident_expiration,
            driving_methods_expiration: req.body.driving_methods_expiration,
            defensive_expiration: req.body.defensive_expiration,
            distractions_expiration: req.body.distractions_expiration,
            first_aid_expiration: req.body.first_aid_expiration,
            fecha_5sentidos_conduc: req.body.fecha_5sentidos_conduc,
            first_answer_expiration: req.body.first_answer_expiration,
            senses_expiration: req.body.senses_expiration,
            car_security_expiration: req.body.car_security_expiration,
            road_security_expiration: req.body.road_security_expiration,
            state: true

        });
        await conductor.save();
        res.json({
            'status': 'Conductor Guardado Exitosamente', 'success': 'true'
        });
    } else {
        res.json({ 'status': 'Verificar la cédula del conductor, la ingresada, ya existe', 'success': 'false' });

    }
};


// consultar por un conductor especifico
conductorCtrl.getConductor = async (req, res) => {
    const conductor = await Conductor.findById(req.params.id);
    res.json(conductor);
};


// actualizar un conductor especifico
conductorCtrl.updateConductor = async (req, res) => {
    const { id } = req.params;
    console.log('actualizar');
    console.log(req.body);
    const newConductor = {
        name: req.body.name,
        CC: req.body.CC,
        active: req.body.active,
        internal: req.body.internal,
        license: req.body.license,
        license_expiration: req.body.license_expiration,
        health_expiration: req.body.health_expiration,
        drug_expiration: req.body.drug_expiration,
        simit_expiration: req.body.simit_expiration,
        health_exam_expiration: req.body.health_exam_expiration,
        driving_exam_expiration: req.body.driving_exam_expiration,
        automotive_law_expiration: req.body.automotive_law_expiration,
        transit_law_expiration: req.body.transit_law_expiration,
        law_tips_expiration: req.body.law_tips_expiration,
        accident_expiration: req.body.accident_expiration,
        driving_methods_expiration: req.body.driving_methods_expiration,
        defensive_expiration: req.body.defensive_expiration,
        distractions_expiration: req.body.distractions_expiration,
        first_aid_expiration: req.body.first_aid_expiration,
        fecha_5sentidos_conduc: req.body.fecha_5sentidos_conduc,
        first_answer_expiration: req.body.first_answer_expiration,
        senses_expiration: req.body.senses_expiration,
        car_security_expiration: req.body.car_security_expiration,
        road_security_expiration: req.body.road_security_expiration,
        state: true
    }
    await Conductor.findByIdAndUpdate(id, { $set: newConductor }, { new: true });
    res.json({ status: 'Conductor Actualizado Exitosamente', success: 'true' });
};

// Eliminar un conductor especifico
conductorCtrl.deleteConductor = async (req, res) => {
    const { id } = req.params;
    const newState = {

        state: req.body.state
    }
    await Conductor.findByIdAndUpdate(id, { $set: newState }, { new: true });
    res.json({ status: 'Conductor Eliminado Exitosamente', success: 'true' });
};



module.exports = conductorCtrl;