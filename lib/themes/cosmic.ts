import { Theme, ThemeConfig } from './types'

const cosmicTheme: Theme = {
  id: 'cosmic',
  name: 'Cosmic',
  description: 'Starry cosmic patterns with galaxy gradients',
  colors: {
    primary: '#8B5CF6',
    secondary: '#3B82F6',
    accent: '#EC4899',
    background: 'rgba(0,0,0,0.7)',
    text: '#F8FAFC',
    textSecondary: '#C7D2FE'
  },
  gradient: 'from-purple-900 via-blue-900 to-indigo-900',
  patternType: 'radial-gradient',
  backgroundPattern: 'bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_40%_40%,rgba(120,119,198,0.2)_0%,transparent_50%)]',
  patternOpacity: 1,
  borderStyle: 'border border-purple-500/30',
  shadowStyle: 'shadow-2xl shadow-purple-500/25',
  glowColor: 'rgba(139, 92, 246, 0.15)',
  glowIntensity: 'subtle'
}

const generateCSS = (): string => {
  return `
    .profile-card-${cosmicTheme.id} {
      --theme-primary: ${cosmicTheme.colors.primary};
      --theme-secondary: ${cosmicTheme.colors.secondary};
      --theme-accent: ${cosmicTheme.colors.accent};
      --theme-background: ${cosmicTheme.colors.background};
      --theme-text: ${cosmicTheme.colors.text};
      --theme-text-secondary: ${cosmicTheme.colors.textSecondary};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', cosmicTheme.colors.primary)
  element.style.setProperty('--theme-secondary', cosmicTheme.colors.secondary)
  element.style.setProperty('--theme-accent', cosmicTheme.colors.accent)
  element.style.setProperty('--theme-background', cosmicTheme.colors.background)
  element.style.setProperty('--theme-text', cosmicTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', cosmicTheme.colors.textSecondary)
}

const getGradientClass = (): string => {
  return cosmicTheme.gradient
}

export const cosmic: ThemeConfig = {
  theme: cosmicTheme,
  generateCSS,
  applyToElement,
  getGradientClass
}
