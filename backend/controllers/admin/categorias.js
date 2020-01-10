const express = require('express');
const router = express.Router();
const categoriasModel = require('../../models/admin/categoriasModel.js');

router.get('/ingresos', async(req, res, next) => {
    try {
        let categorias_ok = await categoriasModel.getCategoriasIngresos();
        res.json({status : 'ok' , data : categorias_ok});
    } catch (error) {
        console.log(error);
        res.status(500).json({status : 'error'});
    }
})

router.get('/gastos', async(req, res, next) => {
    try {
        let categorias_ok = await categoriasModel.getCategoriasGastos();
        res.json({status : 'ok' , data : categorias_ok});
    } catch (error) {
        console.log(error);
        res.status(500).json({status : 'error'});
    }
})

router.post('/ingresos', async(req,res,next) => {
    try {

        let categoria_i = req.body.categoria;

        let categorias_i_ok = await categoriasModel.nuevaCategoriaI(categoria_i);

        if(categorias_i_ok != undefined) {
            res.json({status: 'ok', id: categorias_i_ok})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({status:"error"});
    }
})

router.post('/gastos', async(req,res,next) => {
    try {

        let categoria_g = req.body.categoria;

        let categorias_g_ok = await categoriasModel.nuevaCategoriaG(categoria_g);

        if(categorias_g_ok != undefined) {
            res.json({status: 'ok', id: categorias_g_ok})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({status:"error"});
    }
})

router.put('/ingresos', async(req,res,next) => {
    try {
        let id= req.body.id_ci;
    
        let categoria_i = req.body.categoria;
    
        let mod_categoria_ok = await categoriasModel.updateCategoriaI(categoria_i, id);
    
        if(mod_categoria_ok != undefined) {
            res.json({status: 'ok', id: id})
        } 
    
      } catch (e) {
        console.log(e);
        res.status(500).json({status:"error"});
      }
})

router.put('/gastos', async(req,res,next) => {
    try {
        let id= req.body.id_cg;
    
        let categoria_g = req.body.categoria;
    
        let mod_categoria_ok = await categoriasModel.updateCategoriaG(categoria_g, id);
    
        if(mod_categoria_ok != undefined) {
            res.json({status: 'ok', id: id})
        } 
    
      } catch (e) {
        console.log(e);
        res.status(500).json({status:"error"});
      }
})




module.exports = router;
