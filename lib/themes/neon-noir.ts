import { Theme, ThemeConfig } from './types'

const neonNoirTheme: Theme = {
  id: 'neon-noir',
  name: 'Neon Noir',
  description: 'Dark cyberpunk with vivid neon accents',
  colors: {
    primary: '#F472B6',
    secondary: '#818CF8',
    accent: '#22D3EE',
    background: 'rgba(0, 0, 0, 0.95)',
    text: '#FAFAFA',
    textSecondary: '#F9A8D4'
  },
  gradient: 'from-black via-zinc-950 to-black',
  patternType: 'circuit',
  backgroundPattern: 'pattern-circuit',
  patternOpacity: 0.04,
  borderStyle: 'border border-pink-500/30',
  shadowStyle: 'shadow-2xl shadow-pink-500/20',
  glowColor: 'rgba(244, 114, 182, 0.3)',
  glowIntensity: 'medium'
}

const generateCSS = (): string => {
  return `
    .profile-card-${neonNoirTheme.id} {
      --theme-primary: ${neonNoirTheme.colors.primary};
      --theme-secondary: ${neonNoirTheme.colors.secondary};
      --theme-accent: ${neonNoirTheme.colors.accent};
      --theme-background: ${neonNoirTheme.colors.background};
      --theme-text: ${neonNoirTheme.colors.text};
      --theme-text-secondary: ${neonNoirTheme.colors.textSecondary};
      --glow-color: ${neonNoirTheme.glowColor};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', neonNoirTheme.colors.primary)
  element.style.setProperty('--theme-secondary', neonNoirTheme.colors.secondary)
  element.style.setProperty('--theme-accent', neonNoirTheme.colors.accent)
  element.style.setProperty('--theme-background', neonNoirTheme.colors.background)
  element.style.setProperty('--theme-text', neonNoirTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', neonNoirTheme.colors.textSecondary)
  if (neonNoirTheme.glowColor) {
    element.style.setProperty('--glow-color', neonNoirTheme.glowColor)
  }
}

const getGradientClass = (): string => {
  return neonNoirTheme.gradient
}

export const neonNoir: ThemeConfig = {
  theme: neonNoirTheme,
  generateCSS,
  applyToElement,
  getGradientClass
}
