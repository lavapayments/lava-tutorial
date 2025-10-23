"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mt-10 mb-20">
          <h1 className="text-6xl font-bold mb-4 flex flex-wrap items-end justify-center gap-4">
            <span className="bg-gradient-to-r from-orange-100 to-red-100 bg-clip-text text-transparent">
              Multimodal AI + 
            </span>
            <Link href="https://lavapayments.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/Lava Logo Dark Large.png"
                alt="Lava"
                width={240}
                height={72}
                className="object-contain hover:scale-105 transition-transform"
              />
            </Link>
            <span className="bg-gradient-to-r from-orange-200 via-red-200 to-red-300 bg-clip-text text-transparent">
              Workshop
            </span>
          </h1>
          <p className="text-2xl text-gray-400 font-light italic">
            Learn how to build AI-powered Chat, Image Analysis, and Text to Voice with Lava
          </p>
        </header>

        {/* What is Lava Build */}
        <div className="mb-10 bg-slate-950 rounded-xl p-8 border border-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-white">
            What is Lava Build?
          </h2>
          <p className="text-gray-400 text-medium mb-4">
            Lava Build is an AI gateway that connects you to 20+ AI providers (OpenAI, Anthropic, Google, Groq, and more) through a single endpoint.
            Build once, switch providers anytime, and gain access to built-in usage tracking and monetization capabilities.
          </p>
          <p className="text-orange-200 text-medium mb-6">
            Ensure there are funds in your Lava account before you begin making API calls.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.lavapayments.com/sign-up"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 relative overflow-hidden bg-gradient-to-r from-[#ff5a1f] to-orange-500 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:from-orange-500 hover:to-[#ff5a1f] transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              <span className="relative z-10">Sign Up for Lava →</span>
            </a>
             <a
               href="https://www.lavapayments.com/dashboard/build/secrets"
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors border border-white/20"
             >
               Get API Key
             </a>
          </div>
        </div>

        {/* Workshop Overview */}
        <div className="mb-10 bg-slate-950 rounded-xl p-8 border border-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Workshop Overview
          </h2>
          <p className="text-gray-400 text-medium mb-6">
            Learn how to build three different AI-powered applications using Lava Build's AI gateway. 
            Easily access multiple AI providers like Groq for chat, Google Gemini for image analysis, 
            and OpenAI for text-to-speech. 
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 rounded-xl p-6 border border-gray-800 hover:border-white/30 transition-colors group">
              <div className="relative mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
              </div>
              <h3 className="font-semibold text-white text-lg mb-1">AI Chatbot</h3>
              <p className="text-gray-400 text-sm">
                Build a conversational AI chatbot with user defined behavior patterns.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6 border border-gray-800 hover:border-white/30 transition-colors group">
              <div className="relative mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
              </div>
              <h3 className="font-semibold text-white text-lg mb-1">Image Analysis</h3>
              <p className="text-gray-400 text-sm">
                Analyze images with a user defined prompt.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6 border border-gray-800 hover:border-white/30 transition-colors group">
              <div className="relative mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
              </div>
              <h3 className="font-semibold text-white text-lg mb-1">Text to Voice</h3>
              <p className="text-gray-400 text-sm">
                Convert any text into natural-sounding speech.
              </p>
            </div>
          </div>
        </div>

        {/* Main Workshop Card */}
        <Link href="/workshop" className="mb-16 relative group block">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ff5a1f] to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-40"></div>

          {/* Card content */}
          <div className="relative bg-gradient-to-br from-amber-950 to-red-950 group-hover:from-amber-900 rounded-2xl shadow-2xl px-10 py-14 border border-[#ff5a1f]/30 cursor-pointer transition-all duration-300">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="text-6xl">🚀</div>
              <div className="flex-1">
                <div className="inline-block bg-[#ff5a1f]/10 text-[#ff5a1f] px-3 py-1 rounded-full text-sm font-medium mb-4 border border-[#ff5a1f]/20">
                  Interactive Workshop
                </div>
                <h2 className="text-4xl font-bold mb-4 text-white">
                  Let's Get Started
                </h2>
                 <div className="text-gray-300 mb-8 leading-relaxed">
                   <p className="mb-2 text-lg">
                     Jump in and start building.
                   </p>
                   <p className="mb-2 text-sm">
                     The front end UI is provided for you. Complete the API routes to enable AI functionality. 
                   </p>
                 </div>
                <div className="flex flex-wrap gap-4">
                  <div className="relative overflow-hidden bg-gradient-to-r from-[#ff5a1f] to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-[#ff5a1f]/30 group-hover:shadow-[#ff5a1f]/50 transition-all duration-300 group-hover:from-orange-500 group-hover:to-[#ff5a1f]">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    <span className="relative z-10">Begin Building →</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.location.href = '/solution';
                    }}
                    className="bg-white/10 text-white px-6 py-4 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/20"
                  >
                    View example solution
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Resources Section */}
        <div className="bg-slate-950 rounded-xl shadow-2xl p-8 border border-gray-700/50 mb-16 relative overflow-hidden">
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Helpful Resources
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              Everything you need to get started with Lava Build. Feel free to reach out to us on Slack or Discord if you ever have any questions!
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-900/50 rounded-lg p-6 border border-gray-800/50 hover:border-white/30 transition-all duration-300 group">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-lg">📚</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Documentation
                  </h3>
                </div>
                <ul className="space-y-2 pl-15">
                  <li>
                    <a
                      href="https://www.lavapayments.com/docs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                    >
                      Lava Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.lavapayments.com/docs/api-reference/introduction"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                    >
                      API Reference
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-6 border border-gray-800/50 hover:border-white/30 transition-all duration-300 group">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-lg">💬</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Community
                  </h3>
                </div>
                <ul className="space-y-2 pl-15">
                  <li>
                    <a
                      href="https://discord.gg/ew3abadB"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                    >
                      Join Discord
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/lavapayments/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                    >
                      Follow on LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/Lavapayments"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                    >
                      Follow on Twitter
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>

       {/* Footer */}
       <footer className="border-t border-gray-800/50 relative overflow-hidden bg-gray-950">

        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
            {/* Brand Section */}
            <div className="col-span-2 lg:col-span-1">
              <Image
                src="/Lava Logo Dark Large.png"
                alt="Lava"
                width={120}
                height={36}
                className="object-contain mb-4"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
                Building and monetizing AI services, made simple.
              </p>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-white font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.lavapayments.com/products" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Products
                  </a>
                </li>
                <li>
                  <a href="https://www.lavapayments.com/docs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="https://www.lavapayments.com/pricing" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="https://www.lavapayments.com/api" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                    API
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.lavapayments.com/about" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                    About
                  </a>
                </li>
                <li>
                  <a href="https://www.lavapayments.com/contact" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="https://lava.breezy.hr/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.lavapayments.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="https://www.lavapayments.com/cookies" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="https://www.lavapayments.com/terms" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800/50">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} Lava. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
