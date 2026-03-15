
import React from 'react';
import { X, CheckCircle2, Zap, Mail, Layers, Bot, Sparkles, ShieldCheck, MessageSquare, Calendar, UserPlus, Headset } from 'lucide-react';
import { SERVICES } from '../constants';
import { GlowingEffect } from './ui/glowing-effect';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, serviceId }) => {
  if (!isOpen || !serviceId) return null;

  const service = SERVICES.find(s => s.id === serviceId);

  const renderContent = () => {
    switch (serviceId) {
      // Fixed: changed 'core' to 'ai-website' to match constants.ts definition
      case 'ai-website':
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-primary">
              <Zap size={32} />
              <h3 className="text-2xl font-black leading-tight">The AI Website</h3>
            </div>

            <div className="bg-primary/5 border border-primary/10 p-6 rounded-2xl flex items-center gap-4">
              <ShieldCheck className="text-primary shrink-0" size={28} />
              <p className="text-sm text-slate-600 font-bold">{service?.guarantee}</p>
            </div>
            
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                 <Sparkles className="text-primary" size={20} />
                 <h4 className="text-lg font-bold">FREE ADS MANAGEMENT</h4>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                We manage your ads for <span className="text-primary font-bold">£0/month</span>. You only pay for the ads themselves. This is the fastest way to get new customers.
              </p>
            </div>

            <ul className="grid sm:grid-cols-2 gap-4">
               {['Custom Design', 'AI Chatbot', 'Booking System', 'Phone Friendly'].map(f => (
                 <li key={f} className="text-sm text-slate-600 flex items-center gap-3 font-medium">
                   <CheckCircle2 size={18} className="text-primary" /> {f}
                 </li>
               ))}
            </ul>

            <div className="pt-6 border-t border-slate-100">
              <div className="flex justify-between items-center mb-8">
                 <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Setup Fee</div>
                    <div className="text-3xl font-black text-slate-900">£800</div>
                 </div>
                 <div className="text-right">
                    <div className="text-xs font-bold text-primary uppercase tracking-widest">Monthly</div>
                    <div className="text-xl font-bold text-slate-900">£170/mo</div>
                 </div>
              </div>
              <button 
                onClick={() => { onClose(); const el = document.getElementById('contact'); el?.scrollIntoView({ behavior: 'smooth' }); }} 
                className="relative w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 overflow-hidden group"
              >
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                <span className="relative z-10">Book Free Call</span>
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-black">{service?.title}</h3>
            <p className="text-slate-500 leading-relaxed text-lg">{service?.description}</p>
            
            <ul className="space-y-4">
              {service?.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                  <CheckCircle2 size={20} className="text-primary" /> {f}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => { onClose(); const el = document.getElementById('contact'); el?.scrollIntoView({ behavior: 'smooth' }); }} 
              className="relative w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg overflow-hidden group hover:bg-primary/90 transition-all"
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <span className="relative z-10">Get Started</span>
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
        <div className="absolute top-4 right-4 z-30">
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 transition-colors p-2 bg-slate-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 md:p-12 overflow-y-auto pt-16">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
