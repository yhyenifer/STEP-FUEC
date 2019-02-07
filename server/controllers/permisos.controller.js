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
};


//listar permisos por contrato
permisoCtrl.getPermisosxContrato = async (req, res) => {
    const permisos = await Permiso.find(req.params);
    res.json(permisos);
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
permisoCtrl.createPermisoCon = async (idContrato, car_number, permisos) => {
    console.log("creando permiso");
    console.log(permisos);
    cconsole.log(car_number);

    for (let i = 0; i < permisos.length; i++) {

        console.log(i);

        var numPer;
        const ultiPerm = await definirct_NumPer();

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
            start: startPermiso,
            coop: cooperacion,
            end: endPermiso
        });

        console.log(permiso);
        await permiso.save();
    }
};

// actualizar un permiso especifico
permisoCtrl.updatePermiso = async (req, res) => {
    const { id } = req.params;
    const validacion = await validar_numPer(req.body.pt_number);
    if (validacion != 0) {
        validacion.map(async dato => {

            if (id == dato._id) {
                const newPermiso = {

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



module.exports = permisoCtrl;
