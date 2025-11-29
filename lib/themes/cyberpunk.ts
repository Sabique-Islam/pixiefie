import { Theme, ThemeConfig } from './types'

const cyberpunkTheme: Theme = {
  id: 'cyberpunk',
  name: 'Cyberpunk',
  description: 'Neon gradients with electric vibes',
  colors: {
    primary: '#00FFFF',
    secondary: '#FF00FF',
    accent: '#FFFF00',
    background: 'rgba(0,0,0,0.8)',
    text: '#00FFFF',
    textSecondary: '#FF00FF'
  },
  gradient: 'from-cyan-400 via-purple-500 to-pink-500',
  patternType: 'radial-gradient',
  backgroundPattern: 'bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1)_0%,transparent_50%)]',
  patternOpacity: 1,
  borderStyle: 'border-2 border-cyan-400/50',
  shadowStyle: 'shadow-2xl shadow-cyan-500/25',
  glowColor: 'rgba(0, 255, 255, 0.2)',
  glowIntensity: 'medium'
}

const generateCSS = (): string => {
  return `
    .profile-card-${cyberpunkTheme.id} {
      --theme-primary: ${cyberpunkTheme.colors.primary};
      --theme-secondary: ${cyberpunkTheme.colors.secondary};
      --theme-accent: ${cyberpunkTheme.colors.accent};
      --theme-background: ${cyberpunkTheme.colors.background};
      --theme-text: ${cyberpunkTheme.colors.text};
      --theme-text-secondary: ${cyberpunkTheme.colors.textSecondary};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', cyberpunkTheme.colors.primary)
  element.style.setProperty('--theme-secondary', cyberpunkTheme.colors.secondary)
  element.style.setProperty('--theme-accent', cyberpunkTheme.colors.accent)
  element.style.setProperty('--theme-background', cyberpunkTheme.colors.background)
  element.style.setProperty('--theme-text', cyberpunkTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', cyberpunkTheme.colors.textSecondary)
}

const getGradientClass = (): string => {
  return cyberpunkTheme.gradient
}

export const cyberpunk: ThemeConfig = {
  theme: cyberpunkTheme,
  generateCSS,
  applyToElement,
  getGradientClass
}
