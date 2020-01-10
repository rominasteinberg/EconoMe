const pool = require('../../bd');

async function getCategoriasIngresos() {
    try {
        let query = "SELECT categoria_i FROM ?? ";
        const rows = await pool.query(query, [process.env.TABLA_CATEGORIAS_INGRESOS]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getCategoriasGastos() {
    try {
        let query = "SELECT categoria_g FROM ?? ";
        const rows = await pool.query(query, [process.env.TABLA_CATEGORIAS_GASTOS]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function nuevaCategoriaI(cat) {
    try {
        let query = "INSERT INTO ?? SET categoria_i= ?";
        const rows = await pool.query(query, [process.env.TABLA_CATEGORIAS_INGRESOS, cat]);
        return rows.insertId;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function nuevaCategoriaG(cat) {
    try {
        let query = "INSERT INTO ?? SET categoria_g = ?";
        const rows = await pool.query(query, [process.env.TABLA_CATEGORIAS_GASTOS, cat]);
        return rows.insertId;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateCategoriaI(cat, id) {
    try {
        
        let query = "UPDATE ?? SET categoria_i = ? WHERE id_ci = ?";
        const rows = await pool.query(query, [process.env.TABLA_CATEGORIAS_INGRESOS, cat, id]);
  
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
  }

async function updateCategoriaG(cat, id) {
    try {
        let query = "UPDATE ?? SET categoria_g = ? WHERE id_cg = ?";
        const rows = await pool.query(query, [process.env.TABLA_CATEGORIAS_GASTOS, cat, id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



module.exports = {
    getCategoriasIngresos,
    getCategoriasGastos,
    nuevaCategoriaI,
    nuevaCategoriaG,
    updateCategoriaI,
    updateCategoriaG
}
