import { Theme, ThemeConfig } from './types'

const emberTheme: Theme = {
  id: 'ember',
  name: 'Ember',
  description: 'Smoldering dark with warm amber glow',
  colors: {
    primary: '#F59E0B',
    secondary: '#D97706',
    accent: '#FBBF24',
    background: 'rgba(12, 6, 2, 0.97)',
    text: '#FEF3C7',
    textSecondary: '#FCD34D'
  },
  gradient: 'from-stone-950 via-amber-950/40 to-stone-950',
  patternType: 'radial-gradient',
  backgroundPattern: 'bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.12)_0%,transparent_60%)]',
  patternOpacity: 1,
  borderStyle: 'border border-amber-500/20',
  shadowStyle: 'shadow-2xl shadow-amber-900/30',
  glowColor: 'rgba(245, 158, 11, 0.15)',
  glowIntensity: 'subtle'
}

const generateCSS = (): string => {
  return `
    .profile-card-${emberTheme.id} {
      --theme-primary: ${emberTheme.colors.primary};
      --theme-secondary: ${emberTheme.colors.secondary};
      --theme-accent: ${emberTheme.colors.accent};
      --theme-background: ${emberTheme.colors.background};
      --theme-text: ${emberTheme.colors.text};
      --theme-text-secondary: ${emberTheme.colors.textSecondary};
      --glow-color: ${emberTheme.glowColor};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', emberTheme.colors.primary)
  element.style.setProperty('--theme-secondary', emberTheme.colors.secondary)
  element.style.setProperty('--theme-accent', emberTheme.colors.accent)
  element.style.setProperty('--theme-background', emberTheme.colors.background)
  element.style.setProperty('--theme-text', emberTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', emberTheme.colors.textSecondary)
  if (emberTheme.glowColor) {
    element.style.setProperty('--glow-color', emberTheme.glowColor)
  }
}

const getGradientClass = (): string => {
  return emberTheme.gradient
}

export const ember: ThemeConfig = {
  theme: emberTheme,
  generateCSS,
  applyToElement,
  getGradientClass
}
