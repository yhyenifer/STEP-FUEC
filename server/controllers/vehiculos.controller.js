const Vehiculo = require('../models/vehiculos');
var moment = require('moment/moment');
const vehiculoCtrl = {};

async function validar_placa(placa) {
    return await Vehiculo.find({ plate: placa, state: 'true' });
}

//listar Vehiculos
vehiculoCtrl.getVehiculos = async (req, res) => {
    const vehiculos = await Vehiculo.find({ state: "true" });
    res.json(vehiculos);
};


//listar Vehiculos disponibles
vehiculoCtrl.VehiculosDisponibles = async (req, res) => {
    var fecha_fin = req.body.fecha_fin;
    var fecha_ini = req.body.fecha_ini;

    const vehiculos = await Vehiculo.find({ state: "true" });

    vehiculos.map((dato, key) => {
        var fechas = [moment(dato.exp_to), moment(dato.exp_soat), moment(dato.exp_tech), moment(dato.exp_prev),
        moment(dato.exp_rcc)];
        console.log(fechas);
        console.log("1");

        if (dato.GNV == "true") {
            if (moment(dato.exp_to) > fecha_ini && moment(dato.exp_soat) > fecha_ini && moment(dato.exp_tech) > fecha_ini
                && moment(dato.exp_prev) > fecha_ini && moment(dato.exp_rcc) > fecha_ini && moment(dato.exp_gnv) > fecha_ini) {

                var fechas = [dato.exp_to, dato.exp_soat, dato.exp_tech, dato.exp_prev, dato.exp_rcc, dato.exp_gnv];
                console.log(fechas);
                console.log("2");
                for (var i = 0; i < fechas.length; i++) {
                    var fecha_menor = fechas[i];

                }
            }
        }
        else
            if (moment(dato.exp_to) > moment(fecha_ini) && moment(dato.exp_soat) > moment(fecha_ini) &&
                moment(dato.exp_tech) > moment(fecha_ini) && moment(dato.exp_prev) > moment(fecha_ini) &&
                moment(dato.exp_rcc) > moment(fecha_ini)) {

                var fechas = [dato.exp_to, dato.exp_soat, dato.exp_tech, dato.exp_prev, dato.exp_rcc];
                console.log(fechas);
                console.log("3");
                for (var i = 0; i < fechas.length; i++) {
                    var fecha_menor = fechas[i];

                }
            }
            else
                res.json(vehiculos);
    })
};


