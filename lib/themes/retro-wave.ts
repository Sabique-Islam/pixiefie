import { Theme, ThemeConfig } from './types'

const retroWaveTheme: Theme = {
  id: 'retro-wave',
  name: 'Retro Wave',
  description: '80s synthwave aesthetic',
  colors: {
    primary: '#FF00FF',
    secondary: '#00FFFF',
    accent: '#FFFF00',
    background: 'rgba(0,0,0,0.8)',
    text: '#FF00FF',
    textSecondary: '#00FFFF'
  },
  gradient: 'from-pink-500 via-purple-600 to-indigo-600',
  backgroundPattern: 'bg-[linear-gradient(45deg,transparent_25%,rgba(255,0,255,0.1)_25%,rgba(255,0,255,0.1)_50%,transparent_50%,transparent_75%,rgba(0,255,255,0.1)_75%)] bg-[length:20px_20px]',
  borderStyle: 'border-2 border-pink-500/50',
  shadowStyle: 'shadow-2xl shadow-pink-500/25'
}

const generateCSS = (): string => {
  return `
    .profile-card-${retroWaveTheme.id} {
      --theme-primary: ${retroWaveTheme.colors.primary};
      --theme-secondary: ${retroWaveTheme.colors.secondary};
      --theme-accent: ${retroWaveTheme.colors.accent};
      --theme-background: ${retroWaveTheme.colors.background};
      --theme-text: ${retroWaveTheme.colors.text};
      --theme-text-secondary: ${retroWaveTheme.colors.textSecondary};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', retroWaveTheme.colors.primary)
  element.style.setProperty('--theme-secondary', retroWaveTheme.colors.secondary)
  element.style.setProperty('--theme-accent', retroWaveTheme.colors.accent)
  element.style.setProperty('--theme-background', retroWaveTheme.colors.background)
  element.style.setProperty('--theme-text', retroWaveTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', retroWaveTheme.colors.textSecondary)
}

const getGradientClass = (): string => {
  return retroWaveTheme.gradient
}

export const retroWave: ThemeConfig = {
  theme: retroWaveTheme,
  generateCSS,
  applyToElement,
  getGradientClass
}
