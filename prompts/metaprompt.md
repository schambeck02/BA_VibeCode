# ESG-Performance Dashboard – Metaprompt

**Ziel:** Ein extrem schönes, professionelles und production-ready Dashboard zur Analyse des Zusammenhangs zwischen ESG-Scores und Performance/Risiko von S&P 500 Unternehmen.

**Datenbasis:** `data_ba_test_final.csv` – Tägliche Kursdaten von 04.02.2021 bis 04.02.2026 (5 Jahre)

---

## 🎯 Zu beantwortende Forschungsfragen (Kern des Dashboards)

Das Dashboard muss **alle 5 Forschungsfragen** visuell und analytisch beantworten:

| # | Forschungsfrage | Benötigte Visualisierung |
|---|-----------------|--------------------------|
| **FQ1** | Höhere Raw Returns bei hohen ESG-Scores? | Balkendiagramm (Returns nach Quartilen), Zeitreihen-Chart |
| **FQ2** | ESG in risikoadjustierten Metriken? | Sharpe/Sortino Ratio Charts, Volatilitäts-Heatmap, Max Drawdown |
| **FQ3** | ESG vs. Downside-Risiko? | VaR-Analyse, Tail Risk Distribution, Crash Sensitivity |
| **FQ4** | ESG und Überlebenswahrscheinlichkeit? | Survival Curves (Kaplan-Meier), Extreme Drawdown Zählung |
| **FQ5** | Welche ESG-Säule (E/S/G) ist stärkste? | Säulen-Vergleichsmatrix, Korrelations-Heatmap, Regression-Output |

---

## Required Tech Stack (Opinionated)

Use this stack unless impossible:

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript (Leveraging the stable React Compiler)
- **AI Orchestration:** Vercel AI SDK (Essential for streaming LLM responses, tool calling, and handling UI states for AI)
- **Styling:** Tailwind CSS v4.0 (Using the high-performance Oxide engine and native container queries)
- **Component System:** shadcn/ui (Radix UI Primitives)
- **Data Layer:** TanStack Query v5 (Client-side sync) + Next.js `use cache` (Server-side caching)
- **Data Grid:** TanStack Table v8 (For complex logs, user lists, and analytics)
- **Validation & Forms:** Zod + React Hook Form (Unified validation for client inputs and Server Actions)
- **Database/ORM:** Drizzle ORM (Lighter and more "Edge-ready" than Prisma for 2025 serverless environments)
- **Authentication:** Clerk or Auth.js v5 (Clerk for rapid RBAC deployment; Auth.js for self-hosted control)
- **Security:** OWASP Top 10 (2025) + Rate Limiting (via Upstash/Redis for AI endpoints)

**Data Source:** We will integrate the datasource from Supabase

---

## App Architecture Requirements

Use a single source of truth for data (API/database). The UI reads from query cache, not random component state.

### Separate:
- **Server state** (TanStack Query)
- **UI state** (local component state)
- **Form state** (React Hook Form)

### Use Next.js App Router patterns for layout:
- `/app/(dashboard)/layout.tsx` with persistent sidebar
- Route-level loading/error boundaries
- Server components for initial data where appropriate, client components for interactivity

---

## 📊 Dashboard-Struktur (Navigation)

```
/app/(dashboard)/
├── layout.tsx              # Persistente Sidebar
├── page.tsx                # Executive Summary / Overview
├── returns/page.tsx        # FQ1: Raw Returns Analyse
├── risk-adjusted/page.tsx  # FQ2: Sharpe, Sortino, Volatilität, MDD
├── downside-risk/page.tsx  # FQ3: VaR, Tail Risk, Crash Sensitivity
├── survival/page.tsx       # FQ4: Delistings, Extreme Drawdowns
├── pillars/page.tsx        # FQ5: E vs S vs G Säulenanalyse
├── company/[ticker]/page.tsx # Einzelunternehmen Deep-Dive
└── settings/page.tsx       # Parameter, Export, Info
```

---

## 🧮 Benötigte Berechnungen & Metriken

### Performance-Metriken
- **Annualisierte Returns** pro ESG-Quartil (Q1=hoch, Q4=niedrig)
- **Kumulative Returns** als Zeitreihe
- **Return-Verteilung** (Box-Plots)

### Risikoadjustierte Metriken
- **Sharpe Ratio:** `(Return - Risk-free) / Volatilität`
- **Sortino Ratio:** `(Return - Risk-free) / Downside-Volatilität`
- **Volatilität:** Annualisierte Standardabweichung
- **Maximum Drawdown:** Größter Peak-to-Trough-Verlust

### Downside-Risiko-Metriken
- **Value-at-Risk (VaR):** 95% und 99% Konfidenzniveau
- **CVaR/Expected Shortfall**
- **Tail Events:** Tage mit Returns < -3%
- **Crash Sensitivity Beta:** Performance während Marktcrashs

