import { Theme, ThemeConfig } from './types'

const matrixTheme: Theme = {
  id: 'matrix',
  name: 'Matrix',
  description: 'Digital rain with phosphor green glow',
  colors: {
    primary: '#22C55E',
    secondary: '#15803D',
    accent: '#4ADE80',
    background: 'rgba(0, 5, 0, 0.97)',
    text: '#4ADE80',
    textSecondary: '#86EFAC'
  },
  gradient: 'from-black via-green-950/40 to-black',
  patternType: 'diagonal-lines',
  backgroundPattern: 'pattern-diagonal-lines',
  patternOpacity: 0.03,
  borderStyle: 'border border-green-500/30',
  shadowStyle: 'shadow-2xl shadow-green-900/30',
  glowColor: 'rgba(34, 197, 94, 0.25)',
  glowIntensity: 'medium'
}

const generateCSS = (): string => {
  return `
    .profile-card-${matrixTheme.id} {
      --theme-primary: ${matrixTheme.colors.primary};
      --theme-secondary: ${matrixTheme.colors.secondary};
      --theme-accent: ${matrixTheme.colors.accent};
      --theme-background: ${matrixTheme.colors.background};
      --theme-text: ${matrixTheme.colors.text};
      --theme-text-secondary: ${matrixTheme.colors.textSecondary};
      --glow-color: ${matrixTheme.glowColor};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', matrixTheme.colors.primary)
  element.style.setProperty('--theme-secondary', matrixTheme.colors.secondary)
  element.style.setProperty('--theme-accent', matrixTheme.colors.accent)
  element.style.setProperty('--theme-background', matrixTheme.colors.background)
  element.style.setProperty('--theme-text', matrixTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', matrixTheme.colors.textSecondary)
  if (matrixTheme.glowColor) {
    element.style.setProperty('--glow-color', matrixTheme.glowColor)
  }
}

const getGradientClass = (): string => {
  return matrixTheme.gradient
}

export const matrix: ThemeConfig = {
  theme: matrixTheme,
  generateCSS,
  applyToElement,
  getGradientClass
}
