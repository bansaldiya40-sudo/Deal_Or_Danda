export type EmotionState = 
  | 'idle' 
  | 'listening' 
  | 'questioning' 
  | 'impressed' 
  | 'confused' 
  | 'angry' 
  | 'laughing' 
  | 'rejecting';

export type InvestorId = 'ashneer' | 'aman' | 'vineeta' | 'namita';

export interface InvestorProfile {
  id: InvestorId;
  name: string; // Cashneer Grover, Demand Gupta, Win-ita Singh, Namita Tappar
  fictionalTitle: string;
  tagline: string;
  signatureLine: string;
  primaryColor: string;
  deskColor: string;
  trait: string;
  voiceProfile: {
    pitch: number;
    rate: number;
    voiceGender: 'male' | 'female';
    toneDescription: string;
  };
  preferences: {
    numbersWeight: number; // weight on financials & valuation
    brandWeight: number; // weight on marketing & branding
    marginsWeight: number; // weight on gross margin & unit economics
    executionWeight: number; // weight on founder capability & clarity
  };
}

export interface StartupData {
  name: string;
  tagline: string;
  description: string;
  industry: string;
  targetCustomer: string;
  revenueModel: string;
  monthlyRevenue: number; // in INR
  monthlyExpenses: number; // in INR
  totalRaised: number; // in INR
  askAmount: number; // in INR
  askEquity: number; // percentage (e.g. 5 for 5%)
  founderPhoto?: string; // base64 or object URL of custom uploaded photo
  founderPhotoCrop?: { zoom: number; x: number; y: number };
}

export interface FollowUpResponseOption {
  id: string;
  text: string;
  quality: 'strong_defense' | 'mediocre' | 'flustered';
  points: number;
  reaction: {
    emotion: EmotionState;
    quote: string;
  };
  dandaTrigger?: boolean;
  dandaMessage?: string;
}

export interface FollowUpChallenge {
  challengerId: InvestorId;
  challengeText: string;
  hinglishText: string;
  interruptionContext?: string;
  responses: FollowUpResponseOption[];
}

export interface ContradictionClaim {
  metric: 'margins' | 'traction' | 'burn' | 'valuation';
  claimText: string;
  valueDescription: string;
}

export interface PitchAnswer {
  id: string;
  text: string;
  quality: 'great' | 'good' | 'mediocre' | 'blunder';
  points: number;
  dandaTrigger: boolean;
  dandaMessage?: string;
  claim?: ContradictionClaim;
  sharkReactions: Record<InvestorId, {
    emotion: EmotionState;
    quote: string;
  }>;
  followUp?: FollowUpChallenge;
  feedback: string;
}

export type PitchCategory =
  | 'problem'
  | 'market_size'
  | 'revenue'
  | 'gross_margin'
  | 'cac_ltv'
  | 'valuation'
  | 'branding'
  | 'scalability'
  | 'execution'
  | 'funding_use'
  | 'sustainability'
  | 'product'
  | 'financials'
  | 'competition'
  | 'growth'
  | 'founder';

export interface PitchQuestion {
  id: string;
  category: PitchCategory;
  askerId: InvestorId;
  questionText: string;
  hinglishText: string;
  contextHint: string;
  answers: PitchAnswer[];
}

export interface InvestorOffer {
  investorId: InvestorId;
  investorName: string;
  isOut: boolean;
  outReason?: string;
  amount: number; // in INR
  equity: number; // in percentage
  royalty?: {
    percent: number;
    untilRecouped: number;
  };
  dealType: 'solo' | 'joint';
  coInvestorId?: InvestorId;
  message: string;
  postMoneyValuation: number;
  preMoneyValuation: number;
}

export interface InvestorVerdict {
  investorId: InvestorId;
  investorName: string;
  verdictType: 'offer' | 'out' | 'counter';
  amount?: number;
  equity?: number;
  reason: string;
  speechLine: string;
  reactionEmotion: EmotionState;
}

export interface PitchRoundResult {
  questionId: string;
  askerId: InvestorId;
  chosenAnswerId: string;
  customText?: string;
  quality: 'great' | 'good' | 'mediocre' | 'blunder';
  pointsAwarded: number;
  dandaTriggered: boolean;
  dandaMessage?: string;
  feedback: string;
  followUpHandled?: boolean;
  contradictionTriggered?: boolean;
  slapTriggered?: boolean;
  slapInvestorId?: InvestorId;
  slapRoast?: string;
}

export interface AudioSettings {
  masterMuted: boolean;
  musicMuted: boolean;
  sfxMuted: boolean;
  voiceMuted: boolean;
  musicVolume: number;
  sfxVolume: number;
  voiceVolume: number;
}

export interface DoglapanClarificationOption {
  id: string;
  text: string;
  isHonest: boolean;
  recoveryPoints: number;
  responseQuote: string;
  reactionEmotion: EmotionState;
  triggersDanda?: boolean;
  dandaMessage?: string;
  quality?: 'honest_clarification' | 'bold_bluff';
}

export interface DoglapanContradiction {
  challenger: InvestorId;
  earlierRound: number;
  earlierStatement: string;
  currentStatement: string;
  quote: string;
  clarificationOptions?: DoglapanClarificationOption[];
}

export type GameScreen = 'start' | 'create' | 'pitch' | 'verdicts' | 'negotiation' | 'scorecard';
