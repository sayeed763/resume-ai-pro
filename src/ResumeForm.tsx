import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, GraduationCap, Wrench, ChevronRight, ChevronLeft } from 'lucide-react';

interface ResumeFormProps {
  onSubmit: (data: any) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
    experience: '',
    education: '',
    skills: ''
  });

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Job Details', icon: Briefcase },
    { id: 3, title: 'Experience & Education', icon: GraduationCap },
    { id: 4, title: 'Skills', icon: Wrench },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const isStepValid = () => {
    if (step === 1) return formData.name && formData.email;
    if (step === 2) return formData.jobTitle;
    if (step === 3) return formData.experience && formData.education;
    if (step === 4) return formData.skills;
    return false;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {steps.map((s) => (
            <div key={s.id} className={`flex flex-col items-center gap-2 ${step >= s.id ? 'text-gold' : 'text-gray-600'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${step >= s.id ? 'border-gold bg-gold/10' : 'border-gray-700'}`}>
                <s.icon size={18} />
              </div>
              <span className="text-xs font-medium hidden sm:block">{s.title}</span>
            </div>
          ))}
        </div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gold"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Full Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-dark border border-dark-border rounded-lg px-4 py-3 focus:border-gold outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Email Address</label>
                    <input name="email" value={formData.email} onChange={handleChange} className="w-full bg-dark border border-dark-border rounded-lg px-4 py-3 focus:border-gold outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Phone Number</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-dark border border-dark-border rounded-lg px-4 py-3 focus:border-gold outline-none transition-colors" placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Location</label>
                    <input name="location" value={formData.location} onChange={handleChange} className="w-full bg-dark border border-dark-border rounded-lg px-4 py-3 focus:border-gold outline-none transition-colors" placeholder="Mumbai, India" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Target Role</h2>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">What job are you applying for?</label>
                  <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full bg-dark border border-dark-border rounded-lg px-4 py-3 focus:border-gold outline-none transition-colors" placeholder="Senior Software Engineer" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Experience & Education</h2>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Work Experience (Briefly describe your roles)</label>
                  <textarea name="experience" value={formData.experience} onChange={handleChange} rows={4} className="w-full bg-dark border border-dark-border rounded-lg px-4 py-3 focus:border-gold outline-none transition-colors resize-none" placeholder="Worked at TechCorp for 3 years as a Lead Developer..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Education</label>
                  <textarea name="education" value={formData.education} onChange={handleChange} rows={3} className="w-full bg-dark border border-dark-border rounded-lg px-4 py-3 focus:border-gold outline-none transition-colors resize-none" placeholder="B.Tech in Computer Science from IIT Bombay..." />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Skills</h2>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">List your key skills (comma separated)</label>
                  <textarea name="skills" value={formData.skills} onChange={handleChange} rows={4} className="w-full bg-dark border border-dark-border rounded-lg px-4 py-3 focus:border-gold outline-none transition-colors resize-none" placeholder="React, Node.js, AWS, System Design, Team Leadership..." />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-12">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${step === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-white/5'}`}
          >
            <ChevronLeft size={20} /> Back
          </button>
          
          {step < 4 ? (
            <button 
              onClick={nextStep}
              disabled={!isStepValid()}
              className={`flex items-center gap-2 px-8 py-3 bg-gold text-black font-bold rounded-xl transition-all ${!isStepValid() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
            >
              Next <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              onClick={() => onSubmit(formData)}
              disabled={!isStepValid()}
              className={`flex items-center gap-2 px-8 py-3 bg-gold text-black font-bold rounded-xl transition-all ${!isStepValid() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
            >
              Generate My Resume
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
