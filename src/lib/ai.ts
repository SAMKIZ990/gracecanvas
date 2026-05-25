const OPENAI_MODEL = 'gpt-4o-mini';
const OPENAI_IMAGE_MODEL = 'gpt-image-1';
const GEMINI_TEXT_MODEL = 'gemini-2.0-flash';
const GEMINI_IMAGE_MODEL = 'image-bison-1';

async function getGoogleClient() {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  if (!GOOGLE_API_KEY) {
    throw new Error('GOOGLE_API_KEY is not configured. Set it in .env.local.');
  }
  const requireFunc = eval('require');
  const { GoogleGenAI } = requireFunc('@google/genai');
  return new GoogleGenAI({ apiKey: GOOGLE_API_KEY });
}

export async function callOpenAI(prompt: string) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured. Set it in .env.local.');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a design intelligence assistant that analyzes church posters and generates editable poster concepts in structured JSON form.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 700,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed: ${errorText}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content ?? null;
}

export async function callOpenAIImage(prompt: string, size = '1024x1024') {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured. Set it in .env.local.');
  }

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_IMAGE_MODEL,
      prompt,
      size,
      n: 1,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI image request failed: ${errorText}`);
  }

  const data = await response.json();
  const item = data?.data?.[0];
  if (!item) return null;
  if (item.url) return item.url;
  if (item.b64_json) return `data:image/png;base64,${item.b64_json}`;
  return null;
}

export async function callGemini(prompt: string) {
  const client = await getGoogleClient();
  const response = await client.models.generateContent({
    model: GEMINI_TEXT_MODEL,
    contents: prompt,
    config: {
      candidateCount: 1,
    },
  });

  const candidate = response?.candidates?.[0];
  const content = candidate?.content;
  if (!content) {
    throw new Error('Google Gemini response did not return text content.');
  }
  return typeof content === 'string' ? content : String(content);
}

export async function callGeminiImage(prompt: string, size = '1024x1024') {
  const client = await getGoogleClient();
  const response = await client.models.generateImages({
    model: GEMINI_IMAGE_MODEL,
    prompt,
    config: {
      numberOfImages: 1,
    },
  });

  const item = response?.generatedImages?.[0];
  if (!item) return null;

  const obj = item as any;
  const uri = obj?.image?.imageUri ?? obj?.imageUri;
  if (uri) return uri;

  const bytes = obj?.image?.imageBytes ?? obj?.imageBytes;
  if (bytes) {
    return `data:image/png;base64,${bytes}`;
  }

  return null;
}

export type AIProvider = 'gemini' | 'openai';

export interface AITextResult {
  text: string;
  provider: AIProvider;
}

export interface AIImageResult {
  image: string | null;
  provider: AIProvider;
}

export async function callAIWithProvider(prompt: string, provider?: AIProvider): Promise<AITextResult> {
  const hasGemini = Boolean(process.env.GOOGLE_API_KEY);
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);

  if (provider === 'gemini') {
    if (!hasGemini) {
      throw new Error('Gemini is not available because GOOGLE_API_KEY is not configured.');
    }
    try {
      return { text: await callGemini(prompt), provider: 'gemini' };
    } catch (error) {
      console.warn('Gemini text generation failed, trying OpenAI fallback:', error);
      if (hasOpenAI) {
        return { text: await callOpenAI(prompt), provider: 'openai' };
      }
      throw error;
    }
  }

  if (provider === 'openai') {
    if (!hasOpenAI) {
      throw new Error('OpenAI is not available because OPENAI_API_KEY is not configured.');
    }
    try {
      return { text: await callOpenAI(prompt), provider: 'openai' };
    } catch (error) {
      console.warn('OpenAI text generation failed, trying Gemini fallback:', error);
      if (hasGemini) {
        return { text: await callGemini(prompt), provider: 'gemini' };
      }
      throw error;
    }
  }

  if (hasGemini) {
    try {
      return { text: await callGemini(prompt), provider: 'gemini' };
    } catch (error) {
      console.warn('Gemini text generation failed, falling back to OpenAI:', error);
      if (hasOpenAI) {
        return { text: await callOpenAI(prompt), provider: 'openai' };
      }
      throw error;
    }
  }

  if (hasOpenAI) {
    try {
      return { text: await callOpenAI(prompt), provider: 'openai' };
    } catch (error) {
      console.warn('OpenAI text generation failed, trying Gemini fallback:', error);
      if (hasGemini) {
        return { text: await callGemini(prompt), provider: 'gemini' };
      }
      throw error;
    }
  }

  throw new Error('No AI provider is configured. Set GOOGLE_API_KEY or OPENAI_API_KEY.');
}

export async function callAIImageWithProvider(prompt: string, size = '1024x1024', provider?: AIProvider): Promise<AIImageResult> {
  const hasGemini = Boolean(process.env.GOOGLE_API_KEY);
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);

  if (provider === 'gemini') {
    if (!hasGemini) {
      throw new Error('Gemini is not available because GOOGLE_API_KEY is not configured.');
    }
    try {
      return { image: await callGeminiImage(prompt, size), provider: 'gemini' };
    } catch (error) {
      console.warn('Gemini image generation failed, trying OpenAI fallback:', error);
      if (hasOpenAI) {
        return { image: await callOpenAIImage(prompt, size), provider: 'openai' };
      }
      throw error;
    }
  }

  if (provider === 'openai') {
    if (!hasOpenAI) {
      throw new Error('OpenAI is not available because OPENAI_API_KEY is not configured.');
    }
    try {
      return { image: await callOpenAIImage(prompt, size), provider: 'openai' };
    } catch (error) {
      console.warn('OpenAI image generation failed, trying Gemini fallback:', error);
      if (hasGemini) {
        return { image: await callGeminiImage(prompt, size), provider: 'gemini' };
      }
      throw error;
    }
  }

  if (hasGemini) {
    try {
      return { image: await callGeminiImage(prompt, size), provider: 'gemini' };
    } catch (error) {
      console.warn('Gemini image generation failed, falling back to OpenAI:', error);
      if (hasOpenAI) {
        return { image: await callOpenAIImage(prompt, size), provider: 'openai' };
      }
      throw error;
    }
  }

  if (hasOpenAI) {
    try {
      return { image: await callOpenAIImage(prompt, size), provider: 'openai' };
    } catch (error) {
      console.warn('OpenAI image generation failed, trying Gemini fallback:', error);
      if (hasGemini) {
        return { image: await callGeminiImage(prompt, size), provider: 'gemini' };
      }
      throw error;
    }
  }

  throw new Error('No AI provider is configured. Set GOOGLE_API_KEY or OPENAI_API_KEY.');
}

export async function callAI(prompt: string) {
  return (await callAIWithProvider(prompt)).text;
}

export async function callAIImage(prompt: string, size = '1024x1024') {
  return (await callAIImageWithProvider(prompt, size)).image;
}

function extractJsonObject(text: string) {
  let depth = 0;
  let inString = false;
  let escape = false;
  let start = -1;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (start === -1 && char === '{') {
      start = i;
      depth = 1;
      continue;
    }

    if (start >= 0) {
      if (char === '"' && !escape) {
        inString = !inString;
      }
      if (!inString) {
        if (char === '{') depth += 1;
        if (char === '}') depth -= 1;
      }
      escape = char === '\\' && !escape;

      if (depth === 0) {
        return text.slice(start, i + 1);
      }
    }
  }

  return null;
}

export function parseJsonResponse(content: string) {
  if (!content || typeof content !== 'string') {
    throw new Error('Response is empty or not a string.');
  }

  const trimmed = content.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const jsonString = extractJsonObject(trimmed);
    if (!jsonString) {
      throw new Error(`Response does not contain valid JSON. Raw response: ${trimmed.slice(0, 500)}`);
    }
    try {
      return JSON.parse(jsonString);
    } catch (innerError) {
      throw new Error(`Failed to parse JSON from response. Extracted payload: ${jsonString.slice(0, 500)}. Error: ${innerError}`);
    }
  }
}
