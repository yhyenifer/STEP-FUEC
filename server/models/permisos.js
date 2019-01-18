const mongoose = require('mongoose');
const { Schema } = mongoose;

const PermisoSchema = new Schema({
    pt_number: { type: String, min: 0 },//numero de permiso
    ct_id: { type: String, required: true },
    car_id: { type: String },
    driver_ids: { type: String },
    passenger_list: { name: String, CC: String },
    start: { type: Date, required: true },
    coop: { name: String, coop_type: String },
    end: { type: Date, required: true }

}, { timestamps: true });


module.exports = mongoose.model('Permisos', PermisoSchema);