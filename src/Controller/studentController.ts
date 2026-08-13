import express, { type Express,type NextFunction,type Request,type Response  } from 'express';
import app from '../server';
import {type Student } from "../Model/type";


let etudiants: Student[] = [
      { id: 1, name: "Dupont" },
      { id: 2, name: "Martin" }
];

app.get('/students', (req: Request, res: Response) =>{
    res.status(200).json(etudiants);
})

app.post('/students', (req: Request, res: Response)=>{
    const nouvel: Student = {id: Date.now(), name: req.body.nom};
    etudiants.push(nouvel);
    res.status(201).json(nouvel);
})

app.put('/students/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const etudiant = etudiants.find(e => e.id === id);

  if (!etudiant) {
    return res.status(404).json({ message: "Étudiant non trouvé" });
  }

  etudiant.name = name;

  res.status(200).json(etudiant);
});

app.get('/students/:id', (req: Request, res:Response) =>{
    const id = Number(req.params.id);
    const etudiant = etudiants.find(e => e.id === id);

      if (!etudiant) {
         return res.status(404).json({ message: "Étudiant non trouvé" });
        }

    res.status(200).json(etudiant);
});

app.patch('/students/:id', (req:Request, res:Response) =>{
    const id = Number(req.params.id);
    const etudiant = etudiants.find(e => e.id === id);
    
    if (!etudiant) {
        return res.status(404).json({ message: "Étudiant non trouvé" });
    }
    
    Object.assign(etudiant, req.body);
    res.status(200).json(etudiant);
});

app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = etudiants.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Étudiant non trouvé" });
  }

  etudiants.splice(index, 1);

  res.status(204).send();
});