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

export const defaultThemes: Theme[] = [
  {
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
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon gradients with electric vibes',
    colors: {
      primary: '#00FFFF',
      secondary: '#FF00FF',
      accent: '#FFFF00',
      background: 'rgba(0,0,0,0.8)',
      text: '#00FFFF',
      textSecondary: '#FF00FF'
    },
    gradient: 'from-cyan-400 via-purple-500 to-pink-500',
    backgroundPattern: 'bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1)_0%,transparent_50%)]',
    borderStyle: 'border-2 border-cyan-400/50',
    shadowStyle: 'shadow-2xl shadow-cyan-500/25'
  },
  {
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
    backgroundPattern: 'bg-[radial-gradient(ellipse_at_top,rgba(255,255,0,0.1)_0%,transparent_70%)]',
    shadowStyle: 'shadow-2xl shadow-orange-500/25'
  },
  {
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
  },
  {
    id: 'cosmic',
    name: 'Cosmic',
    description: 'Starry cosmic patterns with galaxy gradients',
    colors: {
      primary: '#8B5CF6',
      secondary: '#3B82F6',
      accent: '#EC4899',
      background: 'rgba(0,0,0,0.7)',
      text: '#F8FAFC',
      textSecondary: '#C7D2FE'
    },
    gradient: 'from-purple-900 via-blue-900 to-indigo-900',
    backgroundPattern: 'bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_40%_40%,rgba(120,119,198,0.2)_0%,transparent_50%)]',
    borderStyle: 'border border-purple-500/30',
    shadowStyle: 'shadow-2xl shadow-purple-500/25'
  },
  {
    id: 'retro-wave',
    name: 'Retro Wave',
    description: '80s synthwave aesthetic',
    colors: {
      primary: '#FF00FF',
      secondary: '#00FFFF',
      accent: '#FFFF00',
      background: 'rgba(0,0,0,0.8)',
      text: '#FF00FF',
      textSecondary: '#00FFFF'
    },
    gradient: 'from-pink-500 via-purple-600 to-indigo-600',
    backgroundPattern: 'bg-[linear-gradient(45deg,transparent_25%,rgba(255,0,255,0.1)_25%,rgba(255,0,255,0.1)_50%,transparent_50%,transparent_75%,rgba(0,255,255,0.1)_75%)] bg-[length:20px_20px]',
    borderStyle: 'border-2 border-pink-500/50',
    shadowStyle: 'shadow-2xl shadow-pink-500/25'
  }
]

export const getPlatformTheme = (platform: string, customColors?: Partial<ThemeColors>): Theme => {
  const baseTheme = defaultThemes[0] // Platform default
  
  const platformGradients: Record<string, string> = {
    'github': 'from-gray-800 to-gray-900',
    'reddit': 'from-orange-800 to-red-900', 
    'instagram': 'from-pink-800 to-purple-900',
    'x': 'from-blue-800 to-blue-900',
    'linkedin': 'from-blue-700 to-blue-800'
  }

  return {
    ...baseTheme,
    gradient: platformGradients[platform.toLowerCase()] || 'from-gray-800 to-gray-900',
    colors: customColors ? { ...baseTheme.colors, ...customColors } : baseTheme.colors
  }
}

export const generateCustomCSS = (theme: Theme): string => {
  return `
    .profile-card-${theme.id} {
      --theme-primary: ${theme.colors.primary};
      --theme-secondary: ${theme.colors.secondary};
      --theme-accent: ${theme.colors.accent};
      --theme-background: ${theme.colors.background};
      --theme-text: ${theme.colors.text};
      --theme-text-secondary: ${theme.colors.textSecondary};
    }
  `
}