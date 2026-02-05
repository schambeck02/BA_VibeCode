
import { Company, ESGQuartile, PerformanceMetrics, DailyReturn } from './types';

import processedData from './data/processed_data.json';

const SECTORS = [
  'Technology', 'Financials', 'Healthcare', 'Energy',
  'Consumer Discretionary', 'Industrials', 'Utilities', 'Real Estate'
];

// Helper to ensure quartile is typed correctly if needed, though JSON string should match enum
const getQuartile = (q: string): ESGQuartile => {
  switch (q) {
    case 'Q1': return ESGQuartile.Q1;
    case 'Q2': return ESGQuartile.Q2;
    case 'Q3': return ESGQuartile.Q3;
    case 'Q4': return ESGQuartile.Q4;
    default: return ESGQuartile.Q4;
  }
};

export const generateMockCompanies = (): Company[] => {
  return processedData.companies.map((c: any) => ({
    ...c,
    quartile: getQuartile(c.quartile),
    // Ensure metrics are passed through if needed, types.ts update handles this
  })) as Company[];
};

export const calculateQuartileMetrics = (companies: Company[]): Record<ESGQuartile, PerformanceMetrics> => {
  // Use pre-calculated metrics from JSON if available, otherwise fallback
  // The JSON structure has quartileMetrics at the top level
  if ('quartileMetrics' in processedData) {
    const qm = (processedData as any).quartileMetrics;
    return {
      [ESGQuartile.Q1]: qm.Q1,
      [ESGQuartile.Q2]: qm.Q2,
      [ESGQuartile.Q3]: qm.Q3,
      [ESGQuartile.Q4]: qm.Q4,
    };
  }

  // Fallback if not present (should be based on python script)
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
