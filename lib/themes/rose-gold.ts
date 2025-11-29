import { Theme, ThemeConfig } from './types'

const roseGoldTheme: Theme = {
  id: 'rose-gold',
  name: 'Rose Gold',
  description: 'Luxurious dark with rose gold accents',
  colors: {
    primary: '#FB7185',
    secondary: '#BE185D',
    accent: '#FDA4AF',
    background: 'rgba(15, 8, 12, 0.97)',
    text: '#FFF1F2',
    textSecondary: '#FECDD3'
  },
  gradient: 'from-stone-950 via-rose-950/40 to-stone-950',
  patternType: 'mesh',
  backgroundPattern: 'pattern-mesh',
  patternOpacity: 0.02,
  borderStyle: 'border border-rose-400/20',
  shadowStyle: 'shadow-2xl shadow-rose-900/30',
  glowColor: 'rgba(251, 113, 133, 0.12)',
  glowIntensity: 'subtle'
}

const generateCSS = (): string => {
  return `
    .profile-card-${roseGoldTheme.id} {
      --theme-primary: ${roseGoldTheme.colors.primary};
      --theme-secondary: ${roseGoldTheme.colors.secondary};
      --theme-accent: ${roseGoldTheme.colors.accent};
      --theme-background: ${roseGoldTheme.colors.background};
      --theme-text: ${roseGoldTheme.colors.text};
      --theme-text-secondary: ${roseGoldTheme.colors.textSecondary};
      --glow-color: ${roseGoldTheme.glowColor};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', roseGoldTheme.colors.primary)
  element.style.setProperty('--theme-secondary', roseGoldTheme.colors.secondary)
  element.style.setProperty('--theme-accent', roseGoldTheme.colors.accent)
  element.style.setProperty('--theme-background', roseGoldTheme.colors.background)
  element.style.setProperty('--theme-text', roseGoldTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', roseGoldTheme.colors.textSecondary)
  if (roseGoldTheme.glowColor) {
    element.style.setProperty('--glow-color', roseGoldTheme.glowColor)
  }
}

const getGradientClass = (): string => {
  return roseGoldTheme.gradient
}

export const roseGold: ThemeConfig = {
  theme: roseGoldTheme,
  generateCSS,
  applyToElement,
  getGradientClass
}
