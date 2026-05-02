import React from 'react';
import { Sparkles, ShieldCheck, Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-8">
          <Sparkles size={16} />
          <span className="text-sm font-medium uppercase tracking-wider">AI-Powered Career Growth</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Get a Professional AI Resume in <span className="text-gold">60 Seconds</span>
        </h1>
        
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Stop struggling with formatting. Our Gemini-powered AI writes high-impact, ATS-friendly resumes that get you hired.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-gold text-black font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2">
              Create My Resume — ₹99 <ArrowRight size={20} />
            </span>
          </button>
          <p className="text-sm text-gray-500 italic">No subscription. Pay once, download forever.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold">
              <Sparkles size={24} />
            </div>
            <h3 className="font-semibold">Powered by Gemini AI</h3>
            <p className="text-sm text-gray-500">Advanced language models for professional writing.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-semibold">Secure Payment</h3>
            <p className="text-sm text-gray-500">Encrypted transactions via Razorpay.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold">
              <Download size={24} />
            </div>
            <h3 className="font-semibold">Instant Download</h3>
            <p className="text-sm text-gray-500">Get your PDF resume immediately after payment.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
