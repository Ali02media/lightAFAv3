
import React, { useState, useMemo } from 'react';
import { TrendingDown, ShieldAlert, AlertTriangle } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

interface RevenueLeakCalculatorProps {
  onDeploy?: (gap: number) => void;
}

const RevenueLeakCalculator: React.FC<RevenueLeakCalculatorProps> = ({ onDeploy }) => {
  const [traffic, setTraffic] = useState<number>(2500);
  const [convRate, setConvRate] = useState<number>(1.2);
  const [clientValue, setClientValue] = useState<number>(3000);
  const [closeRate, setCloseRate] = useState<number>(20);

  const results = useMemo(() => {
    const currentRevenue = traffic * (convRate / 100) * (closeRate / 100) * clientValue;
    const targetConv = 8; 
    const targetClose = 30;
    const targetRevenue = traffic * (targetConv / 100) * (targetClose / 100) * clientValue;
    const monthlyLeak = Math.max(0, targetRevenue - currentRevenue);
    const annualLeak = monthlyLeak * 12;
    return { monthlyLeak, annualLeak };
  }, [traffic, convRate, clientValue, closeRate]);

  return (
    <div className="w-full">
      <div className="text-center mb-12 md:mb-20">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-500 text-[10px] md:text-[11px] font-bold tracking-widest uppercase mb-6">
          <AlertTriangle size={14} /> Revenue Check
        </div>
        <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight px-4 italic">Calculate Your Profit Leak.</h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium text-base md:text-lg px-6">Input your current metrics to see how much revenue is slipping through your website.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        <div className="bg-slate-50 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-slate-100 space-y-8 md:space-y-12">
          <div className="space-y-8 md:space-y-10">
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Visitors</label>
                <span className="text-slate-900 font-black text-2xl md:text-3xl">{traffic.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="100" max="20000" step="100" value={traffic}
                onChange={(e) => setTraffic(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Website Conv. Rate (%)</label>
                <span className="text-slate-900 font-black text-2xl md:text-3xl">{convRate}%</span>
              </div>
              <input 
                type="range" min="0.1" max="10" step="0.1" value={convRate}
                onChange={(e) => setConvRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Client Value (£)</label>
                <span className="text-slate-900 font-black text-2xl md:text-3xl">£{clientValue.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="100" max="20000" step="100" value={clientValue}
                onChange={(e) => setClientValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:gap-10">
          <div className="bg-white p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border-2 border-red-50 text-center premium-shadow">
            <TrendingDown size={40} className="text-red-500 mx-auto mb-6 md:mb-8" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Monthly Leak</p>
            <h3 className="text-4xl md:text-6xl font-black text-red-500 tracking-tighter">£{Math.round(results.monthlyLeak).toLocaleString()}</h3>
          </div>

          <div className="bg-slate-900 p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] text-center text-white premium-shadow">
            <ShieldAlert size={40} className="text-primary mx-auto mb-6 md:mb-8" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Yearly Gap</p>
            <h3 className="text-4xl md:text-6xl font-black text-white mb-8 md:mb-10 tracking-tighter">£{Math.round(results.annualLeak).toLocaleString()}</h3>
            <button 
              onClick={() => onDeploy && onDeploy(Math.round(results.annualLeak))}
              className="relative w-full bg-primary text-white py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 overflow-hidden group"
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <span className="relative z-10">STOP THE LEAK</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueLeakCalculator;
