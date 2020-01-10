const express = require('express');
const router = express.Router();
const ahorrosModel = require('../models/ahorrosModel');

router.get('/monedas', async(req,res,next)=>{
    try {
        let monedas = await ahorrosModel.getMoneda();
        res.json({status : 'ok', data : monedas});
    } catch(error){
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})


router.get('/cuentaProyecto', async(req,res,next)=>{
    try {

        let id = req.id;
        let cuentaproyecto = await ahorrosModel.getCuentaProyecto(id);
        res.json({status : 'ok', data : cuentaproyecto});
    } catch(error){
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})

router.get('/id', async(req,res,next)=>{
    try {

        let id = req.id;
        let cuentaproyectoId = await ahorrosModel.getIdCPP(id);
        res.json({status : 'ok', data : cuentaproyectoId});
    } catch(error){
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})

router.get('/idD', async(req,res,next)=>{
    try {

        let id = req.id;
        let cuentaproyectoId = await ahorrosModel.getIdCPD(id);
        res.json({status : 'ok', data : cuentaproyectoId});
    } catch(error){
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})


router.post('/', async(req, res, next)=>{

    try {

        let monto = req.body.monto;
        let moneda = req.body.moneda;
        let fecha = req.body.fecha;
        let id = req.id;

        let nuevoAhorro_ok = await ahorrosModel.insertarAhorro(monto, moneda, id, fecha);
        console.log(nuevoAhorro_ok);
        if(nuevoAhorro_ok != undefined){
            res.json({status: 'ok', id: nuevoAhorro_ok, message: "Ahorro reservado"});
        }

    } catch(error){
        res.status(500).json({status : 'error', error: error})
    }
});


router.post('/extraer', async(req, res, next)=>{

    try {

        let monto = "-"+req.body.monto;
        let moneda = req.body.moneda;
        let fecha = req.body.fecha;
        let id = req.id;

        let nuevaExtraccion_ok = await ahorrosModel.insertarExtraccion(monto, moneda, id, fecha);
        if(nuevaExtraccion_ok != undefined){
            res.json({status: 'ok', id: nuevoExtraccion_ok, message: "Extracción realizada"});
        }

    } catch(error){
        console.log(error);
        res.status(500).json({status : 'error', error: error})
    }
});

router.get('/', async(req, res, next) => {
    try {

        let ahorrosUsuarioDelMes = await ahorrosModel.getAhorrosMonth(req.id);

        let ahorroTotal = await ahorrosModel.getAhorrosUsuario(req.id);

        let ahorrosDetalladosUsuario = await ahorrosModel.getAhorrosDetalladosUsuario(req.id);

        res.json({status : 'ok', ahorros_delmes : ahorrosUsuarioDelMes, ahorros_total : ahorroTotal, ahorros_detallados : ahorrosDetalladosUsuario});

    } catch (error) {
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})

router.get('/currentmonth', async(req, res, next) => {
    try {
        let ahorro_ok = await ahorrosModel.getAhorrosMonth(req.id);
        res.json({status : 'ok' , data : ahorro_ok});
    } catch (error) {
        console.log(error);
        res.status(500).json({status : 'error'});
    }
})

router.get('/gastos', async(req, res, next) => {
    try {

        let gastosAhorrosUsuario = await ahorrosModel.getAhorrosGastosUsuario(req.id);

        let gastosAhorrosDetalladosUsuario = await ahorrosModel.getAhorrosGastosDetalladosUsuario(req.id);

        res.json({status : 'ok', gastos_total : gastosAhorrosUsuario, gastos_detallados : gastosAhorrosDetalladosUsuario});

    } catch (error) {
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})


router.put('/:id_a', async(req, res, next) => {

    try {

        let idAhorro = req.params.id_a;

        let ahorroModificado = {
            monto_a : req.body.monto
        }

        let ahorro_update = await ahorrosModel.updateAhorro(ahorroModificado, idAhorro);

        if(ahorro_update != undefined){
            res.json({status : 'ok', data : ahorro_update});
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({status : 'error'})
    }
})


router.delete('/:id_a', async(req, res, next) => {

    try {

        let idAhorro = req.params.id_a;

        let ahorro_delete = await ahorrosModel.deleteAhorro(idAhorro);

        if(ahorro_delete){
            res.json({status : 'ok', message : 'ahorro eliminado'});
        }

    } catch(error){
        console.log(error)
        res.status(500).json({status : 'error'});
    }
})




module.exports = router;
