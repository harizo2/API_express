import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { pool } from './config/database';
import * as studentController from './Controller/studentController';
import * as authController from './Controller/authController';
import { authMiddleware } from './middlewares/authMiddlewares';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/register', authController.register);
app.post('/login', authController.login);

app.get('/students', authMiddleware, studentController.getStudents);
app.get('/students/:id', authMiddleware, studentController.getStudentById);
app.post('/students', authMiddleware, studentController.studentCreating);
app.put('/students/:id', authMiddleware, studentController.updateStudent);
app.delete('/students/:id', authMiddleware, studentController.deleteStudent);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Erreur serveur" });
});

pool.query('SELECT NOW()')
  .then(() => {
    console.log('Base de données connectée');
    app.listen(port, () => console.log(`http://localhost:${port}`));
  })
  .catch((err) => console.error('Erreur de connexion à la base de données', err));

export default app;