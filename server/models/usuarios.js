const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');


const UsuarioSchema = new Schema({
    username: { type: String, required: true },//nick
    name: { type: String, required: true },//nombre de usuario
    password: { type: String, required: true }, // contraseña
    role: { type: String, required: true },
    usuario_actual: { type: String },
    state: { type: Boolean, default: true }

}, { timestamps: true });


UsuarioSchema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

UsuarioSchema.methods.isValid = function (hashedpassword) {
    return bcrypt.compareSync(hashedpassword, this.password);
}
module.exports = mongoose.model('Usuarios', UsuarioSchema);
