'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SolutionVision() {
  const [imageUrl, setImageUrl] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisInstructions, setAnalysisInstructions] = useState('Analyze this image in detail. Describe the scene, objects, people, mood, and any other relevant details.');

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!imageUrl.trim()) return;

    setIsLoading(true);
    setAnalysis('');

    try {
      const response = await fetch('/api/solution/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl,
          instructions: analysisInstructions
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setAnalysis(data.analysis || data.message);
      } else {
        setAnalysis(`Error: ${data.error || 'Failed to analyze image'}`);
      }
    } catch (error) {
      setAnalysis('Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Page-specific header content */}
      <div className="text-center py-4 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-white">Image Analyzer</h2>
        <p className="text-gray-400 mt-2">
          Complete implementation with Lava Build integration
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Check src/app/api/solution/image/route.js to see the code
        </p>
      </div>

      {/* Main Content */}
      <div className="overflow-y-auto">
        {/* Analysis Instructions Input */}
        <div className="py-3 px-4 bg-gray-900/50 border-b border-gray-800 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm">Customize Analysis Instructions:</label>
            <textarea
              value={analysisInstructions}
              onChange={(e) => setAnalysisInstructions(e.target.value)}
              placeholder="Tell the AI what to analyze in the image"
              rows={2}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-700 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5a1f] resize-none"
            />
          </div>
        </div>
        
        <div className="flex-1 px-2 ">
          {/* Input Form */}
          <form onSubmit={handleAnalyze} className="mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-lg border border-gray-800 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff5a1f] disabled:opacity-50"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Paste a public URL to an image you'd like to analyze
                </p>
              </div>
              <button
                type="submit"
                disabled={isLoading || !imageUrl.trim()}
                className="w-full px-6 py-3 bg-[#ff5a1f] text-white rounded-lg font-medium hover:bg-[#e64f1a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Analyzing...' : 'Analyze Image'}
              </button>
            </div>
          </form>

          {/* Image Preview */}
          {imageUrl && !isLoading && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Preview:</h3>
              <div className="rounded-lg overflow-hidden border border-gray-800 bg-gray-900">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-auto max-h-96 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <p className="text-gray-400 text-center">Analyzing image with AI...</p>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && !isLoading && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Analysis:</h3>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {analysis}
              </p>
            </div>
          )}

          {/* Welcome Message */}
          {!analysis && !isLoading && !imageUrl && (
            <div className="text-center text-gray-400 mt-12">
              <p className="text-xl">This is the complete solution.</p>
              <p className="mt-2">Enter an image URL to see AI vision in action through Lava Build.</p>
              <p className="mt-4 text-sm">
                The AI will describe what it sees, detect objects, count people, and describe the mood.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 py-4 border-t border-gray-800 flex justify-between text-sm">
        <Link
          href="/solution/chat"
          className="inline-flex items-center bg-sky-800 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-sky-700 transition-colors border border-sky-400/30"
        >
          ← Back: Chat
        </Link>
        <Link
          href="/solution/voice"
          className="inline-flex items-center bg-sky-800 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-sky-700 transition-colors border border-sky-400/30"
        >
          Next: Voice Generator →
        </Link>
      </div>
    </>
  );
}
