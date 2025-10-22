// API Route: /api/chat
// Implement AI chat with Lava here

export async function POST(request) {
  try {
    // Get the messages from the request body
    const { messages } = await request.json();
    
    // TODO #1: Get your Lava API key from environment variables
    const apiKey = "[YOUR_LAVA_API_KEY_HERE ]";

    // TODO #2: Call the Lava API endpoint
    // Visit our documentation to learn how to call the Lava API endpoint: https://www.lavapayments.com/docs/quickstart

    const lavaEndpoint = "";
    const model="";

    const response = ""; // HINT: Use fetch() to make a request

    // TO BE DELETED: return a mock response until the workshop is complete
    // --------------------------------------------------------------
    if (!response || response === "") {
      return Response.json({ 
        message: 'This is a mock response. Implement the Lava connection in the workshop to get real AI responses!' 
      });
    }
    // --------------------------------------------------------------
    
    // Check for errors
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Lava API error:', errorData);
      return Response.json(
        { error: 'Failed to get response from Lava API. Check your endpoint and API key.' },
        { status: response.status }
      );
    }

    // Parse the response from Lava
    const data = await response.json();

    // Extract the AI's message and return it to the frontend
    const aiResponse = data.choices[0].message.content;
    return Response.json({ message: aiResponse });

  } catch (error) {
    console.error('Error in chat API:', error);
    return Response.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  }
}
