import { Theme, ThemeConfig } from './types'

const midnightTheme: Theme = {
  id: 'midnight',
  name: 'Midnight',
  description: 'Deep dark elegance with subtle blue undertones',
  colors: {
    primary: '#3B82F6',
    secondary: '#1E3A8A',
    accent: '#60A5FA',
    background: 'rgba(8, 12, 21, 0.95)',
    text: '#F1F5F9',
    textSecondary: '#94A3B8'
  },
  gradient: 'from-slate-950 via-slate-900 to-blue-950',
  patternType: 'grid',
  backgroundPattern: 'pattern-grid',
  patternOpacity: 0.03,
  borderStyle: 'border border-blue-500/10',
  shadowStyle: 'shadow-2xl shadow-blue-950/50'
}

const generateCSS = (): string => {
  return `
    .profile-card-${midnightTheme.id} {
      --theme-primary: ${midnightTheme.colors.primary};
      --theme-secondary: ${midnightTheme.colors.secondary};
      --theme-accent: ${midnightTheme.colors.accent};
      --theme-background: ${midnightTheme.colors.background};
      --theme-text: ${midnightTheme.colors.text};
      --theme-text-secondary: ${midnightTheme.colors.textSecondary};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', midnightTheme.colors.primary)
  element.style.setProperty('--theme-secondary', midnightTheme.colors.secondary)
  element.style.setProperty('--theme-accent', midnightTheme.colors.accent)
  element.style.setProperty('--theme-background', midnightTheme.colors.background)
  element.style.setProperty('--theme-text', midnightTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', midnightTheme.colors.textSecondary)
}

const getGradientClass = (): string => {
  return midnightTheme.gradient
}

export const midnight: ThemeConfig = {
  theme: midnightTheme,
  generateCSS,
  applyToElement,
  getGradientClass
}
