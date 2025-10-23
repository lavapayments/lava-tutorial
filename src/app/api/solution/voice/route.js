// API Route: /api/solution/voice
// This is the COMPLETE SOLUTION showing how to integrate OpenAI TTS with Lava

export async function POST(request) {
  try {
    // Send an error response if the Lava API key is not configured.
    // A Lava API key is required to use the Lava API and pay for API usage.
    // See https://www.lavapayments.com/dashboard/build/keys for your API key.
    if (!process.env.LAVA_API_KEY) {
      return Response.json(
        { error: 'LAVA_API_KEY is not configured. Please add it to your .env file.' },
        { status: 500 }
      );
    }

    // STEP #1: Get the text from the request body
    const { text } = await request.json();

    if (!text) {
      return Response.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // TODO #2 SOLUTION: Create the Lava forward token
    // This token is used to authenticate the request and provide usage tracking capabilities.
    const lavaForwardToken = {
      secret_key: process.env.LAVA_API_KEY,
      connection_secret: process.env.LAVA_SELF_CONNECTION_SECRET,
      product_secret: process.env.LAVA_SELF_PRODUCT_SECRET
    };

    // Encode the forward token using base64
    // Base64 is a standard encoding format that is easy to decode and use in URLs.
    const encodedForwardToken = Buffer.from(JSON.stringify(lavaForwardToken)).toString('base64');

    // TODO #3 SOLUTION: Configure the Lava API URL for text-to-speech
    // Default to OpenAI TTS if user has not yet configured their env variables.
    const lavaBaseUrl = process.env.LAVA_BASE_URL || 'https://api.lavapayments.com/v1/forward?u=';
    const ttsApiUrl = process.env.AI_VOICE_URL || 'https://api.openai.com/v1/audio/speech';
    const lavaApiUrl = lavaBaseUrl + ttsApiUrl;

    // TODO #4 SOLUTION: Call the Lava API with OpenAI TTS format
    const response = await fetch(lavaApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${encodedForwardToken}`
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: 'alloy', // Options: alloy, echo, fable, onyx, nova, shimmer, etc.
        input: text
      })
    });

    // Check for errors
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Lava TTS API error:', errorData);
      return Response.json(
        { error: 'Failed to get response from Lava TTS API' },
        { status: response.status }
      );
    }

    // TODO #5 SOLUTION: Handle the audio response
    // Get the audio data as an array buffer
    const audioBuffer = await response.arrayBuffer();

    // Convert to base64 for client-side playback
    const base64Audio = Buffer.from(audioBuffer).toString('base64');
    const audioUrl = `data:audio/mp3;base64,${base64Audio}`;

    return Response.json({ audioUrl });

  } catch (error) {
    console.error('Error in solution voice API:', error);
    return Response.json(
      { error: 'Failed to generate speech: ' + error.message },
      { status: 500 }
    );
  }
}
