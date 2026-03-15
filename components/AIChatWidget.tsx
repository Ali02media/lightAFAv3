import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Image as ImageIcon, Activity } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { GlowingEffect } from './ui/glowing-effect';

const FAQ_DATA = [
  { 
    id: 'pricing',
    label: 'Pricing Data',
    keywords: ['price', 'cost', 'how much', 'pricing', 'expensive', 'money'], 
    answer: "SYSTEM PRICING DATA:\n\n1. Neural Sales Funnels:\n   • Flashpoint Single: £50\n   • Conversion Triad: £110\n   • Cash Injection Protocol: £170\n\n2. Full Brand Architecture (Upgrade):\n   • NOW: £270 (Reduced from £887)\n   • Includes: 4 Pages, Lead Capture, Chatbot, 3D Elements.\n\n3. Core Protocol (SmartSite):\n   • NOW: £330 (Reduced from £1000)\n   • Client pays for build. Meta Ads management is FREE." 
  },
  { 
    id: 'services',
    label: 'Identify Protocol',
    keywords: ['service', 'what do you do', 'offer', 'products', 'what is this'], 
    answer: "We deploy AI SmartSites, manage Meta Ad campaigns (for free), and implement Neural Email Copywriting systems." 
  },
  { 
    id: 'timeline',
    label: 'Timeframe',
    keywords: ['how long', 'time', 'duration', 'fast', 'when'], 
    answer: "System deployment typically requires 10-14 days after the strategy alignment session." 
  },
  {
    id: 'guarantee',
    label: 'Risk Assessment',
    keywords: ['guarantee', 'refund', 'results', 'risk'],
    answer: "We operate on a performance basis defined during your strategy session. If KPIs aren't met, we work for free until they are."
  }
];

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: 'AFA_OS v2.4 Online. I analyze digital infrastructure for revenue leaks.\n\nUpload a screenshot for visual diagnostics, or query our growth protocols.', 
      timestamp: Date.now() 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = typeof textOverride === 'string' ? textOverride : input;

    if ((!textToSend.trim() && !selectedImage) || loading) return;

    const currentImage = selectedImage;
    const currentInput = textToSend.trim();

    const userMsg: ChatMessage = { 
      role: 'user', 
      text: currentInput, 
      timestamp: Date.now(),
      image: currentImage || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setLoading(true);

    if (!currentImage) {
      const lowerInput = currentInput.toLowerCase();
      const faqMatch = FAQ_DATA.find(item => item.keywords.some(k => lowerInput.includes(k)));

      if (faqMatch) {
        setTimeout(() => {
          const botMsg: ChatMessage = { role: 'model', text: faqMatch.answer, timestamp: Date.now() };
          setMessages(prev => [...prev, botMsg]);
          setLoading(false);
        }, 600);
        return;
      }
    }

    try {
      let apiHistory = messages.filter((_, index) => index > 0).map(m => {
        const parts: any[] = [];
        if (m.image) {
             parts.push({ text: "[User uploaded an image]" });
        }
        parts.push({ text: m.text || " " });
        return {
          role: m.role,
          parts: parts
        };
      });
      
      let imageData = undefined;
      if (currentImage) {
        const matches = currentImage.match(/^data:(.+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          imageData = {
            mimeType: matches[1],
            data: matches[2]
          };
        }
      }

      const responseText = await sendMessageToGemini(apiHistory, currentInput, imageData);
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'model', text: "SYSTEM_ERROR: Connection failed. Please try again later.", timestamp: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div 
          className="mb-2 md:mb-4 w-[calc(100vw-2rem)] md:w-96 h-[60vh] md:h-[500px] bg-black/95 border border-neon-blue/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300 ease-out"
          role="dialog"
          aria-label="AFA_OS AI Assistant"
        >
          <div className="p-4 border-b border-gray-800 bg-black flex justify-between items-center relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-neon-blue/5 animate-pulse" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-8 h-8 rounded bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center">
                 <Bot size={18} className="text-neon-blue" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="text-neon-blue font-mono text-xs tracking-widest font-bold">AFA_OS // ACTIVE</span>
                <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                   <Activity size={10} className="animate-pulse text-green-500" aria-hidden="true" />
                   SYSTEM ONLINE
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-gray-400 hover:text-white transition-colors relative z-10 p-2 hover:bg-gray-800 rounded-lg"
              aria-label="Close Assistant"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
            aria-live="polite"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-neon-blue/20 text-white border border-neon-blue/30 rounded-tr-none' 
                    : 'bg-gray-900/80 text-gray-200 border border-gray-700 rounded-tl-none font-mono text-xs md:text-sm shadow-lg'
                }`}>
                  {msg.image && (
                    <div className="mb-2 rounded-lg overflow-hidden border border-white/10">
                      <img src={msg.image} alt="Diagnostic attachment" className="w-full h-auto max-h-40 object-cover" />
                    </div>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-900/80 border border-gray-700 p-4 rounded-xl rounded-tl-none flex items-center gap-4">
                   <div className="flex flex-col gap-2">
                     <div className="flex gap-1.5 h-2 items-center">
                        <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce" />
                     </div>
                     <span className="text-[10px] text-neon-blue/70 font-mono uppercase tracking-[0.2em] animate-pulse">Processing_Data...</span>
                   </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!loading && (
            <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-none shrink-0" role="group" aria-label="Suggested Queries">
              {FAQ_DATA.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => handleSend(faq.label)}
                  className="text-[10px] font-mono border border-gray-800 bg-black/50 text-gray-400 px-4 py-2 rounded-lg hover:border-neon-blue hover:text-neon-blue hover:bg-neon-blue/5 transition-all whitespace-nowrap flex-shrink-0 uppercase tracking-widest font-bold min-h-[40px]"
                >
                  {faq.label}
                </button>
              ))}
            </div>
          )}

          {selectedImage && (
            <div className="px-4 py-3 bg-black/50 flex items-start border-t border-gray-800 shrink-0">
              <div className="relative inline-block">
                <img src={selectedImage} alt="Attachment preview" className="h-16 rounded border border-neon-blue/50 shadow-lg" />
                <button 
                  onClick={clearImage}
                  className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 border-2 border-black"
                  aria-label="Remove image"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          <div className="p-4 border-t border-gray-800 bg-black shrink-0">
            <div className="flex items-center gap-3">
              <label htmlFor="chat-file-input" className="sr-only">Upload Image</label>
              <input 
                id="chat-file-input"
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                className="hidden" 
              />
              <button 
                onClick={triggerFileInput}
                className="text-gray-400 hover:text-neon-blue transition-colors p-2 hover:bg-white/5 rounded-lg min-w-[40px] min-h-[40px] flex items-center justify-center"
                title="Upload Website Screenshot"
                aria-label="Attach Screenshot"
              >
                <ImageIcon size={22} aria-hidden="true" />
              </button>
              <label htmlFor="chat-text-input" className="sr-only">Chat message</label>
              <input
                id="chat-text-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={selectedImage ? "Add context..." : "Execute command..."}
                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-gray-600 focus:ring-0 min-w-0 font-mono"
              />
              <button 
                onClick={() => handleSend()} 
                disabled={loading || (!input.trim() && !selectedImage)}
                className="text-neon-blue hover:text-white disabled:opacity-30 transition-colors p-2 min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Send Message"
              >
                {loading ? <LoadingSpinner size={20} /> : <Send size={22} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative overflow-hidden w-14 h-14 md:w-16 md:h-16 rounded-full bg-black border border-neon-blue/50 flex items-center justify-center shadow-2xl hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        aria-expanded={isOpen}
      >
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
        <div className="absolute inset-0 rounded-full border border-neon-blue opacity-0 group-hover:animate-ping" aria-hidden="true" />
        <span className="relative z-10 flex items-center justify-center">
          {isOpen ? <X className="text-white" size={28} aria-hidden="true" /> : <MessageSquare className="text-neon-blue" size={28} aria-hidden="true" />}
        </span>
      </button>
    </div>
  );
};

export default AIChatWidget;