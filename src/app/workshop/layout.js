import Link from 'next/link';

export default function WorkshopLayout({ children }) {
  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 bg-black">
      {/* Header */}
      <div className="relative flex items-center justify-center py-3 border-b border-gray-800">
        <Link 
          href="/" 
          className="absolute left-0 inline-flex items-center bg-gray-900 text-gray-300 px-4 py-1 rounded-lg text-sm hover:bg-gray-800 transition-colors border border-white/20"
        >
          ← Back to Home
        </Link>
        <div className="bg-[#ff5a1f]/20 text-[#ff5a1f] px-5 py-1 rounded-full text-sm font-medium border border-[#ff5a1f]/20">
          Workshop Mode • Build & Learn
        </div>
      </div>
      
      {children}
    </div>
  );
}
