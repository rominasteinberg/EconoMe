const pool = require('../bd');
const correosModel = require('./correosModel');

async function registrar(obj){
    try {
        let query = "insert into ?? set ?";
        const rows = await pool.query(query, [process.env.TABLA_USUARIOS, obj]);
        return rows.insertId;

    } catch (error) {
        console.log('error al insertar usuario');
        throw error;
    }
}

async function confirmarUsuario(codigo){
    try{
        let query = "update ?? set cuenta_confirmada_u = 1 where codigo_email_u = ? and cuenta_confirmada_u = 0";
        const rows = await pool.query(query,[process.env.TABLA_USUARIOS, codigo]);
        return rows;

    } catch(error) {
        console.log('error al confirmar usuario');
        throw(error);
    }
}

module.exports = {
    registrar,
    confirmarUsuario }