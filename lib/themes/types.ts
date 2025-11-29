export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  textSecondary: string
}

// Theme patters (can add more)
export type PatternType = 
  | 'none'
  | 'dots'
  | 'grid'
  | 'cross-hatch'
  | 'diagonal-lines'
  | 'mesh'
  | 'circuit'
  | 'hexagon'
  | 'waves'
  | 'noise'
  | 'radial-gradient'
  | 'custom'

export interface Theme {
  id: string
  name: string
  description: string
  colors: ThemeColors
  gradient: string
  // Pattern configuration
  patternType?: PatternType
  backgroundPattern?: string // Custom CSS pattern or class name
  patternOpacity?: number // 0-1, defaults to 0.1
  borderStyle?: string
  shadowStyle?: string
  glowColor?: string
  glowIntensity?: 'subtle' | 'medium' | 'strong'
}

export interface ThemeConfig {
  theme: Theme
  generateCSS: () => string
  applyToElement: (element: HTMLElement) => void
  getGradientClass: () => string
  getPlatformGradient?: (platform: string) => string
}

export const getPatternClass = (patternType?: PatternType): string => {
  if (!patternType || patternType === 'none') return ''
  return `pattern-${patternType}`
}

export const getGlowStyles = (theme: Theme): string => {
  if (!theme.glowColor) return ''
  const intensityMap = {
    subtle: '0 0 20px',
    medium: '0 0 40px',
    strong: '0 0 60px, 0 0 100px'
  }
  const intensity = theme.glowIntensity || 'subtle'
  return `box-shadow: ${intensityMap[intensity]} ${theme.glowColor}`
}
