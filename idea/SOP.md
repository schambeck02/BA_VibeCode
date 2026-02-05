# Standard Operating Procedure (SOP)
## ESG-Performance Dashboard-Analyse für S&P 500 Unternehmen

**Version:** 1.0  
**Datum:** 05.02.2026  
**Zweck:** Dashboard für die Daten und zusätzliche Analyse zur ESG-Performance-Analyse und Beantwortung aller Forschungsfragen

---

## 1. ZIELSETZUNG

Dieses SOP definiert den standardisierten Prozess zur Analyse des Zusammenhangs zwischen ESG-Scores und der Performance sowie den Risikocharakteristiken von S&P 500 Unternehmen mittels eines interaktiven Dashboards.

### 1.1 Forschungsfragen (zu beantworten)

1. Weisen Unternehmen mit höheren ESG-Scores höhere Raw Returns im Vergleich zu Unternehmen mit niedrigen ESG-Scores auf?
2. Spiegeln sich ESG-Scores in risikoadjustierten Performance-Maßen wie Sharpe Ratio, Sortino Ratio, Volatilität und Maximum Drawdown wider?
3. Gibt es einen Zusammenhang zwischen ESG-Scores und Downside-Risiko, einschließlich Tail Risk, Value-at-Risk und Crash Sensitivity?
4. Korrelieren höhere ESG-Scores mit besseren Unternehmensüberlebenschancen, wie z.B. weniger Delistings oder geringere extreme Drawdowns?
5. Welche ESG-Säule (Environmental, Social, Governance) zeigt die stärkste Assoziation mit Performance und Risiko?

---

## 2. GELTUNGSBEREICH

**Anwendbar für:**
- Privatinvestoren die sich für ESG interessieren
- Portfoliomanager
- Finanzanalysten
- Asset Manager
- Risikomanager
- ESG-orientierte Investoren

**Datenbasis:**
- Aktuell diese File @data_ba_test_final.csv
- S&P 500 Unternehmen
- Tägliche historische Kursdaten (5 Jahre)
- ESG-Scores (Gesamtscore und E, S, G Einzelscores)

---

## 3. VERANTWORTLICHKEITEN

| Rolle | Verantwortlichkeit |
|-------|-------------------|
| **Dashboard-Nutzer** | Korrekte Eingabe von Parametern, Interpretation der Ergebnisse |
| **Datenmanager** | Sicherstellung der Datenqualität und Aktualität |
| **IT-Support** | Technische Wartung des Dashboards |
| **Compliance-Officer** | Überwachung der regulatorischen Anforderungen |

---

## 4. BENÖTIGTE RESSOURCEN

### 4.1 Daten
- [ ] Tägliche Aktienkurse (S&P 500, 5 Jahre)
- [ ] ESG-Scores (aktuell und historisch)
- [ ] Benchmark-Daten (S&P 500 Index)
- [ ] Delisting-Informationen
- [ ] Risikofrei-Zins-Daten

### 4.2 Tools
- [ ] ESG-Performance Dashboard (Zugang)
- [ ] Datenbankzugang
- [ ] Exportfunktionen (Excel, PDF)

### 4.3 Dokumentation
- [ ] Dieses SOP
- [ ] Dashboard-Benutzerhandbuch
- [ ] Glossar der Finanzkennzahlen

---

## 5. SCHRITT-FÜR-SCHRITT-PROZESS

### PHASE 1: VORBEREITUNG

#### Schritt 1.1 - Datenvalidierung
**Dauer:** 15-30 Minuten

1. Dashboard öffnen und auf Daten-Tab navigieren
2. Aktualisierungsdatum der Daten überprüfen
   - ✓ Soll: Nicht älter als 1 Werktag
3. Vollständigkeit prüfen:
   - ✓ Anzahl S&P 500 Unternehmen (ca. 500-505)
   - ✓ Verfügbarkeit aller ESG-Scores (E, S, G, Gesamt)
   - ✓ Keine fehlenden Kursdaten > 5 aufeinanderfolgende Tage
4. Datenqualitätsbericht generieren
5. Bei Abweichungen → IT-Support kontaktieren

**Output:** Validierter Datensatz

---

#### Schritt 1.2 - Analyseparameter definieren
**Dauer:** 10-15 Minuten

1. **Zeitraum festlegen:**
   - Standard: 5 Jahre (04.02.2021 – 04.02.2026)
   - Optional: Spezifische Perioden (z.B. Post-COVID ab 2022)

2. **ESG-Kategorisierung wählen:**
   - Quartile (empfohlen): Q1 (höchste ESG) bis Q4 (niedrigste ESG)
   - Oder: Tertile / Quintile

