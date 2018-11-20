const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    username: { type: String, required: true },//nick
    name: { type: String, required: true },//nombre de usuario
    password: {type: String, required: true}, // contraseña
    role: {type:String, required: true}, 
    state: { type: Boolean, default: true }

}, { timestamps: true });

module.exports = mongoose.model('Usuarios', UsuarioSchema);