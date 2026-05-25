import type { NextApiRequest, NextApiResponse } from 'next';
import { callAI, parseJsonResponse } from '@/lib/ai';

const fallbackAnalysis = {
  palette: ['#1F2937', '#8B5CF6', '#F9A8D4', '#FDE68A'],
  typography: 'Bold serif headline with clean sans body text',
  mood: 'Cinematic worship with glow and texture',
  layout: 'Hero focal point with overlay bars and centered title',
  lighting: 'Soft spotlight glow with subtle lens flare',
  overlays: 'Gradient overlay and light texture',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { referenceText, imageUrl } = req.body;

  if (!referenceText && !imageUrl) {
    return res.status(400).json({ error: 'referenceText or imageUrl is required' });
  }

  const prompt = `Analyze the following church poster description or image reference and return JSON with keys: palette, typography, mood, layout, lighting, overlays. Reference: ${referenceText ?? imageUrl}`;

  try {
    const aiResponse = await callAI(prompt);
    if (!aiResponse) {
      return res.status(200).json({ analysis: fallbackAnalysis });
    }

    const analysis = parseJsonResponse(aiResponse);
    return res.status(200).json({ analysis });
  } catch (error) {
    return res.status(200).json({ analysis: fallbackAnalysis, warning: 'OpenAI analysis unavailable, using fallback data.' });
  }
}
