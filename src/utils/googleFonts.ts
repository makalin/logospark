// Google Fonts integration
// This file contains a curated list of 50+ Google Fonts suitable for logos

export interface GoogleFont {
  name: string;
  family: string;
  category: 'sans-serif' | 'serif' | 'monospace' | 'display' | 'handwriting';
  weights: number[];
}

export const GOOGLE_FONTS: GoogleFont[] = [
  // Sans-serif
  { name: 'Inter', family: 'Inter', category: 'sans-serif', weights: [400, 500, 600, 700, 800] },
  { name: 'Roboto', family: 'Roboto', category: 'sans-serif', weights: [300, 400, 500, 700] },
  { name: 'Open Sans', family: 'Open Sans', category: 'sans-serif', weights: [400, 600, 700] },
  { name: 'Lato', family: 'Lato', category: 'sans-serif', weights: [400, 700] },
  { name: 'Montserrat', family: 'Montserrat', category: 'sans-serif', weights: [400, 600, 700, 800] },
  { name: 'Raleway', family: 'Raleway', category: 'sans-serif', weights: [400, 600, 700, 800] },
  { name: 'Poppins', family: 'Poppins', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Source Sans Pro', family: 'Source Sans Pro', category: 'sans-serif', weights: [400, 600, 700] },
  { name: 'Nunito', family: 'Nunito', category: 'sans-serif', weights: [400, 600, 700, 800] },
  { name: 'Ubuntu', family: 'Ubuntu', category: 'sans-serif', weights: [400, 500, 700] },
  
  // Display/Headings
  { name: 'Oswald', family: 'Oswald', category: 'display', weights: [400, 500, 600, 700] },
  { name: 'Bebas Neue', family: 'Bebas Neue', category: 'display', weights: [400] },
  { name: 'Righteous', family: 'Righteous', category: 'display', weights: [400] },
  { name: 'Fredoka One', family: 'Fredoka One', category: 'display', weights: [400] },
  { name: 'Bungee', family: 'Bungee', category: 'display', weights: [400] },
  { name: 'Anton', family: 'Anton', category: 'display', weights: [400] },
  { name: 'Kanit', family: 'Kanit', category: 'display', weights: [400, 500, 600, 700] },
  { name: 'Rubik', family: 'Rubik', category: 'display', weights: [400, 500, 600, 700] },
  { name: 'Titillium Web', family: 'Titillium Web', category: 'display', weights: [400, 600, 700] },
  { name: 'Comfortaa', family: 'Comfortaa', category: 'display', weights: [400, 500, 700] },
  
  // Serif
  { name: 'Playfair Display', family: 'Playfair Display', category: 'serif', weights: [400, 700] },
  { name: 'Merriweather', family: 'Merriweather', category: 'serif', weights: [400, 700] },
  { name: 'Lora', family: 'Lora', category: 'serif', weights: [400, 700] },
  { name: 'Crimson Text', family: 'Crimson Text', category: 'serif', weights: [400, 600] },
  { name: 'PT Serif', family: 'PT Serif', category: 'serif', weights: [400, 700] },
  { name: 'Libre Baskerville', family: 'Libre Baskerville', category: 'serif', weights: [400, 700] },
  
  // Monospace
  { name: 'Roboto Mono', family: 'Roboto Mono', category: 'monospace', weights: [400, 500, 700] },
  { name: 'Source Code Pro', family: 'Source Code Pro', category: 'monospace', weights: [400, 600, 700] },
  { name: 'Fira Code', family: 'Fira Code', category: 'monospace', weights: [400, 500, 600, 700] },
  { name: 'JetBrains Mono', family: 'JetBrains Mono', category: 'monospace', weights: [400, 500, 700] },
  
  // Modern/Unique
  { name: 'Work Sans', family: 'Work Sans', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Space Grotesk', family: 'Space Grotesk', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'DM Sans', family: 'DM Sans', category: 'sans-serif', weights: [400, 500, 700] },
  { name: 'Manrope', family: 'Manrope', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Sora', family: 'Sora', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Plus Jakarta Sans', family: 'Plus Jakarta Sans', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Outfit', family: 'Outfit', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Lexend', family: 'Lexend', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Epilogue', family: 'Epilogue', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Figtree', family: 'Figtree', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Cabin', family: 'Cabin', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Archivo', family: 'Archivo', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Josefin Sans', family: 'Josefin Sans', category: 'sans-serif', weights: [400, 600, 700] },
  { name: 'Quicksand', family: 'Quicksand', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Mulish', family: 'Mulish', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Karla', family: 'Karla', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Red Hat Display', family: 'Red Hat Display', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'IBM Plex Sans', family: 'IBM Plex Sans', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'Public Sans', family: 'Public Sans', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { name: 'DM Sans', family: 'DM Sans', category: 'sans-serif', weights: [400, 500, 700] },
];

export function loadGoogleFont(font: GoogleFont): void {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.family)}:wght@${font.weights.join(';')}&display=swap`;
  document.head.appendChild(link);
}

export function loadAllGoogleFonts(): void {
  GOOGLE_FONTS.forEach(font => {
    loadGoogleFont(font);
  });
}

