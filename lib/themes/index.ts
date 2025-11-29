export type { Theme, ThemeColors, ThemeConfig, PatternType } from './types'
export { getPatternClass, getGlowStyles } from './types'

import type { Theme, ThemeConfig, ThemeColors } from './types'

// To add a new theme: just create a new file and add it here
import { platformDefault } from './platform-default'
import { cyberpunk } from './cyberpunk'
import { sunset } from './sunset'
import { oceanDepths } from './ocean-depths'
import { cosmic } from './cosmic'
import { retroWave } from './retro-wave'
import { forest } from './forest'
import { midnight } from './midnight'
import { obsidian } from './obsidian'
import { aurora } from './aurora'
import { neonNoir } from './neon-noir'
import { voidTheme } from './void'
import { matrix } from './matrix'
import { carbon } from './carbon'
import { ember } from './ember'
import { frost } from './frost'
import { roseGold } from './rose-gold'

// Just add your imported theme to this array and it will be registered automatically
// Order matters for display - darker/more aesthetic themes first
const allThemeConfigs: ThemeConfig[] = [
  // Dark aesthetics
  midnight,
  obsidian,
  aurora,
  neonNoir,
  voidTheme,
  matrix,
  carbon,
  ember,
  frost,
  roseGold,
  // Classic themes
  platformDefault,
  forest,
  cyberpunk,
  sunset,
  oceanDepths,
  cosmic,
  retroWave
]

// Build the registry automatically from the array
export const themeRegistry: Record<string, ThemeConfig> = allThemeConfigs.reduce((registry, config) => {
  registry[config.theme.id] = config
  return registry
}, {} as Record<string, ThemeConfig>)

// Get all themes as an array (for UI selection) [not sure if there is a better approach!]
export const getAllThemes = (): Theme[] => {
  return Object.values(themeRegistry).map(config => config.theme)
}

// Get theme by ID
export const getThemeById = (id: string): ThemeConfig | undefined => {
  return themeRegistry[id]
}

// Get platform-specific theme
export const getPlatformTheme = (platform: string, customColors?: Partial<ThemeColors>): Theme => {
  const platformConfig = themeRegistry['platform-default']
  const baseTheme = platformConfig.theme

  if (platformConfig.getPlatformGradient) {
    const gradient = platformConfig.getPlatformGradient(platform)
    return {
      ...baseTheme,
      gradient,
      colors: customColors ? { ...baseTheme.colors, ...customColors } : baseTheme.colors
    }
  }

  return {
    ...baseTheme,
    colors: customColors ? { ...baseTheme.colors, ...customColors } : baseTheme.colors
  }
}

// Generate CSS for a specific theme
export const generateThemeCSS = (themeId: string): string => {
  const themeConfig = themeRegistry[themeId]
  return themeConfig ? themeConfig.generateCSS() : ''
}

// Generate CSS for all themes
export const generateAllThemesCSS = (): string => {
  return Object.values(themeRegistry)
    .map(config => config.generateCSS())
    .join('\n')
}

// Apply theme to an HTML element
export const applyThemeToElement = (element: HTMLElement, themeId: string): void => {
  const themeConfig = themeRegistry[themeId]
  if (themeConfig) {
    themeConfig.applyToElement(element)
  }
}

// Get gradient class for a theme
export const getThemeGradient = (themeId: string): string => {
  const themeConfig = themeRegistry[themeId]
  return themeConfig ? themeConfig.getGradientClass() : ''
}

// Get theme colors for direct usage
export const getThemeColors = (themeId: string): ThemeColors | undefined => {
  const themeConfig = themeRegistry[themeId]
  return themeConfig?.theme.colors
}

// Utility to create a custom theme variant
export const createCustomTheme = (
    //types
  baseThemeId: string,
  customColors: Partial<ThemeColors>,
  customId?: string
): Theme | undefined => {
  const baseConfig = themeRegistry[baseThemeId]
  if (!baseConfig) return undefined

  const baseTheme = baseConfig.theme
  return {
    ...baseTheme,
    id: customId || `${baseThemeId}-custom`,
    colors: { ...baseTheme.colors, ...customColors }
  }
}

// Export default themes array for backward compatibility
export const defaultThemes: Theme[] = getAllThemes()

export {
  platformDefault,
  cyberpunk,
  sunset,
  oceanDepths,
  cosmic,
  forest,
  retroWave,
  // New dark themes
  midnight,
  obsidian,
  aurora,
  neonNoir,
  voidTheme,
  matrix,
  carbon,
  ember,
  frost,
  roseGold
}
