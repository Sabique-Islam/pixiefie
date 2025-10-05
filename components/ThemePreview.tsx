'use client'

import { FC } from 'react'
import { Theme, ThemeColors } from '@/lib/themes'

interface ThemePreviewProps {
  theme: Theme
  customColors?: Partial<ThemeColors>
}

export const ThemePreview: FC<ThemePreviewProps> = ({ theme, customColors }) => {
  const colors = customColors ? { ...theme.colors, ...customColors } : theme.colors

  const getThemeClasses = () => {
    if (theme.id === 'platform-default') {
      return 'from-gray-800 to-gray-900'
    }
    return theme.gradient
  }

  return (
    <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${getThemeClasses()} p-4 relative overflow-hidden ${theme.shadowStyle || 'shadow-lg'} ${theme.borderStyle || ''}`}>
      {/* Background Pattern */}
      {theme.backgroundPattern && (
        <div className={`absolute inset-0 ${theme.backgroundPattern}`} />
      )}
      
      <div 
        className="relative w-full h-full flex flex-col items-center justify-center space-y-2"
      >
        {/* Mini Avatar */}
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ 
            backgroundColor: colors.primary,
            color: colors.text
          }}
        >
          U
        </div>
        
        {/* Mini Name */}
        <div className="text-center space-y-1">
          <div 
            className="text-xs font-bold"
            style={{ color: colors.text }}
          >
            Username
          </div>
          <div 
            className="text-[10px]"
            style={{ color: colors.textSecondary }}
          >
            @handle
          </div>
        </div>
        
        {/* Mini QR placeholder */}
        <div className="w-6 h-6 bg-white rounded-sm opacity-90" />
      </div>
    </div>
  )
}