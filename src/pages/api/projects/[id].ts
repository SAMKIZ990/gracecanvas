import type { NextApiRequest, NextApiResponse } from 'next';
import { getProjectById, updateProject } from '@/lib/db';
import { validateAuthToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  const authorization = req.headers.authorization;
  const token = authorization?.split(' ')[1];
  const user = await validateAuthToken(token ?? '');

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid project id' });
  }

  if (req.method === 'GET') {
    const project = await getProjectById(id);
    if (!project || project.ownerId !== user.id) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.status(200).json({ project });
  }

  if (req.method === 'PUT') {
    const project = await getProjectById(id);
    if (!project || project.ownerId !== user.id) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updated = await updateProject(id, req.body);
    if (!updated) {
      return res.status(500).json({ error: 'Unable to update project' });
    }

    return res.status(200).json({ project: updated });
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).json({ error: 'Method not allowed' });
}
