import { pool } from "../config/database"

export async function findAll() {
    const result = await pool.query('SELECT * FROM student');
    return result.rows;
}


export async function findById(id: Number) {
    const result = await pool.query('SELECT *FROM student where id = $1 ', [id]);
    return result.rows[0];
}

export async function create(name: string) {
    const result = await pool.query('INSERT INTO student (name) values ($1) RETURNING *', [name]);
    return result.rows[0];
}

export async function update(id: Number, name: string) {
    const result = await pool.query('UPDATE student SET name = $1 where id = $2 RETURNING *', [name, id])
    return result.rows[0];
}

export async function remove(id: Number) {
    const result = await pool.query('DELETE FROM student WHERE id = $1 RETURNING *', [id])
    return result.rows[0];
}