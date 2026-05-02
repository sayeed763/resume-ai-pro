import React, { useState } from 'react';
import { Landing } from './components/Landing';
import { ResumeForm } from './components/ResumeForm';
import { ResumeResult } from './components/ResumeResult';
import { createOrder, verifyPayment, generateResume } from './lib/api';
import { Loader2 } from 'lucide-react';

type AppState = 'landing' | 'form' | 'loading' | 'result';

function App() {
  const [state, setState] = useState<AppState>('landing');
  const [formData, setFormData] = useState<any>(null);
  const [resume, setResume] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFormSubmit = async (data: any) => {
    setFormData(data);
    setError('');
    
    try {
      const order = await createOrder();
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "ResumeAI Pro",
        description: "Professional AI Resume Generation",
        order_id: order.id,
        handler: async (response: any) => {
          try {
            setState('loading');
            await verifyPayment(response);
            const result = await generateResume(data);
            setResume(result.resume);
            setState('result');
          } catch (err) {
            setError('Payment verification or generation failed. Please contact support.');
            setState('form');
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone
        },
        theme: {
          color: "#c8a96e"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      setError('Failed to initialize payment. Ensure the backend server is running.');
    }
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white selection:bg-gold/30">
      {/* Header */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center text-black">R</div>
          <span>ResumeAI <span className="text-gold">Pro</span></span>
        </div>
      </nav>

      <main>
        {error && (
          <div className="max-w-md mx-auto mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-center">
            {error}
          </div>
        )}

        {state === 'landing' && <Landing onStart={() => setState('form')} />}
        
        {state === 'form' && <ResumeForm onSubmit={handleFormSubmit} />}
        
        {state === 'loading' && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
            <Loader2 className="w-12 h-12 text-gold animate-spin" />
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Crafting Your Masterpiece</h2>
              <p className="text-gray-400">Our AI is analyzing your profile and writing your resume...</p>
            </div>
          </div>
        )}

        {state === 'result' && (
          <ResumeResult 
            resume={resume} 
            onReset={() => {
              setState('landing');
              setResume('');
            }} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2025 ResumeAI Pro. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
