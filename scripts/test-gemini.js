const fs = require('fs');
const path = require('path');
const envFile = path.join(__dirname, '..', '.env.local');
const env = fs.readFileSync(envFile, 'utf8').split(/\r?\n/).reduce((acc, line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) acc[match[1]] = match[2].replace(/^"|"$/g, '');
  return acc;
}, {});
process.env.GOOGLE_API_KEY = env.GOOGLE_API_KEY;
const { GoogleGenAI } = require('@google/genai');

(async () => {
  try {
    const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: 'Generate a short church poster concept description in JSON format.',
      config: { candidateCount: 1 },
    });
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error('ERROR:', err);
    process.exit(1);
  }
})();
