import { Theme, ThemeConfig } from './types'

const voidThemeData: Theme = {
  id: 'void',
  name: 'Void',
  description: 'Absolute darkness with purple mystique',
  colors: {
    primary: '#A855F7',
    secondary: '#6366F1',
    accent: '#C084FC',
    background: 'rgba(3, 0, 10, 0.98)',
    text: '#FAF5FF',
    textSecondary: '#D8B4FE'
  },
  gradient: 'from-black via-purple-950/30 to-black',
  patternType: 'radial-gradient',
  backgroundPattern: 'bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.08)_0%,transparent_60%)]',
  patternOpacity: 1,
  borderStyle: 'border border-purple-500/20',
  shadowStyle: 'shadow-2xl shadow-purple-900/40',
  glowColor: 'rgba(168, 85, 247, 0.2)',
  glowIntensity: 'subtle'
}

const generateCSS = (): string => {
  return `
    .profile-card-${voidThemeData.id} {
      --theme-primary: ${voidThemeData.colors.primary};
      --theme-secondary: ${voidThemeData.colors.secondary};
      --theme-accent: ${voidThemeData.colors.accent};
      --theme-background: ${voidThemeData.colors.background};
      --theme-text: ${voidThemeData.colors.text};
      --theme-text-secondary: ${voidThemeData.colors.textSecondary};
      --glow-color: ${voidThemeData.glowColor};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', voidThemeData.colors.primary)
  element.style.setProperty('--theme-secondary', voidThemeData.colors.secondary)
  element.style.setProperty('--theme-accent', voidThemeData.colors.accent)
  element.style.setProperty('--theme-background', voidThemeData.colors.background)
  element.style.setProperty('--theme-text', voidThemeData.colors.text)
  element.style.setProperty('--theme-text-secondary', voidThemeData.colors.textSecondary)
  if (voidThemeData.glowColor) {
    element.style.setProperty('--glow-color', voidThemeData.glowColor)
  }
}

const getGradientClass = (): string => {
  return voidThemeData.gradient
}

export const voidTheme: ThemeConfig = {
  theme: voidThemeData,
  generateCSS,
  applyToElement,
  getGradientClass
}
