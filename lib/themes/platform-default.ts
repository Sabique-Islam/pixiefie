import { Theme, ThemeConfig } from './types'

const platformDefaultTheme: Theme = {
  id: 'platform-default',
  name: 'Platform Default',
  description: 'Classic platform-based gradients',
  colors: {
    primary: '#4F46E5',
    secondary: '#7C3AED',
    accent: '#EC4899',
    background: 'rgba(0,0,0,0.5)',
    text: '#FFFFFF',
    textSecondary: '#D1D5DB'
  },
  gradient: 'platform-specific',
  shadowStyle: 'shadow-2xl'
}

const platformGradients: Record<string, string> = {
  'github': 'from-gray-800 to-gray-900',
  'reddit': 'from-orange-800 to-red-900',
  'instagram': 'from-pink-800 to-purple-900',
  'x': 'from-blue-800 to-blue-900',
  'linkedin': 'from-blue-700 to-blue-800',
  'twitter': 'from-blue-800 to-blue-900'
}

const generateCSS = (): string => {
  return `
    .profile-card-${platformDefaultTheme.id} {
      --theme-primary: ${platformDefaultTheme.colors.primary};
      --theme-secondary: ${platformDefaultTheme.colors.secondary};
      --theme-accent: ${platformDefaultTheme.colors.accent};
      --theme-background: ${platformDefaultTheme.colors.background};
      --theme-text: ${platformDefaultTheme.colors.text};
      --theme-text-secondary: ${platformDefaultTheme.colors.textSecondary};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', platformDefaultTheme.colors.primary)
  element.style.setProperty('--theme-secondary', platformDefaultTheme.colors.secondary)
  element.style.setProperty('--theme-accent', platformDefaultTheme.colors.accent)
  element.style.setProperty('--theme-background', platformDefaultTheme.colors.background)
  element.style.setProperty('--theme-text', platformDefaultTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', platformDefaultTheme.colors.textSecondary)
}

const getGradientClass = (): string => {
  return platformDefaultTheme.gradient
}

const getPlatformGradient = (platform: string): string => {
  return platformGradients[platform.toLowerCase()] || 'from-gray-800 to-gray-900'
}

export const platformDefault: ThemeConfig = {
  theme: platformDefaultTheme,
  generateCSS,
  applyToElement,
  getGradientClass,
  getPlatformGradient
}
