import { createUser, findUserByEmail, getUserById } from './db';
import type { User } from './db';

export async function validateCredentials(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user || user.password !== password) {
    return null;
  }
  return user;
}

export async function registerUser(name: string, email: string, password: string) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return null;
  }
  return createUser(name, email, password);
}

export function generateAuthToken(user: User) {
  return `token-${user.id}`;
}

export async function validateAuthToken(token: string) {
  const id = token?.replace('token-', '');
  if (!id) return null;
  return getUserById(id);
}
