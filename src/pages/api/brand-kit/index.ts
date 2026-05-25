import type { NextApiRequest, NextApiResponse } from 'next';
import { createBrandKit, getBrandKits } from '@/lib/db';
import { validateAuthToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorization = req.headers.authorization;
  const token = authorization?.split(' ')[1];
  const user = await validateAuthToken(token ?? '');

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ brandKits: await getBrandKits(user.id) });
  }

  if (req.method === 'POST') {
    const { name, colors, fonts, logoUrl } = req.body;
    if (!name || !Array.isArray(colors) || !Array.isArray(fonts)) {
      return res.status(400).json({ error: 'Name, colors, and fonts are required' });
    }

    const brandKit = await createBrandKit(user.id, name, colors, fonts, logoUrl ?? '');
    return res.status(201).json({ brandKit });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: 'Method not allowed' });
}
