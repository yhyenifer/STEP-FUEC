const mongoose = require('mongoose');
const { Schema } = mongoose;

const PermisoSchema = new Schema({
    pt_number: { type: String, min: 0 },
    ct_id: { type: String, required: true, ref: 'contratos' },
    car_id: { type: String, ref: 'vehiculos' },
    driver_ids: [{ type: String, ref: 'conductores' }],
    passenger_list: [{ name: String, CC: String }],
    start: { type: Date, required: true },
    //coop: {name: String, coop_type: String}
    end: { type: Date, required: true }

}, { timestamps: true });


module.exports = mongoose.model('Permisos', PermisoSchema);