### Survival-Metriken
- **Extreme Drawdowns:** Anzahl Unternehmen mit >50% Verlust
- **Recovery Time:** Tage bis Erholung nach Drawdown

---

## 🎨 Design-Anforderungen (Premium & Professionell)

### Farbpalette (Dark Mode First)
```css
--bg-primary: #0a0a0f;        /* Tiefschwarz */
--bg-secondary: #12121a;      /* Card Background */
--bg-tertiary: #1a1a25;       /* Hover States */
--accent-primary: #6366f1;    /* Indigo – Primary Actions */
--accent-green: #22c55e;      /* Positive/ESG High */
--accent-red: #ef4444;        /* Negative/ESG Low */
--accent-amber: #f59e0b;      /* Warning/Neutral */
--text-primary: #f8fafc;      /* Haupttext */
--text-muted: #94a3b8;        /* Sekundärtext */
```

### UI-Komponenten
- **Glassmorphism Cards** mit subtilen Bordüren
- **Gradient Accents** für wichtige Metriken
- **Micro-Animations** bei Hover und Transitions
- **Skeleton Loading** für alle Datenkomponenten

### Typography
- **Headings:** Inter oder Outfit (Google Fonts)
- **Zahlen/Metriken:** Monospace-Font für Alignment

---

## 🛠 Tech Stack

| Kategorie | Technologie |
|-----------|-------------|
| **Framework** | Next.js 16 (App Router) + React 19 + TypeScript |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Charts** | Recharts (einfache Charts) oder ECharts (komplexe) |
| **Data Table** | TanStack Table v8 |
| **State** | TanStack Query v5 |
| **Datenquelle** | CSV-Import oder Supabase |

---

## 📋 Dashboard-Seiten im Detail

### 1. Executive Summary (Home)
**KPI-Cards (oben):**
- Gesamt-Datenpunkte
- Anzahl Unternehmen
- Analysezeitraum
- Durchschnittlicher ESG-Score

**Forschungsfragen-Übersicht:**
- 5 Cards mit JA/NEIN/TEILWEISE + Evidenzstärke (★★★)
- Klickbar → navigiert zur Detail-Seite

**Quick Charts:**
- Returns nach ESG-Quartilen (Balken)
- ESG-Score-Verteilung (Histogram)

---

### 2. Returns Analyse (FQ1)
- **Balkendiagramm:** Ø Returns pro Quartil
- **Zeitreihen-Chart:** Kumulative Returns (4 Linien für Q1-Q4)
- **Box-Plot:** Return-Verteilung
- **Statistik-Panel:** T-Test p-Wert, Signifikanz-Badge

---

### 3. Risk-Adjusted (FQ2)
- **4 KPI-Cards:** Sharpe (Q1 vs Q4), Sortino, Vol, MDD
- **Scatter-Plot:** ESG-Score vs. Sharpe Ratio
- **Heatmap:** Volatilität nach Sektor × ESG-Quartil
- **Max Drawdown Timeline:** Markierung von Crash-Perioden

---

### 4. Downside-Risk (FQ3)
- **VaR-Tabelle:** 95%/99% VaR pro Quartil
- **Tail Risk Distribution:** Histogramm mit markierten Tails
- **Crash Sensitivity:** Beta während COVID etc.
- **Ampel-System:** 🟢🟡🔴 pro Metrik

---

### 5. Survival (FQ4)
- **Kaplan-Meier Kurve:** Survival nach Quartilen
- **Extreme Drawdown Counter:** Anzahl >50% DD
- **Recovery Analysis:** Durchschnittliche Erholungszeit
- **Financial Distress Indicators** (falls Daten vorhanden)

---

### 6. Säulen-Analyse (FQ5)
- **Vergleichsmatrix:** E vs S vs G für alle Metriken
- **Radar-Chart:** Säulen-Performance-Profil
- **Regression Output:** Koeffizienten mit Signifikanz
- **Sektor-Heatmap:** Welche Säule dominiert pro Branche

---

## Design Frameworks to Apply (Non-negotiable)

1. **Information Architecture (IA):** Organize by research questions/user decisions, not by features
2. **Cognitive Load Reduction:** Reduce visual noise; make scanning effortless
3. **Progressive Disclosure:** Default view is simple (Overview); advanced stats appear on detail pages
4. **Perceived Performance:** UI should feel instant via optimistic updates, skeletons, and non-blocking interactions

---

## UI/UX Specifications (Senior Bar)

### 1) Layout & Hierarchy
- Strict grid; consistent spacing scale
- Main content dominates; navigation is visually quiet
- No oversized logos/banners. This is a financial analysis tool.

### 2) Color & Token System
- Dark neutral base + accent colors for ESG quartiles
- **System colors:**
  - `green` = ESG Q1 (high) / positive returns
  - `red` = ESG Q4 (low) / negative returns / errors
  - `amber` = warnings / neutral
  - `indigo` = primary actions
