# ChatGPT + Lava Workshop

Build a monetized AI chat application using ChatGPT and Lava! This workshop teaches you how to create a full-stack chat application with Next.js and integrate AI APIs through Lava for monetization.

## What You'll Build

A working chat interface that connects to ChatGPT through Lava, allowing users to have conversations with AI while you earn from API usage through Lava's monetization platform.

## Prerequisites

- Basic knowledge of JavaScript and React
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (v18 or higher)
- A Lava API key (get one at https://www.lavapayments.com/dashboard/build/keys after you've created or joined a Team)

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd lava-tutorial
npm install
```

### 2. Set Up Your API Key

Copy the example environment file and add your Lava configuration:

```bash
cp .env.example .env
```

Edit `.env` and add your Lava API key:
- `LAVA_API_KEY` - Your Lava API key from [Lava Dashboard](https://www.lavapayments.com/dashboard/build/keys)

### 3. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your chat app!

## Workshop Steps

### Step 1: Explore the Application (2 minutes)

1. Navigate to [http://localhost:3000](http://localhost:3000) to see the workshop homepage
2. Click "Begin Building →" to access the workshop chat interface at `/workshop`
3. Try sending a message - you'll see a mock response since we haven't connected the API yet
4. Check out `/solution` to see the fully working reference implementation

### Step 2: Implement Lava Connection (15 minutes)

Open `src/app/api/workshop/route.js` and complete the TODOs:

**TODO #1:** Extract messages from the request
```javascript
const { messages } = await request.json();
```

**TODO #2:** Get your API key from environment
```javascript
const apiKey = process.env.LAVA_API_KEY;
```

**TODO #3:** Configure your AI provider endpoint

Update the AI_CHAT_URL endpoint in the `.env` file to your desired AI model, for example:
```bash
AI_CHAT_URL=https://api.openai.com/v1/chat/completions
```

Then build the Lava endpoint and call it
```javascript
const lavaEndpoint = process.env.LAVA_BASE_URL + process.env.AI_CHAT_URL;
const model ='your_model' //e.g. 'gpt-4o-mini'

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
```

**TODO #4:** Parse the Lava response
```javascript
const data = await response.json();
```

**TODO #5:** Return the AI message
```javascript
const aiMessage = data.choices[0].message.content;
return Response.json({ message: aiMessage });
```

### Step 3: Test Your Integration (5 minutes)

1. Make sure your `.env` file has your Lava API key and endpoint configured
2. Restart your dev server (Ctrl+C, then `npm run dev`)
3. Go to `/workshop` and send a message - you should now see real AI responses!
4. Try using the "Personalize your AI" input to customize the AI's behavior (e.g., "You are a pirate" or "You are a helpful teacher")

### Step 4: Add Monetization Features (Bonus)

Explore Lava's monetization features:
- Track API usage
- Set up payment models
- Monitor earnings

Check out [Lava's documentation](https://lavapayments.com/docs) for advanced features.

## Project Structure

```
lava-tutorial/
├── src/
│   └── app/
│       ├── page.js              # Home page with workshop info
│       ├── workshop/
│       │   └── page.js          # Workshop chat UI (mock responses)
│       ├── solution/
│       │   └── page.js          # Solution chat UI (fully working)
│       ├── api/
│       │   ├── workshop/
│       │   │   └── route.js     # Workshop API route (you'll complete this)
│       │   └── solution/
│       │       └── route.js     # Solution API route (reference)
│       ├── layout.js            # App layout
│       └── globals.css          # Global styles
├── .env.example                 # Example environment variables
├── .env                         # Your Lava endpoint (don't commit!)
└── package.json                 # Dependencies
```

## Tech Stack

- **Next.js 15** - React framework with App Router
- **Tailwind CSS 4** - Styling
- **Lava** - AI API monetization platform
- **OpenAI GPT** - Language model (via Lava)

## How It Works

### AI Personality Customization

The "Personalize your AI" feature lets users control the AI's behavior using system prompts. When you enter text like "You are a helpful assistant", it gets sent to the AI as a system message:

```javascript
const messagesToSend = aiPersonality.trim()
  ? [...messages, { role: 'system', content: "# IMPORTANT: " + aiPersonality }, userMessage]
  : [...messages, userMessage];
```

The system message is added with `role: 'system'` and prefixed with `"# IMPORTANT: "` to ensure the AI prioritizes this instruction.

## Troubleshooting

**"Failed to get response from AI"**
- Check that your `.env` file exists and has both `LAVA_API_KEY` and `AI_CHAT_URL` configured
- Make sure you restarted the dev server after adding the `.env` file
- Verify your Lava API key is valid at [Lava Dashboard](https://www.lavapayments.com/dashboard/build/secrets)
- Use console.log(###) to debug and ensure intermediate steps are working correctly

**Styles look broken**
- Make sure you ran `npm install`
- Tailwind CSS 4 is configured and should work automatically

## What You've Learned

By the end of this workshop, you'll understand:
- How to build a full-stack Next.js application with App Router
- Client-server communication with API routes
- Integrating AI APIs securely (keeping keys on the server)
- Using Lava for AI API monetization and proxy routing
- Managing environment variables and API configuration
- Implementing system prompts to control AI behavior

## Resources

- [Lava Documentation](https://www.lavapayments.com/docs)
- [Lava API Reference](https://www.lavapayments.com/docs/api-reference/introduction)
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Happy coding! If you get stuck, ask your workshop instructor for help.
