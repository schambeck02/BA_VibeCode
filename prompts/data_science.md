### 1. Daten-Engineering & Qualitäts-Check (Das Fundament)

Bevor wir analysieren, müssen wir die Datenintegrität beweisen.

* **Missing Data Heatmap:** Eine Matrix-Visualisierung, die zeigt, wo Datenlücken bei ESG-Scores über die 5 Jahre liegen (wichtig für die Validität).
* **Stationaritäts-Tests:** Visualisierung der Zeitreihen (ADF-Test) vor und nach der Transformation in Log-Returns.
* **Outlier Detection Plot:** Ein Boxplot-Satz für alle finanziellen Kennzahlen, um extreme Marktereignisse (z. B. März 2020) zu isolieren.

### 2. Explorative ESG-Landschaft (Die Landkarte)

Wir müssen verstehen, wie ESG im S&P 500 verteilt ist.

* **ESG Distribution Violin Plots:** Darstellung der Dichteverteilung der Scores pro Sektor (Tech vs. Energie vs. Finance).
* **Interactive Correlation Matrix:** Eine Heatmap, die zeigt, wie stark die Säulen E, S und G miteinander korrelieren (und mit Marktkapitalisierung).
* **Geografische Exposure-Map:** Falls Daten vorhanden, eine Weltkarte der Unternehmenshauptsitze farblich kodiert nach ihrem ESG-Score.

### 3. Portfolio-Konstruktion & Performance (Das Herzstück)

Hier messen wir die Rendite.

* **Quintile-Backtest Curve:** Ein Liniendiagramm, das die kumulierte Rendite von 5 Portfolios zeigt (von Top 20% ESG bis Bottom 20% ESG) im Vergleich zum S&P 500 Index.
* **Rolling Sharpe Ratio:** Ein Liniendiagramm, das zeigt, wie sich das risikoadjustierte Verhältnis über die Zeit verändert (bewegt sich ESG stabil durch Krisen?).
* **Factor Exposure Radar Chart:** Ein Spinnendiagramm, das zeigt, welche Fama-French-Faktoren (Size, Value, Momentum) in den ESG-Portfolios stecken.

### 4. Risikoprofiling & Volatilität (Die Sicherheitsanalyse)

ESG wird oft als „Risikomanagement-Tool“ beworben. Das prüfen wir.

* **Underwater Plots (Drawdown-Analyse):** Eine Visualisierung, die zeigt, wie tief die Portfolios in Krisen fallen und wie schnell sie sich erholen (Recovery Time).
* **Conditional Value-at-Risk (CVaR) Bar Charts:** Vergleich des extremen Verlustrisikos (Tail Risk) zwischen High-ESG und Low-ESG Firmen.
* **Volatility Clustering (GARCH-Modelle):** Ein Plot der bedingten Volatilität, um zu sehen, ob High-ESG-Aktien weniger „nervös“ auf Marktschocks reagieren.

### 5. Pillar-Decomposition (Die Ursachenforschung)

Welcher Teil von ESG treibt die Performance?

* **Pillar Importance Sunburst Chart:** Eine hierarchische Darstellung, die zeigt, wie sich der Gesamtscore aus Sub-Metriken zusammensetzt und welche den größten Einfluss auf die Rendite haben.
* **Regression Coefficient Plot:** Eine Visualisierung der Koeffizienten unserer Regressionsmodelle, um zu sehen, ob „Governance“ wichtiger ist als „Environment“.
* **ESG-Momentum Scatter Plot:** Analyse der *Veränderung* der Scores (Momentum) vs. der zukünftigen Rendite.

### 6. Machine Learning & Predictive Analytics (Die Zukunft)

Wir nutzen moderne Algorithmen zur Vorhersage.

* **SHAP Summary Plot:** Ein moderner Plot aus dem Bereich XAI (Explainable AI), der zeigt, welche ESG-Features das Modell zur Vorhersage von Outperformance nutzt.
* **Decision Tree Visualization:** Ein Ausschnitt eines Random Forests, der zeigt, ab welchem ESG-Schwellenwert die Wahrscheinlichkeit für einen Kurssturz signifikant sinkt.
* **Prediction Error Heatmap:** Wo irrt sich das Modell? Vergleich von prognostizierter vs. tatsächlicher Volatilität.

### 7. Survival & Extremereignisse (Die Härteprüfung)

* **Kaplan-Meier Survival Curves:** Eine klassische medizinische Visualisierung, hier angewandt auf Unternehmen: Wie lange „überlebt“ eine Firma im S&P 500, bevor sie wegen Underperformance oder Delisting ausscheidet (differenziert nach ESG-Score).
* **Event Study Plot:** Eine Visualisierung der „Abnormal Returns“ rund um negative ESG-News (Skandale) – reagieren Firmen mit hohem Basis-Score resilienter?

---