vehiculoCtrl.getAlertasVehiculos = async (req, res) => {
    const vehiculo = await Vehiculo.find({ state: "true" });
    const alertas = [];

    vehiculo.map(async dato => {
        var fecha_com = moment(dato.exp_to); // captura fecha de expiracion de la tarjeta de operacion
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

        //condicion de fechas entre 1 y 15 dias para alerta tipo 1
        if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
            // objeto alerta tipo 1 -> warning amarilla
            const objAlerta1 = {
                placa: dato.plate,
                alerta: "Expiracion de la tarjeta de operacion ",
                id: dato._id,
                fecha: moment(dato.exp_to).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 1
            }
            alertas.push(objAlerta1);
        };

        if (fecha_diferencia <= 5) {
            //objeto alerta tipo 2 -> warning roja
            const objAlerta2 = {
                placa: dato.plate,
                alerta: "Expiracion de la tarjeta de operacion",
                id: dato._id,
                fecha: moment(dato.exp_to).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 2
            }
            alertas.push(objAlerta2);
        };

        var fecha_com = moment(dato.exp_soat); // captura fecha de expiracion del seguro obligatorio  de accidentes de transito SOAT
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

        //condicion de fechas entre 1 y 15 dias para alerta tipo 1
        if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
            // objeto alerta tipo 1 -> warning amarilla
            const objAlerta1 = {
                placa: dato.plate,
                alerta: "Expiracion del seguro obligatorio  de accidentes de transito SOAT ",
                id: dato._id,
                fecha: moment(dato.exp_soat).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 1
            }
            alertas.push(objAlerta1);
        };

        if (fecha_diferencia <= 5) {
            //objeto alerta tipo 2 -> warning roja
            const objAlerta2 = {
                placa: dato.plate,
                alerta: "Expiracion del seguro obligatorio  de accidentes de transito SOAT",
                id: dato._id,
                fecha: moment(dato.exp_soat).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 2
            }
            alertas.push(objAlerta2);
        };

        var fecha_com = moment(dato.exp_tech); // captura fecha de expiracion de la revision tecnico mecanica
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

        //condicion de fechas entre 1 y 15 dias para alerta tipo 1
        if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
            // objeto alerta tipo 1 -> warning amarilla
            const objAlerta1 = {
                placa: dato.plate,
                alerta: "Expiracion de la revision tecnico mecanica ",
                id: dato._id,
                fecha: moment(dato.exp_tech).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 1
            }
            alertas.push(objAlerta1);
        };

        if (fecha_diferencia <= 5) {
            //objeto alerta tipo 2 -> warning roja
            const objAlerta2 = {
                placa: dato.plate,
                alerta: "Expiracion de la revision tecnico mecanica ",
                id: dato._id,
                fecha: moment(dato.exp_tech).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 2
            }
            alertas.push(objAlerta2);
        };

        var fecha_com = moment(dato.exp_prev); // captura fecha de expiracion de la revision preventiva
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

        //condicion de fechas entre 1 y 15 dias para alerta tipo 1
        if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
            // objeto alerta tipo 1 -> warning amarilla
            const objAlerta1 = {
                placa: dato.plate,
                alerta: "Expiracion de la revision preventiva ",
                id: dato._id,
                fecha: moment(dato.exp_prev).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 1
            }
            alertas.push(objAlerta1);
        };

        if (fecha_diferencia <= 5) {
            //objeto alerta tipo 2 -> warning roja
            const objAlerta2 = {
                placa: dato.plate,
                alerta: "Expiracion de la revision preventiva ",
                id: dato._id,
                fecha: moment(dato.exp_prev).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 2
            }
            alertas.push(objAlerta2);
        };

        var fecha_com = moment(dato.exp_rcc); // captura fecha de expiracion de Responsabilidad Civil Contractual
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

        //condicion de fechas entre 1 y 15 dias para alerta tipo 1
        if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
            // objeto alerta tipo 1 -> warning amarilla
            const objAlerta1 = {
                placa: dato.plate,
                alerta: "Expiracion de la Responsabilidad Civil Contractual ",
                id: dato._id,
                fecha: moment(dato.exp_rcc).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 1
            }
            alertas.push(objAlerta1);
        };

        if (fecha_diferencia <= 5) {
            //objeto alerta tipo 2 -> warning roja
            const objAlerta2 = {
                placa: dato.plate,
                alerta: "Expiracion de la Responsabilidad Civil Contractual ",
                id: dato._id,
                fecha: moment(dato.exp_rcc).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 2
            }
            alertas.push(objAlerta2);
        };

        if (dato.GNV = "true") {
            var fecha_com = moment(dato.exp_gnv); // captura fecha de expiracion de la revision de Gas Natural Vehicular
            var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
            var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

            //condicion de fecha5s entre 1 y 15 dias para alerta tipo 1
            if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
                // objeto alerta tipo 1 -> warning amarilla
                const objAlerta1 = {
                    placa: dato.plate,
                    alerta: "Expiracion de la revision de Gas Natural Vehicular ",
                    id: dato._id,
                    fecha: moment(dato.exp_gnv).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 1
                }
                alertas.push(objAlerta1);
            };

            if (fecha_diferencia <= 5) {
                //objeto alerta tipo 2 -> warning roja
                const objAlerta2 = {
                    placa: dato.plate,
                    alerta: "Expiracion de la revision de Gas Natural Vehicular ",
                    id: dato._id,
                    fecha: moment(dato.exp_gnv).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 2
                }
                alertas.push(objAlerta2);
            }
        };

    });
    res.json(alertas);
};


//crear vehiculo
vehiculoCtrl.createVehiculo = async (req, res) => {
    const validacion = await validar_placa(req.body.plate);
    if (validacion == 0) {

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
        await vehiculo.save();
        res.json({
            status: 'Vehiculo Guardado Exitosamente', success: 'true'
        });
    } else {
        res.json({ status: 'Verificar la placa del vehiculo, la ingresada, ya existe', success: 'false' });

    }
};

// consultar por un vehiculo especifico
vehiculoCtrl.getVehiculo = async (req, res) => {
    const vehiculo = await Vehiculo.findById(req.params.id);
    res.json(vehiculo);
};


// actualizar un vehiculo especifico
vehiculoCtrl.updateVehiculo = async (req, res) => {
    const { id } = req.params;
    const validacion = await validar_placa(req.body.plate);
    if (validacion != 0) {
        validacion.map(async dato => {

            if (id == dato._id) {

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
                    state: req.body.state
                }
                if (vehiculo.GNV) {
                    vehiculo.exp_gnv = req.body.exp_gnv;
                }
                await Vehiculo.findByIdAndUpdate(id, { $set: newVehiculo }, { new: true });
                res.json({ status: 'Vehiculo Actualizado Exitosamente' });
            }
            else {
                res.json({ status: 'Verificar la placa del vehiculo, la ingresada, ya existe', success: 'false' });
            }
        });

    }
    else {
        res.json({ status: 'El vehiculo no esta creado', success: 'false' });

    }


};



// Eliminar un vehiculo especifico

vehiculoCtrl.deleteVehiculo = async (req, res) => {
    const { id } = req.params;
    const newState = {

        state: req.body.state
    }
    await Vehiculo.findByIdAndUpdate(id, { $set: newState }, { new: true });
    res.json({ status: 'Vehiculo Eliminado Exitosamente' });
};




module.exports = vehiculoCtrl;
