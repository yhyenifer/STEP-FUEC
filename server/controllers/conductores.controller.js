const Conductor = require('../models/conductores');
var moment = require('moment/moment');
const conductorCtrl = {};


async function validar_cedula(cedula) {
    return await Conductor.find({ CC: cedula, state: 'true' });
}

//listar conductores
conductorCtrl.getConductores = async (req, res) => {
    const conductores = await Conductor.find({ state: "true" }).sort({ createdAt: -1 }); // ordenada desc
    res.json(conductores);
};

//listar Conductores disponibles
conductorCtrl.ConductoresDisponibles = async (req, res) => {
    const conductores_disponibles = [];
    var fecha_fin = moment(req.body.fecha_fin);
    var fecha_ini = moment(req.body.fecha_ini);

    const conductores = await Conductor.find({ state: "true" });

    conductores.map((dato, key) => {

        if (moment(dato.license_expiration) > fecha_fin && moment(dato.health_expiration) > fecha_fin &&
            moment(dato.drug_expiration) > fecha_fin && moment(dato.simit_expiration) > fecha_fin) {

            const objCond_Dis = {
                id: dato._id,
                nombre: dato.name,
                cedula: dato.CC,
                fecha_exp: ""
            }
            conductores_disponibles.push(objCond_Dis);
        }
        else {
            if (moment(dato.license_expiration) < fecha_fin || moment(dato.health_expiration) < fecha_fin ||
                moment(dato.drug_expiration) < fecha_fin || moment(dato.simit_expiration) < fecha_fin) {

                if (moment(dato.license_expiration) > fecha_ini && moment(dato.health_expiration) > fecha_ini &&
                    moment(dato.drug_expiration) > fecha_ini && moment(dato.simit_expiration) > fecha_ini) {

                    var dato_license_expiration = Math.abs(fecha_ini.diff(dato.license_expiration, 'days'));
                    var dato_health_expiration = Math.abs(fecha_ini.diff(dato.health_expiration, 'days'));
                    var dato_drug_expiration = Math.abs(fecha_ini.diff(dato.drug_expiration, 'days'));
                    var dato_simit_expiration = Math.abs(fecha_ini.diff(dato.simit_expiration, 'days'));
                    var fechas_diff = ["Expiracion Licencia Conduccion", "Expiracion Aportes de Salud", "Expiracion Examenes de Drogas y Alcoholemia",
                        "Expiracion Consulta"];
                    var fechas = [dato_license_expiration, dato_health_expiration, dato_drug_expiration, dato_simit_expiration];
                    var fecha_menor = fechas[0];

                    for (var i = 0; i < fechas.length; i++) {

                        if (fechas[i] <= fecha_menor) {

                            fecha_menor = fechas[i];
                            var posicion = i;
                        }
                    }
                    const objCond_Dis = {
                        id: dato._id,
                        nombre: dato.name,
                        cedula: dato.CC,
                        fecha_exp: fechas_diff[posicion]
                    }
                    conductores_disponibles.push(objCond_Dis);
                }
            }
        }
    })
    res.json(conductores_disponibles);
};


// crear conductor
conductorCtrl.createConductor = async (req, res) => {

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
            status: 'Conductor Guardado Exitosamente', success: 'true'
        });
    } else {
        res.json({ status: 'Verificar la cédula del conductor, la ingresada, ya existe', success: 'false' });

    }
};


// consultar por un conductor especifico
conductorCtrl.getConductor = async (req, res) => {
    const conductor = await Conductor.findById(req.params.id);
    res.json(conductor);
};


