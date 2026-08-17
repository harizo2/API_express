import { pool } from "../config/database"

export async function findAll() {
    const result = await pool.query('SELECT * FROM student');
    return result.rows;
}


export async function findById(id: Number) {
    const result = await pool.query('SELECT *FROM student where id = $1 ', [id]);
    return result.rows[0];
}

export async function create(name: string, email: string, password: string) {
    const result = await pool.query('INSERT INTO student (name, email, password) values ($1, $2, $3) RETURNING *', [name, email, password]);
    return result.rows[0];
}

export async function update(id: Number, name: string, email: string, password: string) {
    const result = await pool.query('UPDATE student SET name = $2, email = $3, password = $4 where id = $1 RETURNING *', [id, name, email, password])
    return result.rows[0];
}

export async function remove(id: Number) {
    const result = await pool.query('DELETE FROM student WHERE id = $1 RETURNING *', [id])
    return result.rows[0];
}

export async function findByEmail(email: string) {
  const result = await pool.query('SELECT * FROM student WHERE email = $1', [email]);
  return result.rows[0];
}
