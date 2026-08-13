import express from 'express';
import { pool } from './db.js';
const app = express();
const port = 3000;
let etudiants = [];
app.get('/etudiants', (req, res) => {
    res.status(200).json(etudiants);
});
app.post('/etudaints', (req, res) => {
    const nouvel = { id: Date.now(), nom: req.body.nom };
    etudiants.push(nouvel);
    res.status(201).json(nouvel);
});
app.put("/etudiants/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { first_name, last_name, age } = req.body;
    const result = await pool.query(`UPDATE etudiants SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *`, [first_name, last_name, age, id]);
    res.status(200).json(result.rows[0]);
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
