import { Theme, ThemeConfig } from './types'

const sunsetTheme: Theme = {
  id: 'sunset',
  name: 'Sunset Vibes',
  description: 'Warm sunset gradients',
  colors: {
    primary: '#F59E0B',
    secondary: '#EF4444',
    accent: '#F97316',
    background: 'rgba(0,0,0,0.4)',
    text: '#FFF7ED',
    textSecondary: '#FED7AA'
  },
  gradient: 'from-yellow-400 via-orange-500 to-red-500',
  patternType: 'radial-gradient',
  backgroundPattern: 'bg-[radial-gradient(ellipse_at_top,rgba(255,255,0,0.1)_0%,transparent_70%)]',
  patternOpacity: 1,
  borderStyle: 'border border-orange-400/20',
  shadowStyle: 'shadow-2xl shadow-orange-500/25'
}

const generateCSS = (): string => {
  return `
    .profile-card-${sunsetTheme.id} {
      --theme-primary: ${sunsetTheme.colors.primary};
      --theme-secondary: ${sunsetTheme.colors.secondary};
      --theme-accent: ${sunsetTheme.colors.accent};
      --theme-background: ${sunsetTheme.colors.background};
      --theme-text: ${sunsetTheme.colors.text};
      --theme-text-secondary: ${sunsetTheme.colors.textSecondary};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', sunsetTheme.colors.primary)
  element.style.setProperty('--theme-secondary', sunsetTheme.colors.secondary)
  element.style.setProperty('--theme-accent', sunsetTheme.colors.accent)
  element.style.setProperty('--theme-background', sunsetTheme.colors.background)
  element.style.setProperty('--theme-text', sunsetTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', sunsetTheme.colors.textSecondary)
}

const getGradientClass = (): string => {
  return sunsetTheme.gradient
}

export const sunset: ThemeConfig = {
  theme: sunsetTheme,
  generateCSS,
  applyToElement,
  getGradientClass
}
