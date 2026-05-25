import type { NextApiRequest, NextApiResponse } from 'next';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$19',
    frequency: 'month',
    features: ['5 AI poster credits', 'Basic template access', '1 brand kit'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$49',
    frequency: 'month',
    features: ['20 AI poster credits', 'Premium templates', '3 brand kits', 'export PDF/JPG/PNG'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$99',
    frequency: 'month',
    features: ['Unlimited AI credits', 'Team collaboration', 'Advanced export presets', 'Priority support'],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json({ plans });
}