3. **Benchmark definieren:**
   - Standard: S&P 500 Index
   - Optional: Branchenspezifische Benchmarks

4. **Risikofrei-Zins:**
   - Standard: 3-Monats-US-Treasury-Bill-Rate (empfohlen für Sharpe/Sortino)
   - Alternative: 10-jährige US-Staatsanleihen (für langfristige Analysen)
   - Aktuelle Rate vor Analyse überprüfen

**Output:** Dokumentierte Analyseparameter

---

### PHASE 2: FORSCHUNGSFRAGE 1 - RAW RETURNS ANALYSE

#### Schritt 2.1 - Performance-Vergleich nach ESG-Quartilen
**Dauer:** 20-30 Minuten

1. **Navigation:** Dashboard → Tab "Returns Analyse"

2. **Visualisierung generieren:**
   - Balkendiagramm: Durchschnittliche annualisierte Returns pro ESG-Quartil
   - Zeitreihen-Chart: Kumulative Returns nach Quartilen
   - Box-Plot: Return-Verteilung nach Quartilen

3. **Statistische Tests durchführen:**
   - T-Test: Q1 (hohe ESG) vs. Q4 (niedrige ESG)
   - ANOVA: Unterschiede zwischen allen Quartilen
   - Signifikanzniveau dokumentieren (p < 0.05)

4. **Kennzahlen erfassen:**
   ```
   ESG-Quartil | Ø Ann. Return | Median Return | Std. Dev.
   Q1 (hoch)   | _____% | _____% | _____%
   Q2          | _____% | _____% | _____%
   Q3          | _____% | _____% | _____%
   Q4 (niedrig)| _____% | _____% | _____%
   ```

5. **Interpretation:**
   - Ist der Unterschied zwischen Q1 und Q4 statistisch signifikant?
   - Zeigt sich ein linearer Trend?
   - Gibt es Ausreißer-Perioden?

**Output:** 
- Screenshots der Visualisierungen
- Tabelle mit statistischen Kennzahlen
- Interpretationsnotiz (max. 200 Wörter)

**Entscheidungshilfe:** 
→ JA zu höheren ESG-Scores, wenn Q1 signifikant besser als Q4 (p < 0.05) UND Unterschied > 2% p.a.

---

### PHASE 3: FORSCHUNGSFRAGE 2 - RISIKOADJUSTIERTE PERFORMANCE

#### Schritt 3.1 - Sharpe Ratio Analyse
**Dauer:** 15 Minuten

1. **Navigation:** Dashboard → Tab "Risk-Adjusted Returns"

2. **Sharpe Ratio berechnen (automatisch):**
   - Formel: (Return - Risk-free Rate) / Volatilität
   - Gruppierung nach ESG-Quartilen

3. **Visualisierung:**
   - Balkendiagramm: Sharpe Ratios nach Quartilen
   - Scatter-Plot: ESG-Score vs. Sharpe Ratio

4. **Kennzahlen dokumentieren:**
   ```
   ESG-Quartil | Sharpe Ratio | Interpretation
   Q1          | _____        | ______________
   Q2          | _____        | ______________
   Q3          | _____        | ______________
   Q4          | _____        | ______________
   ```

5. **Benchmarking:**
   - Vergleich mit S&P 500 Index Sharpe Ratio
   - Identifikation von Top-Performern innerhalb Q1

**Entscheidungskriterium:** Sharpe Ratio > 0.5 = akzeptabel, > 1.0 = gut, > 2.0 = exzellent

---

#### Schritt 3.2 - Sortino Ratio Analyse
**Dauer:** 15 Minuten

1. **Sortino Ratio berechnen:**
   - Focus: Nur Downside-Volatilität
   - Target Return: 0% oder risikofrei-Zins

2. **Vergleich mit Sharpe Ratio:**
   - Ist Sortino Ratio deutlich höher? → Asymmetrische Renditeverteilung

3. **Dokumentation analog zu Schritt 3.1**

---

#### Schritt 3.3 - Volatilitätsanalyse
**Dauer:** 20 Minuten

1. **Volatilitätsmaße berechnen:**
   - Annualisierte Standardabweichung
   - 30-Tage rollende Volatilität
   - Realisierte vs. implizite Volatilität (falls verfügbar)

2. **Visualisierung:**
   - Zeitreihe: Volatilität über Zeit nach ESG-Quartilen
   - Heatmap: Volatilität nach Sektor UND ESG-Score

