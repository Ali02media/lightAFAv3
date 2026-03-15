import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ShaderAnimation } from './shader-animation';

const DigitalSerenity = ({ navigateTo }: { navigateTo: (p: any) => void }) => {
  const mouseGradientRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const floatingElementsRef = useRef<Element[]>([]);

  useEffect(() => {
    const animateWords = () => {
      const wordElements = document.querySelectorAll('.word-animate');
      wordElements.forEach(word => {
        const delay = parseInt(word.getAttribute('data-delay') || '0');
        setTimeout(() => {
          if (word) (word as HTMLElement).style.animation = 'word-appear 1s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        }, delay);
      });
    };
    const timeoutId = setTimeout(animateWords, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseGradientRef.current) {
        mouseGradientRef.current.style.left = `${e.clientX}px`;
        mouseGradientRef.current.style.top = `${e.clientY}px`;
        mouseGradientRef.current.style.opacity = '1';
      }
    };
    const handleMouseLeave = () => {
      if (mouseGradientRef.current) {
        mouseGradientRef.current.style.opacity = '0';
      }
    };
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.floating-element-animate');
    floatingElementsRef.current = Array.from(elements);
    const handleScroll = () => {
      if (!scrolled) {
        setScrolled(true);
        floatingElementsRef.current.forEach((el, index) => {
          setTimeout(() => {
            if (el) {
              (el as HTMLElement).style.animationPlayState = 'running';
              (el as HTMLElement).style.opacity = '1'; 
            }
          }, (parseFloat((el as HTMLElement).style.animationDelay || "0") * 1000) + index * 100);
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const pageStyles = `
    #mouse-gradient-react {
      position: fixed;
      pointer-events: none;
      border-radius: 9999px;
      background-image: radial-gradient(circle, rgba(0, 102, 255, 0.15), rgba(255, 255, 255, 0) 60%);
      transform: translate(-50%, -50%);
      will-change: left, top, opacity;
      transition: left 100ms ease-out, top 100ms ease-out, opacity 500ms ease-out;
      z-index: 0;
      mix-blend-mode: multiply;
    }
    @keyframes word-appear { 
      0% { opacity: 0; transform: translateY(20px); filter: blur(8px); } 
      100% { opacity: 1; transform: translateY(0); filter: blur(0); } 
    }
    .word-animate { 
      display: inline-block; 
      opacity: 0; 
      margin: 0 0.1em; 
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); 
    }
    .word-animate:hover { 
      transform: translateY(-2px); 
    }
    .floating-element-animate { 
      opacity: 0; 
      animation: float 6s ease-in-out infinite; 
      animation-play-state: paused; 
    }
    @keyframes float { 
      0%, 100% { transform: translateY(0); } 
      50% { transform: translateY(-15px); } 
    }
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <div className="relative w-full bg-transparent text-slate-900 font-sans overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24 min-h-[80vh] flex items-center">
        
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <ShaderAnimation />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-center items-center px-6 md:px-12 max-w-[1000px] mx-auto text-center w-full">
          
          <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-extrabold text-slate-900 mb-6 md:mb-10 leading-[1.1] tracking-tight inline-block italic">
            <div className="mb-2 md:mb-4">
              <span className="word-animate font-sans" data-delay="0">We</span>
              <span className="word-animate font-sans" data-delay="150">Build</span>
              <span className="word-animate font-sans" data-delay="300">Websites</span>
            </div>
            <div>
              <span className="word-animate font-sans text-slate-900" data-delay="450">That</span>
              <span className="word-animate font-sans text-primary" data-delay="600">Book.</span>
            </div>
          </h1>
          
          <p className="text-base md:text-2xl text-slate-600 mb-10 md:mb-14 max-w-2xl mx-auto leading-relaxed font-medium px-4">
            <span className="word-animate" data-delay="800">Stop</span>
            <span className="word-animate" data-delay="850">wasting</span>
            <span className="word-animate" data-delay="900">hours</span>
            <span className="word-animate" data-delay="950">on</span>
            <span className="word-animate" data-delay="1000">the</span>
            <span className="word-animate" data-delay="1050">phone.</span>
            <span className="word-animate" data-delay="1100">We</span>
            <span className="word-animate" data-delay="1150">build</span>
            <span className="word-animate" data-delay="1200">high-performance</span>
            <span className="word-animate" data-delay="1250">websites</span>
            <span className="word-animate" data-delay="1300">with</span>
            <span className="word-animate" data-delay="1350">AI</span>
            <span className="word-animate" data-delay="1400">Assistants</span>
            <span className="word-animate" data-delay="1450">that</span>
            <span className="word-animate" data-delay="1500">handle</span>
            <span className="word-animate" data-delay="1550">your</span>
            <span className="word-animate" data-delay="1600">leads</span>
            <span className="word-animate" data-delay="1650">24/7.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-stretch sm:items-center px-4 opacity-0" style={{ animation: 'word-appear 1s cubic-bezier(0.16, 1, 0.3, 1) forwards', animationDelay: '1.8s' }}>
            <button 
              onClick={() => navigateTo('contact')} 
              className="relative overflow-hidden bg-primary text-white px-8 md:px-12 py-5 md:py-6 rounded-full font-bold text-sm md:text-base hover:bg-primary/90 transition-all shadow-[0_10px_30px_-10px_rgba(59,130,246,0.5)] flex items-center justify-center gap-3 group"
            >
              <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest">
                Book Discovery Call <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] z-0"></div>
            </button>
            <button 
              onClick={() => navigateTo('why-us')} 
              className="bg-white border border-slate-200 text-slate-700 px-8 md:px-12 py-5 md:py-6 rounded-full font-bold text-sm md:text-base hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg transition-all flex items-center justify-center uppercase tracking-widest"
            >
              See The Advantage
            </button>
          </div>

        </div>

        {/* Responsive Mouse Gradient Size & Blur */}
        <div 
          ref={mouseGradientRef}
          id="mouse-gradient-react"
          className="w-60 h-60 blur-2xl sm:w-80 sm:h-80 sm:blur-3xl md:w-[30rem] md:h-[30rem] md:blur-[100px] opacity-0"
        ></div>

      </div>
    </>
  );
};

export default DigitalSerenity;
