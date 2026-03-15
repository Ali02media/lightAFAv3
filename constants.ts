import { TrendingDown, Clock, Brain } from 'lucide-react';

export const APP_NAME = "AFA Media";
export const CONTACT_PHONE = "+44 7516 294378";
export const CONTACT_EMAIL = "ali@afamedia.co.uk";

export const TESTIMONIALS = [
  {
    quote: "It's straight to the point, no fuss. Clean and clear, it's much better than the old one. This isn't just a design; it's a professional asset.",
    author: "Oya",
    company: "On Point Painting",
    url: "https://onpointpainting.uk",
    logo: "https://i.ibb.co/6JThRLhG/favicon-128x128.png"
  },
  {
    quote: "The site is great even on the phone. You've streamlined our presence in a way that actually feels like a high-performance business.",
    author: "Gökhan Aydoğdu",
    company: "Legentax",
    url: "https://legentax.co.uk",
    logo: "https://i.ibb.co/PsD7wsMp/Screenshot-2026-02-16-173423.png"
  }
];

export const PROBLEM_CARDS = [
  {
    title: "95% of Visitors Leave Without Contacting",
    description: "Most websites fail to capture leads. Your potential customers browse and disappear forever.",
    icon: TrendingDown
  },
  {
    title: "8 Hour Average Response Time",
    description: "By the time you reply, your competitor has already won the business. Speed wins.",
    icon: Clock
  },
  {
    title: "£21,600+ Wasted Every Year",
    description: "The cost of a full-time receptionist versus our AI solution. Our chatbot costs less than £6 per day.",
    icon: Brain
  }
];

export const HOW_IT_WORKS = [
  { 
    step: "CAPTURE", 
    duration: "The Asset",
    detail: "We deploy a high-performance landing page engineered for raw speed and persuasion.",
    expanded: "Our sites load in under 1 second. We use proven psychological frameworks to stop visitors from leaving and start them engaging."
  },
  { 
    step: "QUALIFY", 
    duration: "The Smart Brain",
    detail: "A custom AI Assistant trained on your business data handles every visitor 24/7.",
    expanded: "The AI filters out tyre-kickers and low-value questions, only passing on qualified leads that fit your ideal customer profile."
  },
  { 
    step: "CONVERT", 
    duration: "The Booking",
    detail: "Qualified leads are pushed directly into your calendar. No phone tag. No manual follow-ups.",
    expanded: "The AI automatically checks your availability and secures the appointment. You simply wake up to a booked schedule."
  },
  { 
    step: "OPTIMIZE", 
    duration: "The Scaling",
    detail: "We monitor performance and improve the system monthly to ensure your booking rate stays high.",
    expanded: "We provide monthly revenue audits to show you exactly how many leads the system converted and where we can push for more growth."
  }
];

export const FAQS = [
  {
    question: "You're a new agency. Why should I trust you?",
    answer: "We're new, but we're hungry. Our first two clients saw results in 30 days. Plus, our 14-day guarantee means you risk nothing. You can also speak directly to our clients—Oya and Gökhan will tell you the truth."
  },
  {
    question: "How long does it take to build?",
    answer: "Most projects go live in 7-14 days. Complex custom solutions may take up to 21 days. You'll know your exact timeline before we start."
  },
  {
    question: "What if I don't like the AI responses?",
    answer: "You approve all responses before we go live. Plus, you can update the AI anytime based on your feedback. It learns your voice."
  },
  {
    question: "Is there a contract?",
    answer: "No. Our monthly plans are month-to-month. Cancel anytime with 30 days notice. We believe in earning your business every month."
  },
  {
    question: "How is this different from ChatGPT?",
    answer: "ChatGPT is general-purpose. Our AI is trained specifically on your business, services, and brand voice. It books appointments, qualifies leads, and integrates with your calendar—ChatGPT can't do that."
  },
  {
    question: "What support do you offer?",
    answer: "Email support with 24-hour response time on all packages. Phone support on Growth and Elite packages. You'll never be left hanging."
  },
  {
    question: "Can the AI handle complex questions?",
    answer: "Yes. We train it on your specific business logic. For questions it can't answer, it collects contact details so you can follow up personally."
  },
  {
    question: "Is my customer data secure?",
    answer: "Yes. We use enterprise-grade encryption and never share your data. You own all your customer information. We're GDPR compliant."
  }
];

export const SERVICES = [
  {
    id: 'ai-website',
    title: 'Landing Page + AI Chatbot',
    description: 'High-conversion landing page with an integrated AI assistant to capture and book leads 24/7.',
    features: ['Custom Design', 'AI Chatbot', 'Booking System', 'Phone Friendly'],
    guarantee: 'Not live in 14 days? You pay nothing.'
  }
];