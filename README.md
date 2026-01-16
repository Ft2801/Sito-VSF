# Volontari Senza Frontiere

[![Build and Test](https://github.com/Ft2801/Sito-VSF/actions/workflows/build.yml/badge.svg)](https://github.com/Ft2801/Sito-VSF/actions/workflows/build.yml)
[![Deploy to GitHub Pages](https://github.com/Ft2801/Sito-VSF/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ft2801/Sito-VSF/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-blue.svg)](https://react.dev/)

**Un sito web professionale per l'associazione di protezione civile Volontari Senza Frontiere**

Questo progetto è un'applicazione React moderna che mostra i servizi, la storia, le iniziative e le modalità di collaborazione dell'associazione.

- 🌐 **Visita il sito**: [https://Ft2801.github.io/Sito-VSF](https://Ft2801.github.io/Sito-VSF)

## Caratteristiche

- ✨ **Design Responsivo** - Ottimizzato per desktop, tablet e mobile
- 🌙 **Dark Mode** - Tema scuro di default con toggle per tema chiaro
- ⚡ **Performance** - Costruito con Vite per un build veloce
- 🎨 **Tailwind CSS** - Styling moderno e customizzabile
- 📱 **SPA (Single Page App)** - Navigazione fluida con React Router
- 🌤️ **Widget Meteo** - Integrazione con Open-Meteo API
- ♿ **Accessibile** - Struttura semantica HTML
- 🔒 **Sicuro** - TypeScript strict mode, no external dependencies richieste
- 📦 **Deployabile** - GitHub Pages ready con CI/CD incluso

## Tecnologie

- **Frontend**: React 19+, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Icons**: Font Awesome 6.5.1
- **API**: Open-Meteo (meteo pubblico)
- **Deployment**: GitHub Pages + GitHub Actions
- **Node.js**: v18+

## Installazione e Avvio

### Prerequisiti
- Node.js (v18 o superiore)
- npm v9+ o yarn

### Passaggi

1. Clona il repository:
   ```bash
   git clone https://github.com/volontari-senza-frontiere/website.git
   cd volontari-senza-frontiere
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```

4. Apri nel browser:
   ```
   http://localhost:3000
   ```

### Build per la Produzione

```bash
npm run build
```

I file di output saranno in `dist/`

### Anteprima della Build di Produzione

```bash
npm run preview
```

## Struttura del Progetto

```
├── api/              # Client per le API mock
├── components/       # Componenti React riutilizzabili
├── context/          # Context per il tema
├── pages/            # Pagine dell'applicazione
├── types.ts          # Definizioni TypeScript
├── App.tsx           # Componente radice
├── index.tsx         # Entry point
└── index.html        # Template HTML
```

## Pages

- **Home** - Pagina principale con presentazione
- **Servizi** - Elenco dei servizi forniti
- **News** - Articoli e notizie dell'associazione
- **Galleria** - Foto delle attività
- **Chi Siamo** - Storia e missione
- **Dove Siamo** - Localizzazione e contatti
- **Collabora** - Come unirsi all'associazione
- **Prevenzione** - Guide sulla protezione civile
- **Allerte** - Sistema di allerte meteo
- **Donazioni** - Come supportare l'associazione

## Deployment

Questo progetto è configurato per deployarsi automaticamente su GitHub Pages quando si fa push al branch `main`.

### GitHub Pages (Automatico)

Il workflow `Deploy to GitHub Pages` si attiva automaticamente:
- All'ogni push al branch `main`
- Esegue il build e deploya su `gh-pages` automaticamente

Leggi il workflow: [.github/workflows/deploy.yml](./.github/workflows/deploy.yml)

### Deployment Manuale

Puoi anche deployare manualmente:

1. **Compila il progetto**:
   ```bash
   npm run build
   ```

2. **Copia il contenuto di `dist/`** al tuo server preferito:
   - GitHub Pages
   - Netlify
   - Vercel
   - Server tradizionale

## Sviluppo

Per informazioni complete sullo sviluppo, vedi [DEVELOPMENT.md](./DEVELOPMENT.md).

### Comandi disponibili

```bash
npm run dev         # Avvia il server di sviluppo
npm run build       # Compila per la produzione
npm run preview     # Anteprima della build di produzione
npm run type-check  # Verifica i tipi TypeScript
```

## Contribuire

Vuoi contribuire? Fantastico! Leggi [CONTRIBUTING.md](./CONTRIBUTING.md) per le linee guida.

### Quick Start per Sviluppatori

```bash
# Fork il repository
# Clona il tuo fork
git clone https://github.com/your-username/website.git
cd volontari-senza-frontiere

# Crea un branch per la tua feature
git checkout -b feature/descrizione

# Installa e sviluppa
npm install
npm run dev

# Quando sei pronto, fai un push e apri una PR
```