const utils = require('util');
const pool = require('../bd');

async function insertarCuentaProyecto(cuentaProyecto){
    try {
        let query = "insert into ?? set ?";
        const rows = await pool.query(query, [process.env.TABLA_CUENTA_PROYECTO, cuentaProyecto]);
        return rows.insertId;

    } catch (error) {
        console.log('error al crear la cuenta proyecto');
        throw error;
    }
}

async function contarCP(id_u){
   
    try {
        let query = "SELECT SUM(id_moneda_cp) as cuenta FROM ?? WHERE id_u_cp = ?";
        const rows = await pool.query(query, [process.env.TABLA_CUENTA_PROYECTO, id_u]);
        return rows;
    } catch(error) {
        console.log('error al recuperar la cuenta proyecto');
        throw error;
    
    }   
        
}


async function updateCuentaProyecto(cuentaProyectoModificada, id){
    try {
        let query = "update ?? set ? where id_u_cp = ?";
        const rows = await pool.query(query, [process.env.TABLA_CUENTA_PROYECTO, cuentaProyectoModificada, id]);
        return rows.insertId;

    } catch (error) {
        console.log('error al modificar la cuenta proyecto');
        throw error;
    }
}

async function deleteCuentaProyecto(id){
    try {
        let query = "delete from ?? where id_u_cp = ?";
        const rows = await pool.query(query, [process.env.TABLA_CUENTA_PROYECTO, id]);
        return rows.insertId;

    } catch (error) {
        console.log('no se pudo borrar la cuenta proyecto');
        throw error;
    }
}




module.exports = {
    insertarCuentaProyecto,
    contarCP,
    updateCuentaProyecto,
    deleteCuentaProyecto }