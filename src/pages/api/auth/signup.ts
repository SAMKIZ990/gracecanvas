import type { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const user = await registerUser(name, email, password);
  if (!user) {
    return res.status(409).json({ error: 'User already exists' });
  }

  return res.status(201).json({ user });
}
