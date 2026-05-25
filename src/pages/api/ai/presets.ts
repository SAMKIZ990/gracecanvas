import type { NextApiRequest, NextApiResponse } from 'next';

const presets = [
  {
    id: 'cinematic-glow',
    name: 'Cinematic Glow',
    description: 'Bold contrast, ambient lighting, and rich gradients for premium gospel events.',
  },
  {
    id: 'modern-ministry',
    name: 'Modern Ministry',
    description: 'Clean layouts with strong headlines, subtle textures, and contemporary church styling.',
  },
  {
    id: 'vintage-revival',
    name: 'Vintage Revival',
    description: 'Warm tonal palette, layered typography, and a soulful worship atmosphere.',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json({ presets });
}
