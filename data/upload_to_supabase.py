#!/usr/bin/env python3
"""
Supabase CSV Data Uploader
=========================
This script uploads stock price data from CSV to Supabase.

Usage:
    1. Set environment variables:
       export SUPABASE_URL="https://mlrxqnafyqkqcvstjxxn.supabase.co"
       export SUPABASE_KEY="your-anon-key-here"
    
    2. Run the script:
       python upload_to_supabase.py
"""

import os
import sys
import json
import pandas as pd
from datetime import datetime

try:
    from supabase import create_client, Client
except ImportError:
    print("Error: supabase-py not installed. Run: pip install supabase")
    sys.exit(1)


def get_supabase_client() -> Client:
    """Initialize Supabase client from environment variables."""
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    
    if not url or not key:
        print("Error: Set SUPABASE_URL and SUPABASE_KEY environment variables")
        print("\nExample:")
        print('  export SUPABASE_URL="https://mlrxqnafyqkqcvstjxxn.supabase.co"')
        print('  export SUPABASE_KEY="your-anon-key-here"')
        sys.exit(1)
    
    return create_client(url, key)


def create_table_sql():
    """Return SQL to create the stock_prices table."""
    return """
-- Run this SQL in Supabase SQL Editor to create the table:
-- https://supabase.com/dashboard/project/mlrxqnafyqkqcvstjxxn/sql/new

CREATE TABLE IF NOT EXISTS stock_prices (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    prices JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stock_prices_date ON stock_prices(date);
CREATE INDEX IF NOT EXISTS idx_stock_prices_prices ON stock_prices USING GIN (prices);

ALTER TABLE stock_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON stock_prices
    FOR SELECT USING (true);

COMMENT ON TABLE stock_prices IS 'S&P 500 stock closing prices from CSV data';
"""


def load_csv(filepath: str) -> pd.DataFrame:
    """Load the CSV file."""
    print(f"Loading CSV: {filepath}")
    df = pd.read_csv(filepath)
    print(f"  Loaded {len(df)} rows, {len(df.columns)} columns")
    return df


def upload_data(supabase: Client, df: pd.DataFrame, batch_size: int = 50):
    """Upload data to Supabase in batches."""
    total_rows = len(df)
    uploaded = 0
    errors = 0
    
    print(f"\nUploading {total_rows} rows to Supabase...")
    
    for i in range(0, total_rows, batch_size):
        batch = df.iloc[i:i+batch_size]
        records = []
        
        for _, row in batch.iterrows():
            date_str = row['Date']
            # Convert row to dict, excluding Date column
            prices = row.drop('Date').to_dict()
            # Remove NaN values and convert to float
            prices = {k: float(v) for k, v in prices.items() if pd.notna(v)}
            
            records.append({
                "date": date_str,
                "prices": prices
            })
        
        try:
            # Upsert to handle duplicates
            result = supabase.table("stock_prices").upsert(
                records,
                on_conflict="date"
            ).execute()
            uploaded += len(records)
            print(f"  Progress: {uploaded}/{total_rows} ({100*uploaded/total_rows:.1f}%)")
        except Exception as e:
            errors += len(records)
            print(f"  Error uploading batch {i}-{i+batch_size}: {e}")
    
    print(f"\nUpload complete!")
    print(f"  Uploaded: {uploaded} rows")
    print(f"  Errors: {errors} rows")


def main():
    # Path to CSV file
    script_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(script_dir, "data_ba_test_final.csv")
    
    if not os.path.exists(csv_path):
        print(f"Error: CSV file not found: {csv_path}")
        sys.exit(1)
    
    # Print SQL for table creation
    print("=" * 60)
    print("STEP 1: Create the table in Supabase")
    print("=" * 60)
    print(create_table_sql())
    print("\n" + "=" * 60)
    print("STEP 2: Upload data")
    print("=" * 60)
    
    # Check for --sql-only flag
    if "--sql-only" in sys.argv:
        print("\n(--sql-only flag set, skipping upload)")
        return
    
    # Initialize client
    supabase = get_supabase_client()
    
    # Load and upload data
    df = load_csv(csv_path)
    upload_data(supabase, df)


if __name__ == "__main__":
    main()
