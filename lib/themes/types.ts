export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  textSecondary: string
}

export interface Theme {
  id: string
  name: string
  description: string
  colors: ThemeColors
  gradient: string
  backgroundPattern?: string
  borderStyle?: string
  shadowStyle?: string
}

export interface ThemeConfig {
  theme: Theme
  generateCSS: () => string
  applyToElement: (element: HTMLElement) => void
  getGradientClass: () => string
  getPlatformGradient?: (platform: string) => string
}
