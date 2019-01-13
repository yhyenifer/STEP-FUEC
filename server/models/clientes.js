const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClienteSchema = new Schema({
    nombre: { type: String, required: true },//para cedula: nombres
    apellido: { type: String, required: true },//para cedula: apellidos
    //nombre_estable: {type:String, required: true},//para nit: nombre de la razon social
    //tipo_identif: {type:String, required: true},//cedula o nit
    numero_identificacion: {type:String, required: true},
    lugar_exp_ced: {type: String, required: true},//para cedula: lugar de expedicion
    tipo_cooperacion: {type: String, required: true},//para nit: tipo de persona juridica
    //digito_verif: {type:String, required: true},//para nit: digito de verificacion
    //nombre_rep_legal: {type:String, required: true},//para nit: nombre de representante legal
    direccion: {type: String, required: true}, //direccion
    ciudad: {type:String, required: true},//
    telefono: {type:String, required: true},//numero telefonico
    correo_elect: {type:String, required: true}, //correo electronico
    state: { type: Boolean, default: true }


}, { timestamps: true });

module.exports = mongoose.model('Clientes', ClienteSchema);