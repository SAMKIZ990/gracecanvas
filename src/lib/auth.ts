import bcryptjs from 'bcryptjs';
import { createUser, findUserByEmail, getUserById } from './db';
import type { User } from './db';

export async function validateCredentials(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }
  
  // Compare provided password with hashed password in database
  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  
  return user;
}

export async function registerUser(name: string, email: string, password: string) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return null;
  }
  
  // Hash password before storing in database
  const hashedPassword = await bcryptjs.hash(password, 10);
  return createUser(name, email, hashedPassword);
}

export function generateAuthToken(user: User) {
  return `token-${user.id}`;
}

export async function validateAuthToken(token: string) {
  const id = token?.replace('token-', '');
  if (!id) return null;
  return getUserById(id);
}