- Contrast must be readable. Never use color as the only indicator.

### 3) Navigation
**Persistent left sidebar:**
- Links grouped by research question (FQ1-FQ5)
- Clear active state with accent highlight
- Settings/Export at bottom

**Top bar** for:
- Global date range selector
- ESG quartile filter
- Export actions (PDF/PNG)

### 4) Tables (Core Dashboard Utility)

Use TanStack Table features for company data:
- Search by ticker/company name
- Filter by ESG quartile, sector
- Sort by any metric (Returns, Sharpe, VaR, etc.)
- Pagination (server-side for large datasets)
- Column visibility toggle

### 5) Charts (Financial Dashboard Standards)
- **Line charts:** Cumulative returns, time series
- **Bar charts:** Returns by quartile, metric comparisons
- **Scatter plots:** ESG vs. Sharpe correlation
- **Box plots:** Return distribution
- **Heatmaps:** Sector × ESG quartile analysis

Always include: axes, labels, values, gridlines, tooltips on hover.

**Chart library:**
- Use **Recharts** for simple visualizations
- Use **ECharts** for complex/interactive charts (Heatmaps, Kaplan-Meier)

### 6) Interaction Patterns (Radix-backed)
- **Popover** for quick filters (date range, quartile selection)
- **Dialog/Modal** for detailed company analysis
- **Toast notifications** for export success/error
- **Tooltips** for metric explanations

### 7) States & Trust (Must be designed)

For every data region/component, implement:
- **Loading** (skeletons matching card layout)
- **Empty state** (no data for selection)
- **Error state** (data fetch failed, retry button)
- **Success confirmation** (export completed)

*Users should never wonder "did that work?"*

---

## Data Layer Requirements

### Data Entities:
- **Companies:** ticker, name, sector, ESG scores (E, S, G, total)
- **PriceData:** date, ticker, close price
- **Metrics:** calculated returns, Sharpe, VaR, MDD per company/quartile

### Endpoints → Components:
| Endpoint | Powers |
|----------|--------|
| `/api/overview` | KPI cards, research question summary |
| `/api/returns` | Returns charts, quartile comparison |
| `/api/risk` | Sharpe, Sortino, Volatility, MDD charts |
| `/api/downside` | VaR, Tail risk, Crash sensitivity |
| `/api/survival` | Drawdown analysis, recovery times |
| `/api/pillars` | E vs S vs G comparison |
| `/api/company/[ticker]` | Single company deep-dive |

### Caching Strategy (TanStack Query):
- **Stale time:** 5 minutes (data doesn't change frequently)
- **Refetch on focus:** enabled
- **Invalidation:** on parameter change (date range, quartile filter)

---

## Security & "Responsible App" Defaults

- Validate all inputs with Zod on server (date ranges, ticker symbols)
- Sanitize CSV uploads before processing
- Rate limit API endpoints
- No sensitive data exposure (this is public market data)
- Follow OWASP Top 10 mindset: secure defaults, safe error handling

---

## Deliverables (What must be built)

### 1. Working Next.js Dashboard:
- Routes for all 6 pages (Overview + 5 FQs)
- Persistent sidebar with research question navigation
- Global filter controls (date range, quartile)

### 2. Executive Summary Page:
- 4 KPI cards (data points, companies, timeframe, avg ESG)
- 5 research question cards with JA/NEIN/TEILWEISE + evidence stars
- Quick bar chart (returns by quartile)

### 3. Detail Pages (FQ1-FQ5):
- Full metric displays as specified in "Dashboard-Seiten im Detail"
- Statistical outputs (p-values, significance badges)
- Interactive charts with tooltips

### 4. Company Deep-Dive:
- Single company analysis with all metrics
- ESG breakdown (E, S, G scores)
- Historical performance chart

### 5. Export Functionality:
- PDF report generation
- PNG export for individual charts
- CSV download for raw data

### 6. Fully implemented loading/empty/error states

---

## ✅ Final Quality Gate

✅ All 5 research questions visually answered  
✅ Statistical outputs (p-values) visible and interpretable  
✅ Understandable in <10 seconds  
✅ Calm, professional, data-first aesthetic  
✅ Accessible keyboard navigation (Radix primitives)  
✅ Fast-feeling interactions (<3s First Contentful Paint)  
✅ Responsive Design (Desktop-first, mobile-capable)  
✅ Export functionality working (PDF/PNG/CSV)

---

## 📁 Datenstruktur (aus CSV)

**Erwartete Spalten:**
- `Date` – Handelstag
- `[TICKER]` – Schlusskurs pro Unternehmen (z.B. AAPL, MSFT, ...)
- ESG-Scores (separat oder im gleichen File)

**Berechnungen im Dashboard:**
- Daily Returns: `(Price_t / Price_t-1) - 1`
- Annualisierte Returns: `∏(1 + daily_return)^252 - 1`
- Rolling Volatilität: 30-Tage-Fenster

---
