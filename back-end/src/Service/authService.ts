import bcrypt from 'bcrypt';
import * as userRepository from '../Repository/userRepository';
import { generateToken } from '../utils/jwt';

export async function registerUser(name: string, email: string, password: string) {
  if (!name || !email || !password) {
    throw new Error('Champs manquants');
  }

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('Email déjà utilisé');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser(name, email, hashedPassword);
  const token = generateToken({ id: user.id, email: user.email });

  return { user, token };
}

export async function loginUser(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email et mot de passe requis');
  }

  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('Email ou mot de passe incorrect');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Email ou mot de passe incorrect');
  }

  const token = generateToken({ id: user.id, email: user.email });

  return {
    user: { id: user.id, name: user.name, email: user.email },
    token,
  };
}