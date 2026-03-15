import React, { useEffect } from 'react';
import { Calendar, ArrowRight, Check } from 'lucide-react';
import Confetti from './Confetti';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      (function (C: any, A: string, L: string) {
        let p = function (a: any, ar: any) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            let script = d.createElement("script");
            script.src = A;
            d.head.appendChild(script);
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
      
      const Cal = (window as any).Cal;
      Cal("init", "30-min-meeting", { origin: "https://app.cal.com" });
      Cal.ns["30-min-meeting"]("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <Confetti />
      <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-white/95 backdrop-blur-xl transition-opacity animate-fade-in" 
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl shadow-primary/10 overflow-hidden animate-fade-in-up transform transition-all flex flex-col items-center text-center p-10 md:p-14">
          
          {/* Checkmark Icon */}
          <div className="mb-10 relative">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
            <div className="relative w-24 h-24 rounded-full border-[3px] border-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Check size={48} className="text-primary stroke-[3px]" />
            </div>
          </div>

          {/* Headline Section */}
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 tracking-tighter uppercase leading-none mb-4 italic">
              PHASE 1 COMPLETE
            </h2>
            <div className="flex items-center justify-center gap-3 text-primary font-mono text-[11px] font-bold uppercase tracking-[0.4em]">
              <Calendar size={14} />
              <span>INITIATING DISCOVERY SYNC</span>
            </div>
          </div>

          {/* Copy Section */}
          <div className="mb-12 space-y-6">
            <p className="text-blue-800 text-lg leading-relaxed font-medium">
              Intelligence received and encrypted.
            </p>
            <p className="text-blue-800 text-lg leading-relaxed font-medium">
              To finalize the protocol, you must <br />
              <span className="text-primary font-bold">synchronize a time slot</span> for your secure discovery call briefing.
            </p>
          </div>

          {/* Primary Action Button (Cal.com Trigger) */}
          <button 
            data-cal-link="ali-ahmed-lwiikf/30-min-meeting"
            data-cal-namespace="30-min-meeting"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="w-full max-w-sm flex items-center justify-center gap-4 px-8 py-6 bg-primary text-white font-mono text-sm font-black uppercase tracking-[0.3em] transition-all duration-300 group hover:bg-primary/90 rounded-2xl shadow-xl shadow-primary/20"
          >
            SECURE DISCOVERY CALL <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary Link */}
          <button 
            onClick={onClose} 
            className="mt-10 text-[10px] text-blue-400 hover:text-blue-600 font-mono uppercase tracking-[0.4em] transition-colors font-bold"
          >
            RETURN TO BASE (SKIP)
          </button>
        </div>
      </div>
    </>
  );
};

export default ThankYouModal;