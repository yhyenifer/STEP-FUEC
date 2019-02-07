const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContratoSchema = new Schema({

    id_cliente: { type: String, required: true, ref: 'clientes' },//informacion del cliente
    id_pasajero: { type: String },//lista de 
    pasaj_respon: { type: String },//pasajero responsable del viaje
    info_adicional: { type: String },//espacio para ingresar informacion adicional en el contrato
    tipo_contrato: { type: String },//empresas, ocasionales, colegios.
    renewable: { type: Boolean },//Renovable si o no
    ct_object: { type: String, required: true },//Objeto del contrato
    pass_number: { type: Number, required: true }, //Numero de pasajeros
    car_number: { type: Number, required: true }, // Numero de carros a utilizar
    route: { type: String, required: true }, //Ruta de ida del viaje
    return_route: { type: String },//Ruta de vuelta del viaje
    start: { type: Date, required: true }, //Fecha inicio del viaje (Año/Mes/Dia)
    end: { type: Date, required: true }, // Fecha de finalizacion del viaje (Año/Mes/Dia)
    value: { type: Number, required: true },// Valor del contrato
    payment: { type: String, required: true }, // Tipo de pago: Contado, anticipo 50%, otro
    sign_date: { type: Date, required: true }, // Fecha de firma del contrato (Año/Mes/Dia)}
    ct_number: { type: String },
    estadoContrato: { type: String },
    fecha_Pago: { type: Date },
    usuario_actual: { type: String },
    state: { type: Boolean, default: true }

}, { timestamps: true });

module.exports = mongoose.model('Contratos', ContratoSchema);