import e from 'express';
import express, {} from 'express';
const app = express();
const port = 3000;
let etudiants = [
    { id: 1, nom: "Dupont" },
    { id: 2, nom: "Martin" }
];
app.get('/etudiants', (req, res) => {
    res.status(200).json(etudiants);
});
app.post('/etudiants', (req, res) => {
    const nouvel = { id: Date.now(), nom: req.body.nom };
    etudiants.push(nouvel);
    res.status(201).json(nouvel);
});
app.put('/etudiants/:id', (req, res) => {
    const id = Number(req.params.id);
    const { nom } = req.body;
    const etudiant = etudiants.find(e => e.id === id);
    if (!etudiant) {
        return res.status(404).json({ message: "Étudiant non trouvé" });
    }
    etudiant.nom = nom;
    res.status(200).json(etudiant);
});
app.get('/etudiants/:id', (req, res) => {
    const id = Number(req.params.id);
    const etudiant = etudiants.find(e => e.id === id);
    if (!etudiant) {
        return res.status(404).json({ message: "Étudiant non trouvé" });
    }
    res.status(200).json(etudiant);
});
app.patch('/etudiants/:id', (req, res) => {
    const id = Number(req.params.id);
    const etudiant = etudiants.find(e => e.id === id);
    if (!etudiant) {
        return res.status(404).json({ message: "Étudiant non trouvé" });
    }
    Object.assign(etudiant, req.body);
    res.status(200).json(etudiant);
});
app.delete('/etudiants/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = etudiants.findIndex(e => e.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Étudiant non trouvé" });
    }
    etudiants.splice(index, 1);
    res.status(204).send(); // pas de contenu à renvoyer
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
});
app.use(express.json);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map