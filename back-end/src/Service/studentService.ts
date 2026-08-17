import { error } from 'node:console';
import * as studentRepository from '../Repository/studentRepository'

export async function getAll() {
    return studentRepository.findAll();
}

export async function getById(id: number) {
    const student = await studentRepository.findById(id);
    if(!student){
        throw new Error("Student not found");
    }
    return student;
}

export async function createStudent(name: string, email: string, password: string) {
    if (!name || name.trim().length < 2) {
        throw new Error('The name must contain at least 2 characters')
    }
    return studentRepository.create(name, email, password);
}

export async function studentUpdating(id: number, name: string, email: string, password: string) {
    const student = await studentRepository.findById(id);
    if(!student){throw new Error("Student not found");}
    const updated = await studentRepository.update(id, name, email, password);
    if(!updated){throw new Error("Student not found");}
    return updated;
}

export async function removeStudent(id: number) {
    const student = await studentRepository.findById(id);
    if(!student){throw new Error("Student not found");}

    await studentRepository.remove(id);
}