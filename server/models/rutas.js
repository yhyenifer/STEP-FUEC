const mongoose = require('mongoose');
const { Schema } = mongoose;

const RutaSchema = new Schema({
    nombre_ruta: { type: String, required: true },//nombre ruta
    descripcion_ruta: { type: String, required: true },//descripcion de la ruta 
    usuario_actual: { type: String },
    state: { type: Boolean, default: true }


}, { timestamps: true });

module.exports = mongoose.model('Rutas', RutaSchema);