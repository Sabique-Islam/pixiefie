import { Theme, ThemeConfig } from './types'

const obsidianTheme: Theme = {
  id: 'obsidian',
  name: 'Obsidian',
  description: 'Pure dark minimalism with sharp contrasts',
  colors: {
    primary: '#FAFAFA',
    secondary: '#A1A1AA',
    accent: '#E4E4E7',
    background: 'rgba(9, 9, 11, 0.98)',
    text: '#FAFAFA',
    textSecondary: '#71717A'
  },
  gradient: 'from-zinc-950 via-neutral-950 to-stone-950',
  patternType: 'dots',
  backgroundPattern: 'pattern-dots',
  patternOpacity: 0.02,
  borderStyle: 'border border-zinc-800/50',
  shadowStyle: 'shadow-2xl shadow-black/80'
}

const generateCSS = (): string => {
  return `
    .profile-card-${obsidianTheme.id} {
      --theme-primary: ${obsidianTheme.colors.primary};
      --theme-secondary: ${obsidianTheme.colors.secondary};
      --theme-accent: ${obsidianTheme.colors.accent};
      --theme-background: ${obsidianTheme.colors.background};
      --theme-text: ${obsidianTheme.colors.text};
      --theme-text-secondary: ${obsidianTheme.colors.textSecondary};
    }
  `
}

const applyToElement = (element: HTMLElement): void => {
  element.style.setProperty('--theme-primary', obsidianTheme.colors.primary)
  element.style.setProperty('--theme-secondary', obsidianTheme.colors.secondary)
  element.style.setProperty('--theme-accent', obsidianTheme.colors.accent)
  element.style.setProperty('--theme-background', obsidianTheme.colors.background)
  element.style.setProperty('--theme-text', obsidianTheme.colors.text)
  element.style.setProperty('--theme-text-secondary', obsidianTheme.colors.textSecondary)
}

const getGradientClass = (): string => {
  return obsidianTheme.gradient
}

export const obsidian: ThemeConfig = {
  theme: obsidianTheme,
  generateCSS,
  applyToElement,
  getGradientClass
}
