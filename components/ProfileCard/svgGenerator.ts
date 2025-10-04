import type { Profile } from '@/types/profile'
import { Theme, ThemeColors } from '@/lib/themes'

interface GenerateSVGOptions {
  profile: Profile
  activeTheme: Theme
  customColors?: Partial<ThemeColors>
  cardRef: React.RefObject<HTMLDivElement | null>
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
      console.log('Could not load avatar, using default')
    }
  }

  // Get theme gradient classes and convert to actual colors
  let gradientStart = colors.primary
  let gradientEnd = colors.secondary
  
  // Parse theme gradient for better color matching
  if (activeTheme.id === 'cyberpunk') {
    gradientStart = '#10B981' // emerald-500
    gradientEnd = '#3B82F6'   // blue-500
  } else if (activeTheme.id === 'sunset') {
    gradientStart = '#F97316' // orange-500
    gradientEnd = '#EC4899'   // pink-500
  } else if (activeTheme.id === 'ocean') {
    gradientStart = '#0EA5E9' // sky-500
    gradientEnd = '#1E40AF'   // blue-700
  } else if (activeTheme.id === 'cosmic') {
    gradientStart = '#8B5CF6' // violet-500
    gradientEnd = '#EC4899'   // pink-500
  } else if (activeTheme.id === 'retro') {
    gradientStart = '#EC4899' // pink-500
    gradientEnd = '#06B6D4'   // cyan-500
  }
  
  // Create comprehensive SVG that matches the exact layout
  const svg = `
    <svg width="384" height="500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <!-- Main theme gradient (outer) -->
        <linearGradient id="themeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${gradientStart}" />
          <stop offset="100%" style="stop-color:${gradientEnd}" />
        </linearGradient>
        
        <!-- Avatar gradient -->
        <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary}" />
          <stop offset="100%" style="stop-color:${colors.secondary}" />
        </linearGradient>
        
        <!-- Background pattern if exists -->
        ${activeTheme.backgroundPattern ? `
        <pattern id="bgPattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
          <rect width="20" height="20" fill="transparent"/>
          <circle cx="10" cy="10" r="1" fill="${gradientStart}" opacity="0.1"/>
        </pattern>
        ` : ''}
        
        <!-- Avatar mask -->
        <clipPath id="avatarClip">
          <circle cx="192" cy="106" r="48"/>
        </clipPath>
      </defs>
      
      <!-- Outer gradient container (4px padding like p-1) -->
      <rect width="384" height="500" fill="url(#themeGradient)" rx="16"/>
      
      <!-- Background pattern overlay -->
      ${activeTheme.backgroundPattern ? `<rect width="384" height="500" fill="url(#bgPattern)" opacity="0.3" rx="16"/>` : ''}
      
      <!-- Inner card background (like backdrop-blur-sm bg-black/50) -->
      <rect x="4" y="4" width="376" height="492" fill="${colors.background}" opacity="0.95" rx="12"/>
      
      <!-- Card content area (p-8 = 32px padding) -->
      <g transform="translate(36, 36)">
        
        <!-- Avatar Section (96x96 = w-24 h-24, centered) -->
        <g transform="translate(156, 58)">
          <!-- Avatar border (border-4 border-white/20) -->
          <circle cx="0" cy="0" r="52" fill="rgba(255,255,255,0.2)" />
          
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
          <text x="0" y="65" text-anchor="middle" fill="rgba(156, 163, 175, 1)" font-size="12" font-family="system-ui, -apple-system, sans-serif">
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
