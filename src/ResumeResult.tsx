import React, { useRef } from 'react';
import { Download, Copy, Check, ArrowLeft } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ResumeResultProps {
  resume: string;
  onReset: () => void;
}

export const ResumeResult: React.FC<ResumeResultProps> = ({ resume, onReset }) => {
  const [copied, setCopied] = React.useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(resume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    
    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      backgroundColor: '#ffffff',
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume.pdf');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <button onClick={onReset} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Create Another
        </button>
        <div className="flex gap-3">
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-dark-surface border border-dark-border rounded-lg hover:bg-white/5 transition-colors"
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-2 bg-gold text-black font-bold rounded-lg hover:scale-105 transition-all"
          >
            <Download size={18} /> Download PDF
          </button>
        </div>
      </div>

      <div className="bg-white text-black p-8 md:p-12 rounded-xl shadow-2xl min-h-[800px]" ref={resumeRef}>
        <div className="whitespace-pre-wrap font-serif text-sm leading-relaxed">
          {resume}
        </div>
      </div>
    </div>
  );
};
