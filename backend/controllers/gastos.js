const express = require('express');
const router = express.Router();
const gastosModel = require('../models/gastosModel.js');

router.get('/monedas', async(req,res,next)=>{
    try {
        let monedas = await gastosModel.getMoneda();
        res.json({status : 'ok', data : monedas});
    } catch(error){
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})

router.get('/categoria', async(req,res,next)=>{
    try {
        let categorias = await gastosModel.getCategoriaGastos();
        res.json({status : 'ok', data : categorias});
    } catch(error){
        console.log(error);
        res.status(500).json({status : 'error'})
    }
})

router.get('/', async(req, res, next) => {
    try {
        let gastos_data = await gastosModel.getGastos(req.id);
        res.json({status : 'ok' , data : gastos_data});
    } catch (error) {
        console.log(error);
        res.status(500).json({status : 'error'});
    }
})

router.get('/dolares', async(req, res, next) => {
    try {
        let gastos_data = await gastosModel.getGastosDolares(req.id);
        res.json({status : 'ok' , data : gastos_data});
    } catch (error) {
        console.log(error);
        res.status(500).json({status : 'error'});
    }
})

router.get('/historial', async(req, res, next) => {
    try {
        let gastos_data = await gastosModel.getAllGastos(req.id);
        res.json({status : 'ok' , data : gastos_data});
    } catch (error) {
        console.log(error);
        res.status(500).json({status : 'error'});
    }
})

router.get('/currentmonth', async(req, res, next) => {
    try {
        let gastos_data = await gastosModel.getGastosMonth(req.id);
        let suma_gastos = await gastosModel.getSumaGastosMonth(req.id);
        res.json({status : 'ok' , data : gastos_data, suma : suma_gastos});
        console.log(gastos_data);
    } catch (error) {
        console.log(error);
        res.status(500).json({status : 'error'});
    }
})

router.get('/cat/:categoria', async(req, res, next) => {
    try {
        let gastos_cat_ok = await gastosModel.getGastosPorCat(req.id, req.params.categoria);
        res.json({status : 'ok', data : gastos_cat_ok});
    } catch (error) {
        console.log(error);
        res.status(500).json({status : 'error'});
    }
})

router.get('/vencimientos', async(req, res, next) => {
    try {
        let vencimientos_ok = await gastosModel.getVencimientos(req.id);
        res.json({status: 'ok', data : vencimientos_ok});
    } catch (error) {
        console.log(error);
        res.status(500).json({status : 'error'});
    }
})

router.post('/', async(req,res,next) => {
    try {
        let obj = {
            monto_g : req.body.monto,
            id_moneda_g : req.body.moneda,
            detalle_g : req.body.detalle,
            vencimiento_g : req.body.vencimiento,
            banco_g : req.body.banco,
            id_u_g : req.id,
            id_categoria_g : req.body.categoria,
            pagado : req.body.pagado,
            fecha : req.body.fecha
        }
        console.log(req);


        let gasto_ok = await gastosModel.nuevoGasto(obj);

        if(gasto_ok != undefined) {
            res.json({status: 'ok', id: gasto_ok})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({status:"error"});
    }
})

router.put('/', async(req, res, next) => {
  try {
    let id= req.body.id_g;

    let obj = {
        monto_g : req.body.monto,
        detalle_g : req.body.detalle,
        vencimiento_g : req.body.vencimiento,
        banco_g : req.body.banco,
        id_categoria_g : req.body.categoria,
        pagado : req.body.pagado,
        fecha : req.body.fecha
    }

    let mod_gasto_ok = await gastosModel.updateGasto(obj,id);

    if(mod_gasto_ok != undefined) {
        res.json({status: 'ok', id: id})
    }

  } catch (e) {
    console.log(e);
    res.status(500).json({status:"error"});
  }
});

router.delete('/', async(req, res, next) => {
    try {
        let id = req.body.id_i;

        let delete_gasto_ok = await gastosModel.deleteGasto(id);

        if(delete_gasto_ok != undefined) {
            res.json({status: 'ok', id: id});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"error"});
    }
})

module.exports = router;
