const utils = require('util');
const pool = require('../bd');

async function getIdCPP(id) {
  try {
    let query = "SELECT id_moneda_cp = 1 FROM ?? WHERE id_u_cp = ?";
    const rows = await pool.query(query, [process.env.TABLA_CUENTA_PROYECTO, id]);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getIdCPD(id) {
    try {
      let query = "SELECT id_moneda_cp = 2 FROM ?? WHERE id_u_cp = ?";
      const rows = await pool.query(query, [process.env.TABLA_CUENTA_PROYECTO, id]);
  
      return rows;
    } catch (error) {
      throw error;
    }
  }

async function getCuentaProyecto(id) {
    try {
      let query = "select objetivo_cp as objetivo, id_cp, moneda FROM ?? JOIN ?? ON id_moneda_cp = id_m where id_u_cp = ?";
      const rows = await pool.query(query, [process.env.TABLA_CUENTA_PROYECTO, process.env.TABLA_MONEDA, id]);
      console.log(rows);
  
      return rows;
    } catch (error) {
      throw error;
    }
  }

async function insertarAhorro(monto, moneda, id_u, fecha){
    try {

        let ahorro = {
            monto_a : monto,
            id_moneda_a : moneda,
            id_u_a : id_u,
            fecha : fecha
        }

        let query = "INSERT INTO ?? SET ?"
        const rows = await pool.query(query, [process.env.TABLA_AHORROS, ahorro]);
        return rows.insertId;

    } catch (error) {
        console.log(error);
        
        throw error;
    }
}

async function insertarExtraccion(monto, moneda, id_u, fecha){
    try {

        let id_cp = await getIdCP(id_u);

        let extraccion = {
            monto_a : monto,
            id_moneda_a : moneda,
            id_u_a : id_u,
            id_cp_a : id_cp[0].id_cp,
            fecha : fecha
        }

        let query = "INSERT INTO ?? SET ?"
        const rows = await pool.query(query, [process.env.TABLA_AHORROS, extraccion]);
        return rows.insertId;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAhorrosUsuario(id_u){
    try {

        // let id_cp = await getIdCP(id_u);
        // console.log(id_cp);

        let query = "SELECT SUM(monto_a) as monto, simbolo FROM ?? JOIN ?? ON id_moneda_a = id_m WHERE id_u_a = ? GROUP BY simbolo";
        const rows = await pool.query(query, [process.env.TABLA_AHORROS,
        process.env.TABLA_MONEDA, id_u]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAhorrosMonth(id) {
    try {
        let query = "SELECT date_format(fecha, '%d-%m-%Y') as fecha, monto_a as monto, simbolo, moneda FROM ?? JOIN ?? ON id_moneda_a = id_m WHERE MONTH(fecha) = MONTH(CURRENT_DATE()) AND YEAR(fecha) = YEAR(CURRENT_DATE()) AND id_u_a = ? and monto_a > 0";
        const rows = await pool.query(query, [process.env.TABLA_AHORROS,
        process.env.TABLA_MONEDA, id]);

        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAhorrosDetalladosUsuario(id_u){
    try {
        let query = "select date_format(fecha, '%d-%m-%Y') as Fecha, monto_a as Monto, simbolo, moneda as Moneda from ?? JOIN ?? ON id_moneda_a = id_m where id_u_a = ? ORDER BY id_a DESC"
        const rows = await pool.query(query, [process.env.TABLA_AHORROS,
        process.env.TABLA_MONEDA, id_u]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAhorrosGastosUsuario(id_u){
    try {
        let query = "select sum(monto_a), moneda from ?? JOIN ?? ON id_moneda_a = id_m where id_u_a = ? and monto_a < 0"
        const rows = await pool.query(query, [process.env.TABLA_AHORROS,
        process.env.TABLA_MONEDA, id_u]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAhorrosGastosDetalladosUsuario(id_u){
    try {
        let query = "select monto_a, moneda from ?? JOIN ?? ON id_moneda_a = id_m where id_u_a = ? and monto_a < 0"
        const rows = await pool.query(query, [process.env.TABLA_AHORROS,
        process.env.TABLA_MONEDA, id_u]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function updateAhorro(ahorroModificado, id_a){
    try {
        let query = "update ?? set ? where id_a = ?";
        const rows = await pool.query(query, ([process.env.TABLA_AHORROS, ahorroModificado, id_a]));
        return rows;
    } catch(error){
        console.log(error);
        throw error;
    }
}

async function deleteAhorro(id_a){
    try {
        let query = "delete from ?? where id_a = ?";
        const rows = await pool.query(query, [process.env.TABLA_AHORROS, id_a]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function getMoneda(){
    try {
        let query = "select * from ??";
        const rows = await pool.query(query, [process.env.TABLA_MONEDA]);
        return rows;
    } catch(error){
        console.log(error);
        throw error;
    }
}


module.exports = {
    getIdCPP,
    getIdCPD,
    insertarAhorro,
    getCuentaProyecto,
    getAhorrosUsuario,
    getAhorrosMonth,
    getAhorrosDetalladosUsuario,
    insertarExtraccion,
    getAhorrosGastosUsuario,
    getAhorrosGastosDetalladosUsuario,
    updateAhorro,
    deleteAhorro,
    getMoneda }
