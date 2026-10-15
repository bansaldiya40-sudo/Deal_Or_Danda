import type { InvestorProfile } from '../types/game.ts';

export const INVESTORS: InvestorProfile[] = [
  {
    id: 'ashneer',
    name: 'Cashneer Grover',
    fictionalTitle: 'The Numbers Hawk',
    tagline: 'The Straight Shooter',
    signatureLine: 'Bhai, valuation dhandhe se aati hai, sapno se nahi!',
    primaryColor: '#DC2626', // Crimson Red
    deskColor: '#991B1B',
    trait: 'Zero tolerance for bluffing or imaginary valuations. Fast, punchy delivery for sarcastic remarks.',
    voiceProfile: {
      pitch: 0.8, // Deep, assertive
      rate: 1.08, // Crisp, slightly impatient
      voiceGender: 'male',
      toneDescription: 'Deep, punchy, authoritative, sharp Hinglish delivery',
    },
    preferences: {
      numbersWeight: 0.45,
      brandWeight: 0.15,
      marginsWeight: 0.25,
      executionWeight: 0.15,
    },
  },
  {
    id: 'aman',
    name: 'Demand Gupta',
    fictionalTitle: 'The Brand Maverick',
    tagline: 'Lifestyle & D2C Hustler',
    signatureLine: 'Product mast hai, par brand ka dhamaka kahan hai?',
    primaryColor: '#F59E0B', // Amber Gold
    deskColor: '#D97706',
    trait: 'Obsessed with lifestyle branding, consumer pull, and youth energy. Casual Hinglish tone.',
    voiceProfile: {
      pitch: 1.1, // Energetic, youthful
      rate: 1.02, // Conversational
      voiceGender: 'male',
      toneDescription: 'Youthful, energetic, friendly, conversational Indian English & Hinglish',
    },
    preferences: {
      numbersWeight: 0.2,
      brandWeight: 0.5,
      marginsWeight: 0.15,
      executionWeight: 0.15,
    },
  },
  {
    id: 'vineeta',
    name: 'Win-ita Singh',
    fictionalTitle: 'The Unit Economics Queen',
    tagline: 'Analytical & Strategic',
    signatureLine: 'Idea achha hai. Ab unit economics aur repeat customer retention samjhao.',
    primaryColor: '#EC4899', // Pink / Magenta
    deskColor: '#BE185D',
    trait: 'Sharp focus on CAC vs LTV, gross margins, and operational discipline.',
    voiceProfile: {
      pitch: 1.15, // Clear, confident female
      rate: 0.98, // Measured, articulate
      voiceGender: 'female',
      toneDescription: 'Confident, articulate, analytical, strategic corporate poise',
    },
    preferences: {
      numbersWeight: 0.25,
      brandWeight: 0.25,
      marginsWeight: 0.35,
      executionWeight: 0.15,
    },
  },
  {
    id: 'namita',
    name: 'Namita Tappar',
    fictionalTitle: 'The Profitability & Governance Voice',
    tagline: 'Sustainable Business Champion',
    signatureLine: 'Main is deal mein OUT hoon! Foundation scalable honi chahiye.',
    primaryColor: '#10B981', // Emerald Teal
    deskColor: '#047857',
    trait: 'Strict on financial sustainability, clinical/ethical validation, and structured growth.',
    voiceProfile: {
      pitch: 1.0, // Composed, elegant female
      rate: 0.92, // Deliberate with dramatic pauses
      voiceGender: 'female',
      toneDescription: 'Polished, professional, expressive, dramatic pauses on verdicts',
    },
    preferences: {
      numbersWeight: 0.3,
      brandWeight: 0.15,
      marginsWeight: 0.25,
      executionWeight: 0.3,
    },
  },
];
