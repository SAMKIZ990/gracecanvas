import type { NextApiRequest, NextApiResponse } from 'next';
import { findUserByEmail } from '@/lib/db';
import { generateAuthToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateAuthToken(user);
  return res.status(200).json({ user: { name: user.name, email: user.email }, token });
}
