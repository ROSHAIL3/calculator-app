# React Modern Calculator App

A sleek, responsive calculator built with React, featuring:

* Light / Dark theme toggle
* Sound on button press (with toggle)
* Scientific functions (square root, exponentiation)
* Calculation history panel
* Mobile-first responsive design

---

## Prerequisites

* **Node.js** v14 or higher (bundled with npm)
* **Git** (optional, to clone repository)

---

## Installation

1. **Clone repository** (or skip if you already have the files locally):

   ```bash
   git clone https://github.com/your-username/react-modern-calculator.git
   cd react-modern-calculator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

---

## File Structure

```
react-modern-calculator/
├── public/
│   └── index.html     # Root HTML
├── src/
│   ├── App.js         # Main component (calculator logic)
│   ├── App.css        # Styles (light/dark theme, responsive, animations)
│   ├── ThemeToggle.js # Theme switch button
│   ├── SoundToggle.js # Sound enable/disable button
│   ├── HistoryPanel.js# Calculation history sidebar
│   └── index.js       # React entry point
└── README.md          # This file
```

---

## Configuration

* **Theme**: Controlled via the `data-theme` attribute on the root `<div>` in `App.js`. Supported values: `light` (default), `dark`.
* **Sound**: Toggle on/off with the speaker icon. Uses the Web Audio API.
* **History**: Automatically logs every calculation when you press `=`.

---

## Running the App

1. **Start development server**

   ```bash
   npm start
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Tip:** The terminal running `npm start` will automatically reload when you save changes in `src/` files.

---

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This outputs static files into a `build/` directory, ready for deployment.

---

## Editing Code

* **Styles:** modify `src/App.css`
* **Calculator logic:** edit `src/App.js`
* **Components:** tweak or extend in `src/ThemeToggle.js`, `src/SoundToggle.js`, `src/HistoryPanel.js`

Save your changes and watch the app reload instantly!
