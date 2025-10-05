'use client'

import { FC, useState } from 'react'
import { Palette, Settings, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { Theme, defaultThemes, ThemeColors } from '@/lib/themes'
import { ThemePreview } from './ThemePreview'

interface ThemeSelectorProps {
  selectedTheme: Theme
  customColors: Partial<ThemeColors>
  onThemeChange: (theme: Theme) => void
  onColorsChange: (colors: Partial<ThemeColors>) => void
}

const THEMES_PER_PAGE = 6

export const ThemeSelector: FC<ThemeSelectorProps> = ({
  selectedTheme,
  customColors,
  onThemeChange,
  onColorsChange
}) => {
  const [showCustomColors, setShowCustomColors] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = Math.ceil(defaultThemes.length / THEMES_PER_PAGE)
  const startIndex = currentPage * THEMES_PER_PAGE
  const endIndex = startIndex + THEMES_PER_PAGE
  const currentThemes = defaultThemes.slice(startIndex, endIndex)

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleColorChange = (colorKey: keyof ThemeColors, value: string) => {
    onColorsChange({
      ...customColors,
      [colorKey]: value
    })
  }

  return (
    <div className="space-y-6">
      {/* Theme Selector */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Choose Theme
          </h3>
          
          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className={`p-2 rounded-lg border transition-all ${
                currentPage === 0
                  ? 'border-zinc-700 text-zinc-600 cursor-not-allowed'
                  : 'border-zinc-600 text-white hover:border-zinc-400 hover:bg-white/5'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <span className="text-sm text-gray-400 min-w-[80px] text-center">
              {currentPage + 1} / {totalPages}
            </span>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className={`p-2 rounded-lg border transition-all ${
                currentPage === totalPages - 1
                  ? 'border-zinc-700 text-zinc-600 cursor-not-allowed'
                  : 'border-zinc-600 text-white hover:border-zinc-400 hover:bg-white/5'
              }`}
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {currentThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                selectedTheme.id === theme.id
                  ? 'border-white bg-white/10'
                  : 'border-zinc-600 hover:border-zinc-400'
              }`}
            >
              {/* Theme Preview */}
              <div className="mb-3">
                <ThemePreview 
                  theme={theme} 
                  customColors={selectedTheme.id === theme.id ? customColors : undefined}
                />
                {selectedTheme.id === theme.id && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                    <Check size={12} />
                  </div>
                )}
              </div>
              
              <div className="text-left">
                <h4 className="text-sm font-medium text-white">{theme.name}</h4>
                <p className="text-xs text-gray-400 mt-1">{theme.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Color Editor */}
      <div>
        <button
          onClick={() => setShowCustomColors(!showCustomColors)}
          className="flex items-center gap-2 text-lg font-semibold text-white mb-4 hover:text-gray-300 transition-colors"
        >
          <Settings className="w-5 h-5" />
          Custom Colors
          <div className={`transition-transform duration-200 ${showCustomColors ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </button>

        {showCustomColors && (
          <div className="bg-black/30 rounded-xl p-6 space-y-4 border border-zinc-700">
            <div className="grid grid-cols-2 gap-4">
              {/* Primary Color */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Primary Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customColors.primary || selectedTheme.colors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="w-12 h-10 rounded border border-zinc-600 bg-black cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColors.primary || selectedTheme.colors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="flex-1 px-3 py-2 bg-black border border-zinc-600 rounded text-white text-sm"
                    placeholder="#4F46E5"
                  />
                </div>
              </div>

              {/* Secondary Color */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Secondary Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customColors.secondary || selectedTheme.colors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="w-12 h-10 rounded border border-zinc-600 bg-black cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColors.secondary || selectedTheme.colors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="flex-1 px-3 py-2 bg-black border border-zinc-600 rounded text-white text-sm"
                    placeholder="#7C3AED"
                  />
                </div>
              </div>

              {/* Accent Color */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Accent Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customColors.accent || selectedTheme.colors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="w-12 h-10 rounded border border-zinc-600 bg-black cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColors.accent || selectedTheme.colors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="flex-1 px-3 py-2 bg-black border border-zinc-600 rounded text-white text-sm"
                    placeholder="#EC4899"
                  />
                </div>
              </div>

              {/* Text Color */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Text Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customColors.text || selectedTheme.colors.text}
                    onChange={(e) => handleColorChange('text', e.target.value)}
                    className="w-12 h-10 rounded border border-zinc-600 bg-black cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColors.text || selectedTheme.colors.text}
                    onChange={(e) => handleColorChange('text', e.target.value)}
                    className="flex-1 px-3 py-2 bg-black border border-zinc-600 rounded text-white text-sm"
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="pt-4 border-t border-zinc-600">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Live Preview</h4>
              <ThemePreview theme={selectedTheme} customColors={customColors} />
            </div>

            <div className="pt-4 border-t border-zinc-600">
              <button
                onClick={() => onColorsChange({})}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Reset to theme defaults
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}