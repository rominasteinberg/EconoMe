const pool = require('../bd');

async function getGastos(id) {
    try {
        let query = "SELECT sum(monto_g) as sumaMonto FROM ?? JOIN ?? ON id_categoria_g = id_cg JOIN ?? ON id_moneda_g = id_m WHERE id_u_g = ?";
        const rows = await pool.query(query, [process.env.TABLA_GASTOS, process.env.TABLA_CATEGORIAS_GASTOS, process.env.TABLA_MONEDA, id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAllGastos(id) {
    try {
        let query = "SELECT date_format(fecha, '%d-%m-%Y') as Fecha, monto_g as Monto, Moneda, categoria_g as Categoría, date_format(vencimiento_g, '%d-%m-%Y') as Vencimiento, banco_g as Entidad, Pagado  FROM ?? JOIN ?? ON id_categoria_g = id_cg JOIN ?? ON id_moneda_g = id_m WHERE id_u_g = ? ORDER BY id_g DESC";
        const rows = await pool.query(query, [process.env.TABLA_GASTOS, process.env.TABLA_CATEGORIAS_GASTOS, process.env.TABLA_MONEDA, id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getSumaGastosMonth(id) {
    try {
        let query = "SELECT SUM(monto_g) as monto, simbolo FROM ?? JOIN ?? ON id_categoria_g = id_cg JOIN ?? ON id_moneda_g = id_m WHERE MONTH(fecha) = MONTH(CURRENT_DATE()) AND YEAR(fecha) = YEAR(CURRENT_DATE()) AND id_u_g = ? GROUP BY simbolo";
        const rows = await pool.query(query, [process.env.TABLA_GASTOS, process.env.TABLA_CATEGORIAS_GASTOS,
        process.env.TABLA_MONEDA, id]);

        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getGastosMonth(id) {
    try {
        // DATE_FORMAT hace que la fecha se muestre recortada y en el formato dd-mm-aaaa
        let query = "SELECT date_format(fecha, '%d-%m-%Y') as fecha, monto_g as monto, moneda, categoria_g as categoria, date_format(vencimiento_g, '%d-%m-%Y') as vencimiento, banco_g as entidad, pagado FROM ?? JOIN ?? ON id_categoria_g = id_cg JOIN ?? ON id_moneda_g = id_m WHERE MONTH(fecha) = MONTH(CURRENT_DATE()) AND YEAR(fecha) = YEAR(CURRENT_DATE()) AND id_u_g = ?";
        const rows = await pool.query(query, [process.env.TABLA_GASTOS, process.env.TABLA_CATEGORIAS_GASTOS,
        process.env.TABLA_MONEDA, id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getMoneda(){
    try {
        let query = "select * from moneda";
        const rows = await pool.query(query, [process.env.TABLA_MONEDA]);
        return rows;
    } catch(error){
        console.log(error);
        throw error;
    }
}

async function getCategoriaGastos(){
    try {
        let query = "select id_cg, categoria_g from categorias_gastos";
        const rows = await pool.query(query, [process.env.TABLA_CATEGORIAS_GASTOS]);
        return rows;
    } catch(error){
        console.log(error);
        throw error;
    }
}

// async function getGastosPorMes(id) {
//     try {
//         let query = "SELECT * FROM ?? JOIN ?? JOIN ?? ON id_moneda_g = id_m WHERE MONTH(fecha) = MONTH(CURRENT_DATE()) AND YEAR(fecha) = YEAR(CURRENT_DATE()) AND id_u_g = ?";
//         const rows = await pool.query(query, [process.env.TABLA_GASTOS, process.env.TABLA_CATEGORIAS_GASTOS,
//         process.env.TABLA_MONEDA, id]);

//         return rows;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

async function getGastosPorCat(id, cat) {
    try {
        let query = "SELECT * FROM ?? JOIN ?? ON id_categoria_g = id_cg JOIN ?? ON id_moneda_g = id_m WHERE id_u_g = ? AND id_categoria_g = ?";
        const rows = await pool.query(query, [process.env.TABLA_GASTOS, process.env.TABLA_CATEGORIAS_GASTOS,
        process.env.TABLA_MONEDA, id, cat]);

        console.log(rows);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getVencimientos(id) {
    try {

        let query = "SELECT * FROM ?? JOIN ?? JOIN ?? ON id_moneda_g = id_m WHERE vencimiento_g >= CURDATE() AND id_u_g = ? AND pagado = 0 ORDER BY vencimiento_g ASC";
        const rows = await pool.query(query, [process.env.TABLA_GASTOS, process.env.TABLA_CATEGORIAS_GASTOS,
        process.env.TABLA_MONEDA, id]);

        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function nuevoGasto(obj) {
    try {
        let query = "INSERT INTO ?? SET ?";
        const rows = await pool.query(query, [process.env.TABLA_GASTOS, obj]);
        return rows.insertId;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateGasto(obj, id) {
  try {

      let query = "UPDATE ?? SET ? WHERE id_g = ?";
      const rows = await pool.query(query, [process.env.TABLA_GASTOS, obj, id]);

      return rows;
  } catch (error) {
      console.log(error);
      throw error;
  }
}

async function deleteGasto(id) {
    try {
        let query = "DELETE FROM ?? WHERE id_g = ?";
        const rows = await pool.query(query, [process.env.TABLA_GASTOS, id]);

        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getGastos,
    getAllGastos,
    getGastosMonth,
    getSumaGastosMonth,
    getMoneda,
    nuevoGasto,
    getGastosMonth,
    getGastosPorCat,
    getCategoriaGastos,
    getVencimientos,
    updateGasto,
    deleteGasto
}