3. **Korrelationsanalyse:**
   - Pearson-Korrelation: ESG-Score vs. Volatilität
   - Erwartung: Negative Korrelation (hohe ESG → niedrige Volatilität)

4. **Dokumentation:**
   ```
   ESG-Quartil | Ø Volatilität | Min Vol. | Max Vol.
   Q1          | _____%        | ____%    | ____%
   Q4          | _____%        | ____%    | ____%
   
   Korrelation (ESG vs. Vol.): r = _____ (p = _____)
   ```

---

#### Schritt 3.4 - Maximum Drawdown Analyse
**Dauer:** 20 Minuten

1. **Maximum Drawdown berechnen:**
   - Größter Peak-to-Trough Rückgang
   - Für jedes Unternehmen und jedes Quartil

2. **Visualisierung:**
   - Histogramm: Verteilung der Max Drawdowns
   - Zeitreihe: Drawdown-Perioden markieren (z.B. COVID-Crash)

3. **Vergleich:**
   ```
   ESG-Quartil | Ø Max DD | Median Max DD | Worst DD
   Q1          | ____%    | ____%         | ____%
   Q4          | ____%    | ____%         | ____%
   ```

4. **Recovery-Analyse:**
   - Durchschnittliche Erholungszeit nach Drawdowns
   - Sind Q1-Unternehmen schneller erholt?

**Output Phase 3:** Zusammenfassender Bericht "Risikoadjustierte Performance"

**Entscheidungshilfe:**
→ ESG-Scores WIRKEN risikomindernd, wenn:
- Q1 Sharpe Ratio > Q4 UND
- Q1 Volatilität < Q4 UND
- Q1 Max Drawdown < Q4
(Mindestens 2 von 3 Kriterien müssen erfüllt sein)

---

### PHASE 4: FORSCHUNGSFRAGE 3 - DOWNSIDE-RISIKO

#### Schritt 4.1 - Tail Risk Analyse
**Dauer:** 25 Minuten

1. **Tail-Events identifizieren:**
   - Definition: Tägliche Returns < -3% (oder -2σ)
   - Zählung nach ESG-Quartilen

2. **Visualisierung:**
   - Histogramm der Return-Verteilung mit markierten Tails
   - QQ-Plot zur Normalverteilungs-Prüfung

3. **Kennzahlen:**
   ```
   ESG-Quartil | Anzahl Tail Events | Ø Tail Return | Worst Return
   Q1          | _____              | ____%         | ____%
   Q4          | _____              | ____%         | ____%
   ```

4. **Statistische Tests:**
   - Chi-Quadrat-Test: Sind Tail-Events gleichverteilt?
   - Excess Kurtosis berechnen (fat tails?)

---

#### Schritt 4.2 - Value-at-Risk (VaR) Analyse
**Dauer:** 20 Minuten

1. **VaR berechnen (95% und 99% Konfidenzniveau):**
   - Historische Methode
   - Parametrische Methode (falls Normalverteilung)
   - Monte-Carlo-Simulation (optional)

2. **Portfolio-VaR nach ESG-Quartilen:**
   ```
   ESG-Quartil | 95% VaR | 99% VaR | CVaR (99%)
   Q1          | ____%   | ____%   | ____%
   Q4          | ____%   | ____%   | ____%
   ```

3. **Backtesting:**
   - Wie oft wurde VaR durchbrochen?
   - Sind Durchbrüche bei Q4 häufiger?

---

#### Schritt 4.3 - Crash Sensitivity Analyse
**Dauer:** 30 Minuten

1. **Crash-Perioden definieren:**
   - COVID-19 Crash (Feb-März 2020)
   - Weitere signifikante Markteinbrüche (>10% S&P 500 Drop)

2. **Für jede Crash-Periode:**
   - Beta-Koeffizient berechnen (Sensitivity zum Markt)
   - Drawdown während des Crashes
   - Erholungsgeschwindigkeit

3. **Vergleichstabelle:**
   ```
   Crash-Event | Q1 Beta | Q4 Beta | Q1 DD | Q4 DD | Q1 Recovery | Q4 Recovery
   COVID-19    | ___     | ___     | ___% | ___% | ___ Tage    | ___ Tage
   Event 2     | ___     | ___     | ___% | ___% | ___ Tage    | ___ Tage
   ```

4. **Defensive Quality Score:**
   - Kombination aus: niedriges Beta + geringer DD + schnelle Recovery
   - Ranking nach ESG-Quartilen

**Output Phase 4:** Downside-Risiko-Report mit Ampel-System
- 🟢 Grün: Q1 deutlich besser (>20% Reduktion)
- 🟡 Gelb: Q1 moderat besser (10-20% Reduktion)
- 🔴 Rot: Kein signifikanter Unterschied

