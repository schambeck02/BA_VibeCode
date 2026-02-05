
export enum ESGQuartile {
  Q1 = 'Q1',
  Q2 = 'Q2',
  Q3 = 'Q3',
  Q4 = 'Q4'
}

export interface ESGScore {
  total: number;
  environmental: number;
  social: number;
  governance: number;
}

export interface Company {
  ticker: string;
  name: string;
  sector: string;
  esg: ESGScore;
  quartile: ESGQuartile;
  description?: string;
  metrics?: PerformanceMetrics;
}

export interface PerformanceMetrics {
  annualizedReturn: number;
  sharpeRatio: number;
  sortinoRatio: number;
  volatility: number;
  maxDrawdown: number;
  var95: number;
  var99: number;
  tailRisk: number; // Count of days with < -3% return
  survivalProbability: number;
  recoveryDays: number;
}

export interface DailyReturn {
  date: string;
  return: number;
}

export interface AnalysisSummary {
  fq1: ResearchQuestionStatus;
  fq2: ResearchQuestionStatus;
  fq3: ResearchQuestionStatus;
  fq4: ResearchQuestionStatus;
  fq5: ResearchQuestionStatus;
}

export interface ResearchQuestionStatus {
  answer: 'YES' | 'NO' | 'PARTIAL';
  evidence: number; // 1 to 3 stars
  insight: string;
}
