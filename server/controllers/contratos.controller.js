const Contrato = require('../models/contratos');
const Permiso = require('../models/permisos');
var moment = require('moment/moment');

const contratoCtrl = {};


//listar contratos
contratoCtrl.getContratos = async (req, res) => {
    const contratos = await Contrato.find({ state: "true" });
    res.json(contratos);
    // otra forma de hacerlo, para ver el error
    // Contrato.find()
    // .then(contrato =>  res.json( contratos))
    // .catch(err => console.log(err));
};

async function definirct_number(tipo_cont) {
    return await Contrato.find({ tipo_contrato: tipo_cont, state: true }).sort({ $natural: -1 }).limit(1);

}

contratoCtrl.getAlertasContratos = async (req, res) => {
    const contrato = await Contrato.find({ state: "true" });
    const alertas = [];
    contrato.map(async dato => {

        var fecha_com = moment(dato.end); // captura fecha de fin del contrato
        var fecha_Actual = moment().format("YYYY-MM-DD"); // capturas la fecha actual del sistema y le da formato
        var fecha_diferencia = fecha_com.diff(fecha_Actual, 'days');// calcula la diferencia de fechas y se muestra en dias

        //condicion de fechas entre 1 y 15 dias para alerta tipo 1
        if (fecha_diferencia >= 1 && fecha_diferencia <= 15) {
            // objeto alerta tipo 1 -> warning amarilla
            const objAlerta1 = {
                numero_contrato: dato.ct_number,
                tipo_contra: dato.tipo_contrato,
                objeto_contrato: dato.ct_object,
                cliente: dato.id_cliente,
                alerta: "Finalizacion del Contrato",
                id: dato._id,
                fecha: moment(dato.end).format("YYYY-MM-DD"),
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 1
            }
            alertas.push(objAlerta1);
        };

        if (fecha_diferencia <= 0) {
            //objeto alerta tipo 2 -> warning roja
            const objAlerta2 = {
                numero_contrato: dato.ct_number,
                tipo_contra: dato.tipo_contrato,
                objeto_contrato: dato.ct_object,
                id: dato._id,
                fecha: moment(dato.end).format("YYYY-MM-DD"),
                alerta: "Finalizacion del Contrato",
                fecha: dato.end,
                fecha_diferencia: fecha_diferencia,
                tipo_alerta: 2
            }
            alertas.push(objAlerta2);
        };
    });
};

// crear contrato
contratoCtrl.createContrato = async (req, res) => {

    const Valid = await definirct_number(req.params.tipo_contrato);
    var tip_con = req.params.tipo_contrato;
    var nume_cont;

    if (Valid == 0) {
        if (tip_con = 'ocasional') {
            nume_cont = '3000';
        }
        if (tip_con = 'colegios') {
            nume_cont = '6000';
        }
        if (tip_con = 'empresas') {
            nume_cont = '9000';
        }

        const contrato = new Contrato({
            id_cliente: req.body.id_cliente,
            tipo_contrato: req.body.tipo_contrato,
            renewable: req.body.renewable,
            ct_object: req.body.ct_object,
            pass_number: req.body.pass_number,
            car_number: req.body.car_number,
            route: req.body.route,
            return_route: req.body.return_route,
            start: req.body.start,
            end: req.body.end,
            value: req.body.value,
            payment: req.body.payment,
            sign_date: req.body.sign_date,
            ct_number: nume_cont,
            state: true

        });

        await contrato.save();
        //invoco funcion ultimo contrato,guardo el numero del contrato
        const Valid_permi = await definirct_number(req.params.tipo_contrato);
        //funcion crear permiso que serio Permiso.funcion (que creo en permiso.controller) y debo enviar variable numero contrato y req.body.permisos 
        Permiso.createPermiso(Valid_permi, req.body.Permiso);

        res.json({
            status: 'Contrato Guardado Exitosamente', success: 'true'
        });
    }

    else {

        Valid.map(async dato => {

            nume_cont = (parseInt(dato.ct_number) + 1).toString();

            const contrato = new Contrato({
                id_cliente: req.body.id_cliente,
                tipo_contrato: req.body.tipo_contrato,
                renewable: req.body.renewable,
                ct_object: req.body.ct_object,
                pass_number: req.body.pass_number,
                car_number: req.body.car_number,
                route: req.body.route,
                return_route: req.body.return_route,
                start: req.body.start,
                end: req.body.end,
                value: req.body.value,
                payment: req.body.payment,
                sign_date: req.body.sign_date,
                ct_number: nume_cont,
                state: true

            });

            await contrato.save();
            res.json({
                status: 'Contrato Guardado Exitosamente', success: 'true'
            });
        });
    }
};

// consultar por un contrato especifico
contratoCtrl.getContrato = async (req, res) => {
    const contrato = await Contrato.findById(req.params.id);
    res.json(contrato);
};


// Eliminar un contrato especifico
contratoCtrl.deleteContrato = async (req, res) => {
    const { id } = req.params;
    const newState = {

        state: req.body.state
    }
    await Contrato.findByIdAndUpdate(id, { $set: newState }, { new: true });
    res.json({ status: 'Contrato Eliminado Exitosamente' });
};



module.exports = contratoCtrl;