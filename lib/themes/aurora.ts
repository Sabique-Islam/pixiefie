import { Theme, ThemeConfig } from './types'

const auroraTheme: Theme = {
  id: 'aurora',
  name: 'Aurora',
  description: 'Northern lights with ethereal color shifts',
  colors: {
    primary: '#22D3EE',
    secondary: '#A78BFA',
    accent: '#34D399',
    background: 'rgba(2, 6, 23, 0.92)',
    text: '#F0FDFA',
    textSecondary: '#99F6E4'
  },
  gradient: 'from-slate-950 via-emerald-950 to-violet-950',
  patternType: 'radial-gradient',
  backgroundPattern: 'bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.15)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(167,139,250,0.15)_0%,transparent_50%),radial-gradient(ellipse_at_center,rgba(52,211,153,0.08)_0%,transparent_70%)]',
  patternOpacity: 1,
  borderStyle: 'border border-cyan-500/20',
  shadowStyle: 'shadow-2xl shadow-cyan-900/30',
  glowColor: 'rgba(34, 211, 238, 0.15)',
  glowIntensity: 'subtle'
}

const generateCSS = (): string => {
  return `
    .profile-card-${auroraTheme.id} {
      --theme-primary: ${auroraTheme.colors.primary};
      --theme-secondary: ${auroraTheme.colors.secondary};
      --theme-accent: ${auroraTheme.colors.accent};
      --theme-background: ${auroraTheme.colors.background};
      --theme-text: ${auroraTheme.colors.text};
      --theme-text-secondary: ${auroraTheme.colors.textSecondary};
      --glow-color: ${auroraTheme.glowColor};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', auroraTheme.colors.primary)
  element.style.setProperty('--theme-secondary', auroraTheme.colors.secondary)
  element.style.setProperty('--theme-accent', auroraTheme.colors.accent)
  element.style.setProperty('--theme-background', auroraTheme.colors.background)
  element.style.setProperty('--theme-text', auroraTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', auroraTheme.colors.textSecondary)
  if (auroraTheme.glowColor) {
    element.style.setProperty('--glow-color', auroraTheme.glowColor)
  }
}

const getGradientClass = (): string => {
  return auroraTheme.gradient
}

export const aurora: ThemeConfig = {
  theme: auroraTheme,
  generateCSS,
  applyToElement,
  getGradientClass
}
