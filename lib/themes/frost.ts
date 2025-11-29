import { Theme, ThemeConfig } from './types'

const frostTheme: Theme = {
  id: 'frost',
  name: 'Frost',
  description: 'Icy cool with crystalline highlights',
  colors: {
    primary: '#06B6D4',
    secondary: '#0891B2',
    accent: '#67E8F9',
    background: 'rgba(8, 15, 20, 0.96)',
    text: '#ECFEFF',
    textSecondary: '#A5F3FC'
  },
  gradient: 'from-slate-950 via-cyan-950/50 to-slate-950',
  patternType: 'hexagon',
  backgroundPattern: 'pattern-hexagon',
  patternOpacity: 0.02,
  borderStyle: 'border border-cyan-400/20',
  shadowStyle: 'shadow-2xl shadow-cyan-900/30',
  glowColor: 'rgba(6, 182, 212, 0.15)',
  glowIntensity: 'subtle'
}

const generateCSS = (): string => {
  return `
    .profile-card-${frostTheme.id} {
      --theme-primary: ${frostTheme.colors.primary};
      --theme-secondary: ${frostTheme.colors.secondary};
      --theme-accent: ${frostTheme.colors.accent};
      --theme-background: ${frostTheme.colors.background};
      --theme-text: ${frostTheme.colors.text};
      --theme-text-secondary: ${frostTheme.colors.textSecondary};
      --glow-color: ${frostTheme.glowColor};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', frostTheme.colors.primary)
  element.style.setProperty('--theme-secondary', frostTheme.colors.secondary)
  element.style.setProperty('--theme-accent', frostTheme.colors.accent)
  element.style.setProperty('--theme-background', frostTheme.colors.background)
  element.style.setProperty('--theme-text', frostTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', frostTheme.colors.textSecondary)
  if (frostTheme.glowColor) {
    element.style.setProperty('--glow-color', frostTheme.glowColor)
  }
}

const getGradientClass = (): string => {
  return frostTheme.gradient
}

export const frost: ThemeConfig = {
  theme: frostTheme,
  generateCSS,
  applyToElement,
  getGradientClass
}
