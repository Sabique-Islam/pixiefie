import { Theme, ThemeConfig } from './types'

const carbonTheme: Theme = {
  id: 'carbon',
  name: 'Carbon',
  description: 'Industrial dark with metallic texture',
  colors: {
    primary: '#737373',
    secondary: '#525252',
    accent: '#A3A3A3',
    background: 'rgba(10, 10, 10, 0.98)',
    text: '#E5E5E5',
    textSecondary: '#A3A3A3'
  },
  gradient: 'from-neutral-950 via-neutral-900 to-neutral-950',
  patternType: 'cross-hatch',
  backgroundPattern: 'pattern-cross-hatch',
  patternOpacity: 0.02,
  borderStyle: 'border border-neutral-700/30',
  shadowStyle: 'shadow-2xl shadow-neutral-900/70'
}

const generateCSS = (): string => {
  return `
    .profile-card-${carbonTheme.id} {
      --theme-primary: ${carbonTheme.colors.primary};
      --theme-secondary: ${carbonTheme.colors.secondary};
      --theme-accent: ${carbonTheme.colors.accent};
      --theme-background: ${carbonTheme.colors.background};
      --theme-text: ${carbonTheme.colors.text};
      --theme-text-secondary: ${carbonTheme.colors.textSecondary};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', carbonTheme.colors.primary)
  element.style.setProperty('--theme-secondary', carbonTheme.colors.secondary)
  element.style.setProperty('--theme-accent', carbonTheme.colors.accent)
  element.style.setProperty('--theme-background', carbonTheme.colors.background)
  element.style.setProperty('--theme-text', carbonTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', carbonTheme.colors.textSecondary)
}

const getGradientClass = (): string => {
  return carbonTheme.gradient
}

export const carbon: ThemeConfig = {
  theme: carbonTheme,
  generateCSS,
  applyToElement,
  getGradientClass
}