**Entscheidungshilfe:**
→ Hohe ESG-Scores bieten Downside-Schutz, wenn ≥2 Metriken "Grün" zeigen

---

### PHASE 5: FORSCHUNGSFRAGE 4 - UNTERNEHMENSÜBERLEBENSFÄHIGKEIT

#### Schritt 5.1 - Delisting-Analyse
**Dauer:** 25 Minuten

1. **Delisting-Daten extrahieren:**
   - Anzahl Delistings in 5-Jahres-Periode
   - Grund: Insolvenz, M&A, Regelverstoß
   - ESG-Score zum Zeitpunkt des Delistings

2. **Survival-Rate berechnen:**
   ```
   ESG-Quartil | Anzahl Starts | Delistings | Survival Rate | Ø ESG bei Delisting
   Q1          | ___           | ___        | ____%         | ___
   Q2          | ___           | ___        | ____%         | ___
   Q3          | ___           | ___        | ____%         | ___
   Q4          | ___           | ___        | ____%         | ___
   ```

3. **Kaplan-Meier Survival Curves:**
   - Visualisierung der Überlebenswahrscheinlichkeit über Zeit
   - Log-Rank-Test für signifikante Unterschiede zwischen Quartilen

4. **Hazard Ratio:**
   - Cox Proportional Hazards Modell
   - Interpretation: Wie viel höher ist das Delisting-Risiko bei Q4 vs. Q1?

---

#### Schritt 5.2 - Extreme Drawdown Analyse
**Dauer:** 20 Minuten

1. **Definition "Extreme Drawdown":**
   - Standard: >50% Wertverlust vom Peak
   - Oder: Worst 5% aller Drawdowns

2. **Ereigniszählung:**
   ```
   ESG-Quartil | Anzahl Unternehmen | Extreme DDs | % mit Extreme DD
   Q1          | ___                | ___         | ____%
   Q4          | ___                | ___         | ____%
   ```

3. **Charakterisierung:**
   - Durchschnittliche Tiefe der extremen Drawdowns
   - Durchschnittliche Dauer
   - Erholungsrate (wie viele erholen sich zu >90% des Peaks?)

4. **Frühindikatoren:**
   - Verschlechterung des ESG-Scores vor extremem DD?
   - Zeitreihen-Analyse: ESG-Veränderung 12 Monate vor Event

---

#### Schritt 5.3 - Financial Distress Indicators
**Dauer:** 25 Minuten

1. **Stress-Indikatoren definieren:**
   - Gewinnwarnungen
   - Dividendenkürzungen
   - Credit Rating Downgrades
   - Extreme Volatilitätsspitzen

2. **Datensammlung** (falls verfügbar):
   - Anzahl Stress-Events pro Unternehmen
   - Korrelation mit ESG-Scores

3. **Predictive Power Test:**
   - Logistische Regression: ESG-Score als Prädiktor für Distress
   - AUC-ROC Kurve
   - Interpretation: Kann ESG-Score Distress vorhersagen?

**Output Phase 5:** Survival & Resilience Scorecard

**Entscheidungshilfe:**
→ ESG-Scores indizieren besseres Überleben, wenn:
- Q1 Survival Rate ≥ 5% höher als Q4 UND
- Q1 extreme Drawdowns ≤ 50% der Häufigkeit von Q4

---

### PHASE 6: FORSCHUNGSFRAGE 5 - ESG-SÄULEN-ANALYSE

#### Schritt 6.1 - Einzelsäulen-Performance
**Dauer:** 45 Minuten

Für jede Säule (E, S, G) separat:

1. **Quartilbildung:**
   - Q1-Q4 basierend auf Environmental-Score
   - Q1-Q4 basierend auf Social-Score
   - Q1-Q4 basierend auf Governance-Score

2. **Performance-Metriken wiederholen:**
   - Raw Returns (wie Phase 2)
   - Sharpe Ratio (wie Phase 3.1)
   - Maximum Drawdown (wie Phase 3.4)
   - VaR (wie Phase 4.2)

3. **Vergleichstabelle erstellen:**
   ```
   Metrik          | E-Score Q1-Q4 | S-Score Q1-Q4 | G-Score Q1-Q4 | Gesamt-ESG Q1-Q4
   ----------------|---------------|---------------|---------------|------------------
   Ø Return        | Δ ____%       | Δ ____%       | Δ ____%       | Δ ____%
   Sharpe Ratio    | Δ ___        | Δ ___        | Δ ___        | Δ ___
   Max DD          | Δ ____%       | Δ ____%       | Δ ____%       | Δ ____%
   95% VaR         | Δ ____%       | Δ ____%       | Δ ____%       | Δ ____%
   Survival Rate   | Δ ____%       | Δ ____%       | Δ ____%       | Δ ____%
   ```
   (Δ = Differenz zwischen Q1 und Q4)

