'use client'

import { FC, useRef } from 'react'
import type { Profile } from '@/types/profile'
import { Theme, ThemeColors, getPlatformTheme } from '@/lib/themes'
import { CardDisplay } from './ProfileCard/CardDisplay'
import { DownloadButtons } from './ProfileCard/DownloadButtons'
import { generateSVG } from './ProfileCard/svgGenerator'
import { downloadAsFormat, copySVGCode } from './ProfileCard/downloadUtils'

interface ProfileCardProps {
  profile: Profile
  theme?: Theme
  customColors?: Partial<ThemeColors>
}

const ProfileCard: FC<ProfileCardProps> = ({ profile, theme, customColors }) => {
  const cardRef = useRef<HTMLDivElement>(null)

  // Use custom theme or fallback to platform theme
  const activeTheme = theme || getPlatformTheme(profile.platform, customColors)

  const handleDownloadPNG = async () => {
    const svgContent = await generateSVG({
      profile,
      activeTheme,
      customColors,
      cardRef
    })
    await downloadAsFormat(svgContent, 'png', `${profile.username}-profile-card`)
  }

  const handleDownloadJPG = async () => {
    const svgContent = await generateSVG({
      profile,
      activeTheme,
      customColors,
      cardRef
    })
    await downloadAsFormat(svgContent, 'jpg', `${profile.username}-profile-card`)
  }

  const handleDownloadSVG = async () => {
    const svgContent = await generateSVG({
      profile,
      activeTheme,
      customColors,
      cardRef
    })
    await downloadAsFormat(svgContent, 'svg', `${profile.username}-profile-card`)
  }

  const handleCopySVG = async () => {
    const svgContent = await generateSVG({
      profile,
      activeTheme,
      customColors,
      cardRef
    })
    copySVGCode(svgContent)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <CardDisplay
        ref={cardRef}
        profile={profile}
        activeTheme={activeTheme}
        customColors={customColors}
      />
      <DownloadButtons
        onDownloadPNG={handleDownloadPNG}
        onDownloadJPG={handleDownloadJPG}
        onDownloadSVG={handleDownloadSVG}
        onCopySVG={handleCopySVG}
      />
    </div>
  )
}

export default ProfileCard