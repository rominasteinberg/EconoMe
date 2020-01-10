const express = require('express');
const router = express.Router();
const md5 = require('md5');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const usuariosModel = require('../models/usuariosModel');

router.post('/login', async(req, res, next) => {
    try{
        let usuario = await usuariosModel.getUsuarioPorEmail(req.body.email, md5(req.body.password));
        
        if(usuario.length > 0 && usuario[0].cuenta_confirmada_u == 1) {
            var signOptions = {
                expiresIn : "2h",
                algorithm : "RS256"
            }

            const privateKey = fs.readFileSync('./keys/private.pem', 'utf-8');
            const payload = {id : usuario[0].id_u, nombre : usuario[0].nombre_u, role: usuario[0].permisos_u};
            
            const usuario_ok = {nombre : usuario[0].nombre_u};
            const token = jwt.sign(payload, privateKey, signOptions);
            res.json({usuario_ok, JWT : token, status : 'ok'});
        
        } else {
            res.json({mensaje : 'Cuenta no confirmada. Por favor, revisa tu casilla de correo.', status : 'invalid'});
        }

    } catch(error) {
        console.log(error);
        res.status(500).json({status : 'invalid'});
    }

});

module.exports = router;