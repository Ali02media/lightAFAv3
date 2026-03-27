
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, Mail, ArrowRight, CheckCircle2, 
  ChevronRight, ChevronLeft, Zap, Target, Users, Search, Award,
  BarChart3, Globe, ShieldCheck, Star, Sparkles,
  HelpCircle, ExternalLink, Quote, MessageSquare, 
  ClipboardCheck, Cpu, BarChart, Eye, Workflow, Calendar,
  Brain, Clock, Rocket, Flame, Thermometer,
  Layers, MousePointerClick, Settings, Hash, TrendingDown, ChevronDown
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import Lenis from '@studio-freight/lenis';
import Logo from './components/Logo';
import RevenueLeakCalculator from './components/RevenueLeakCalculator';
import ScrollReveal from './components/ScrollReveal';
import CustomCursor from './components/CustomCursor';
import ThankYouModal from './components/ThankYouModal';
import LoadingSpinner from './components/LoadingSpinner';
import { 
  TESTIMONIALS, PROBLEM_CARDS, 
  CONTACT_PHONE, CONTACT_EMAIL,
  FAQS, HOW_IT_WORKS
} from './constants';
import { GlowingEffect } from './components/ui/glowing-effect';
import { cn } from './lib/utils';
import DigitalSerenity from './components/ui/digital-serenity-animated-landing-page';

type PageState = 'home' | 'why-us' | 'about' | 'pricing' | 'contact';

// --- Reusable Final CTA Component ---
const FinalCTA = ({ navigateTo }: { navigateTo: (p: PageState) => void }) => (
  <section className="py-24 md:py-40 px-6 text-center bg-white/10 backdrop-blur-xl border-t border-white/30">
    <ScrollReveal>
      <h2 className="text-3xl md:text-7xl font-black text-slate-900 mb-8 italic tracking-tighter">Ready to secure your growth?</h2>
      <button 
        onClick={() => navigateTo('contact')} 
        className="bg-primary text-white px-12 py-6 rounded-2xl font-black text-lg md:text-xl hover:bg-slate-900 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-4 mx-auto group"
      >
        BOOK A FREE DISCOVERY CALL NOW <ArrowRight className="group-hover:translate-x-2 transition-transform" />
      </button>
      <p className="mt-6 text-slate-400 font-mono text-[10px] uppercase tracking-[0.3em]">Only a few founders spots left</p>
    </ScrollReveal>
  </section>
);

// --- Sub-components ---

const Navbar = ({ 
  scrolled, 
  currentPage, 
  navigateTo, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}: { 
  scrolled: boolean; 
  currentPage: PageState; 
  navigateTo: (p: PageState) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (o: boolean) => void;
}) => (
  <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-2 md:py-3 shadow-sm' : 'bg-transparent py-4 md:py-8'}`}>
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center h-12 md:h-14">
      <button onClick={() => navigateTo('home')} className="hover:opacity-80 transition-opacity flex items-center h-full py-1">
        <Logo className="h-8 md:h-12 w-auto" />
      </button>
      
      <div className="hidden lg:flex gap-12 items-center text-xs font-black uppercase tracking-[0.2em] text-slate-400">
        <button onClick={() => navigateTo('home')} className={`hover:text-primary transition-colors ${currentPage === 'home' ? 'text-primary' : ''}`}>Home</button>
        <button onClick={() => navigateTo('about')} className={`hover:text-primary transition-colors ${currentPage === 'about' ? 'text-primary' : ''}`}>About & Our Work</button>
        <button onClick={() => navigateTo('why-us')} className={`hover:text-primary transition-colors ${currentPage === 'why-us' ? 'text-primary' : ''}`}>Why Us</button>
        <button onClick={() => navigateTo('pricing')} className={`hover:text-primary transition-colors ${currentPage === 'pricing' ? 'text-primary' : ''}`}>Pricing</button>
        <button 
          onClick={() => navigateTo('contact')} 
          className="bg-primary text-white px-10 py-3 rounded-full hover:bg-primary/90 transition-all font-black text-[10px] shadow-lg shadow-primary/20"
        >
          BOOK DISCOVERY CALL
        </button>
      </div>

      <button className="lg:hidden text-slate-900 p-2 -mr-2 flex items-center justify-center h-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>
    </div>
  </nav>
);

const FEATURE_ITEMS = [
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "High-Converting Web Design",
    description: "Lightning-fast, mobile-optimized websites built on psychological principles to turn visitors into buyers.",
    className: "col-span-1",
  },
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "AI Chatbots & Assistants",
    description: "Custom-trained AI that knows your business inside out, answering FAQs and capturing lead details 24/7.",
    className: "col-span-1",
  },
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: "Automated Booking Systems",
    description: "Seamless calendar integration that qualifies leads and books them directly without human intervention.",
    className: "md:col-span-2 xl:col-span-1 xl:row-span-2",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Lightning Fast Performance",
    description: "Optimized for speed to ensure you never lose a customer to a slow loading page.",
    className: "col-span-1",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Enterprise-Grade Security",
    description: "Your data and your customers' data is protected by industry-leading security protocols.",
    className: "col-span-1 xl:col-span-1",
  },
];

