const express = require('express');
const router = express.Router();
const registroModel = require('../models/registroModel');
const uuid = require('uuid');
const md5 = require('md5');
const correosModel = require('../models/correosModel');

router.post('/', async(req,res,next) => {
    try {

        let usuario = {
            nombre_u : req.body.nombre,
            apellido_u : req.body.apellido,
            email_u : req.body.email,
            codigo_email_u : uuid(),
            password_u : md5(req.body.password)
        }
        
        let objMailConfig = {
            email_u : usuario.email_u,
            subject: 'Confirmar cuenta',
            html : "Para registrarse, ingresar a: localhost:3000/registro/"+usuario.codigo_email_u
        }

        let insert_ok = await registroModel.registrar(usuario);
       console.log(insert_ok);
       if(insert_ok != undefined){
           let email_sent = await correosModel.sendEmail(objMailConfig);
           if(email_sent != undefined){
               res.json({status: 'ok', id: insert_ok, message: "Confirmá tu cuenta de correo para iniciar sesión"});
           }
       }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"error"});
    }
});

router.get('/:codigo_email_u', async(req, res, next)=>{
    try{
        let codigo = req.params.codigo_email_u;
        let usuarioConfirmado = await registroModel.confirmarUsuario(codigo);

        if(usuarioConfirmado){
            res.redirect(process.env.URL+'/login');
        }

    } catch(error){
        console.log(error);
        res.status(500).json({status: 'error'});
    }
});

module.exports = router;