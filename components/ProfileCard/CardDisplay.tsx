import { forwardRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import Image from 'next/image'
import type { Profile } from '@/types/profile'
import { Theme, ThemeColors } from '@/lib/themes'
import { PlatformIcon } from './PlatformIcon'

interface CardDisplayProps {
  profile: Profile
  activeTheme: Theme
  customColors?: Partial<ThemeColors>
}

export const CardDisplay = forwardRef<HTMLDivElement, CardDisplayProps>(
  ({ profile, activeTheme, customColors }, ref) => {
    const colors = customColors
      ? { ...activeTheme.colors, ...customColors }
      : activeTheme.colors

    return (
      <div
        ref={ref}
        className={`
          w-96 rounded-2xl shadow-2xl overflow-hidden
          bg-gradient-to-br ${activeTheme.gradient}
          ${activeTheme.backgroundPattern || ''}
          ${activeTheme.shadowStyle || ''}
          ${activeTheme.borderStyle || ''}
          p-8
          transition-all duration-300
          relative
        `}
      >
        {/* Background Pattern Layer */}
        {activeTheme.backgroundPattern && (
          <div className={`absolute inset-0 ${activeTheme.backgroundPattern} pointer-events-none`} />
        )}
        
        <div className="relative flex flex-col items-center space-y-6">
          {/* Avatar Section */}
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full border-4 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                borderColor: `${colors.primary}40`
              }}
            >
              {profile.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={profile.name || profile.username}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center text-4xl font-bold"
                  style={{ color: colors.text }}
                >
                  {(profile.name || profile.username || 'U')
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Name and Username */}
          <div className="text-center space-y-1">
            <h2
              className="text-2xl font-bold"
              style={{ color: colors.text }}
            >
              {profile.name || profile.username || 'Unknown'}
            </h2>
            <p
              className="text-sm"
              style={{ color: colors.textSecondary }}
            >
              @{profile.username}
            </p>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p
              className="text-center text-sm max-w-xs line-clamp-3"
              style={{ color: colors.textSecondary }}
            >
              {profile.bio}
            </p>
          )}

          {/* QR Code */}
          <div className="space-y-3 flex flex-col items-center">
            <div
              id="qr-code-svg"
              className="p-3 bg-white rounded-xl shadow-lg"
            >
              <QRCodeSVG
                value={profile.link || `https://${profile.platform}.com/${profile.username}`}
                size={80}
                level="H"
                includeMargin={false}
              />
            </div>
            <p className="text-xs" style={{ color: colors.textSecondary }}>Scan to view profile</p>
          </div>

          {/* Platform Badge */}
          <div
            className="px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: `${colors.primary}33`,
              color: colors.text,
            }}
          >
            <div className="flex items-center gap-2">
              <PlatformIcon platform={profile.platform} />
              <span>{profile.platform} Profile</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

CardDisplay.displayName = 'CardDisplay'