---

#### Schritt 6.2 - Multivariate Regressionsanalyse
**Dauer:** 30 Minuten

1. **Regression Setup:**
   - Abhängige Variable: Annualisierte Returns (oder Sharpe Ratio)
   - Unabhängige Variablen: E-Score, S-Score, G-Score
   - Kontrollvariablen: Sektor, Marktkapitalisierung, Beta

2. **Modell durchführen:**
   ```
   Return = β₀ + β₁(E) + β₂(S) + β₃(G) + β₄(Sektor) + β₅(MarketCap) + ε
   ```

3. **Koeffizienten interpretieren:**
   ```
   Variable    | Koeffizient | Std. Error | t-Wert | p-Wert | Signifikanz
   E-Score     | _____       | _____      | _____  | _____  | ***/**/*
   S-Score     | _____       | _____      | _____  | _____  | ***/**/*
   G-Score     | _____       | _____      | _____  | _____  | ***/**/*
   ```
   (*** p<0.01, ** p<0.05, * p<0.10)

4. **Relative Importance:**
   - Standardisierte Beta-Koeffizienten vergleichen
   - Welche Säule hat den größten Einfluss?

---

#### Schritt 6.3 - Branchenspezifische Analyse
**Dauer:** 40 Minuten

1. **Sektoren definieren:**
   - Technologie
   - Finanzen
   - Gesundheit
   - Energie
   - Konsumgüter
   - Industrie
   - Weitere gemäß GICS-Klassifikation

2. **Für jeden Sektor:**
   - Welche ESG-Säule korreliert am stärksten mit Performance?
   - Heatmap erstellen: Sektor × ESG-Säule → Korrelationsstärke

3. **Beispiel-Matrix:**
   ```
   Sektor       | E-Korr. | S-Korr. | G-Korr. | Stärkste Säule
   Energie      | ___     | ___     | ___     | ___________
   Technologie  | ___     | ___     | ___     | ___________
   Finanzen     | ___     | ___     | ___     | ___________
   ```

4. **Hypothesen testen:**
   - Ist E-Score wichtiger für Energiesektor?
   - Ist G-Score wichtiger für Finanzsektor?

---

#### Schritt 6.4 - Zeitliche Stabilität der Säulen
**Dauer:** 25 Minuten

1. **Rolling-Window-Analyse:**
   - 2-Jahres-Fenster, rolling monthly
   - Für jedes Fenster: Korrelation (E/S/G vs. Returns) berechnen

2. **Visualisierung:**
   - Zeitreihen-Chart: 3 Linien (E, S, G) zeigen Korrelationsentwicklung

3. **Fragen beantworten:**
   - Ist die Dominanz einer Säule stabil über Zeit?
   - Gab es Regime-Wechsel (z.B. G wichtiger nach Corporate Scandals)?

**Output Phase 6:** ESG-Säulen-Prioritätsmatrix

**Entscheidungshilfe - Säulen-Priorisierung:**
1. **Gesamt-Portfolio:** Fokus auf Säule mit höchstem β-Koeffizient UND p < 0.05
2. **Sektor-spezifisch:** Siehe Heatmap-Ergebnisse
3. **Risiko-fokussiert:** Governance-Score oft dominant für Tail-Risk-Reduktion

---

### PHASE 7: SYNTHESE & REPORTING

#### Schritt 7.1 - Dashboard-Zusammenfassung generieren
**Dauer:** 20 Minuten

1. **Navigation:** Dashboard → Tab "Executive Summary"

2. **Automatische Zusammenfassung aktivieren:**
   - Alle Forschungsfragen mit JA/NEIN/TEILWEISE beantworten
   - Stärke der Evidenz: ★☆☆ (schwach) bis ★★★ (stark)

3. **One-Pager erstellen:**
   ```
   FORSCHUNGSFRAGE | ERGEBNIS | EVIDENZ | KEY INSIGHT
   ----------------|----------|---------|-------------
   FQ1: Höhere Returns? | [JA/NEIN/TEILWEISE] | [★/★★/★★★] | [1 Satz]
   FQ2: Risikoadjustiert? | [JA/NEIN/TEILWEISE] | [★/★★/★★★] | [1 Satz]
   FQ3: Downside-Schutz? | [JA/NEIN/TEILWEISE] | [★/★★/★★★] | [1 Satz]
   FQ4: Besseres Überleben? | [JA/NEIN/TEILWEISE] | [★/★★/★★★] | [1 Satz]
   FQ5: Stärkste Säule? | [E/S/G] | [★/★★/★★★] | [1 Satz]
   ```

