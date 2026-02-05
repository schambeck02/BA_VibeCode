import pandas as pd
import yfinance as yf
import requests
from io import StringIO

# 1. S&P 500 Liste von Wikipedia laden
def get_sp500_tickers():
    url = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'
    # User-Agent Header setzen um 403 Forbidden zu vermeiden
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    tables = pd.read_html(StringIO(response.text))
    df = tables[0]
    return df['Symbol'].tolist()

import os
from datetime import datetime

# Pfad zum data-Ordner (wo dieses Script liegt)
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

print("Hole S&P 500 Ticker...")
tickers = get_sp500_tickers()
print(f"{len(tickers)} Firmen gefunden.")

# 2. Download für ALLE S&P 500 Firmen
print(f"Lade Daten für alle {len(tickers)} Firmen (5 Jahre)...")
print("Das kann einige Minuten dauern...\n")
data = yf.download(tickers, period="5y", group_by='ticker', threads=True)

# yfinance gibt jetzt ein MultiIndex DataFrame zurück
# Wir extrahieren nur die 'Close' Preise
if isinstance(data.columns, pd.MultiIndex):
    # Extrahiere Close-Preise für alle Ticker
    close_data = pd.DataFrame()
    for ticker in tickers:
        try:
            close_data[ticker] = data[ticker]['Close']
        except KeyError:
            print(f"  Warnung: Keine Daten für {ticker}")
    data = close_data
else:
    data = data[['Close']]

# 3. Daten speichern
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
output_file = os.path.join(SCRIPT_DIR, f"sp500_close_prices_{timestamp}.csv")
data.to_csv(output_file)

print("\n--- DATEN VIBE CHECK ---")
print(data.head())
print(f"\n✅ Daten gespeichert unter: {output_file}")
print(f"   Zeilen: {len(data)}, Spalten: {len(data.columns)}")