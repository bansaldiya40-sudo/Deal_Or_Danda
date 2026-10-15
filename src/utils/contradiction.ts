import type { DoglapanContradiction, ContradictionClaim } from '../types/game.ts';

interface StoredClaim {
  round: number;
  claim: ContradictionClaim;
}

const defaultClarifications = [
  {
    id: 'clarify_honest',
    text: '“Sharks, maafi chahta hoon! Previous statement gross numbers pe thi, aur yeh net realization hai. Audited cash flow bilkul clean hai.”',
    isHonest: true,
    recoveryPoints: 6,
    responseQuote: 'Theek hai, confusion clear kiya. Par numbers pe pehle se hi homework pakka rakho!',
    reactionEmotion: 'listening' as const,
  },
  {
    id: 'clarify_bluff',
    text: '“Dono baatein sahi hain! Pehle waali Indian Rupees mein thi aur doosri US Dollars mein calculate kar li thi!”',
    isHonest: false,
    recoveryPoints: -10,
    responseQuote: 'Rupee aur Dollar ka jhooth bolte ho?! Ek aur doglapan! Seedha DANDA!',
    reactionEmotion: 'angry' as const,
  },
];

export function detectContradiction(
  previousClaims: StoredClaim[],
  currentClaim?: ContradictionClaim,
  _currentRound: number = 1
): DoglapanContradiction | null {
  if (!currentClaim) return null;

  for (const prev of previousClaims) {
    // 1. Contradiction on Margins: Claiming high healthy unit economics earlier, but later admitting negative margin
    if (prev.claim.metric === 'margins' && currentClaim.metric === 'margins') {
      if (
        (prev.claim.valueDescription === 'profitable_margins' && currentClaim.valueDescription === 'negative_margins') ||
        (prev.claim.valueDescription === 'negative_margins' && currentClaim.valueDescription === 'profitable_margins')
      ) {
        return {
          challenger: 'ashneer',
          earlierRound: prev.round,
          earlierStatement: prev.claim.claimText,
          currentStatement: currentClaim.claimText,
          quote: 'Bhai, ek minute! Pehle kuch aur bola, ab kuch aur bol rahe ho. Yeh kya doglapan hai?!',
          clarificationOptions: defaultClarifications,
        };
      }
    }

    // 2. Contradiction on Traction / Margins: Claiming validated paying customers earlier, but later admitting losing money on discounts
    if (
      (prev.claim.metric === 'traction' && currentClaim.metric === 'margins' &&
       prev.claim.valueDescription === 'high_validation' && currentClaim.valueDescription === 'negative_margins') ||
      (prev.claim.metric === 'traction' && currentClaim.metric === 'traction' &&
       prev.claim.valueDescription === 'high_validation' && currentClaim.valueDescription === 'zero_retention')
    ) {
      return {
        challenger: 'ashneer',
        earlierRound: prev.round,
        earlierStatement: prev.claim.claimText,
        currentStatement: currentClaim.claimText,
        quote: 'Bhai, ek minute! Pehle kuch aur bola, ab kuch aur bol rahe ho. Yeh kya doglapan hai?!',
        clarificationOptions: defaultClarifications,
      };
    }

    // 3. Contradiction on Burn / Debt / Governance: Claiming clean cap table earlier, but later revealing messy predatory debt
    if (prev.claim.metric === 'burn' && currentClaim.metric === 'burn') {
      if (
        (prev.claim.valueDescription === 'zero_debt' && currentClaim.valueDescription === 'heavy_debt') ||
        (prev.claim.valueDescription === 'disciplined_scaling' && currentClaim.valueDescription === 'reckless_burn')
      ) {
        return {
          challenger: 'ashneer',
          earlierRound: prev.round,
          earlierStatement: prev.claim.claimText,
          currentStatement: currentClaim.claimText,
          quote: 'Bhai, ek minute! Pehle kuch aur bola, ab kuch aur bol rahe ho. Yeh kya doglapan hai?!',
          clarificationOptions: defaultClarifications,
        };
      }
    }

    // 4. Contradiction on Valuation: Saying revenue justifies multiple, then giving inconsistent revenue data
    if (prev.claim.metric === 'valuation' && currentClaim.metric === 'traction') {
      if (prev.claim.valueDescription === 'grounded_valuation' && currentClaim.valueDescription === 'unverified_claims') {
        return {
          challenger: 'ashneer',
          earlierRound: prev.round,
          earlierStatement: prev.claim.claimText,
          currentStatement: currentClaim.claimText,
          quote: 'Bhai, ek minute! Pehle kuch aur bola, ab kuch aur bol rahe ho. Yeh kya doglapan hai?!',
          clarificationOptions: defaultClarifications,
        };
      }
    }
  }

  return null;
}
