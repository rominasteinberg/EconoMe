const pool = require('../bd');

async function getIngresos(id) {
    try {
        let query = "SELECT date_format(fecha, '%d-%m-%Y') as Fecha, monto_i as Monto, Moneda, categoria_i as Categoría FROM ?? JOIN ?? ON id_categoria_i = id_ci JOIN ?? ON id_moneda_i = id_m WHERE id_usuario_i = ? ORDER BY id_i DESC";
        const rows = await pool.query(query, [process.env.TABLA_INGRESOS, process.env.TABLA_CATEGORIAS_INGRESOS, process.env.TABLA_MONEDA, id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getIngresosMonth(id) {
    try {
        // DATE_FORMAT hace que la fecha se muestre recortada y en el formato dd-mm-aaaa
        let query = "SELECT date_format(fecha, '%d-%m-%Y') as fecha, monto_i as monto, moneda, categoria_i as categoria FROM ?? JOIN ?? ON id_categoria_i = id_ci JOIN ?? ON id_moneda_i = id_m WHERE MONTH(fecha) = MONTH(CURRENT_DATE()) AND YEAR(fecha) = YEAR(CURRENT_DATE()) AND id_usuario_i = ?";
        const rows = await pool.query(query, [process.env.TABLA_INGRESOS, process.env.TABLA_CATEGORIAS_INGRESOS,
        process.env.TABLA_MONEDA, id]);   
        
        console.log(rows);
        

        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getSumaIngresosMonth(id) {
    try {
        let query = "SELECT SUM(monto_i) as monto, simbolo FROM ?? JOIN ?? ON id_categoria_i = id_ci JOIN ?? ON id_moneda_i = id_m WHERE MONTH(fecha) = MONTH(CURRENT_DATE()) AND YEAR(fecha) = YEAR(CURRENT_DATE()) AND id_usuario_i = ? GROUP BY simbolo";
        const rows = await pool.query(query, [process.env.TABLA_INGRESOS, process.env.TABLA_CATEGORIAS_INGRESOS,
        process.env.TABLA_MONEDA, id]);

        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getIngresosPorCat(id, cat) {
    try {
        let query = "SELECT id_i, monto_i, moneda, categoria_i FROM ?? JOIN ?? ON id_categoria_i = id_ci JOIN ?? ON id_moneda_i = id_m WHERE id_usuario_i = ? AND id_categoria_i = ?";
        const rows = await pool.query(query, [process.env.TABLA_INGRESOS, process.env.TABLA_CATEGORIAS_INGRESOS,
        process.env.TABLA_MONEDA, id, cat]);

        console.log(rows);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getCategoriasIngresos() {
    try {
        let query = "SELECT * FROM ??";
        const rows = await pool.query(query, [process.env.TABLA_CATEGORIAS_INGRESOS]);

        console.log(rows);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function nuevoIngreso(obj) {
    try {
        let query = "INSERT INTO ?? SET ?";
        const rows = await pool.query(query, [process.env.TABLA_INGRESOS, obj]);
        return rows.insertId;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateIngreso(obj, id) {
  try {

      let query = "UPDATE ?? SET ? WHERE id_i = ?";
      const rows = await pool.query(query, [process.env.TABLA_INGRESOS, obj, id]);

      return rows;
  } catch (error) {
      console.log(error);
      throw error;
  }
}

async function deleteIngreso(id) {
    try {
        let query = "DELETE FROM ?? WHERE id_i = ?";
        const rows = await pool.query(query, [process.env.TABLA_INGRESOS, id]);

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

module.exports = {
    getMoneda,
    getIngresos,
    getIngresosMonth,
    getSumaIngresosMonth,
    nuevoIngreso,
    getIngresosPorCat,
    getCategoriasIngresos,
    updateIngreso,
    deleteIngreso
}
