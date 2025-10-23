// API Route: /api/solution/chat
// This is the COMPLETE SOLUTION showing how to integrate Groq (Llama) with Lava

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

    // TODO #1 SOLUTION: Get the messages from the request body
    const { messages } = await request.json();
    console.log('messages:', messages);

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

    // TODO #3 SOLUTION: Configure the Lava API URL
    // Default to Groq if user has not yet configured their env variables.
    const lavaBaseUrl = process.env.LAVA_BASE_URL || 'https://api.lavapayments.com/v1/forward?u=';
    const chatEndpoint = process.env.AI_CHAT_URL || 'https://api.groq.com/openai/v1/chat/completions';
    const lavaApiUrl = lavaBaseUrl + chatEndpoint;
    const model = 'llama-3.1-8b-instant';

    // TODO #4 SOLUTION: Call the Lava API
    const response = await fetch(lavaApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${encodedForwardToken}`
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

    // TODO #5 SOLUTION: Parse and return the response
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
