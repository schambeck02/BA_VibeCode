
import { Company, ESGQuartile, PerformanceMetrics, DailyReturn } from './types';

const SECTORS = [
  'Technology', 'Financials', 'Healthcare', 'Energy', 
  'Consumer Discretionary', 'Industrials', 'Utilities', 'Real Estate'
];

const TICKERS = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'BRK.B', 'JPM', 'UNH', 'V',
  'JNJ', 'XOM', 'TSLA', 'PG', 'MA', 'HD', 'LLY', 'CVX', 'MRK', 'ABBV',
  'PEP', 'KO', 'AVGO', 'COST', 'TMO', 'PFE', 'ORCL', 'NKE', 'BAC', 'DHR'
];

export const generateMockCompanies = (): Company[] => {
  return TICKERS.map(ticker => {
    const total = 40 + Math.random() * 55;
    let quartile: ESGQuartile;
    if (total > 80) quartile = ESGQuartile.Q1;
    else if (total > 65) quartile = ESGQuartile.Q2;
    else if (total > 50) quartile = ESGQuartile.Q3;
    else quartile = ESGQuartile.Q4;

    return {
      ticker,
      name: `${ticker} Corp`,
      sector: SECTORS[Math.floor(Math.random() * SECTORS.length)],
      esg: {
        total,
        environmental: 30 + Math.random() * 60,
        social: 30 + Math.random() * 60,
        governance: 30 + Math.random() * 60,
      },
      quartile
    };
  });
};

export const calculateQuartileMetrics = (companies: Company[]): Record<ESGQuartile, PerformanceMetrics> => {
  const base = {
    [ESGQuartile.Q1]: {
      annualizedReturn: 0.125, sharpeRatio: 1.15, sortinoRatio: 1.45, 
      volatility: 0.14, maxDrawdown: -0.18, var95: -0.015, var99: -0.025, 
      tailRisk: 12, survivalProbability: 0.98, recoveryDays: 45
    },
    [ESGQuartile.Q2]: {
      annualizedReturn: 0.108, sharpeRatio: 0.95, sortinoRatio: 1.25, 
      volatility: 0.16, maxDrawdown: -0.22, var95: -0.018, var99: -0.028, 
      tailRisk: 18, survivalProbability: 0.96, recoveryDays: 58
    },
    [ESGQuartile.Q3]: {
      annualizedReturn: 0.085, sharpeRatio: 0.72, sortinoRatio: 0.95, 
      volatility: 0.19, maxDrawdown: -0.28, var95: -0.022, var99: -0.035, 
      tailRisk: 25, survivalProbability: 0.94, recoveryDays: 72
    },
    [ESGQuartile.Q4]: {
      annualizedReturn: 0.062, sharpeRatio: 0.55, sortinoRatio: 0.68, 
      volatility: 0.23, maxDrawdown: -0.35, var95: -0.028, var99: -0.045, 
      tailRisk: 38, survivalProbability: 0.89, recoveryDays: 95
    }
  };
  return base;
};

export const generateTimeSeries = (days: number = 252): DailyReturn[] => {
  const data: DailyReturn[] = [];
  let current = 100;
  const start = new Date('2021-02-04');
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const change = (Math.random() - 0.48) * 0.02; // Slight upward bias
    current *= (1 + change);
    data.push({
      date: d.toISOString().split('T')[0],
      return: current
    });
  }
  return data;
};
