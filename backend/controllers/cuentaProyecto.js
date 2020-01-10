const express = require('express');
const router = express.Router();
const cuentaProyectoModel = require('../models/cuentaProyectoModel');

router.post('/', async(req, res, next)=>{

    try {

        let nuevaCuentaProyecto = {
            objetivo_cp : req.body.objetivo,
            id_moneda_cp : req.body.moneda,
            id_u_cp : req.id
        }

        let nuevaCuentaProyecto_ok = await cuentaProyectoModel.insertarCuentaProyecto(nuevaCuentaProyecto);

        if(nuevaCuentaProyecto_ok != undefined){
            res.json({status: 'ok', id: nuevaCuentaProyecto_ok, message: "Cuenta proyecto creada"});
        }

    } catch(error){
        console.log(error);
        res.status(500).json({status : 'error', error: error})
    }
});

// router.get('/', async(req, res, next) => {

//     try {

//         let cuentaProyecto = await cuentaProyectoModel.getCP(req.id);
//         res.json({status : 'ok', data : cuentaProyecto });

//     } catch (error) {
//         res.status(500).json({status : 'error'});
//     }
// })

router.get('/contar', async(req, res, next) => {

    try {

        let contarCP = await cuentaProyectoModel.contarCP(req.id);
        res.json({status : 'ok', data : contarCP });

    } catch (error) {
        res.status(500).json({status : 'error'});
    }
})

router.put('/', async(req, res, next) => {

    try {

        let id = req.id;

        let cuentaProyectoModificada = {
            objetivo_cp : req.body.objetivo
        }
  
        let cuentaProyecto_update = await cuentaProyectoModel.updateCuentaProyecto(cuentaProyectoModificada, id);
    
        if(cuentaProyecto_update != undefined) {
            res.json({status: 'ok', message : 'objetivo de cuenta modificado'})
        }
  
    } catch(error) {
        console.log(error)
        res.status(500).json({status : 'error'});
    }
});


  router.delete('/', async(req, res, next) => {
    try {
    
        let cuentaProyecto_delete = await cuentaProyectoModel.deleteCuentaProyecto(req.id);
    
        if(cuentaProyecto_delete != undefined) {
            res.json({
            status: 'cuenta proyecto eliminada'
            });
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({status : 'error'});
    }
});

module.exports = router;