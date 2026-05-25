import type { NextApiRequest, NextApiResponse } from 'next';

const templates = [
  {
    id: 'revival-hero',
    title: 'Revival Night',
    category: 'Revival',
    description: 'Cinematic revival poster with glowing gradients, bold headline, and atmospheric artwork.',
    image: '/templates/revival-hero.png',
  },
  {
    id: 'worship-impact',
    title: 'Worship Impact',
    category: 'Worship',
    description: 'Modern worship event design with layered light effects and premium type styling.',
    image: '/templates/worship-impact.png',
  },
  {
    id: 'conference-stage',
    title: 'Conference Stage',
    category: 'Conference',
    description: 'Elegant conference flyer with structured sections, color overlays, and event details.',
    image: '/templates/conference-stage.png',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json({ templates });
}
