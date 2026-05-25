import type { NextApiRequest, NextApiResponse } from 'next';
import { validateAuthToken } from '@/lib/auth';

const usageData = {
  monthlyActiveProjects: 38,
  aiCreditsUsed: 634,
  activeUsers: 12,
  pendingApprovals: 3,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authorization = req.headers.authorization;
  const token = authorization?.split(' ')[1];
  const user = await validateAuthToken(token ?? '');

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return res.status(200).json({ usage: usageData });
}