4. **Investment-Scorecard:**
   - ESG-Integration empfohlen: JA / NEIN / MIT VORBEHALTEN
   - Priorisierte Säule: _____
   - Optimale Strategie: _____________________________

---

#### Schritt 7.2 - Report-Erstellung
**Dauer:** 45-60 Minuten

**Berichtsstruktur:**

1. **Executive Summary** (1 Seite)
   - Hauptergebnisse aller 5 Forschungsfragen
   - Handlungsempfehlungen

2. **Methodik** (1 Seite)
   - Datenbeschreibung
   - Analysezeitraum
   - Statistische Verfahren

3. **Detaillierte Ergebnisse** (4-5 Seiten)
   - Eine Sektion pro Forschungsfrage
   - Visualisierungen einbetten
   - Statistiken dokumentieren

4. **Sektor-Breakdown** (1-2 Seiten)
   - Branchenspezifische Insights

5. **Limitationen & Caveats** (0.5 Seiten)
   - Datenqualität-Issues
   - Methodik-Einschränkungen
   - Survivorship Bias

6. **Handlungsempfehlungen** (1 Seite)
   - Konkrete Portfolio-Anpassungen
   - ESG-Integration-Strategie

**Format:**
- PDF-Export aus Dashboard
- Einbettung aller relevanten Charts
- Quellenangaben

---

#### Schritt 7.3 - Peer Review & Qualitätskontrolle
**Dauer:** 30 Minuten

**Checkliste:**

- [ ] Alle 5 Forschungsfragen beantwortet?
- [ ] Statistische Signifikanz geprüft (p-Werte)?
- [ ] Visualisierungen klar und beschriftet?
- [ ] Widersprüche zwischen Metriken erklärt?
- [ ] Sektor-Effekte berücksichtigt?
- [ ] Survivorship Bias adressiert?
- [ ] Zeitraum-Sensitivität getestet?
- [ ] Handlungsempfehlungen konkret und umsetzbar?
- [ ] Disclaimer zu regulatorischen Aspekten enthalten?
- [ ] Rechtschreibung & Formatierung korrekt?

**Vier-Augen-Prinzip:**
- Report von zweiter Person reviewen lassen
- Kritisches Hinterfragen der Schlussfolgerungen

---

### PHASE 8: HANDLUNGSABLEITUNG & IMPLEMENTATION

#### Schritt 8.1 - Portfolio-Optimierung
**Dauer:** Individuell

Basierend auf Analyseergebnissen:

1. **Screening-Kriterien definieren:**
   ```
   WENN Ergebnis = "ESG steigert risikoadjustierte Returns"
   DANN Kriterium: Mindest-ESG-Score = _____ (z.B. ≥70 oder Top-Quartil)
   
   WENN Ergebnis = "G-Score am wichtigsten"
   DANN Kriterium: Governance-Score ≥ _____ 
   ```

2. **Negativ-Screening:**
   - Unternehmen mit ESG < Schwellenwert ausschließen
   - Oder: Gewichtung reduzieren

3. **Positiv-Screening:**
   - ESG-Leaders übergewichten
   - Sektor-neutral oder sektor-spezifisch

4. **Monitoring-Regime:**
   - Quartalsweise ESG-Score-Updates prüfen
   - Bei Downgrades → Review-Trigger

---

#### Schritt 8.2 - Risikomanagement-Integration
**Dauer:** Individuell

1. **VaR-Adjustierung:**
   - Falls ESG Downside-Schutz bietet → VaR-Limits anpassen
   - Dokumentation der Rationale

2. **Stress-Testing:**
   - ESG-Faktor in Stress-Szenarien einbauen
   - "Low-ESG-Portfolio" vs. "High-ESG-Portfolio" simulieren

3. **Limit-Strukturen:**
   - Exposure-Limits für Low-ESG-Unternehmen
   - Governance-Mindestanforderungen

---

#### Schritt 8.3 - Reporting an Stakeholder
**Dauer:** Individuell

**Zielgruppen-spezifische Reports:**

1. **Für Management/Board:**
   - Executive Summary (1 Seite)
   - ROI der ESG-Integration
   - Risikominderungs-Effekte

