const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClienteSchema = new Schema({
    nombre: { type: String, required: true },//para cedula: nombres
    apellido: { type: String, required: true },//para cedula: apellidos
    tipo_identif: { type: String },//cedula o nit
    lugar_exp_ced: { type: String },//para cedula: lugar de expedicion
    numero_identificacion: { type: String, required: true },
    nombre_estable: { type: String },//para nit: nombre de la razon social

    //tipo_cooperacion: { type: String, required: true },//para nit: tipo de persona juridica
    digito_verif: { type: String },//para nit: digito de verificacion

    nombre_rep_legal: { type: String },//para nit: nombre de representante legal
    direccion: { type: String, required: true }, //direccion
    ciudad: { type: String, required: true },//
    telefono: { type: String, required: true },//numero telefonico

    correo_elect: { type: String, required: true }, //correo electronico
    state: { type: Boolean, default: true }


}, { timestamps: true });

module.exports = mongoose.model('Clientes', ClienteSchema);