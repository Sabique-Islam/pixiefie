import { FC } from 'react'
import { siGithub, siReddit } from 'simple-icons'

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

interface PlatformIconProps {
  platform: string
}

export const PlatformIcon: FC<PlatformIconProps> = ({ platform }) => {
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
