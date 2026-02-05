# 📊 ESG Performance Dashboard

![Status](https://img.shields.io/badge/Status-Live-green) ![Tech](https://img.shields.io/badge/Tech-React_Typescript_Vite-blue) ![Data](https://img.shields.io/badge/Data-Python_Pandas-yellow)

Willkommen zum **ESG Performance Dashboard (Insight Pro)**. Dies ist ein hochmodernes, interaktives Dashboard zur Analyse von ESG-Daten (Environmental, Social, Governance) und deren Einfluss auf die finanzielle Performance.

Die Daten basieren auf einer echten S&P 500 Analyse, verarbeitet durch eine Python-Pipeline.

---

## 🚀 Schnellstart (In 3 Minuten)

Folge diesen Schritten, um das Projekt auf deinem Computer zum Laufen zu bringen.

### 1. Voraussetzungen
Du brauchst:
- **Node.js**: Für das Dashboard. (Prüfe mit `node -v` oder [installiere hier](https://nodejs.org/)).
- **Python 3**: Für die Daten-Pipeline. (Prüfe mit `python3 --version`).

### 2. Daten vorbereiten (Optional)
Die Daten liegen bereits fertig verarbeitet in `dashboard/data/processed_data.json`.
Falls du die Analyse neu starten willst:

1. Gehe in den Hauptordner (`BA 2026/`).
2. Lege deine CSV-Dateien in `data/` ab:
   - `data_ba_test_final.csv` (Finanzdaten)
   - `synthetic_bloomberg.csv` (ESG-Daten)
3. Führe das Skript aus:
   ```bash
   python3 data/process_data.py
   ```
   *Das Skript generiert eine neue `processed_data.json` für das Dashboard.*

### 3. Dashboard starten
Öffne dein Terminal im Ordner `dashboard/` und führe nacheinander diese Befehle aus:

```bash
# 1. Alle benötigten Pakete installieren (nur beim ersten Mal nötig)
npm install

# 2. Den Entwicklungsserver starten
npm run dev
```

Wenn alles geklappt hat, siehst du eine Zeile wie:
`  ➜  Local:   http://localhost:5173/`
Klicke darauf, und das Dashboard ist live! 🎉

---

## 🔑 Konfiguration (.env)

Das Dashboard nutzt künstliche Intelligenz (Google Gemini), um Finanzdaten zu analysieren.

1. Erstelle eine Datei namens `.env.local` im Ordner `dashboard/`.
2. Füge folgende Zeile ein:
   ```env
   VITE_GEMINI_API_KEY=dein_geheimer_schluessel_hier
   ```
*(Der `VITE_` Präfix ist wichtig für Vite-Apps! Ohne Key funktioniert die "AI Analysis" Box nicht.)*

---

## 🏗️ Projekt-Struktur

```
BA 2026/
├── data/                 # Python Data Pipeline
│   ├── process_data.py   # Hauptskript zur Datenverarbeitung
│   └── *.csv             # Rohdaten
├── dashboard/            # React Web App
│   ├── data/             # Generierte JSON-Daten
│   ├── src/
│   │   ├── components/   # UI-Bausteine
│   │   ├── pages/        # Seiten (Overview, Details)
│   │   ├── types.ts      # TypeScript Definitionen
│   │   └── mockData.ts   # Lädt die echten Daten
│   └── package.json
└── README.md             # Du bist hier
```

---

## 💻 Tech Stack

- **React & TypeScript**: Frontend Framework für robuste, typ-sichere Entwicklung.
- **Vite**: Superschnelles Build-Tool.
- **Tailwind CSS**: Für das moderne "Glassmorphism" Design.
- **Recharts**: Für interaktive Finanz-Charts.
- **Python (Pandas)**: Für die Finanz-Berechnung (Sharpe Ratio, Volatilität, etc.).

---

**Viel Erfolg mit dem ESG Dashboard!** 🌍📈
