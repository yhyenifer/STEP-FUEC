const Permiso = require('../models/permisos');
const permisoCtrl = {};

async function definirct_NumPer() {
    return await Permiso.find().sort({ $natural: -1 }).limit(1);
}


async function validar_numPer(numPer) {
    return await Permiso.find({ pt_number: numPer });
}


//listar permisos
permisoCtrl.getPermisos = async (req, res) => {
    const permisos = await Permiso.find();
    res.json(permisos);
    // otra forma de hacerlo, para ver el error
    // Contrato.find()
    // .then(contrato =>  res.json( contratos))
    // .catch(err => console.log(err));
};

//crear permiso de manera individual
permisoCtrl.createPermiso = async (req, res) => {

    var numPer;
    const ultiPerm = await definirct_NumPer();

    ultiPerm.map(async definPt => {
        numPer = (parseInt(definPt.pt_number) + 1).toString();
    });

    const permiso = new Permiso({

        pt_number: numPer,
        ct_id: req.body.ct_id,
        car_id: req.body.car_id,
        driver_ids: req.body.driver_ids,
        start: req.body.start,
        coop: req.body.coop,
        end: req.body.end

    });
    await permiso.save();
    res.json({
        status: 'Permiso Guardado Exitosamente', success: 'true'
    });
}


//crear permisos desde contratos y basados en el numero de vehiculos estipu
permisoCtrl.createPermisoCon = async (idContrato, cantVehiculos, start,
    end, vehiculos, conductores, pasajeros, cooperacion) => {
    console.log("creando permiso");

    for (let i = 0; i < cantVehiculos; i++) {

        var numPer;
        const ultiPerm = await definirct_NumPer();
        console.log("aqui");
        console.log(ultiPerm);

        if (ultiPerm == 0) {
            numPer = 1;
        }
        else {
            ultiPerm.map(async definPt => {
                numPer = (parseInt(definPt.pt_number) + 1).toString();
            });
        }


        const permiso = new Permiso({
            pt_number: numPer,
            ct_id: idContrato,
            car_id: vehiculos[i],
            driver_ids: conductores[i],
            start: start,
            coop: cooperacion,
            end: end
        });
        // console.log(vehiculos[i]);
        //console.log(conductores[i]);
        console.log(permiso);
        await permiso.save();

    }

    // actualizar un permiso especifico
    permisoCtrl.updatePermiso = async (req, res) => {
        const { id } = req.params;
        const validacion = await validar_numPer(req.body.pt_number);
        if (validacion != 0) {
            validacion.map(async dato => {

                if (id == dato._id) {
                    const newPermiso = {
                        _id: req.body._id,
                        pt_number: numPer,
                        ct_id: req.body.ct_id,
                        car_id: req.body.car_id,
                        driver_ids: req.body.driver_ids,
                        start: req.body.start,
                        coop: req.body.coop,
                        end: req.body.end
                    }
                    await Permiso.findByIdAndUpdate(id, { $set: newPermiso }, { new: true });
                    res.json({ status: 'Permiso Actualizado Exitosamente' });

                }
                else {
                    res.json({ status: 'Verificar el numero de permiso, el ingresado ya existe', success: 'false' });
                }
            });

        }
        else {
            res.json({ status: 'El permiso no esta creado', success: 'false' });

        }
    };

}

module.exports = permisoCtrl;
