import type { Profile } from '@/types/profile'
import { Theme, ThemeColors } from '@/lib/themes'

interface GenerateSVGOptions {
  profile: Profile
  activeTheme: Theme
  customColors?: Partial<ThemeColors>
  cardRef: React.RefObject<HTMLDivElement | null>
}

// Lil vibecoded
const getThemeGradientColors = (themeId: string, colors: ThemeColors): { start: string; end: string } => {
  // Map of theme IDs to their gradient colors
  const themeGradients: Record<string, { start: string; end: string }> = {
    'cyberpunk': { start: '#00FFFF', end: '#FF00FF' },
    'sunset': { start: '#FACC15', end: '#EF4444' },
    'ocean-depths': { start: '#2563EB', end: '#14B8A6' },
    'cosmic': { start: '#6B21A8', end: '#1E3A8A' },
    'retro-wave': { start: '#EC4899', end: '#4F46E5' },
    'forest': { start: '#166534', end: '#0F766E' },
    'midnight': { start: '#0F172A', end: '#1E3A8A' },
    'obsidian': { start: '#09090B', end: '#18181B' },
    'aurora': { start: '#020617', end: '#4C1D95' },
    'neon-noir': { start: '#000000', end: '#18181B' },
    'void': { start: '#030010', end: '#3B0764' },
    'matrix': { start: '#000500', end: '#14532D' },
    'carbon': { start: '#0A0A0A', end: '#171717' },
    'ember': { start: '#0C0602', end: '#451A03' },
    'frost': { start: '#080F14', end: '#083344' },
    'rose-gold': { start: '#0F080C', end: '#4C0519' }
  }

  return themeGradients[themeId] || { start: colors.primary, end: colors.secondary }
}

// Helper to generate SVG pattern based on theme
const generatePatternDef = (theme: Theme, colors: ThemeColors): string => {
  const patternType = theme.patternType
  const opacity = theme.patternOpacity ?? 0.1
  const patternColor = colors.primary

  switch (patternType) {
    case 'dots':
      return `
        <pattern id="bgPattern" patternUnits="userSpaceOnUse" width="16" height="16">
          <circle cx="8" cy="8" r="1" fill="${patternColor}" opacity="${opacity}"/>
        </pattern>
      `
    case 'grid':
      return `
        <pattern id="bgPattern" patternUnits="userSpaceOnUse" width="24" height="24">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="${patternColor}" stroke-width="0.5" opacity="${opacity}"/>
        </pattern>
      `
    case 'cross-hatch':
      return `
        <pattern id="bgPattern" patternUnits="userSpaceOnUse" width="16" height="16">
          <path d="M 0 0 L 16 16 M 16 0 L 0 16" stroke="${patternColor}" stroke-width="0.5" opacity="${opacity}"/>
        </pattern>
      `
    case 'diagonal-lines':
      return `
        <pattern id="bgPattern" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="${patternColor}" stroke-width="0.5" opacity="${opacity}"/>
        </pattern>
      `
    case 'circuit':
      return `
        <pattern id="bgPattern" patternUnits="userSpaceOnUse" width="40" height="40">
          <path d="M 0 20 L 20 20 L 20 0 M 20 20 L 40 20 M 20 20 L 20 40" fill="none" stroke="${patternColor}" stroke-width="1" opacity="${opacity}"/>
          <circle cx="20" cy="20" r="3" fill="${patternColor}" opacity="${opacity}"/>
        </pattern>
      `
    case 'hexagon':
      return `
        <pattern id="bgPattern" patternUnits="userSpaceOnUse" width="28" height="49">
          <path d="M14,0 L28,12.25 L28,36.75 L14,49 L0,36.75 L0,12.25 Z" fill="none" stroke="${patternColor}" stroke-width="0.5" opacity="${opacity}" transform="translate(0, -12.25)"/>
        </pattern>
      `
    case 'mesh':
      return `
        <pattern id="bgPattern" patternUnits="userSpaceOnUse" width="32" height="32">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="${patternColor}" stroke-width="0.5" opacity="${opacity}"/>
          <path d="M 0 0 L 32 32" fill="none" stroke="${patternColor}" stroke-width="0.3" opacity="${opacity * 0.5}"/>
        </pattern>
      `
    case 'radial-gradient':
      return `
        <radialGradient id="bgPattern" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="${patternColor}" stop-opacity="${opacity * 2}"/>
          <stop offset="100%" stop-color="${patternColor}" stop-opacity="0"/>
        </radialGradient>
      `
    default:
      return ''
  }
}

