const express = require('express');
const router = express.Router();
const usuariosModel = require('../../models/usuariosModel');

router.get('/', async(req, res, next) => {
    try {
        let user_data = await usuariosModel.getUsuarios();
        res.json({status : 'ok' , data : user_data});
    } catch (error) {
        res.status(500).json({status : 'error'});
    }
})

router.put('/', async(req, res, next) => {
    try {

        let id = req.body.id_u;
        let role = req.body.role;

        console.log(id);
        console.log(role);
        
        

        let user_update = await usuariosModel.updateRole(role, id);

        res.json({status : 'ok', data : user_update})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({status : 'error'});
    }
})

router.delete('/', async(req, res, next) => {
    try {
        let id = req.body.id_u;

        let user_delete = await usuariosModel.deleteUsuario(id);

        res.json({status : 'ok', data : user_delete});
    } catch (error) {
        console.log(error);

        res.status(500).json({status : 'error'});        
    }
})

module.exports = router;
