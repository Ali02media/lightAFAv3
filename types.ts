import React from 'react';

// Fixed: Added price, monthly, guarantee and bestValue to match actual data
export interface ServicePackage {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  monthly: string;
  guarantee: string;
  highlight?: boolean;
  priceRange?: string;
  bestValue?: boolean;
}

// Added PricingPackage interface to define consistent structure with optional tags
export interface PricingPackage {
  title: string;
  price: string;
  monthly: string;
  features: string[];
  bestValue: boolean;
  tag?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  image?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  company: string;
  url: string;
  logo?: string;
}