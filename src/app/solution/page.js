'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function SolutionChat() {
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [input, setInput] = useState(''); // State to store user input
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [aiPersonality, setAiPersonality] = useState(''); // State to store AI personality context

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Form submission logic 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: input };

    // Build messages array with AI personality if provided
    const messagesToSend = aiPersonality.trim()
      ? [...messages, { role: 'system', content: "# IMPORTANT: " + aiPersonality }, userMessage]
      : [...messages, userMessage];

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Call API route and error handling
    try {
      const response = await fetch('/api/solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messagesToSend }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Error: ${data.error || 'Failed to get response'}`
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-focus input on mount and when loading completes
  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  // Render the UI
  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 bg-black">
      {/* Header */}
      <div className="text-center py-6 border-b border-gray-800">
        <Link href="/" className="text-[#ff5a1f] hover:text-[#e64f1a] text-sm mb-2 inline-block transition-colors">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-white">Solution Chat</h1>
        <p className="text-gray-400 mt-2">
          ✅ Fully implemented with Lava integration
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Use this as a reference for your workshop implementation
        </p>
      </div>

      {/* System Prompt Input */}
      <div className="py-3 px-4 bg-gray-900/50 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Personalize your AI: </span>
          <input
            type="text"
            value={aiPersonality}
            onChange={(e) => setAiPersonality(e.target.value)}
            placeholder="Tell your AI how you'd like it to behave"
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-700 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5a1f]"
          />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-12">
            <p className="text-xl">This is a sample solution.</p>
            <p className="mt-2">Try chatting to see Lava work in real time.</p>
            <p className="mt-4 text-sm">
              Check src/app/api/solution/route.js to see the implementation.
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-[#ff5a1f] text-white'
                    : 'bg-gray-900 text-white border border-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2">
              <p className="text-gray-400">Thinking...</p>
            </div>
          </div>
        )}

        {/* Scroll marker */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t border-gray-800 pt-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-800 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff5a1f] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-[#ff5a1f] text-white rounded-lg font-medium hover:bg-[#e64f1a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
