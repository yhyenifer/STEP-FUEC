const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClienteSchema = new Schema({


}, { timestamps: true });

module.exports = mongoose.model('Clientes', ClienteSchema);