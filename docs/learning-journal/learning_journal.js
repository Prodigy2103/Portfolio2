/**
 * Learning Journal Data
 */
const learningJournalData = [
  {
    date: '2026-11-03',
    topic: 'Portfolio Redesign: Motion-First & Obsidian Glassmorphism System',
    summary: 'Komplette Neugestaltung der Hero-Section mit WebGL-Shader-Komponenten (RefractedText & FractalGlass) und systemweite Angleichung aller Sektionen an das neue Dark Obsidian Design.',
    highlights: [
      'RefractedText WebGL Shaders: Umlaut-Fallback für "ü" mittels CSS @font-face unicode-range; Transparenter Shader-Background über premultipliedAlpha und Spill-Discarding.',
      'FractalGlass Integration: Native Angular 21 Standalone Komponente mit Signal Inputs, OnPush Change Detection, Pointer/Touch Tracking und WebGL-Teardown via DestroyRef.',
      'IDE Window & Polaroid: Responsives Layout mit flexibler Breakpoint-Skalierung (520px, 1125px) ohne Überlappungen von Text und Porträt.',
      'Ansatz A Token-Architektur: Systemweite Bereinigung der Tokens in styles.scss (Dark Obsidian #0b0f17, Glassmorphism-Cards mit 16px Blur, Neon-Glows, Shimmer-Buttons).',
      'SCSS & Clean Code: Alle SCSS-Dateien strikt unter 400 Zeilen gehalten, 0x any, alle 43 Karma-Unit-Tests grün.'
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { learningJournalData };
}

