const mongoose = require('mongoose');
const {Schema}= mongoose;

const VehiculoSchema = new Schema({
    plate: {type: String, required: true},//Numero de placa
    model: {type: String, required: true},//Marca
    year: {type: Number, required: true}, // Año Ejemplo: 2003
    lateral: {type: String, required: true}, // Numero de lateral
    class: {type: String}, // Camioneta doble cabina, bus, buseta, microbus
    passengers: {type: Number, required: true}, //Numero de Pasajeros
    operation_card: {type: String , required: true}, //Tarjeta de Operacion 
    exp_to: {type: Date, required: true},//Fecha de Expiracion (Año/Mes/Dia)
    exp_soat: {type: Date, required: true},//Fecha de Expiracion Soat (Año/Mes/Dia)
    exp_tech: {type: Date, required: true}, // Fecha de Expiracion Tecnico-Mecanico (Año/Mes/Dia)
    exp_prev: {type: Date, required: true},//Fecha de Expiracion Revision Preventiva (Año/Mes/Dia)
    GNV: {type: Boolean}, //Vehiculo con Sistema de Combustion de Gas Natural Vehicular
    exp_rcc: {type: Date, required: true}, // Fecha de Expiracion Responsabilidad Civil Contractual (Año/Mes/Dia)
    active: {type: Boolean, default: true},
    internal: {type: Boolean, default: true}, 
    state: {type: Boolean, default: true}
    
}, {timestamps: true});

module.exports = mongoose.model('Vehiculos', VehiculoSchema);