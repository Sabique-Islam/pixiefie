'use client'

import Image from 'next/image'
import QRCode from 'react-qr-code'
import { FC, useRef, useState } from 'react'
import { Download, Copy, Check } from 'lucide-react'
import type { Profile } from '@/types/profile'
import { Theme, ThemeColors, getPlatformTheme } from '@/lib/themes'
import { siGithub, siReddit } from 'simple-icons'

interface ProfileCardProps {
  profile: Profile
  theme?: Theme
  customColors?: Partial<ThemeColors>
}

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'github':
      return siGithub
    case 'reddit':
      return siReddit
    default:
      return null
  }
}

const PlatformIcon: FC<{ platform: string }> = ({ platform }) => {
  const icon = getPlatformIcon(platform)
  if (!icon) return null

  return (
    <div
      className="w-5 h-5 inline-block"
      dangerouslySetInnerHTML={{ __html: icon.svg }}
      style={{ fill: 'currentColor', color: platform === 'reddit' ? '#FF4500' : '#ffffff' }}
      title={platform}
    />
  )
}

const ProfileCard: FC<ProfileCardProps> = ({ profile, theme, customColors }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState<string | null>(null)

  // Use custom theme or fallback to platform theme
  const activeTheme = theme || getPlatformTheme(profile.platform, customColors)
  const colors = customColors ? { ...activeTheme.colors, ...customColors } : activeTheme.colors

  const getThemeClasses = () => {
    if (activeTheme.id === 'platform-default') {
      return getPlatformColor(profile.platform)
    }
    return activeTheme.gradient
  }

  const getBackgroundPattern = () => {
    return activeTheme.backgroundPattern || ''
  }

  const getBorderStyle = () => {
    return activeTheme.borderStyle || ''
  }

  const getShadowStyle = () => {
    return activeTheme.shadowStyle || 'shadow-2xl'
  }

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return 'from-gray-800 to-gray-900'
      case 'reddit': return 'from-orange-800 to-red-900'
      case 'instagram': return 'from-pink-800 to-purple-900'
      case 'twitter': case 'x': return 'from-blue-800 to-blue-900'
      case 'linkedin': return 'from-blue-700 to-blue-800'
      default: return 'from-gray-800 to-gray-900'
    }
  }

  const generateSVG = async () => {
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
    const themeGradient = getThemeClasses()
    let gradientStart = colors.primary
    let gradientEnd = colors.secondary
    
    // Parse theme gradient for better color matching
    if (themeGradient.includes('from-')) {
      // Extract actual gradient colors based on theme
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

  const getPlatformGradientStart = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return '#1F2937'
      case 'reddit': return '#9A3412'
      case 'instagram': return '#A21CAF'
      case 'twitter': case 'x': return '#1E40AF'
      case 'linkedin': return '#1D4ED8'
      default: return '#1F2937'
    }
  }

  const getPlatformGradientEnd = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return '#111827'
      case 'reddit': return '#7F1D1D'
      case 'instagram': return '#581C87'
      case 'twitter': case 'x': return '#1E3A8A'
      case 'linkedin': return '#1E40AF'
      default: return '#111827'
    }
  }

  const downloadAsFormat = async (format: string) => {
    if (!cardRef.current) return
    
    setDownloading(format)
    
    try {
      const svgContent = await generateSVG()
      
      if (format === 'svg') {
        const blob = new Blob([svgContent], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${profile.username}-profile-card.svg`
        link.click()
        URL.revokeObjectURL(url)
      } else {
        // Use a different approach for PNG/JPG - convert from SVG
        const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
        const svgUrl = URL.createObjectURL(svgBlob)
        
        const img = document.createElement('img')
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          // High resolution for better quality
          const scale = 2
          canvas.width = 400 * scale
          canvas.height = 500 * scale
          
          if (ctx) {
            ctx.scale(scale, scale)
            
            // Set background color based on theme
            const bgColor = (customColors && customColors.background) || (theme && theme.colors.background) || '#1a1a1a'
            ctx.fillStyle = bgColor
            ctx.fillRect(0, 0, 400, 500)
            
            ctx.drawImage(img, 0, 0, 400, 500)
            
            const link = document.createElement('a')
            link.download = `${profile.username}-profile-card.${format}`
            
            if (format === 'png') {
              link.href = canvas.toDataURL('image/png')
            } else if (format === 'jpg' || format === 'jpeg') {
              link.href = canvas.toDataURL('image/jpeg', 0.9)
            }
            
            link.click()
          }
          
          URL.revokeObjectURL(svgUrl)
        }
        
        img.onerror = () => {
          console.error('Failed to load SVG for conversion')
          URL.revokeObjectURL(svgUrl)
          setDownloading('')
        }
        
        img.src = svgUrl
      }
    } catch (error) {
      console.error(`Error downloading ${format}:`, error)
    } finally {
      setDownloading(null)
    }
  }

  const copySVGCode = async () => {
    const svgContent = await generateSVG()
    
    try {
      await navigator.clipboard.writeText(svgContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Error copying SVG code:', error)
    }
  }

  return (
    <div 
      ref={cardRef} 
      className={`relative overflow-hidden bg-gradient-to-br ${getThemeClasses()} p-1 rounded-2xl ${getShadowStyle()} max-w-sm w-full mx-auto ${getBorderStyle()}`}
    >
      {/* Background Pattern */}
      {getBackgroundPattern() && (
        <div className={`absolute inset-0 ${getBackgroundPattern()} opacity-30`} />
      )}
      
      <div 
        className="relative bg-black/50 backdrop-blur-sm p-8 rounded-xl space-y-6"
        style={{ backgroundColor: colors.background }}
      >
        
        {/* Avatar */}
        <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={`${profile.name ?? profile.username}'s avatar`}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          ) : (
            <div 
              className="w-full h-full bg-gradient-to-br flex items-center justify-center text-2xl font-bold"
              style={{ 
                backgroundImage: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})`,
                color: colors.text
              }}
            >
              {(profile.name ?? profile.username).charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="text-center space-y-3">
          <div className="space-y-1">
            <h2 
              className="text-xl font-bold flex items-center justify-center gap-2"
              style={{ color: colors.text }}
            >
              {profile.name ?? 'Unknown'}
              <PlatformIcon platform={profile.platform} />
            </h2>
            <p 
              className="text-sm"
              style={{ color: colors.textSecondary }}
            >
              @{profile.username}
            </p>
          </div>
          
          {profile.bio && (
            <p 
              className="text-sm leading-relaxed max-w-xs mx-auto"
              style={{ color: colors.textSecondary }}
            >
              {profile.bio.length > 100 ? `${profile.bio.slice(0, 100)}...` : profile.bio}
            </p>
          )}
        </div>

        {/* QR Code Section */}
        {profile.link ? (
          <div className="flex flex-col items-center space-y-3">
            <div className="p-3 bg-white rounded-xl shadow-lg">
              <div id="qr-code-svg">
                <QRCode
                  value={profile.link}
                  size={80}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center">
              Scan to view profile
            </p>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">No profile link available</p>
          </div>
        )}

        {/* Download Buttons */}
        <div className="space-y-3">
          {/* Download Options */}
          <div className="grid grid-cols-2 gap-2">
            {['png', 'jpg', 'svg'].map((format) => (
              <button
                key={format}
                onClick={() => downloadAsFormat(format)}
                disabled={downloading === format}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading === format ? (
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="w-3 h-3" />
                )}
                {format.toUpperCase()}
              </button>
            ))}
            
            {/* Copy SVG Code Button */}
            <button
              onClick={copySVGCode}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-medium transition-all duration-200 hover:scale-105"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy SVG
                </>
              )}
            </button>
          </div>
          
          <p className="text-xs text-gray-500 text-center">
            Download your profile card or copy SVG code
          </p>
        </div>

        {/* Platform Link */}
        {profile.link && (
          <div className="pt-4 border-t border-white/10">
            <a
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:scale-105"
            >
              View Profile
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileCard