export function formatRupees(amount: number): string {
  if (isNaN(amount) || amount === 0) return '₹0';
  
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (abs >= 10000000) {
    const crores = abs / 10000000;
    return `${sign}₹${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(2)} Cr`;
  }
  if (abs >= 100000) {
    const lakhs = abs / 100000;
    return `${sign}₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)} Lakh`;
  }
  if (abs >= 1000) {
    const thousands = abs / 1000;
    return `${sign}₹${thousands.toFixed(0)}k`;
  }
  return `${sign}₹${abs.toLocaleString('en-IN')}`;
}

export function calculateValuation(investmentAmount: number, equityPercent: number) {
  if (equityPercent <= 0) {
    return { postMoney: 0, preMoney: 0 };
  }
  const postMoney = Math.round(investmentAmount / (equityPercent / 100));
  const preMoney = Math.max(0, postMoney - investmentAmount);
  return { postMoney, preMoney };
}

export function getValuationSanity(monthlyRevenue: number, postMoney: number) {
  const annualRevenue = monthlyRevenue * 12;
  if (annualRevenue <= 0) {
    if (postMoney > 20000000) { // > 2 Cr pre-revenue
      return { rating: 'insane', multiple: Infinity, message: 'Zero revenue par crore ki valuation! Yeh toh pure danda material hai!' };
    }
    return { rating: 'speculative', multiple: Infinity, message: 'Pre-revenue concept valuation - high risk for sharks!' };
  }

  const multiple = Math.round((postMoney / annualRevenue) * 10) / 10;
  if (multiple > 40) {
    return { rating: 'insane', multiple, message: `${multiple}x Annual Revenue! Cashneer ki BP badh jayegi!` };
  }
  if (multiple > 15) {
    return { rating: 'aggressive', multiple, message: `${multiple}x ARR - Aggressive tech-multiple. Pitch solid honi chahiye!` };
  }
  if (multiple >= 4) {
    return { rating: 'reasonable', multiple, message: `${multiple}x ARR - Standard healthy startup valuation.` };
  }
  return { rating: 'attractive', multiple, message: `${multiple}x ARR - Attractive shark-friendly valuation!` };
}