const FeatureCard = React.memo(({ icon, title, description, className, progress, index }: any) => {
  // Make the cards pop up snappily one by one, spread across the scroll
  const start = index * 0.15; 
  const end = start + 0.2;   
  
  const rawOpacity = useTransform(progress, [start, end], [0, 1]);
  const rawY = useTransform(progress, [start, end], [100, 0]); 
  const rawScale = useTransform(progress, [start, end], [0.8, 1]); 

  const opacity = useSpring(rawOpacity, { stiffness: 300, damping: 25, restDelta: 0.001 });
  const y = useSpring(rawY, { stiffness: 300, damping: 25, restDelta: 0.001 });
  const scale = useSpring(rawScale, { stiffness: 300, damping: 25, restDelta: 0.001 });

  // Only enable glowing effect when the card is mostly visible to save performance during scroll
  const [isGlowEnabled, setIsGlowEnabled] = useState(false);
  
  React.useEffect(() => {
    return rawOpacity.on("change", (latest) => {
      if (latest > 0.8 && !isGlowEnabled) setIsGlowEnabled(true);
      if (latest <= 0.8 && isGlowEnabled) setIsGlowEnabled(false);
    });
  }, [rawOpacity, isGlowEnabled]);

  return (
    <motion.li 
      style={{ opacity, y, scale }}
      className={cn("min-h-[10rem] list-none will-change-transform", className)}
    >
      <div className="relative h-full rounded-[1.5rem] border-[0.75px] border-slate-200 p-2 md:rounded-[2rem] md:p-3 bg-white/5 backdrop-blur-sm">
        <GlowingEffect
          spread={60}
          glow={true}
          disabled={!isGlowEnabled}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-3 md:gap-4 overflow-hidden rounded-2xl border-[0.75px] bg-white/80 backdrop-blur-md p-5 md:p-6 shadow-xl">
          <div className="relative flex flex-1 flex-col justify-between gap-3 md:gap-4">
            <div className="w-fit rounded-xl border-[0.75px] border-slate-200 bg-slate-50 p-2 md:p-3 shadow-inner">
              {icon}
            </div>
            <div className="space-y-2 md:space-y-4">
              <h3 className="text-xl leading-tight font-black font-sans tracking-tight md:text-2xl text-slate-900 italic">
                {title}
              </h3>
              <p className="font-sans text-sm leading-relaxed md:text-base text-slate-500 font-medium">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
});

const ScrollFeatures = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] 
  });

  return (
    <section ref={containerRef} className="relative md:h-[250vh] bg-slate-50 z-20">
      <div className="md:sticky md:top-0 md:h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-24 pb-12 md:py-12">
        <div className="max-w-[1200px] w-full">
          <div className="text-center mb-8 md:mb-12">
             <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight italic mb-4">Everything you need to scale.</h2>
             <p className="text-slate-500 font-medium text-base md:text-lg max-w-2xl mx-auto">We don't just build websites. We build complete digital assets engineered to generate revenue.</p>
          </div>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 list-none p-0 m-0">
            {FEATURE_ITEMS.map((item, i) => (
              <FeatureCard key={i} {...item} progress={scrollYProgress} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const StickyEmailCopy = ({ sideContent }: { sideContent?: React.ReactNode }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const updateScrollRange = () => {
      if (contentRef.current && wrapperRef.current) {
        const range = contentRef.current.scrollHeight - wrapperRef.current.clientHeight;
        setScrollRange(Math.max(0, range));
      }
    };
    
    // Small delay to ensure fonts/layout are loaded
    setTimeout(updateScrollRange, 100);
    window.addEventListener('resize', updateScrollRange);
    return () => window.removeEventListener('resize', updateScrollRange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section className="relative">
      <div ref={containerRef} className="relative bg-transparent" style={{ height: `calc(100vh + ${scrollRange}px)` }}>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden">
          <div className="max-w-[1200px] w-full mx-auto">
            <ScrollReveal>
              <div className="text-center mb-8 md:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-4">
                  <Mail size={14} /> Copywriting Sample
                </div>
                <h2 className="text-3xl md:text-6xl font-black italic mb-6">Persuasion at Scale.</h2>
                <p className="text-slate-500 font-medium max-w-2xl mx-auto italic text-lg">
                  We don't just write emails; we engineer psychological triggers that drive action. 
                  Below is the <span className="text-slate-900 font-bold underline decoration-primary underline-offset-4">complete campaign script</span> for WarmShield.
                </p>
              </div>
            </ScrollReveal>

            <div className={`grid grid-cols-1 ${sideContent ? 'lg:grid-cols-2 max-w-5xl' : 'max-w-3xl'} gap-12 items-start mx-auto w-full`}>
              <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-[60vh] md:h-[75vh] w-full">
                <div className="bg-slate-100 p-4 border-b border-slate-200 flex items-center gap-2 shrink-0 z-20 relative">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="ml-4 bg-white px-4 py-1 rounded-full text-[10px] font-bold text-slate-400 border border-slate-200 w-full max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                    Subject: This could save your winter...
                  </div>
                </div>
                <div className="relative flex-1 overflow-hidden" ref={wrapperRef}>
                  <motion.div 
                    ref={contentRef}
                    style={{ y }}
                    className="p-8 md:p-12 font-serif text-slate-800 space-y-6 absolute w-full"
                  >
                    <h4 className="text-2xl font-black font-sans text-slate-900">This could save your winter.</h4>
                    <p>Think back to the last time your boiler failed you.</p>
                    <p>It never happens on a calm afternoon. It happens in the cold — exactly when you need heat the most.</p>
                    <p>The house cooled down. You tapped the thermostat, hoping it would suddenly kick back in. You called every engineer you could.</p>
                    <p className="italic bg-slate-50 p-4 border-l-4 border-slate-200">“We’re booked for days.”</p>
                    <p>So you waited. You layered up. You tried to stay patient while the cold drifted through each room like it planned on staying.</p>
                    <p>And all the while, one question kept pressing on you:</p>
                    <p className="font-bold">“How much is this going to cost me?”</p>
                    <div className="py-8 space-y-4 font-sans border-y border-slate-100">
                      <p className="font-bold text-slate-900">Here’s the reality:</p>
                      <ul className="space-y-3">
                        <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> <span className="text-sm">Winter repairs cost more.</span></li>
                        <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> <span className="text-sm">Breakdowns hit when engineers are overloaded.</span></li>
                        <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> <span className="text-sm">Homeowners get stuck paying more than they should.</span></li>
                      </ul>
                    </div>
                    <p className="font-sans">We watched this happen every single winter — so we built something that stops the stress before it starts.</p>
                    <p className="text-2xl font-black text-slate-900 font-sans tracking-tight">WarmShield.</p>
                    <div className="space-y-2 font-sans text-sm">
                      <p>WarmShield is more than cover.</p>
                      <p>It’s protection. It’s stability.</p>
                      <p>It’s peace of mind during the months when heating matters most.</p>
                    </div>
                    <p className="font-sans font-bold py-4 border-l-4 border-primary pl-6 bg-primary/5 rounded-r-xl">
                      Because cold mornings, cold showers, and cold rooms don’t just inconvenience you — they take control of your whole routine.
                    </p>
                    <p className="font-sans">WarmShield gives that control back.</p>
                    <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 font-sans space-y-4">
                      <p className="font-bold text-slate-900 uppercase text-xs tracking-widest">Here’s what WarmShield puts on your side:</p>
                      <ul className="grid grid-cols-1 gap-2 text-xs font-medium text-slate-600">
                        <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0" /> Rapid response when your heating fails</li>
                        <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0" /> Parts and labour fully covered</li>
                        <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0" /> Annual boiler service included</li>
                        <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0" /> Up to £300 off a new boiler</li>
                      </ul>
                    </div>
                    <p className="font-sans font-black text-lg text-slate-900">All for £15 a month for your entire first year.</p>
                    <p className="font-sans text-sm">That’s everything in Essential and Plus — and more — for the cost of a takeaway.</p>
                    <div className="bg-primary p-8 rounded-2xl text-white font-sans text-center shadow-xl shadow-primary/20">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">Secure Protection Now</p>
                      <button className="bg-white text-primary px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 mx-auto">
                         Activate WarmShield <ArrowRight size={16} />
                      </button>
                      <p className="text-[10px] mt-4 opacity-80">www.kccteam.co.uk/warmshield</p>
                    </div>
                    <div className="space-y-4 pt-8 text-sm font-sans">
                      <p className="font-bold italic">Stay warm. You deserve a winter that feels effortless.</p>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">KCC Team</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {sideContent && (
                <div className="hidden lg:block h-[50vh] md:h-[60vh] overflow-y-auto scrollbar-none pr-4">
                  {sideContent}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Side Content - rendered below the sticky section */}
      {sideContent && (
        <div className="block lg:hidden px-6 pb-20 max-w-3xl mx-auto">
          {sideContent}
        </div>
      )}
    </section>
  );
};

const Home = ({ navigateTo, onLeakCalculated }: { navigateTo: (p: PageState) => void, onLeakCalculated: (gap: number) => void }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
  <div className="animate-fade-in bg-transparent">
    {/* 1. Header & Hero Section */}
    <DigitalSerenity navigateTo={navigateTo} />

    {/* 2. Pain Section (Z-Pattern) */}
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white/10 backdrop-blur-xl text-slate-900 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-20 md:mb-32">
          <ScrollReveal>
            <h2 className="text-3xl md:text-6xl font-black italic mb-6 leading-tight">
              The silent killer of service businesses.
            </h2>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              You're excellent at what you do, but your digital presence is actively turning customers away.
            </p>
          </ScrollReveal>
        </div>

        {/* Z-Pattern 1: What they see */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center mb-24 md:mb-32">
          <ScrollReveal className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest mb-6">
              <Eye size={14} /> What Your Customers See
            </div>
            <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Missed calls and slow replies.</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              When a potential client reaches out, they expect an immediate response. If you're on a job, in a meeting, or asleep, they don't wait. They move to the next name on Google.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-700 font-medium"><X className="text-red-500" size={20}/> Voicemails that never get returned</li>
              <li className="flex items-center gap-3 text-slate-700 font-medium"><X className="text-red-500" size={20}/> Contact forms disappearing into the void</li>
              <li className="flex items-center gap-3 text-slate-700 font-medium"><X className="text-red-500" size={20}/> Outdated websites that break trust</li>
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={200} className="order-1 md:order-2">
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors"></div>
              <Phone className="w-24 h-24 text-slate-300 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
              <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-slate-100 text-center shadow-sm">
                <p className="text-red-500 font-bold text-sm">Missed Call from 07700 900077</p>
                <p className="text-slate-500 text-xs mt-1">2 minutes ago</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Z-Pattern 2: How it affects them */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center mb-24 md:mb-32">
          <ScrollReveal delay={200} className="order-1">
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-orange-500/10 transition-colors"></div>
              <TrendingDown className="w-24 h-24 text-slate-300 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
              <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-slate-100 text-center shadow-sm">
                <p className="text-orange-500 font-bold text-sm">- £2,450 Lost Revenue</p>
                <p className="text-slate-500 text-xs mt-1">Competitor booked the job</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal className="order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-6">
              <TrendingDown size={14} /> The Hidden Cost
            </div>
            <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Bleeding revenue to competitors.</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Every missed call isn't just a missed conversation—it's thousands of pounds handed directly to your competitors. You're paying for marketing, but pouring leads into a leaky bucket.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-700 font-medium"><X className="text-orange-500" size={20}/> Wasted ad spend on unconverted traffic</li>
              <li className="flex items-center gap-3 text-slate-700 font-medium"><X className="text-orange-500" size={20}/> Lower lifetime value per customer</li>
              <li className="flex items-center gap-3 text-slate-700 font-medium"><X className="text-orange-500" size={20}/> Unpredictable cash flow</li>
            </ul>
          </ScrollReveal>
        </div>

        {/* Z-Pattern 3: What actions it causes */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <ScrollReveal className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">
              <Brain size={14} /> The Personal Toll
            </div>
            <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Working weekends. Losing sleep.</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              To compensate for the leaks, you work harder. You answer emails at 11 PM. You interrupt family dinners to take calls. You become the bottleneck in your own business, sacrificing your freedom just to keep the lights on.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-700 font-medium"><X className="text-blue-500" size={20}/> Constant anxiety about missing leads</li>
              <li className="flex items-center gap-3 text-slate-700 font-medium"><X className="text-blue-500" size={20}/> Zero separation between work and life</li>
              <li className="flex items-center gap-3 text-slate-700 font-medium"><X className="text-blue-500" size={20}/> Hitting a hard ceiling on growth</li>
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={200} className="order-1 md:order-2">
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
              <Brain className="w-24 h-24 text-slate-300 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
              <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-slate-100 text-center shadow-sm">
                <p className="text-blue-600 font-bold text-sm">Burnout Detected</p>
                <p className="text-slate-500 text-xs mt-1">System capacity at 100%</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* 3. Solution / Value */}
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white/20 backdrop-blur-lg relative z-10">
      <div className="max-w-[1000px] mx-auto text-center relative z-20">
        <ScrollReveal>
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-8">
            <Sparkles size={14} /> The Solution
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 italic tracking-tight">
            Stop working in your business. <br className="hidden md:block"/>
            <span className="text-primary">Start scaling it.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed mb-12">
            We build high-performance digital assets equipped with custom AI assistants. They capture traffic, qualify leads, and book appointments 24/7—so you don't have to.
          </p>
          <button 
            onClick={() => navigateTo('why-us')} 
            className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-primary transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 mx-auto"
          >
            See How It Works <ArrowRight size={18} />
          </button>
        </ScrollReveal>
      </div>
    </section>

    {/* 4. Features (What you get) */}
    <ScrollFeatures />

    {/* 5. Process */}
    <section className="mt-12 md:mt-24 py-24 md:py-32 px-6 md:px-12 bg-slate-50/90 backdrop-blur-xl border-t border-white/30 relative z-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
           <h2 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tight italic">Your Growth Plan.</h2>
           <p className="text-slate-500 mt-4 font-medium text-lg">Three simple steps to automate your bookings.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
          
          {[
            { step: "01", title: "Discovery Call", desc: "We analyze your current setup and identify exactly where you're losing revenue." },
            { step: "02", title: "Custom Build", desc: "We design your site and train your AI assistant specifically for your business." },
            { step: "03", title: "Launch & Grow", desc: "Go live in 14 days. Watch your calendar fill up while you focus on the work." }
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 100} className="relative z-10">
              <div className="bg-white/60 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border-2 border-slate-100 text-center hover:border-primary transition-colors h-full shadow-xl shadow-slate-200/20">
                <div className="w-20 h-20 bg-slate-900 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-8 shadow-xl">
                  {item.step}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* 6. Offer + Guarantee */}
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white/10 backdrop-blur-xl border-t border-white/30">
      <div className="max-w-[1000px] mx-auto">
        <ScrollReveal>
          <div className="bg-white/60 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 text-slate-900 text-center relative overflow-hidden border border-white shadow-2xl shadow-blue-900/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md text-primary border border-blue-100 text-[10px] font-black uppercase tracking-widest mb-8 shadow-sm">
                <Award size={14} className="text-primary" /> Founder's Guarantee
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 italic text-slate-900">Zero Risk. Pure Upside.</h2>
              <p className="text-xl text-slate-600 font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
                We are so confident in our systems that we offer a bold guarantee: <span className="text-slate-900 font-bold underline decoration-primary underline-offset-4">If your system isn't live and ready to capture leads in 14 days, you don't pay for the setup.</span>
              </p>
              <button 
                onClick={() => navigateTo('pricing')} 
                className="bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 mx-auto"
              >
                View Founder's Pricing <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* 7. FAQs */}
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white/20 backdrop-blur-lg border-t border-white/30">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tight italic">Got Questions?</h2>
           <p className="text-slate-500 mt-4 font-medium text-lg">Everything you need to know about our service.</p>
        </div>
        
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 50}>
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 transition-all">
                <button 
                  className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-slate-900 hover:bg-slate-100 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="pr-8">{faq.question}</span>
                  <ChevronRight className={`shrink-0 transition-transform ${openFaq === i ? 'rotate-90 text-primary' : 'text-slate-400'}`} size={20} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-slate-500 font-medium leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* 8. Final CTA */}
    <FinalCTA navigateTo={navigateTo} />
  </div>
  );
};

const WhyUs = ({ navigateTo }: { navigateTo: (p: PageState) => void }) => {
  return (
    <div className="animate-fade-in pt-28 md:pt-44 pb-20 md:pb-32">
      <section className="px-6 text-center max-w-[1000px] mx-auto mb-16 md:mb-24">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
            <Zap size={14} /> The Time Advantage
          </div>
          <h1 className="text-4xl md:text-8xl font-black text-slate-900 mb-6 md:mb-8 tracking-tight italic">Seconds Matter.</h1>
          <p className="text-base md:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto italic">
            "The company that responds first wins 78% of the business. If you take 5 minutes to reply, your lead is already calling someone else."
          </p>
        </ScrollReveal>
      </section>

      <section className="px-6 py-12 md:py-24 max-w-[1200px] mx-auto bg-slate-900/80 backdrop-blur-2xl rounded-[3rem] md:rounded-[5rem] text-white mb-24 md:mb-40 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-3xl rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 relative z-10">
          <ScrollReveal className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-white/5 rounded-2xl text-primary">
                <Rocket size={32} />
              </div>
              <h2 className="text-2xl md:text-4xl font-black italic">Deploy Fast.</h2>
            </div>
            <p className="text-lg md:text-xl text-slate-400 font-medium mb-8 leading-relaxed">
              Standard agencies take 3 to 6 months to build a "brand." We build assets that work in <span className="text-white font-bold underline decoration-primary underline-offset-4">14 days</span>.
            </p>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Our Guarantee</div>
              <p className="text-sm font-bold">If your system isn't live in 14 days, you don't pay for the setup. Simple.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="p-8 md:p-12 border-t md:border-t-0 md:border-l border-white/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-white/5 rounded-2xl text-primary">
                <Clock size={32} />
              </div>
              <h2 className="text-2xl md:text-4xl font-black italic">Reply Instantly.</h2>
            </div>
            <p className="text-lg md:text-xl text-slate-400 font-medium mb-8 leading-relaxed">
              Your receptionist takes hours. Your email takes days. Our Smart AI Assistant replies in <span className="text-white font-bold underline decoration-primary underline-offset-4">8 seconds</span>.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                <span className="text-xs font-bold text-slate-400 uppercase">Human Response</span>
                <span className="text-sm font-black text-red-500">~8 Hours</span>
              </div>
              <div className="flex justify-between items-center bg-primary/10 p-4 rounded-xl border border-primary/20">
                <span className="text-xs font-bold text-primary uppercase">AFA Smart System</span>
                <span className="text-sm font-black text-white">~8 Seconds</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 py-20 max-w-[1200px] mx-auto mb-20">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-6xl font-black italic mb-4">How We Execute.</h2>
           <p className="text-slate-500 font-medium">Clear, efficient, and results-focused steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {HOW_IT_WORKS.map((step, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="p-8 bg-white/10 backdrop-blur-md border border-white/50 rounded-[2.5rem] h-full hover:bg-white/30 hover:border-primary/20 transition-all">
                  <div className="text-5xl font-black text-slate-200 italic mb-6">0{i+1}</div>
                  <h3 className="text-xl font-black mb-2">{step.step}</h3>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 block">{step.duration}</span>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed italic">{step.detail}</p>
               </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <StickyEmailCopy 
        sideContent={
          <div className="space-y-12 py-8">
            <div>
              <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                <Flame className="text-orange-500" /> 1. Pain Amplification
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed italic">
                We initiate the message by placing the reader back into a moment of crisis—the cold house and the booked-up engineers. By describing the sensory details like "layered up" and "cold drifting through rooms," we make the prospect feel the problem before offering the solution.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                <ShieldCheck className="text-primary" /> 2. Transition to Authority
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed italic">
                We pivot from the stress of a breakdown to the "Stability" of WarmShield. Notice we don't lead with "Boiler Insurance"—we lead with "Stability" and "Control." This reframes a dull service into a high-value personal asset.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                <MousePointerClick className="text-blue-500" /> 3. High-Contrast Offer
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed italic">
                The pricing is anchored against a "takeaway." By comparing a critical business service to a common low-cost expense, the value becomes undeniable. The final CTA is focused on "Activation," not "Buying," making the barrier to entry feel effortless.
              </p>
            </div>
            <div className="p-8 bg-slate-900 rounded-[2rem] text-white">
               <div className="flex items-center gap-4 mb-4">
                 <Layers className="text-primary" size={24} />
                 <h4 className="text-lg font-bold">The AFA Standard</h4>
               </div>
               <p className="text-sm text-slate-400 leading-relaxed italic">
                 This script follows our standard persuasive framework: Agitate the problem, introduce the mechanism, then present the irresistible offer. We apply this level of psychological detail to every word on your new website.
               </p>
            </div>
          </div>
        }
      />

      <section className="py-20 md:py-32 px-6 md:px-12 bg-white/20 backdrop-blur-lg">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tight italic">Trust Built on Results.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {TESTIMONIALS.map((testimonial, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="relative p-8 md:p-14 bg-white/40 backdrop-blur-md border border-white/50 rounded-[2.5rem] md:rounded-[3rem] premium-shadow group hover:bg-white/60 hover:border-primary/20 transition-all duration-500 h-full">
                  <Quote className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors" size={40} />
                  <p className="text-base md:text-2xl font-medium text-slate-700 leading-relaxed italic mb-8 relative z-10">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      {testimonial.logo && (
                        <img 
                          src={testimonial.logo} 
                          alt={`${testimonial.company} logo`} 
                          className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-contain bg-white border border-slate-100 shadow-sm"
                        />
                      )}
                      <div>
                        <h4 className="text-base md:text-lg font-black text-slate-900">{testimonial.author}</h4>
                        <p className="text-[10px] md:text-sm font-bold text-primary uppercase tracking-widest">{testimonial.company}</p>
                      </div>
                    </div>
                    <a 
                      href={testimonial.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors"
                    >
                      Visit Website <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA navigateTo={navigateTo} />
    </div>
  );
};

const AboutAndWork = ({ navigateTo }: { navigateTo: (p: PageState) => void }) => {
  return (
    <div className="animate-fade-in pt-28 md:pt-44 pb-20 md:pb-32 relative">
      {/* Background flowing elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[800px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute top-[1000px] right-0 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[2000px] left-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      {/* About Section */}
      <section className="px-6 max-w-[1200px] mx-auto mb-32 md:mb-48 relative">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
              <Users size={14} /> The AFA Media Difference
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 italic tracking-tighter">
              Stop chasing leads. <br className="hidden md:block" />
              <span className="text-primary">Start capturing them.</span>
            </h1>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <ScrollReveal>
            <p className="text-xl md:text-3xl text-slate-800 font-medium leading-tight mb-6">
              You have a website, but it's basically a digital business card. You're spending money on ads, but you're not seeing the ROI.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              When leads do come in, you're too busy working in your business to reply instantly. By the time you call them back, they've already booked your competitor.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10" />
              <Quote className="text-primary/20 w-16 h-16 mb-6" />
              <p className="text-xl text-slate-900 font-bold italic mb-6 relative z-10">
                We don't just build pretty websites. We build revenue-generating assets engineered to convert.
              </p>
              <p className="text-slate-600 font-medium relative z-10">
                We equip your business with AI assistants that capture traffic, qualify leads, and book appointments 24/7—so you can focus on what you do best.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Work Section (Z-Pattern) */}
      <section className="px-6 max-w-[1200px] mx-auto mb-32 md:mb-48">
        <div className="text-center mb-20 md:mb-32">
          <h2 className="text-4xl md:text-7xl font-black italic mb-6 tracking-tight">Our Work.</h2>
          <p className="text-slate-500 font-medium text-lg md:text-xl max-w-2xl mx-auto">
            High-performance assets engineered to convert traffic into booked appointments.
          </p>
        </div>

        <div className="space-y-32 md:space-y-48">
          {/* Item 1: Artificial Grass */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <ScrollReveal className="order-2 md:order-1">
               <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/50 group relative">
                 <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                 <img src="https://i.postimg.cc/T1Q8MpnG/Artificial-grass-hero-latest.png" alt="Artificial Grass Specialists" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
               </div>
            </ScrollReveal>
            <ScrollReveal delay={200} className="order-1 md:order-2">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6">
                 <Target size={14} /> High-Ticket Lead Gen
               </div>
               <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tight italic">Artificial Grass Specialists</h3>
               <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 font-medium">
                 A high-converting landing page designed to capture premium landscaping projects. We implemented a streamlined funnel that qualifies leads instantly, ensuring the sales team only speaks to ready-to-buy customers.
               </p>
            </ScrollReveal>
          </div>

          {/* Item 2: Legentax */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <ScrollReveal className="order-2 md:order-2">
               <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/50 group relative">
                 <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                 <img src="https://i.postimg.cc/Jzf2FbSB/Legentax-hero-latest-Copy.png" alt="Legentax" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
               </div>
            </ScrollReveal>
            <ScrollReveal delay={200} className="order-1 md:order-1">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">
                 <BarChart3 size={14} /> Professional Services
               </div>
               <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tight italic">Legentax</h3>
               <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 font-medium">
                 Accounting and tax services require absolute trust. We built a clean, authoritative presence that works flawlessly on mobile, positioning them as a high-performance firm.
               </p>
               <div className="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-slate-200 relative shadow-xl shadow-slate-200/50">
                 <Quote className="absolute top-6 right-6 text-slate-200" size={32} />
                 <p className="text-slate-700 italic font-medium relative z-10 mb-6 text-lg">"The site is great even on the phone. You've streamlined our presence in a way that actually feels like a high-performance business."</p>
                 <div className="flex items-center gap-4">
                   <img src="https://i.postimg.cc/J4c9hTgR/legentax-logo.png" className="w-10 h-10 rounded-lg bg-white border border-slate-200 p-0.5 object-contain" alt="Legentax Logo" />
                   <div>
                     <p className="text-sm font-black text-slate-900">Gökhan Aydoğdu</p>
                     <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Legentax</p>
                   </div>
                 </div>
               </div>
            </ScrollReveal>
          </div>

          {/* Item 3: On Point Painting */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <ScrollReveal className="order-2 md:order-1">
               <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/50 group relative">
                 <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                 <img src="https://i.postimg.cc/Gpv5n4Cd/On-point-painting-hero-latest.png" alt="On Point Painting" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
               </div>
            </ScrollReveal>
            <ScrollReveal delay={200} className="order-1 md:order-2">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-6">
                 <Sparkles size={14} /> Local Service Domination
               </div>
               <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tight italic">On Point Painting</h3>
               <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 font-medium">
                 A no-nonsense, straight-to-the-point asset for a premium painting service. We stripped away the fluff and focused entirely on showcasing their work and capturing inquiries effortlessly.
               </p>
               <div className="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-[2rem] border border-slate-200 relative shadow-xl shadow-slate-200/50">
                 <Quote className="absolute top-6 right-6 text-slate-200" size={32} />
                 <p className="text-slate-700 italic font-medium relative z-10 mb-6 text-lg">"It's straight to the point, no fuss. Clean and clear, it's much better than the old one. This isn't just a design; it's a professional asset."</p>
                 <div className="flex items-center gap-4">
                   <img src="https://i.ibb.co/6JThRLhG/favicon-128x128.png" className="w-10 h-10 rounded-lg bg-white border border-slate-200 p-0.5 object-contain" alt="On Point Painting Logo" />
                   <div>
                     <p className="text-sm font-black text-slate-900">Oya</p>
                     <p className="text-[10px] font-bold text-primary uppercase tracking-widest">On Point Painting</p>
                   </div>
                 </div>
               </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Warmshield Email Copy */}
      <StickyEmailCopy />

      <FinalCTA navigateTo={navigateTo} />
    </div>
  );
};

const Pricing = ({ navigateTo }: { navigateTo: (p: PageState) => void }) => (
  <div className="animate-fade-in pt-28 md:pt-44 pb-20 md:pb-32">
    <section className="px-6 text-center max-w-[1200px] mx-auto mb-12 md:mb-20">
      <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 md:mb-8 animate-pulse">
        <Award size={14} /> Founder's Edition: Only a few founders spots left
      </div>
      <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight italic">Simple Pricing.</h1>
      <p className="text-base md:text-xl text-slate-500 font-medium max-w-3xl mx-auto italic leading-relaxed">
        Heavily discounted "Founder's Rates" for our first UK clients in exchange for a video testimonial.
      </p>
    </section>

    {/* Main Plans */}
    <section className="px-6 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-20 md:mb-32">
      {[
        { 
          name: "Starter Plan", 
          price: "£450", 
          mo: "+ £95/mo", 
          desc: "A professional 3-page site with built-in AI booking.", 
          features: ["3 Page Business Build", "24/7 AI Booking Assistant", "14-Day Delivery"]
        },
        { 
          name: "Growth Plan", 
          price: "£795", 
          mo: "+ £145/mo", 
          desc: "The complete 5-page authority site with lead filtering.", 
          popular: true,
          features: ["5 Page Authority Site", "Advanced Lead Qualification", "SEO Setup", "FREE Ad Campaign Setup"]
        },
        { 
          name: "Elite Plan", 
          price: "£1,350", 
          mo: "+ £245/mo", 
          desc: "The full automated system for market leaders.", 
          features: ["8 Page Authority Site", "WhatsApp Integration", "Advanced AI Training", "VIP Direct Support"]
        }
      ].map(p => (
        <ScrollReveal key={p.name}>
          <div className={`relative bg-white/20 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] premium-shadow border-2 transition-all hover:scale-105 flex flex-col justify-between h-full ${p.popular ? 'border-primary' : 'border-transparent'}`}>
            {p.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-5 py-1.5 rounded-full text-[9px] md:text-[10px] font-black tracking-widest uppercase shadow-xl shadow-primary/30">
                RECOMMENDED
              </div>
            )}
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold mb-2 text-slate-900">{p.name}</h3>
              <div className="text-3xl md:text-4xl font-black text-slate-900 mb-1 tracking-tight">{p.price}</div>
              <div className="text-xs md:text-sm font-bold text-slate-400 mb-6 md:mb-8">{p.mo}</div>
              <p className="text-xs md:text-sm text-slate-500 mb-8 md:mb-10 font-medium leading-relaxed">{p.desc}</p>
              <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-[11px] md:text-xs font-bold text-slate-700">
                    <CheckCircle2 size={14} className="text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button onClick={() => navigateTo('contact')} className="w-full py-4 md:py-5 bg-slate-900 text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-base hover:bg-primary transition-all shadow-lg">Secure Rate</button>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </section>

    {/* Additional Offers Section */}
    <section className="px-6 max-w-[1200px] mx-auto mb-24 md:mb-40">
      <ScrollReveal>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 italic">Additional Offers.</h2>
          <p className="text-slate-500 font-medium italic">Surgical tools for existing digital infrastructure.</p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <ScrollReveal>
          <div className="bg-white/40 backdrop-blur-md p-8 md:p-14 rounded-[3rem] border border-white/50 premium-shadow h-full flex flex-col justify-between group hover:bg-white/60 hover:border-primary/20 transition-all">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-white/60 backdrop-blur-md rounded-2xl text-primary border border-slate-100 shadow-sm">
                  <Settings size={24} />
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 italic">Smart Chatbot Integration</h3>
              </div>
              <div className="mb-6">
                <div className="text-3xl font-black text-slate-900 mb-1">£390</div>
                <div className="text-sm font-bold text-slate-400">+ £80/mo retainer</div>
              </div>
              <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed italic">Already have a website? We'll integrate a custom-trained AI assistant to capture your leads 24/7 on your existing platform.</p>
              <ul className="space-y-3 mb-10">
                <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                  <CheckCircle2 size={16} className="text-primary" /> Integration on Existing Domain
                </li>
                <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                  <CheckCircle2 size={16} className="text-primary" /> 24/7 AI Lead Capture
                </li>
                <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                  <CheckCircle2 size={16} className="text-primary" /> WhatsApp Integration
                </li>
              </ul>
            </div>
            <button onClick={() => navigateTo('contact')} className="w-full py-5 bg-white/60 backdrop-blur-md border-2 border-slate-200 text-slate-900 rounded-2xl font-black hover:border-primary hover:text-primary transition-all">Secure Integration</button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="bg-white/40 backdrop-blur-md p-8 md:p-14 rounded-[3rem] border border-white/50 premium-shadow h-full flex flex-col justify-between group hover:bg-white/60 hover:border-primary/20 transition-all">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-white/60 backdrop-blur-md rounded-2xl text-orange-500 border border-slate-100 shadow-sm">
                  <Mail size={24} />
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 italic">Neural Email Campaign</h3>
              </div>
              <div className="mb-6">
                <div className="text-3xl font-black text-slate-900 mb-1 italic">Custom Quote</div>
                <div className="text-sm font-bold text-slate-400">1 to 4 email sequences</div>
              </div>
              <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed italic">Psychology-driven email campaigns designed to turn cold leads into hot bookings using our proprietary WarmShield copywriting framework.</p>
              <ul className="space-y-3 mb-10">
                <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                  <CheckCircle2 size={16} className="text-orange-500" /> Strategic Copywriting
                </li>
                <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                  <CheckCircle2 size={16} className="text-orange-500" /> Conversion Psychology Triggers
                </li>
                <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                  <CheckCircle2 size={16} className="text-orange-500" /> A/B Tested Frameworks
                </li>
              </ul>
            </div>
            <button onClick={() => navigateTo('contact')} className="w-full py-5 bg-white/60 backdrop-blur-md border-2 border-slate-200 text-slate-900 rounded-2xl font-black hover:border-orange-500 hover:text-orange-500 transition-all">Request Quote</button>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <FinalCTA navigateTo={navigateTo} />
  </div>
);

const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  name,
  theme = 'primary'
}: { 
  options: {value: string, label: string}[], 
  value: string, 
  onChange: (name: string, value: string) => void, 
  placeholder: string,
  name: string,
  theme?: 'primary' | 'orange'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  const baseClasses = theme === 'primary' 
    ? "bg-white border-2 border-slate-100 text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-200 hover:bg-slate-50"
    : "bg-orange-50/50 border-2 border-orange-100 text-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 hover:border-orange-200 hover:bg-orange-50";

  const iconClasses = theme === 'primary'
    ? "text-slate-400 group-hover:text-primary"
    : "text-orange-400 group-hover:text-orange-600";

  const menuClasses = theme === 'primary'
    ? "bg-white border-slate-100"
    : "bg-white border-orange-100";

  const optionHoverClasses = theme === 'primary'
    ? "hover:bg-slate-50 hover:text-primary"
    : "hover:bg-orange-50 hover:text-orange-600";

  const optionSelectedClasses = theme === 'primary'
    ? "bg-primary/5 text-primary font-bold"
    : "bg-orange-500/5 text-orange-600 font-bold";

  return (
    <div className="relative group" ref={dropdownRef}>
      <div 
        className={`w-full p-4 md:p-6 rounded-xl md:rounded-2xl outline-none transition-all duration-300 font-semibold cursor-pointer shadow-sm flex justify-between items-center ${baseClasses} ${isOpen ? (theme === 'primary' ? '!border-primary !ring-4 !ring-primary/10' : '!border-orange-500 !ring-4 !ring-orange-500/10') : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? "text-slate-900" : "text-slate-400"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${iconClasses}`} size={20} />
      </div>

      {isOpen && (
        <div className={`absolute z-50 w-full mt-2 rounded-xl md:rounded-2xl border-2 shadow-xl overflow-hidden animate-fade-in ${menuClasses}`}>
          <div className="max-h-[240px] overflow-y-auto py-2">
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-4 md:px-6 py-3 cursor-pointer transition-colors duration-200 ${value === option.value ? optionSelectedClasses : `text-slate-600 ${optionHoverClasses}`}`}
                onClick={() => {
                  onChange(name, option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Contact = ({ setShowThankYou, calculatedGap }: { setShowThankYou: (s: boolean) => void, calculatedGap?: number }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    industry: '',
    emailCount: '4', // Default for sequence
    challenge: '',
    calculatedGap: calculatedGap ? `£${calculatedGap.toLocaleString()}` : 'Not Calculated'
  });

  // Sync calculated gap if it changes externally
  useEffect(() => {
    if (calculatedGap) {
      setFormData(prev => ({ ...prev, calculatedGap: `£${calculatedGap.toLocaleString()}` }));
    }
  }, [calculatedGap]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCustomSelect = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // PROD URL for Google Sheet Deployment (Updated to latest version)
      const sheetsUrl = "https://script.google.com/macros/s/AKfycbwpuMld9arZAH3IfkSSJij7dnSSYoe_ASo1ya5bXr9Z_nRVZh4VtrzOuQXAhAYyjoH7Qg/exec";
      
      const payload = {
        ...formData,
        timestamp: new Date().toISOString()
      };

      // We use mode: 'no-cors' to handle Google's 302 redirect correctly.
      // We send as a simple string to ensure the body reaches doPost(e) consistently.
      await fetch(sheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload)
      });

      console.log("Mission successful: Lead data transmitted.");
      setShowThankYou(true);
    } catch (err) {
      console.error("Critical System Failure during transmission:", err);
      // Even if there's an error on the client (like CORS blocking the response), 
      // often the data still reaches the sheet. We'll show the modal to reassure the user.
      setShowThankYou(true);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="animate-fade-in pt-28 md:pt-44 pb-20 md:pb-32 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-7xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight italic">Apply for a Beta Spot.</h1>
          <p className="text-sm md:text-xl text-slate-500 font-medium italic px-4">We only work with businesses we know we can help. Secure your spot before the current intake ends.</p>
        </div>
        <form className="bg-white/20 backdrop-blur-xl p-6 md:p-16 rounded-[2.5rem] md:rounded-[4rem] premium-shadow border border-white/50 space-y-6 md:space-y-8" onSubmit={handleSubmit}>
          {calculatedGap && (
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center animate-pulse">
               <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">PROFIT LEAK DETECTED</p>
               <p className="text-lg font-black text-slate-900">£{calculatedGap.toLocaleString()} / YEAR</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Full Name</label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text" 
                placeholder="John Smith" 
                className="w-full p-4 md:p-6 rounded-xl md:rounded-2xl bg-white border-2 border-slate-100 text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-200 outline-none transition-all duration-300 placeholder-slate-300 font-semibold shadow-sm" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Email Address</label>
              <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email" 
                placeholder="john@company.co.uk" 
                className="w-full p-4 md:p-6 rounded-xl md:rounded-2xl bg-white border-2 border-slate-100 text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-200 outline-none transition-all duration-300 placeholder-slate-300 font-semibold shadow-sm" 
                required 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Desired Protocol</label>
              <CustomSelect 
                name="service"
                value={formData.service}
                onChange={handleCustomSelect}
                placeholder="Select Service"
                options={[
                  { value: "starter", label: "Starter Plan (Web + AI)" },
                  { value: "growth", label: "Growth Plan (Complete Asset)" },
                  { value: "elite", label: "Elite Plan (Market Leader)" },
                  { value: "chatbot", label: "Chatbot Integration (Existing Site)" },
                  { value: "email", label: "Neural Email Campaign" }
                ]}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Industry Sector</label>
              <CustomSelect 
                name="industry"
                value={formData.industry}
                onChange={handleCustomSelect}
                placeholder="Select Industry"
                options={[
                  { value: "trade", label: "Home Trade" },
                  { value: "professional", label: "Professional Service" },
                  { value: "healthcare", label: "Healthcare" },
                  { value: "other", label: "Other" }
                ]}
              />
            </div>
          </div>

          {formData.service === 'email' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <ScrollReveal>
                <div className="space-y-2 animate-fade-in">
                  <label className="text-[10px] md:text-xs font-black text-orange-500 uppercase tracking-widest pl-2 flex items-center gap-2">
                    <Hash size={12} /> Campaign Scale
                  </label>
                  <CustomSelect 
                    name="emailCount"
                    value={formData.emailCount}
                    onChange={handleCustomSelect}
                    placeholder="Select Scale"
                    theme="orange"
                    options={[
                      { value: "1", label: "1 Email Sequence" },
                      { value: "2", label: "2 Email Sequences" },
                      { value: "3", label: "3 Email Sequences" },
                      { value: "4", label: "4 Email Sequences (Recommended)" }
                    ]}
                  />
                </div>
              </ScrollReveal>
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Your Biggest Challenge? (Optional)</label>
            <textarea 
              name="challenge"
              value={formData.challenge}
              onChange={handleChange}
              placeholder="e.g. I spend too much time dealing with admin and unqualified leads..." 
              rows={4} 
              className="w-full p-4 md:p-6 rounded-xl md:rounded-2xl bg-white border-2 border-slate-100 text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-200 outline-none transition-all duration-300 placeholder-slate-300 font-semibold resize-none shadow-sm" 
            ></textarea>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-6 md:py-8 bg-primary text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4 disabled:opacity-50"
          >
            {loading ? <LoadingSpinner size={24} /> : <>SEND APPLICATION <ChevronRight size={24} /></>}
          </button>
          <p className="text-center text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-widest italic">Only a few founders spots left</p>
        </form>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [calculatedGap, setCalculatedGap] = useState<number | undefined>();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const navigateTo = (page: PageState) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col selection:bg-primary selection:text-white relative">
      <div className="fixed inset-0 pointer-events-none z-0 bg-slate-50/50">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_rgba(14,165,233,0.12)_0%,_transparent_60%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_rgba(99,102,241,0.08)_0%,_transparent_60%)]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-400/5 blur-[120px] rounded-full"></div>
      </div>
      <CustomCursor />
      
      <Navbar 
        scrolled={scrolled} 
        currentPage={currentPage} 
        navigateTo={navigateTo} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-3xl z-[90] flex flex-col items-center justify-center gap-8 md:gap-12 transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {['Home', 'About', 'Why Us', 'Pricing', 'Contact'].map((item) => (
          <button 
            key={item} 
            onClick={() => navigateTo(item.toLowerCase().replace(/ /g, '-') as PageState)} 
            className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter hover:text-primary transition-colors"
          >
            {item}
          </button>
        ))}
      </div>

      <main className="flex-grow relative z-10">
        {currentPage === 'home' && <Home navigateTo={navigateTo} onLeakCalculated={(gap) => setCalculatedGap(gap)} />}
        {currentPage === 'about' && <AboutAndWork navigateTo={navigateTo} />}
        {currentPage === 'why-us' && <WhyUs navigateTo={navigateTo} />}
        {currentPage === 'pricing' && <Pricing navigateTo={navigateTo} />}
        {currentPage === 'contact' && <Contact setShowThankYou={setShowThankYou} calculatedGap={calculatedGap} />}
      </main>

      <footer className="bg-white/10 backdrop-blur-xl py-16 md:py-32 px-6 md:px-12 border-t border-white/30 relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20">
          <div className="md:col-span-1 text-center md:text-left">
            <Logo className="h-7 md:h-10 mb-6 md:mb-8 opacity-60 mx-auto md:mx-0" />
            <p className="text-slate-400 text-xs md:text-sm font-bold leading-relaxed max-w-xs mx-auto md:mx-0">
              Helping UK service businesses scale through high-conversion websites and professional AI booking systems.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-[10px] md:text-xs font-black text-slate-900 mb-6 md:mb-8 uppercase tracking-widest">Navigation</h4>
            <div className="flex flex-col gap-4 md:gap-6 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
              <button onClick={() => navigateTo('home')} className="hover:text-primary">Home</button>
              <button onClick={() => navigateTo('about')} className="hover:text-primary">About & Our Work</button>
              <button onClick={() => navigateTo('why-us')} className="hover:text-primary">Why Us</button>
              <button onClick={() => navigateTo('pricing')} className="hover:text-primary">Pricing</button>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-[10px] md:text-xs font-black text-slate-900 mb-6 md:mb-8 uppercase tracking-widest">Contact</h4>
            <div className="flex flex-col gap-4 md:gap-6 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
              <p>{CONTACT_PHONE}</p>
              <p>{CONTACT_EMAIL}</p>
              <p>Brighton, United Kingdom</p>
            </div>
          </div>
          <div className="text-slate-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-center md:text-right md:self-end">
            © 2025 AFA Media | Founders Edition
          </div>
        </div>
      </footer>

      <ThankYouModal isOpen={showThankYou} onClose={() => setShowThankYou(false)} />
    </div>
  );
}