2. **Für Investoren/Kunden:**
   - ESG-Ansatz transparent darstellen
   - Performance-Attribution (ESG vs. Non-ESG)
   - Nachhaltigkeits-Metriken

3. **Für Compliance/Regulatoren:**
   - Methodologie-Dokumentation
   - Datenqualität-Nachweise
   - Einhaltung relevanter Standards (z.B. SFDR, MiFID II)

---

## 6. QUALITÄTSSICHERUNG

### 6.1 Datenqualitätskriterien

**Vor jeder Analyse prüfen:**

| Kriterium | Schwellenwert | Aktion bei Unterschreitung |
|-----------|---------------|----------------------------|
| Daten-Vollständigkeit | ≥95% | Fehlende Daten imputieren oder ausschließen |
| ESG-Score-Verfügbarkeit | ≥90% der S&P 500 | IT-Support kontaktieren |
| Aktualität | ≤2 Werktage alt | Daten aktualisieren |
| Plausibilität Returns | Keine Outlier >±50% daily | Daten-Cleaning durchführen |

### 6.2 Statistische Rigorosität

**Mindestanforderungen:**

- Signifikanzniveau: α = 0.05 (Standard), α = 0.01 (konservativ)
- Stichprobengröße: Mindestens 30 Unternehmen pro ESG-Quartil
- Multiple Testing Correction: Bonferroni oder FDR bei >10 Tests
- Robustness Checks: Alternative Zeiträume, alternative ESG-Anbieter (falls verfügbar)

### 6.3 Bias-Vermeidung

**Bewusste Berücksichtigung:**

1. **Survivorship Bias:**
   - Delisted companies MÜSSEN in Analyse enthalten sein
   - Falls nicht verfügbar → explizit als Limitation nennen

2. **Look-Ahead Bias:**
   - ESG-Scores nur verwenden, die zum jeweiligen Zeitpunkt verfügbar waren
   - Keine Ex-post-Reklassifikation

3. **Data Mining:**
   - Hypothesen a priori definieren
   - Out-of-sample Testing durchführen

---

## 7. DOKUMENTATION & ARCHIVIERUNG

### 7.1 Zu archivierende Materialien

Für jede Analyse speichern:

- [ ] Vollständiger Dashboard-Export (PDF)
- [ ] Rohdaten-Snapshot (CSV/Excel)
- [ ] Analyseparameter-Protokoll
- [ ] Statistische Outputs (Regressionstabellen, etc.)
- [ ] Visualisierungen (hochauflösende PNG/SVG)
- [ ] Abschlussbericht
- [ ] Changelog (falls iterative Analysen)

**Speicherort:** [Pfad definieren, z.B. SharePoint/Google Drive]

**Namenskonvention:**
```
YYYYMMDD_ESG-Analyse_[Nutzer]_[Version].pdf
Beispiel: 20260205_ESG-Analyse_MuellerJ_v1.2.pdf
```

### 7.2 Aufbewahrungsfristen

- **Aktive Analysen:** Unbegrenzt
- **Historische Analysen:** Mindestens 7 Jahre (regulatorisch)
- **Rohdaten-Snapshots:** Mindestens 3 Jahre

---

## 8. TROUBLESHOOTING

### Häufige Probleme und Lösungen

| Problem | Mögliche Ursache | Lösung |
|---------|------------------|--------|
| Dashboard lädt nicht | Browser-Cache / Session timeout | Cache leeren, neu einloggen |
| Fehlende ESG-Scores | Daten-Update ausstehend | IT-Support kontaktieren |
| Unrealistische Returns | Outlier / Corporate Actions | Data Cleaning: Winsorize bei 1%/99% |
| Keine signifikanten Ergebnisse | Zu kleine Stichprobe | Zeitraum erweitern oder Quartile zu Tertiles ändern |
| Widersprüchliche Ergebnisse | Sektor-Effekte | Sektor-adjustierte Analyse durchführen |
| Hohe Multikollinearität (E,S,G) | ESG-Komponenten korreliert | Ridge Regression oder PCA verwenden |

---

## 9. ANHÄNGE

### ANHANG A: Glossar der Finanzkennzahlen

**Raw Return:** Absolute Rendite ohne Risikoadjustierung
- Formel: (Preis_Ende - Preis_Anfang) / Preis_Anfang

**Sharpe Ratio:** Überrendite pro Einheit Gesamtrisiko
- Formel: (R_p - R_f) / σ_p
- Interpretation: >1 = gut, >2 = sehr gut

**Sortino Ratio:** Überrendite pro Einheit Downside-Risiko
- Formel: (R_p - R_f) / σ_Downside
- Vorteil: Bestraft nur negative Volatilität

