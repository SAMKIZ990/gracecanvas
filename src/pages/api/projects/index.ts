import type { NextApiRequest, NextApiResponse } from 'next';
import { createProject, getProjects } from '@/lib/db';
import { validateAuthToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorization = req.headers.authorization;
  const token = authorization?.split(' ')[1];
  const user = await validateAuthToken(token ?? '');

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ projects: await getProjects(user.id) });
  }

  if (req.method === 'POST') {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }

    const project = await createProject(name, user.id);
    return res.status(201).json({ project });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: 'Method not allowed' });
}
