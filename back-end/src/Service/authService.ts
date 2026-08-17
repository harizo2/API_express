import bcrypt from 'bcrypt';
import * as studentRepository from '../Repository/studentRepository';
import { generateToken } from '../utils/jwt';

export async function registerStudent(name: string, email: string, password: string) {
  if (!name || !email || !password) {
    throw new Error('Champs manquants');
  }

  const existingStudent = await studentRepository.findByEmail(email);
  if (existingStudent) {
    throw new Error('Email déjà utilisé');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const student = await studentRepository.create(name, email, hashedPassword);
  const token = generateToken({ id: student.id,name:student.name, email: student.email });

  return { student, token };
}

export async function loginStudent(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email et mot de passe requis');
  }

  const student = await studentRepository.findByEmail(email);
  if (!student) {
    throw new Error('Email ou mot de passe incorrect');
  }

  const isPasswordValid = await bcrypt.compare(password, student.password);
  if (!isPasswordValid) {
    throw new Error('Email ou mot de passe incorrect');
  }

  const token = generateToken({id: student.id,name:student.name, email: student.email });

  return {
    student: { id: student.id, name: student.name, email: student.email },
    token,
  };
}