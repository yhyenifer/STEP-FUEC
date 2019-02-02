const mongoose = require('mongoose');
const { Schema } = mongoose;

const PasajeroSchema = new Schema({

    nombre: { type: String, required: true },//nombre y apellidos
    numero_identificacion: { type: String, required: true },
    telefono: { type: String, required: true },//numero telefonico
    adulto_responsable: { type: String },
    state: { type: Boolean, default: true }

}, { timestamps: true });

module.exports = mongoose.model('Pasajeros', PasajeroSchema);