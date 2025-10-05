import { Theme, ThemeConfig } from './types'

const oceanDepthsTheme: Theme = {
  id: 'ocean-depths',
  name: 'Ocean Depths',
  description: 'Deep ocean blues and teals',
  colors: {
    primary: '#0891B2',
    secondary: '#1E40AF',
    accent: '#059669',
    background: 'rgba(0,0,0,0.6)',
    text: '#F0F9FF',
    textSecondary: '#BAE6FD'
  },
  gradient: 'from-blue-600 via-teal-500 to-emerald-500',
  backgroundPattern: 'bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1)_0%,transparent_50%),radial-gradient(circle_at_75%_75%,rgba(20,184,166,0.1)_0%,transparent_50%)]',
  shadowStyle: 'shadow-2xl shadow-blue-500/25'
}

const generateCSS = (): string => {
  return `
    .profile-card-${oceanDepthsTheme.id} {
      --theme-primary: ${oceanDepthsTheme.colors.primary};
      --theme-secondary: ${oceanDepthsTheme.colors.secondary};
      --theme-accent: ${oceanDepthsTheme.colors.accent};
      --theme-background: ${oceanDepthsTheme.colors.background};
      --theme-text: ${oceanDepthsTheme.colors.text};
      --theme-text-secondary: ${oceanDepthsTheme.colors.textSecondary};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', oceanDepthsTheme.colors.primary)
  element.style.setProperty('--theme-secondary', oceanDepthsTheme.colors.secondary)
  element.style.setProperty('--theme-accent', oceanDepthsTheme.colors.accent)
  element.style.setProperty('--theme-background', oceanDepthsTheme.colors.background)
  element.style.setProperty('--theme-text', oceanDepthsTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', oceanDepthsTheme.colors.textSecondary)
}

const getGradientClass = (): string => {
  return oceanDepthsTheme.gradient
}

export const oceanDepths: ThemeConfig = {
  theme: oceanDepthsTheme,
  generateCSS,
  applyToElement,
  getGradientClass
}
