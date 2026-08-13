import express, { type Express,type NextFunction,type Request,type Response  } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = 3000;

app.use((err: Error, req: Request, res: Response, next: NextFunction) =>{
    console.error(err);
    res.status(500).json({message: "Erreur serveur"});
});
app.use(express.json);

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});

export default app;