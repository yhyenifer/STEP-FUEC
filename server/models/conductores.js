const mongoose = require('mongoose');
const {Schema}= mongoose;

const ConductorShema = new Schema({
    name: {type: String, required: true},
    CC : {type: String, required:true},
    // active: {type: Boolean, default: true}, // activo o inactivo
    // internal: {type: Boolean, default: true}, // interno o externo
     license: {type: String, required: true}, // num de icencia de conduccion
    // license_expiration: {type: Date, required: true},
    // health_expiration: {type: Date , required: true}, // fecha en que hace aportes de salud 
    // drug_expiration: {type: Date, required: true},
    // simit_expiration : {type: Date, required: true},
    // health_exam_expiration : {type: Date}, // fecha de los examenes de salud ocupacional
    // driving_exam_expiration: {type: Date},
    // automotive_law_expiration : {type: Date}, //fecha de normas de transito y transporte terrestre automotor
    // transit_law_expiration: {type: Date}, // fechas de normas de transito
    // law_tips_expiration: {type: Date},
    // accident_expiration: {type: Date}, // fecha de accidentalidad de transito
    // driving_methods_expiration: {type: Date},
    // defensive_expiration: {type: Date},
    // distractions_expiration: {type: Date},
    // first_aid_expiration: {type: Date}, //fecha de primero respondiente
    // fecha_5sentidos_conduc: {type: Date}, //fecha de los 5 sentidos de la conduccion
    // first_answer_expiration: {type: Date}, // fehcha de la seguridad activa y pasiva del vehiculo
    // senses_expiration: {type: Date},
    // car_security_expiration: {type: Date},
    // road_security_expiration: {type: Date},
    

}, {timestamps: true});

module.exports = mongoose.model('Conductores', ConductorShema);