export const generateSVG = async ({
  profile,
  activeTheme,
  customColors,
  cardRef
}: GenerateSVGOptions): Promise<string> => {
  if (!cardRef.current) return ''
  
  const colors = customColors ? { ...activeTheme.colors, ...customColors } : activeTheme.colors
  
  // Get the actual QR code SVG content
  const qrSvgElement = cardRef.current.querySelector('#qr-code-svg svg') as SVGElement
  let qrSvgContent = ''
  if (qrSvgElement) {
    // Get the QR code paths and rects for proper rendering
    const paths = qrSvgElement.querySelectorAll('path, rect')
    let qrPaths = ''
    paths.forEach(path => {
      if (path.tagName === 'path') {
        qrPaths += `<path d="${path.getAttribute('d')}" fill="${path.getAttribute('fill') || '#000000'}"/>`
      } else if (path.tagName === 'rect') {
        qrPaths += `<rect x="${path.getAttribute('x')}" y="${path.getAttribute('y')}" width="${path.getAttribute('width')}" height="${path.getAttribute('height')}" fill="${path.getAttribute('fill') || '#000000'}"/>`
      }
    })
    qrSvgContent = qrPaths
  }
  
  // Convert profile image to base64 if it exists
  let avatarBase64 = ''
  if (profile.avatar) {
    try {
      const response = await fetch(profile.avatar)
      const blob = await response.blob()
      const reader = new FileReader()
      avatarBase64 = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(blob)
      })
    } catch (error) {
      console.warn('Could not load avatar, using default', error)
    }
  }

  // Get theme gradient colors
  const hasCustomColors = customColors && Object.keys(customColors).length > 0
  const gradientColors = hasCustomColors 
    ? { start: colors.primary, end: colors.secondary }
    : getThemeGradientColors(activeTheme.id, colors)

  // Generate pattern definition
  const patternDef = generatePatternDef(activeTheme, colors)
  const hasPattern = activeTheme.patternType && activeTheme.patternType !== 'none'
  
  // Create comprehensive SVG that matches the exact layout
  const svg = `
    <svg width="384" height="500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <!-- Main theme gradient (outer) -->
        <linearGradient id="themeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${gradientColors.start}" />
          <stop offset="100%" style="stop-color:${gradientColors.end}" />
        </linearGradient>
        
        <!-- Avatar gradient (for placeholder) -->
        <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary}66" />
          <stop offset="100%" style="stop-color:${colors.secondary}66" />
        </linearGradient>
        
        <!-- Background pattern if exists -->
        ${patternDef}
        
        <!-- Avatar mask -->
        <clipPath id="avatarClip">
          <circle cx="192" cy="106" r="48"/>
        </clipPath>
      </defs>
      
      <!-- Outer gradient container (4px padding like p-1) -->
      <rect width="384" height="500" fill="url(#themeGradient)" rx="16"/>
      
      <!-- Background pattern overlay -->
      ${hasPattern && activeTheme.patternType !== 'radial-gradient' 
        ? `<rect width="384" height="500" fill="url(#bgPattern)" rx="16"/>` 
        : hasPattern && activeTheme.patternType === 'radial-gradient'
          ? `<rect width="384" height="500" fill="url(#bgPattern)" rx="16"/>`
          : ''
      }
      
      <!-- Inner card background (like backdrop-blur-sm bg-black/50) -->
      <rect x="4" y="4" width="376" height="492" fill="${colors.background}" opacity="0.95" rx="12"/>
      
      <!-- Card content area (p-8 = 32px padding) -->
      <g transform="translate(36, 36)">
        
        <!-- Avatar Section (96x96 = w-24 h-24, centered) -->
        <g transform="translate(156, 58)">
          <!-- Avatar border (border-4 border-white/20) -->
          <circle cx="0" cy="0" r="52" fill="${colors.primary}40" />
          
          <!-- Avatar -->
          ${avatarBase64 ? `
            <image x="-48" y="-48" width="96" height="96" href="${avatarBase64}" clip-path="url(#avatarClip)" transform="translate(36, 48)"/>
          ` : `
            <circle cx="0" cy="0" r="48" fill="url(#avatarGradient)"/>
            <text x="0" y="8" text-anchor="middle" fill="${colors.text}" font-size="32" font-weight="bold" font-family="system-ui, -apple-system, sans-serif">
              ${(profile.name || profile.username || 'U').charAt(0).toUpperCase()}
            </text>
          `}
        </g>
        
        <!-- Name and Username Section (space-y-1) -->
        <g transform="translate(156, 178)">
          <!-- Name -->
          <text x="0" y="0" text-anchor="middle" fill="${colors.text}" font-size="20" font-weight="bold" font-family="system-ui, -apple-system, sans-serif">
            ${profile.name || profile.username || 'Unknown'}
          </text>
          
          <!-- Username -->
          <text x="0" y="20" text-anchor="middle" fill="${colors.textSecondary}" font-size="14" font-family="system-ui, -apple-system, sans-serif">
            @${profile.username}
          </text>
        </g>
        
        <!-- Bio Section -->
        ${profile.bio ? `
        <g transform="translate(156, 225)">
          <text x="0" y="0" text-anchor="middle" fill="${colors.textSecondary}" font-size="14" font-family="system-ui, -apple-system, sans-serif">
            <tspan x="0" dy="0">${profile.bio.length > 50 ? profile.bio.slice(0, 50) + '...' : profile.bio}</tspan>
          </text>
        </g>
        ` : ''}
        
        <!-- QR Code Section (space-y-3, flex flex-col items-center) -->
        <g transform="translate(156, ${profile.bio ? '275' : '255'})">
          <!-- QR Code background (p-3 bg-white rounded-xl shadow-lg) -->
          <rect x="-43" y="-43" width="86" height="86" fill="white" rx="12" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.1))"/>
          
          <!-- QR Code content (80x80 size) -->
          <g transform="translate(-40, -40) scale(0.29)">
            ${qrSvgContent || `
              <rect width="276" height="276" fill="white"/>
              <text x="138" y="138" text-anchor="middle" fill="black" font-size="20" font-family="system-ui, -apple-system, sans-serif">QR</text>
            `}
          </g>
          
          <!-- "Scan to view profile" text -->
          <text x="0" y="65" text-anchor="middle" fill="${colors.textSecondary}" font-size="12" font-family="system-ui, -apple-system, sans-serif">
            Scan to view profile
          </text>
        </g>
        
        <!-- Platform Badge at bottom -->
        <g transform="translate(156, 400)">
          <rect x="-80" y="-12" width="160" height="24" fill="${colors.primary}" opacity="0.2" rx="12"/>
          <text x="0" y="4" text-anchor="middle" fill="${colors.text}" font-size="11" font-weight="600" font-family="system-ui, -apple-system, sans-serif">
            ${profile.platform.toUpperCase()} PROFILE
          </text>
        </g>
      </g>
    </svg>
  `.trim()
  
  return svg
}
