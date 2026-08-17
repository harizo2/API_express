import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { pool } from './config/database';
import * as studentController from './Controller/studentController';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

app.get('/students', studentController.getStudents);
app.get('/students/:id', studentController.getStudentById);
app.post('/students', studentController.studentCreating);
app.put('/students/:id', studentController.updateStudent);
app.delete('/students/:id', studentController.deleteStudent);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Erreur serveur" });
});

pool.query('SELECT NOW()')
  .then(() => {
    console.log('Base de données connectée');
    app.listen(port, () => {
      console.log(`Serveur démarré sur http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données', err);
  });

export default app;