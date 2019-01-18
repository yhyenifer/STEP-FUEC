const mongoose = require('mongoose');
const { Schema } = mongoose;

const PasajeroSchema = new Schema({

    nombre: { type: String, required: true },//para cedula: nombres
    apellido: { type: String, required: true },//para cedula: apellidos
    numero_identificacion: { type: String, required: true },
    direccion: { type: String, required: true }, //direccion
    ciudad: { type: String, required: true },//
    telefono: { type: String, required: true },//numero telefonico
    correo_elect: { type: String, required: true }, //correo electronico
    state: { type: Boolean, default: true }

}, { timestamps: true });

module.exports = mongoose.model('Pasajeros', PasajeroSchema);