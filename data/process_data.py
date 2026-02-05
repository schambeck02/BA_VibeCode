import pandas as pd
import numpy as np
import json
import hashlib
import os

# Paths
DATA_DIR = os.path.dirname(os.path.abspath(__file__))
PRICE_CSV = os.path.join(DATA_DIR, 'data_ba_test_final.csv')
ESG_CSV = os.path.join(DATA_DIR, 'synthetic_bloomberg.csv')
DASHBOARD_DATA_DIR = os.path.join(DATA_DIR, '../dashboard/data')
OUTPUT_JSON = os.path.join(DASHBOARD_DATA_DIR, 'processed_data.json')

# Ensure output directory exists
os.makedirs(DASHBOARD_DATA_DIR, exist_ok=True)

def generate_synthetic_esg(ticker):
    """Generates deterministic synthetic ESG scores based on ticker hash."""
    hash_val = int(hashlib.sha256(ticker.encode('utf-8')).hexdigest(), 16)
    np.random.seed(hash_val % 2**32)
    
    total = np.random.uniform(40, 95)
    env = np.clip(total + np.random.normal(0, 10), 30, 99)
    soc = np.clip(total + np.random.normal(0, 10), 30, 99)
    gov = np.clip(total + np.random.normal(0, 10), 30, 99)
    
    # Recalculate total as average to be consistent
    total = (env + soc + gov) / 3
    
    return {
        "total": round(total, 1),
        "environmental": round(env, 1),
        "social": round(soc, 1),
        "governance": round(gov, 1)
    }

def calculate_metrics(prices):
    """Calculates financial metrics from a price series."""
    # Ensure prices are sorted by date (though input should be time series)
    # prices is a Series with DatetimeIndex
    
    daily_returns = prices.pct_change().dropna()
    
    if len(daily_returns) < 30: # Need some history
        return None

    # Annualized metrics (assuming 252 trading days)
    ann_return = daily_returns.mean() * 252
    volatility = daily_returns.std() * np.sqrt(252)
    
    rf_rate = 0.02 # Risk free rate assumption 2%
    sharpe = (ann_return - rf_rate) / (volatility + 1e-6)
    
    # Downside deviation for Sortino
    neg_returns = daily_returns[daily_returns < 0]
    downside_dev = neg_returns.std() * np.sqrt(252)
    sortino = (ann_return - rf_rate) / (downside_dev + 1e-6)
    
    # Max Drawdown
    cum_returns = (1 + daily_returns).cumprod()
    peak = cum_returns.cummax()
    drawdown = (cum_returns - peak) / peak
    max_drawdown = drawdown.min()
    
    # VaR 95%
    var_95 = np.percentile(daily_returns, 5)
    var_99 = np.percentile(daily_returns, 1)
    
    # Tail Risk (similar to VaR but maybe just the worst returns average)
    tail_risk = abs(var_99) * 100 # simplified metric
    
    return {
        "annualizedReturn": float(ann_return),
        "volatility": float(volatility),
        "sharpeRatio": float(sharpe),
        "sortinoRatio": float(sortino),
        "maxDrawdown": float(max_drawdown),
        "var95": float(var_95),
        "var99": float(var_99),
        "tailRisk": float(tail_risk),
        "survivalProbability": 0.95 + (float(sharpe) * 0.02), # Synthetic derived metric
        "recoveryDays": int(abs(max_drawdown) * 100 * 2) # Rough proxy
    }

def main():
    print("Loading price data...")
    # Load Price Data
    # 1: Date, MMM, AOS... (Ticker headers)
    # 2: 2021-02-04, 123.15, ...
    try:
        df_prices = pd.read_csv(PRICE_CSV, index_col=0, parse_dates=True)
    except Exception as e:
        print(f"Error loading price CSV: {e}")
        return

    print("Loading ESG data...")
    try:
        df_esg = pd.read_csv(ESG_CSV)
        # Normalize Ticker: "AAPL US" -> "AAPL"
        df_esg['Ticker'] = df_esg['Ticker'].apply(lambda x: x.split()[0] if isinstance(x, str) else str(x))
        esg_map = df_esg.set_index('Ticker')[['TOTAL_ESG_SCORE', 'ENV_SCORE', 'SOC_SCORE', 'GOV_SCORE']].to_dict('index')
    except Exception as e:
        print(f"Warning: Could not load ESG CSV ({e}). Using full synthetic generation.")
        esg_map = {}

    companies = []
    
    print("Processing tickers...")
    # Tickers are columns in price csv
    tickers = df_prices.columns.tolist()
    
    # Pre-calculate market average for correlation/beta if needed, but let's keep it simple first
    
    for ticker in tickers:
        # Get Price History
        series = df_prices[ticker]
        
        # Calculate Metrics
        metrics = calculate_metrics(series)
        if not metrics:
            continue
            
        # Get or Generate ESG
        if ticker in esg_map:
            esg_data = esg_map[ticker]
            esg_scores = {
                "total": float(esg_data.get('TOTAL_ESG_SCORE', 0)),
                "environmental": float(esg_data.get('ENV_SCORE', 0)),
                "social": float(esg_data.get('SOC_SCORE', 0)),
                "governance": float(esg_data.get('GOV_SCORE', 0))
            }
            # Handle NaNs in source
            if pd.isna(esg_scores['total']):
                esg_scores = generate_synthetic_esg(ticker)
        else:
            esg_scores = generate_synthetic_esg(ticker)
            
        # Determine Quartile
        total_score = esg_scores['total']
        if total_score >= 80: q = 'Q1'
        elif total_score >= 65: q = 'Q2'
        elif total_score >= 50: q = 'Q3'
        else: q = 'Q4'
        
        # Determine Sector (Deterministic Random)
        sectors = ['Technology', 'Financials', 'Healthcare', 'Energy', 'Consumer Discretionary', 'Industrials', 'Utilities', 'Real Estate']
        hash_val = int(hashlib.sha256(ticker.encode('utf-8')).hexdigest(), 16)
        sector = sectors[hash_val % len(sectors)]

        companies.append({
            "ticker": ticker,
            "name": f"{ticker} Inc.", # Simplified name generation
            "sector": sector,
            "esg": esg_scores,
            "quartile": q,
            "metrics": metrics
        })

    # Prepare Global Quartile Aggregates
    quartile_metrics = {}
    for q in ['Q1', 'Q2', 'Q3', 'Q4']:
        q_comps = [c for c in companies if c['quartile'] == q]
        if not q_comps:
            # Fallback if empty
            quartile_metrics[q] = {k: 0 for k in companies[0]['metrics'].keys()}
            continue
            
        # Average metrics
        agg = {}
        keys = q_comps[0]['metrics'].keys()
        for k in keys:
            values = [c['metrics'][k] for c in q_comps]
            agg[k] = float(np.mean(values))
        quartile_metrics[q] = agg

    final_data = {
        "companies": companies,
        "quartileMetrics": quartile_metrics
    }

    print(f"Exporting {len(companies)} companies to JSON...")
    with open(OUTPUT_JSON, 'w') as f:
        json.dump(final_data, f, indent=2)
    
    print(f"Data processing complete. Saved to {OUTPUT_JSON}")

if __name__ == "__main__":
    main()
