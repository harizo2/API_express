import { Request, Response } from 'express';
import * as authService from '../Service/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.registerStudent(name, email, password);
    res.status(201).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginStudent(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
};