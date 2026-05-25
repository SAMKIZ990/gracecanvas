import type { NextApiRequest, NextApiResponse } from 'next';
import { callAIWithProvider, parseJsonResponse, callAIImageWithProvider } from '@/lib/ai';

const fallbackConcept = {
  title: 'City Revival Experience',
  subtitle: 'A night of worship, testimony, and community',
  colorPalette: ['#0F172A', '#7C3AED', '#FBBF24', '#E0E7FF'],
  fonts: ['Playfair Display', 'Inter'],
  layout: 'Large title at the top, event details below, textured overlay, and glowing accent lines.',
  backgroundPrompt: 'Dark stage lights with purple glow and subtle bokeh',
  note: 'Designed for modern church events with dramatic typography and premium finishes.',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    eventTitle,
    theme,
    speaker,
    dateTime,
    venue,
    bibleVerse,
    churchName,
    mood,
    provider: rawProvider,
  } = req.body;

  const provider = rawProvider === 'gemini' || rawProvider === 'openai' ? rawProvider : undefined;

  if (!eventTitle || !dateTime || !venue || !churchName) {
    return res.status(400).json({ error: 'Missing required poster fields' });
  }

  const prompt = `Create a JSON poster concept for a church event based on these inputs:
- Event title: ${eventTitle}
- Theme: ${theme ?? 'Modern gospel'}
- Speaker: ${speaker ?? 'Guest leader'}
- Date/time: ${dateTime}
- Venue: ${venue}
- Bible verse: ${bibleVerse ?? 'Philippians 4:13'}
- Church name: ${churchName}
- Mood: ${mood ?? 'cinematic'}

Return JSON with keys: title, subtitle, colorPalette, fonts, layout, backgroundPrompt, note.`;

  try {
    const aiResponse = await callAIWithProvider(prompt, provider);
    if (!aiResponse?.text) {
      return res.status(200).json({ concept: fallbackConcept, provider: provider || 'openai' });
    }

    const concept = parseJsonResponse(aiResponse.text);
    let resultProvider = aiResponse.provider;

    // Attempt to generate a poster background image from the AI prompt.
    try {
      const imageResponse = await callAIImageWithProvider(concept.backgroundPrompt || fallbackConcept.backgroundPrompt, '1024x1024', provider);
      if (imageResponse.image) {
        concept.image = imageResponse.image;
      }
      resultProvider = imageResponse.provider || resultProvider;
    } catch (err) {
      // ignore image errors and continue returning the concept
    }

    return res.status(200).json({ concept, provider: resultProvider });
  } catch (error: any) {
    console.error('AI generation error:', error);
    const warning = `AI generation unavailable, using fallback data.${error?.message ? ' ' + error.message : ''}`;
    return res.status(200).json({ concept: fallbackConcept, warning, provider: provider || 'openai' });
  }
}
