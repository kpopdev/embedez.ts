import { VercelRequest, VercelResponse } from '@vercel/node';
import { EmbedEZ } from '../src/index';

// IMPORTANT: This line sets the API key from your Vercel environment variable.
// The embedez.ts library will not work without a valid key.
EmbedEZ.setConfig({ apiKey: process.env.SEARCH_KEY });

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const { url } = request.query;

    if (!url || typeof url !== 'string') {
      return response.status(400).send('Missing or invalid URL parameter.');
    }

    const preview = await EmbedEZ.getPreview(url);
    
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    return response.status(200).json(preview);
  } catch (error) {
    console.error('An error occurred:', error);
    return response.status(500).send('Internal Server Error');
  }
};
