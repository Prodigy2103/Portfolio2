## 🎯 Aktueller Fokus: Portfolio Redesign (Motion-First)
- **Referenz:** `https://work.rezan.me/`
- **Priorität 1 (Hauptfokus):** Analyse und Übernahme der Animationen (Keyframe-Sequenzen, `cubic-bezier` Timing-Funktionen, Stagger-Effekte beim Laden, Scroll-Reveals und Micro-Interactions).
- **Priorität 2 (Sekundär):** Selektive Übernahme einzelner Farb-Tokens (Hintergrund-Kontraste, subtile Border-Glows, Akzentfarben).
- **Technischer Standard:** 
  - Angular Standalone Components, Signals (`signal`, `computed`), Control Flow (`@if`, `@for`).
  - Maximal 14 Zeilen pro Funktion (Animation-Helper und Observer-Logik strikt in eigene Methoden oder Services auslagern).
  - Bevorzuge performante CSS/SCSS-Animationen (`transform`, `opacity`) und native Web-APIs (`IntersectionObserver`) gegenüber schweren Drittanbieter-Libraries.
- **Aktiver Skill:** Lade und befolge `skills/rezan-motion-theme.md`.