**Maximum Drawdown (MDD):** Größter Peak-to-Trough-Verlust
- Formel: (Trough - Peak) / Peak
- Beispiel: Von $100 auf $60 = -40% MDD

**Value-at-Risk (VaR):** Maximaler erwarteter Verlust bei gegebenem Konfidenzniveau
- 95% VaR = -5%: In 95% der Fälle Verlust ≤5%

**Conditional VaR (CVaR):** Durchschnittlicher Verlust WENN VaR überschritten wird
- Auch: Expected Shortfall

**Beta:** Sensitivität gegenüber Marktbewegungen
- β = 1: Bewegt sich mit Markt
- β > 1: Überproportional volatil
- β < 1: Defensiv

**Tail Risk:** Wahrscheinlichkeit extremer negativer Ereignisse
- Fat Tails: Höhere Wahrscheinlichkeit als Normalverteilung suggeriert

### ANHANG B: ESG-Scoring-Systeme

**Übliche Anbieter:**
- MSCI ESG Ratings (AAA bis CCC)
- Sustainalytics ESG Risk Ratings (0-100)
- Refinitiv ESG Scores (0-100)
- S&P Global ESG Scores (0-100)

**Wichtig:** Scores sind NICHT direkt vergleichbar zwischen Anbietern!
- Korrelation zwischen Anbietern: oft nur 0.5-0.7
- Für diese Analyse: EINEN Anbieter konsistent verwenden

### ANHANG C: Rechtliche & Regulatorische Hinweise

**EU SFDR (Sustainable Finance Disclosure Regulation):**
- Artikel 8/9 Fonds müssen ESG-Integration dokumentieren
- Dashboard-Outputs können als Nachweis dienen

**MiFID II:**
- ESG-Präferenzen der Kunden berücksichtigen
- Suitability Assessment

**Fiduciary Duty:**
- Analyse zeigt, ob ESG materiell für Performance ist
- Rechtfertigt (oder widerlegt) ESG-Integration

**Disclaimer:**
Dieses SOP dient analytischen Zwecken. Es stellt keine Anlageberatung dar. Investitionsentscheidungen sollten unter Berücksichtigung individueller Umstände und in Rücksprache mit qualifizierten Beratern getroffen werden.

---

## 10. REVISIONSHISTORIE

| Version | Datum | Autor | Änderungen |
|---------|-------|-------|------------|
| 1.0 | 05.02.2026 | Lucas Schambeck | Initiale Erstellung |
| | | | |
| | | | |

---

## 11. GENEHMIGUNG

**Erstellt von:** Luca Schambeck und Detjon Bibaj 
**Geprüft von:** Christian Bardetscher  
**Genehmigt von:** Christian Bardetscher   
**Gültig ab:** 30.6.2026  
**Nächste Revision:** 30.6.2027  

---

**ENDE DES SOP**

---

## QUICK REFERENCE CARD

### Zeitaufwand pro Phase (Richtwerte)

| Phase | Dauer | Kritisch? |
|-------|-------|-----------|
| 1: Vorbereitung | 30 min | ✓ |
| 2: Raw Returns | 30 min | ✓ |
| 3: Risk-Adjusted | 70 min | ✓ |
| 4: Downside Risk | 75 min | ✓ |
| 5: Survival | 70 min | ✓ |
| 6: Säulen-Analyse | 140 min | ✓ |
| 7: Synthese | 90 min | ✓ |
| 8: Implementation | Variabel | - |
| **GESAMT** | **~8-9 Stunden** | |

### Entscheidungsbaum

```
START
│
├─ Datenqualität OK? 
│  ├─ NEIN → IT-Support, STOPP
│  └─ JA → Weiter
│
├─ Phase 2-6 durchführen
│
├─ Alle Forschungsfragen beantwortet?
│  ├─ NEIN → Fehlende Analysen nachholen
│  └─ JA → Weiter
│
├─ Ergebnis statistisch signifikant?
│  ├─ NEIN → Limitationen dokumentieren, vorsichtige Empfehlungen
│  └─ JA → Weiter
│
├─ ESG zeigt positive Effekte?
│  ├─ JA → ESG-Integration empfehlen
│  └─ NEIN/MIXED → Nuancierte Strategie entwickeln
│
END: Report & Implementation
```

### Kontakte

| Rolle | Kontakt |
|-------|---------|
| Dashboard-Support | [schambeck@pm.me] |
| Datenmanagement | [schambeck@pm.me] |
| IT-Notfall | [schambeck@pm.me] |
| Compliance-Fragen | [schambeck@pm.me] |

---