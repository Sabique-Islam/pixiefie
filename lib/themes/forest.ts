import { Theme, ThemeConfig } from './types'

const forestTheme: Theme = {
  id: 'forest',
  name: 'Forest',
  description: 'Natural forest greens and earthy tones',
  colors: {
    primary: '#10B981',
    secondary: '#059669',
    accent: '#34D399',
    background: 'rgba(0,0,0,0.5)',
    text: '#ECFDF5',
    textSecondary: '#A7F3D0'
  },
  gradient: 'from-green-800 via-emerald-700 to-teal-600',
  patternType: 'radial-gradient',
  backgroundPattern: 'bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1)_0%,transparent_50%)]',
  patternOpacity: 1,
  borderStyle: 'border border-green-500/30',
  shadowStyle: 'shadow-2xl shadow-green-500/25'
}

const generateCSS = (): string => {
  return `
    .profile-card-${forestTheme.id} {
      --theme-primary: ${forestTheme.colors.primary};
      --theme-secondary: ${forestTheme.colors.secondary};
      --theme-accent: ${forestTheme.colors.accent};
      --theme-background: ${forestTheme.colors.background};
      --theme-text: ${forestTheme.colors.text};
      --theme-text-secondary: ${forestTheme.colors.textSecondary};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', forestTheme.colors.primary)
  element.style.setProperty('--theme-secondary', forestTheme.colors.secondary)
  element.style.setProperty('--theme-accent', forestTheme.colors.accent)
  element.style.setProperty('--theme-background', forestTheme.colors.background)
  element.style.setProperty('--theme-text', forestTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', forestTheme.colors.textSecondary)
}

const getGradientClass = (): string => {
  return forestTheme.gradient
}

export const forest: ThemeConfig = {
  theme: forestTheme,
  generateCSS,
  applyToElement,
  getGradientClass
}
