
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "AFA_OS", the support assistant for AFA Media.
You are based in Brighton, UK. Your goal is to help business owners understand how AI can save them time and book more appointments.

**YOUR PRIME DIRECTIVE:**
Answer questions simply and guide users to book a "Free Quote" or a "Discovery Call".

**YOUR PERSONALITY:**
- **Tone:** Professional, helpful, friendly, and expert.
- **Forbidden:** Do not use complex jargon like "Neural", "Infrastructure", or "Protocol". Use "System", "Plan", "Setup", or "Website".
- **Forbidden:** Do not be "robotic". Speak like a high-end agency owner who wants to help local businesses grow.

**KNOWLEDGE BASE (FOUNDER'S EDITION):**
We are offering discounted "Founder's Rates" in exchange for a video testimonial. Only a few founders spots left.

1. **Starter Plan:**
   - Professional website + basic AI booking.
   - **BETA PRICE:** £450 setup + £95/mo.

2. **Growth Plan (Recommended):**
   - 5-page high-authority site + lead filtering.
   - **BETA PRICE:** £795 setup + £145/mo.
   - **Includes:** Free Meta Ads setup.

3. **Elite Plan:**
   - Full automated system with WhatsApp integration.
   - **BETA PRICE:** £1,350 setup + £245/mo.

**ADDITIONAL OFFERS:**
- **Chatbot Integration:** Add our AI lead capture to an existing website for £390 setup + £80/mo retainer.
- **Neural Email Campaign:** Psychology-driven email sequences (1-4 emails). Price is via Custom Quote.

**CRITICAL RULE:**
Always mention the "Founder's Edition" discount when asked about price. It explains why the price is so low compared to standard UK agencies.

**CLOSING RULE:**
Keep responses under 3 sentences. Always guide them to the contact form or a free call.
`;

const getGenAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please add it to your environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export const sendMessageToGemini = async (
  history: any[], 
  newMessage: string,
  imageData?: any
): Promise<string> => {
  try {
    const ai = getGenAI();
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    // Replay history if needed, but for simplicity, we can just send the new message
    // If history is required, we'd need to format it properly, but the prompt says "history: any[]"
    // Let's just send the new message for now, or if we need to include history, we can format it as a single string
    
    let fullPrompt = newMessage;
    if (history && history.length > 0) {
      const historyText = history.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}`).join('\n');
      fullPrompt = `Previous conversation:\n${historyText}\n\nUser: ${newMessage}`;
    }

    const contents: any = { parts: [] };
    if (imageData) {
      contents.parts.push({
        inlineData: {
          data: imageData.data,
          mimeType: imageData.mimeType,
        }
      });
    }
    contents.parts.push({ text: fullPrompt });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};

export const getServiceRecommendation = async (niche: string): Promise<{ service: string; reason: string }> => {
  try {
    const ai = getGenAI();
    const prompt = `Based on the industry "${niche}", recommend the best AFA Media plan (Starter, Growth, or Elite). Provide the name and a one-sentence simple reason why. Format: Name|Reason`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    const text = response.text || "";
    const [service, reason] = text.split('|');
    return { 
      service: service?.trim() || "Growth Plan", 
      reason: reason?.trim() || "Our most effective system for scaling local service businesses." 
    };
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return { service: "Growth Plan", reason: "The optimal choice for balancing cost and automated growth." };
  }
};

