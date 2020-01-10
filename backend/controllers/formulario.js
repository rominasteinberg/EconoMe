const formularioModel = require('../models/formularioModel');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res, next) =>{

    let obj = {
        nombre : req.body.nombre,
        asunto : req.body.asunto,
        email : req.body.email,
        mensaje : req.body.mensaje

    }
    console.log(obj);

    try {

        let enviar_formulario = await
        formularioModel.enviar(obj);
        res.json({status : 'ok', data : enviar_formulario});

    } catch(error){
        console.log(error);
        res.status(500).json({status : 'error'});

    }
        
    

})

module.exports = router;