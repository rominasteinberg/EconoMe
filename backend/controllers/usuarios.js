const express = require('express');
const router = express.Router();
const md5 = require('md5');
const usuariosModel = require('../models/usuariosModel');

router.get('/', async(req, res, next) => {
    try {
        let user_data = await usuariosModel.getUsuario(req.id);
        res.json({status : 'ok' , data : user_data});
    } catch (error) {
        res.status(500).json({status : 'error'});
    }
})

router.put('/', async(req, res, next) => {

  try {
    let id = req.id;

    let obj = {
      nombre_u : req.body.nombre,
      apellido_u : req.body.apellido,
      password_u : md5(req.body.password)
    };

    let usuario_update = await usuariosModel.updateUsuario(obj, id);

    if(usuario_update) {
      res.json({status: 'ok', data: usuario_update})
    }

  } catch (e) {
    console.log(e)
    res.status(500).json({status : 'error'});
  }
});

router.delete('/', async(req, res, next) => {
  try {
    let id = req.id;

    let usuario_delete = await usuariosModel.deleteUsuario(id);

    if(usuario_delete) {
      res.json({
        status: 'ok',
        id : id
      });
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({status : 'error'});
  }
});

module.exports = router;
