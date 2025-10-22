// API Route: /api/solution
// This is the COMPLETE SOLUTION showing how to integrate an AI provider with Lava

export async function POST(request) {
  try {
    // Get the messages from the request body
    const { messages } = await request.json();
    console.log('messages:', messages);

    // Get your Lava API key from environment variables
    const apiKey = process.env.LAVA_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: 'LAVA_API_KEY is not configured. Please add it to your .env file.' },
        { status: 500 }
      );
    }

    // Call the Lava API endpoint. Default to OpenAI if user has not yet configured their env variables. 
    const lavaPrefix = process.env.LAVA_BASE_URL || 'https://api.lavapayments.com/v1/forward?u=';
    const chatEndpoint = process.env.AI_CHAT_URL || 'https://api.openai.com/v1/chat/completions';
    const lavaEndpoint = lavaPrefix + chatEndpoint;
    const model = 'gpt-4o-mini';

    const response = await fetch(lavaEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages
      })
    });

    // Check for errors
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Lava API error: ', errorData);
      return Response.json(
        { error: 'Failed to get response from Lava API. Check your endpoint and API key.' },
        { status: response.status }
      );
    }

    // Parse the response from Lava
    const data = await response.json();

    // Extract the AI's message and return it to the frontend
    console.log('Fetched data: ', data);
    const aiMessage = data.choices[0].message.content;

    return Response.json({ message: aiMessage });

  } catch (error) {
    console.error('Error in solution chat API:', error);
    return Response.json(
      { error: 'Failed to get response from AI: ' + error.message },
      { status: 500 }
    );
  }
}
