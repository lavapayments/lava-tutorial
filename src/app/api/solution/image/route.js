// API Route: /api/solution/image
// This is a PLACEHOLDER SOLUTION showing the structure for image analysis API integration with Lava
// You will need to connect this to your actual image analysis API endpoint

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

    // STEP #1: Get the imageUrl and instructions from the request body
    const { imageUrl, instructions } = await request.json();

    if (!imageUrl) {
      return Response.json(
        { error: 'Image URL is required' },
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

    // TODO #3 SOLUTION: Configure the Lava API URL for image analysis
    // Default to Gemini 2.0 if user has not yet configured their env variables.
    const lavaBaseUrl = process.env.LAVA_BASE_URL || 'https://api.lavapayments.com/v1/forward?u=';
    const imageApiUrl = process.env.AI_IMAGE_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    const lavaApiUrl = lavaBaseUrl + imageApiUrl;

    // TODO #4 SOLUTION: Fetch the image and convert it to base64
    let base64Image;
    let mimeType = 'image/jpeg'; // default
    
    try {
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error(`Failed to fetch image: ${imageResponse.status}`);
      }
      
      const imageBuffer = await imageResponse.arrayBuffer();
      base64Image = Buffer.from(imageBuffer).toString('base64');
      
      // Determine MIME type from response headers
      const contentType = imageResponse.headers.get('content-type');
      if (contentType) {
        mimeType = contentType;
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      return Response.json(
        { error: 'Failed to fetch or process the image. Please check the URL.' },
        { status: 400 }
      );
    }

    // TODO #5 SOLUTION: Call the Lava API with Gemini's content format
    const response = await fetch(lavaApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${encodedForwardToken}`
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: instructions || 'Analyze this image in detail. Describe the scene, objects, people, mood, and any other relevant details.'
              },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: base64Image
                }
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 500, // Maximum number of output tokens - limits Gemini's response length
          temperature: 0.4 // Temperature controls how "creative" the model is. 0.4 used to keep responses mostly faithful to the image contents
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Lava Vision API error:', errorData);
      return Response.json(
        { error: 'Failed to get response from Lava Vision API' },
        { status: response.status }
      );
    }

    // TODO #6 SOLUTION: Parse and return the analysis
    const data = await response.json();
    const analysis = data.candidates[0].content.parts[0].text;

    return Response.json({ analysis });

  } catch (error) {
    console.error('Error in solution image API:', error);
    return Response.json(
      { error: 'Failed to analyze image: ' + error.message },
      { status: 500 }
    );
  }
}
