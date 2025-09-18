import { VercelRequest, VercelResponse } from '@vercel/node';
import { EmbedEZ } from '../src/index';

// This is the serverless function that Vercel will run.
// It must have a default export that is a function.
export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const { url } = request.query;

    if (!url || typeof url !== 'string') {
      return response.status(400).send('Missing or invalid URL parameter.');
    }

    const preview = await EmbedEZ.getPreview(url);
    
    // Set response headers to allow cross-origin requests.
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    return response.status(200).json(preview);
  } catch (error) {
    console.error('An error occurred:', error);
    return response.status(500).send('Internal Server Error');
  }
};