// generar alertas necesarias para los conductores
conductorCtrl.getAlertasConductores = async (req, res) => {
    const conductor = await Conductor.find({ state: "true" });
    const alertas = [];
    conductor.map(async dato => {

        var fecha_com = moment(dato.license_expiration); // captura fecha de licencia expiracion
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

        //condicion de fechas entre 1 y 15 dias para alerta tipo 1
        if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
            // objeto alerta tipo 1 -> warning amarilla
            const objAlerta1 = {
                identificacion: dato.CC,
                nombre: dato.name,
                alerta: "Expiracion licencia",
                id: dato._id,
                fecha: moment(dato.license_expiration).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 1

            }

            alertas.push(objAlerta1);
        };

        if (fecha_diferencia <= 5) {
            //objeto alerta tipo 2 -> warning roja
            const objAlerta2 = {
                identificacion: dato.CC,
                nombre: dato.name,
                alerta: "Expiracion licencia",
                id: dato._id,
                fecha: moment(dato.license_expiration).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 2
            }
            alertas.push(objAlerta2);
        };

        var fecha_com = moment(dato.health_expiration); // captura fecha de expiracion aportes de salud
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

        //condicion de fechas entre 1 y 15 dias para alerta tipo 1
        if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
            // objeto alerta tipo 1 -> warning amarilla
            const objAlerta1 = {
                identificacion: dato.CC,
                nombre: dato.name,
                alerta: "Expiracion de aportes de salud",
                id: dato._id,
                fecha: moment(dato.health_expiration).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 1
            }
            alertas.push(objAlerta1);
        };

        if (fecha_diferencia <= 5) {
            // objeto alerta tipo 2 -> warning roja
            const objAlerta2 = {
                identificacion: dato.CC,
                nombre: dato.name,
                alerta: "Expiracion de aportes de salud",
                id: dato._id,
                fecha: moment(dato.health_expiration).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 2
            }
            alertas.push(objAlerta2);
        };

        var fecha_com = moment(dato.drug_expiration); // captura fecha de expiracion examen drogas y alcoholemia
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

        //condicion de fechas entre 1 y 15 dias para alerta tipo 1
        if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
            // objeto alerta tipo 1 -> warning amarilla
            const objAlerta1 = {
                identificacion: dato.CC,
                nombre: dato.name,
                alerta: "Expiracion de examen de drogas y alcoholemia",
                id: dato._id,
                fecha: moment(dato.drug_expiration).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 1
            }
            alertas.push(objAlerta1);
        };

        if (fecha_diferencia <= 5) {
            // objeto alerta tipo 2 -> warning roja
            const objAlerta2 = {
                identificacion: dato.CC,
                nombre: dato.name,
                alerta: "Expiracion de examen de drogas y alcoholemia",
                id: dato._id,
                fecha: moment(dato.drug_expiration).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 2
            }
            alertas.push(objAlerta2);
        };

        var fecha_com = moment(dato.simit_expiration); // captura fecha de expiracion de consultas en el simit
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

        //condicion de fechas entre 1 y 15 dias para alerta tipo 1
        if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
            // objeto alerta tipo 1 -> warning amarilla
            const objAlerta1 = {
                identificacion: dato.CC,
                nombre: dato.name,
                alerta: "Expiracion de consultas en el simit",
                id: dato._id,
                fecha: moment(dato.simit_expiration).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 1
            }
            alertas.push(objAlerta1);
        };

        if (fecha_diferencia <= 5) {
            // objeto alerta tipo 2 -> warning roja
            const objAlerta2 = {
                identificacion: dato.CC,
                nombre: dato.name,
                alerta: "Expiracion de consultas en el simit",
                id: dato._id,
                fecha: moment(dato.simit_expiration).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 2
            }
            alertas.push(objAlerta2);
        };

        var fecha_com = moment(dato.health_exam_expiration); // captura fecha de expiracion de examenes de salud ocupacional
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        if (dato.health_exam_expiration != undefined) {
            var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

            //condicion de fechas entre 1 y 15 dias para alerta tipo 1
            if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
                // objeto alerta tipo 1 -> warning amarilla
                const objAlerta1 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de examenes de salud ocupacional",
                    id: dato._id,
                    fecha: moment(dato.health_exam_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 1
                }
                alertas.push(objAlerta1);
            };

            if (fecha_diferencia <= 5) {
                // objeto alerta tipo 2 -> warning roja
                const objAlerta2 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de examenes de salud ocupacional",
                    id: dato._id,
                    fecha: moment(dato.health_exam_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 2
                }
                alertas.push(objAlerta2);
            };
        }

        var fecha_com = moment(dato.driving_exam_expiration); // captura fecha de expiracion del examen de conduccion
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        if (dato.driving_exam_expiration != undefined) {
            var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

            //condicion de fechas entre 1 y 15 dias para alerta tipo 1
            if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
                // objeto alerta tipo 1 -> warning amarilla
                const objAlerta1 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion del examen de conduccion",
                    id: dato._id,
                    fecha: moment(dato.driving_exam_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 1
                }
                alertas.push(objAlerta1);
            };

            if (fecha_diferencia <= 5) {
                // objeto alerta tipo 2 -> warning roja
                const objAlerta2 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion del examen de conduccion",
                    id: dato._id,
                    fecha: moment(dato.driving_exam_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 2
                }
                alertas.push(objAlerta2);
            };
        }

        var fecha_com = moment(dato.automotive_law_expiration); // captura fecha de expiracion normas de transito y transporte terrestre automotor
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        if (dato.automotive_law_expiration != undefined) {
            var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

            //condicion de fechas entre 1 y 15 dias para alerta tipo 1
            if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
                // objeto alerta tipo 1 -> warning amarilla
                const objAlerta1 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion del examen de normas de transito y transporte terrestre automotor",
                    id: dato._id,
                    fecha: moment(dato.automotive_law_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 1
                }
                alertas.push(objAlerta1);
            };


            if (fecha_diferencia <= 5) {
                // objeto alerta tipo 2 -> warning roja
                const objAlerta2 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion del examen de normas de transito y transporte terrestre automotor",
                    id: dato._id,
                    fecha: moment(dato.automotive_law_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 2
                }
                alertas.push(objAlerta2);
            };
        }

        var fecha_com = moment(dato.transit_law_expiration); // captura fecha de expiracion de examen de normas de transito
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        if (dato.transit_law_expiration != undefined) {
            var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

            //condicion de fechas entre 1 y 15 dias para alerta tipo 1
            if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
                // objeto alerta tipo 1 -> warning amarilla
                const objAlerta1 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion del examen de normas de transito",
                    id: dato._id,
                    fecha: moment(dato.transit_law_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 1
                }
                alertas.push(objAlerta1);
            };

            if (fecha_diferencia <= 5) {
                // objeto alerta tipo 2 -> warning roja
                const objAlerta2 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion del examen de normas de transito",
                    id: dato._id,
                    fecha: moment(dato.transit_law_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 2
                }
                alertas.push(objAlerta2);
            };
        }

        var fecha_com = moment(dato.law_tips_expiration); // captura fecha de expiracion de examen de tips normativos
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        if (dato.law_tips_expiration != undefined) {
            var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

            //condicion de fechas entre 1 y 15 dias para alerta tipo 1
            if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
                // objeto alerta tipo 1 -> warning amarilla
                const objAlerta1 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion del examen tips normativos",
                    id: dato._id,
                    fecha: moment(dato.law_tips_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 1
                }
                alertas.push(objAlerta1);
            };

            if (fecha_diferencia <= 5) {
                // objeto alerta tipo 2 -> warning roja
                const objAlerta2 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion del examen de tips normativos",
                    id: dato._id,
                    fecha: moment(dato.law_tips_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 2
                }
                alertas.push(objAlerta2);
            };
        }

        var fecha_com = moment(dato.accident_expiration); // captura fecha de expiracion de accidentalidad de transito
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        if (dato.accident_expiration != undefined) {
            var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

            //condicion de fechas entre 1 y 15 dias para alerta tipo 1
            if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
                // objeto alerta tipo 1 -> warning amarilla
                const objAlerta1 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de accidentalidad de transito",
                    id: dato._id,
                    fecha: moment(dato.accident_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 1
                }
                alertas.push(objAlerta1);
            };

            if (fecha_diferencia <= 5) {
                // objeto alerta tipo 2 -> warning roja
                const objAlerta2 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de accidentalidad de transito",
                    id: dato._id,
                    fecha: moment(dato.accident_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 2
                }
                alertas.push(objAlerta2);
            };
        }
        var fecha_com = moment(dato.driving_methods_expiration); // captura fecha de expiracion de metodos de conduccion
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        if (dato.driving_methods_expiration != undefined) {
            var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

            //condicion de fechas entre 1 y 15 dias para alerta tipo 1
            if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
                // objeto alerta tipo 1 -> warning amarilla
                const objAlerta1 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de metodos de conduccion",
                    id: dato._id,
                    fecha: moment(dato.driving_methods_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 1
                }
                alertas.push(objAlerta1);
            };

            if (fecha_diferencia <= 5) {
                // objeto alerta tipo 2 -> warning roja
                const objAlerta2 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de metodos de conduccion",
                    id: dato._id,
                    fecha: moment(dato.driving_methods_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 2
                }
                alertas.push(objAlerta2);
            };
        }

        var fecha_com = moment(dato.defensive_expiration); // captura fecha de expiracion de manejo defensivo
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        if (dato.defensive_expiration != undefined) {
            var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

            //condicion de fechas entre 1 y 15 dias para alerta tipo 1
            if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
                // objeto alerta tipo 1 -> warning amarilla
                const objAlerta1 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de manejo defensivo",
                    id: dato._id,
                    fecha: moment(dato.defensive_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 1
                }
                alertas.push(objAlerta1);
            };


            if (fecha_diferencia <= 5) {
                // objeto alerta tipo 2 -> warning roja
                const objAlerta2 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de manejo defensivo",
                    id: dato._id,
                    fecha: moment(dato.defensive_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 2
                }
                alertas.push(objAlerta2);
            };
        }

        var fecha_com = moment(dato.distractions_expiration); // captura fecha de expiracion de distracciones
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        if (dato.distractions_expiration != undefined) {
            var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

            //condicion de fechas entre 1 y 15 dias para alerta tipo 1
            if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
                // objeto alerta tipo 1 -> warning amarilla
                const objAlerta1 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de distracciones",
                    id: dato._id,
                    fecha: moment(dato.distractions_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 1
                }
                alertas.push(objAlerta1);
            };

            if (fecha_diferencia <= 5) {
                // objeto alerta tipo 2 -> warning roja
                const objAlerta2 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de distracciones",
                    id: dato._id,
                    fecha: moment(dato.distractions_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 2
                }
                alertas.push(objAlerta2);
            };
        }

        var fecha_com = moment(dato.first_aid_expiration); // captura fecha de expiracion de primeros auxilios
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        if (dato.first_aid_expiration != undefined) {
            var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

            //condicion de fechas entre 1 y 15 dias para alerta tipo 1
            if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
                // objeto alerta tipo 1 -> warning amarilla
                const objAlerta1 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de primeros auxilios",
                    id: dato._id,
                    fecha: moment(dato.first_aid_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 1
                }
                alertas.push(objAlerta1);
            };

            if (fecha_diferencia <= 5) {
                // objeto alerta tipo 2 -> warning roja
                const objAlerta2 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de primeros auxilios",
                    id: dato._id,
                    fecha: moment(dato.first_aid_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 2
                }
                alertas.push(objAlerta2);
            };
        }
        var fecha_com = moment(dato.first_answer_expiration); // captura fecha de expiracion de primer respondiente
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        if (dato.first_answer_expiration != undefined) {
            var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

            //condicion de fechas entre 1 y 15 dias para alerta tipo 1
            if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
                // objeto alerta tipo 1 -> warning amarilla
                const objAlerta1 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de primer respondiente",
                    id: dato._id,
                    fecha: moment(dato.first_answer_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 1
                }
                alertas.push(objAlerta1);
            };

            if (fecha_diferencia <= 5) {
                // objeto alerta tipo 2 -> warning roja
                const objAlerta2 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de primer respondiente",
                    id: dato._id,
                    fecha: moment(dato.first_answer_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 2
                }
                alertas.push(objAlerta2);
            };
        }

        var fecha_com = moment(dato.senses_expiration); // captura fecha de expiracion de los cinco sentidos de la conduccion
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        if (dato.senses_expiration != undefined) {
            var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

            //condicion de fechas entre 1 y 15 dias para alerta tipo 1
            if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
                // objeto alerta tipo 1 -> warning amarilla
                const objAlerta1 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de los cinco sentidos de la conduccion",
                    id: dato._id,
                    fecha: moment(dato.senses_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 1
                }
                alertas.push(objAlerta1);
            };

            if (fecha_diferencia <= 5) {
                // objeto alerta tipo 2 -> warning roja
                const objAlerta2 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de los cinco sentidos de la conduccion",
                    id: dato._id,
                    fecha: moment(dato.senses_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 2
                }
                alertas.push(objAlerta2);
            };
        }

        var fecha_com = moment(dato.car_security_expiration); // captura fecha de expiracion de la seguridad activa y pasiva del vehiculo
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        if (dato.car_security_expiration != undefined) {
            var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

            //condicion de fechas entre 1 y 15 dias para alerta tipo 1
            if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
                // objeto alerta tipo 1 -> warning amarilla
                const objAlerta1 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de la seguridad activa y pasiva del vehiculo",
                    id: dato._id,
                    fecha: moment(dato.car_security_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 1
                }
                alertas.push(objAlerta1);
            };

            if (fecha_diferencia <= 5) {
                // objeto alerta tipo 2 -> warning roja
                const objAlerta2 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de la seguridad activa y pasiva del vehiculo",
                    id: dato._id,
                    fecha: moment(dato.car_security_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 2
                }
                alertas.push(objAlerta2);
            };
        }

        var fecha_com = moment(dato.road_security_expiration); // captura fecha de expiracion de la seguridad vial
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        if (dato.road_security_expiration != undefined) {
            var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

            //condicion de fechas entre 1 y 15 dias para alerta tipo 1
            if (fecha_diferencia >= 6 && fecha_diferencia <= 20) {
                // objeto alerta tipo 1 -> warning amarilla
                const objAlerta1 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de la seguridad vial",
                    id: dato._id,
                    fecha: moment(dato.road_security_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 1
                }
                alertas.push(objAlerta1);
            };

            if (fecha_diferencia <= 5) {
                // objeto alerta tipo 2 -> warning roja
                const objAlerta2 = {
                    identificacion: dato.CC,
                    nombre: dato.name,
                    alerta: "Expiracion de la seguridad vial",
                    id: dato._id,
                    fecha: moment(dato.road_security_expiration).format("YYYY-MM-DD"),
                    fecha_diferencia: fecha_diferencia,
                    tipo_alerta: 2
                }
                alertas.push(objAlerta2);
            };
        }
    })//cierra map
    res.json(alertas);
};
// actualizar un conductor especifico
conductorCtrl.updateConductor = async (req, res) => {
    const { id } = req.params;
    const validacion = await validar_cedula(req.body.CC);
    console.log(validacion);
    if (validacion != 0) {
        validacion.map(async dato => {
            console.log(dato._id);
            console.log(id);
            console.log("1");
            if (id == dato._id) {
                console.log(dato._id);
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
                    state: req.body.state
                }
                await Conductor.findByIdAndUpdate(id, { $set: newConductor }, { new: true });
                res.json({ status: 'Conductor Actualizado Exitosamente', success: 'true' });

            }
            else {
                res.json({ status: 'Verificar la cedula del conductor, la ingresada, ya existe', success: 'false' });
            }
        });

    }
    else {
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
            state: req.body.state
        }
        await Conductor.findByIdAndUpdate(id, { $set: newConductor }, { new: true });
        res.json({ status: 'Conductor Actualizado Exitosamente', success: 'true' });
    }
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