import express, { type Request,type Response  } from 'express';
import { createStudent, getAll, getById, removeStudent, studentUpdating } from '../Service/studentService';


export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await getAll();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({error : 'Error server'});
  }
}

export const getStudentById = async (req: Request, res: Response) =>{
  try {
    const student = await getById(Number(req.params.id));
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({error : 'Student not found'});
  }
}

export const studentCreating = async (req: Request, res: Response) =>{
  try{
    const { name } = req.body;
    const student = await createStudent(name);
    res.status(201).json(student);
  }catch(error) {
    res.status(500).json({error : 'Error server'});
  }
}

export const updateStudent = async (req: Request, res: Response) =>{
  try {
    const {name} = req.body;
    const student = await studentUpdating(Number(req.params.id), name);
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({error : 'Student not found'});
  }
}

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await removeStudent(Number(req.params.id));
    res.status(200).json({message: 'Delete student'});
  } catch (error) {
    res.status(404).json({error : 'Student not found'});
    
  }
}