'use client'

import { useState } from 'react'
import { Linkedin } from 'lucide-react'
import { SiGithub, SiX, SiInstagram, SiReddit } from 'react-icons/si'
import { Profile } from '@/types/profile'
import { Theme, ThemeColors, defaultThemes, getPlatformTheme } from '@/lib/themes'
import ProfileCard from './ProfileCard'
import { ThemeSelector } from './ThemeSelector'

interface PlatformConfig {
  name: string
  icon: React.ReactNode
  placeholder: string
  baseUrl: string
  color: string
}

export default function ProfileForm() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('')
  const [url, setUrl] = useState('')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<Theme>(defaultThemes[0])
  const [customColors, setCustomColors] = useState<Partial<ThemeColors>>({})

  const platforms: Record<string, PlatformConfig> = {
    github: {
      name: 'GitHub',
      icon: <SiGithub className="w-5 h-5" />,
      placeholder: 'Enter username (e.g., octocat) or URL (https://github.com/octocat)',
      baseUrl: 'https://github.com/',
      color: 'hover:bg-gray-800 focus:ring-gray-500'
    },
    reddit: {
      name: 'Reddit',
      icon: <SiReddit className="w-5 h-5" />,
      placeholder: 'Enter Reddit username or URL...',
      baseUrl: 'https://reddit.com/u/',
      color: 'hover:bg-orange-900 focus:ring-orange-500'
    },
    instagram: {
      name: 'Instagram',
      icon: <SiInstagram className="w-5 h-5" />,
      placeholder: 'Enter Instagram username or URL...',
      baseUrl: 'https://instagram.com/',
      color: 'hover:bg-pink-900 focus:ring-pink-500'
    },
    twitter: {
      name: 'X (Twitter)',
      icon: <SiX className="w-5 h-5" />,
      placeholder: 'Enter X username or URL...',
      baseUrl: 'https://x.com/',
      color: 'hover:bg-blue-900 focus:ring-blue-500'
    },
    linkedin: {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      placeholder: 'Enter LinkedIn profile URL...',
      baseUrl: 'https://linkedin.com/in/',
      color: 'hover:bg-blue-800 focus:ring-blue-600'
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPlatform || !url.trim()) return
    
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/parse?url=${encodeURIComponent(url)}`)
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Unknown error')

      setProfile(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform)
    setUrl('')
    setProfile(null)
    setError(null)
  }

  return (
    <div className="pt-32 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Form */}
          <div className="space-y-10">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Generate Profile Card
              </h1>
              <p className="text-gray-400 text-xl leading-relaxed">
                Select a platform and enter your profile URL to generate a beautiful profile card
              </p>
            </div>

            {/* Platform Selection */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white">Choose Platform</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(platforms).map(([key, platform]) => (
                  <button
                    key={key}
                    onClick={() => handlePlatformSelect(key)}
                    className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col items-center gap-3 hover:scale-105 ${
                      selectedPlatform === key
                        ? 'border-white bg-white/15 text-white shadow-lg'
                        : 'border-zinc-700 bg-black/50 text-gray-400 hover:border-gray-500 hover:text-white'
                    }`}
                  >
                    {platform.icon}
                    <span className="text-sm font-medium">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* URL Input Form */}
            {selectedPlatform && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-3">
                    {platforms[selectedPlatform].name} Profile
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {platforms[selectedPlatform].icon}
                    </div>
                    <input
                      type="text"
                      placeholder={platforms[selectedPlatform].placeholder}
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-black/50 border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50 transition-all text-lg"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !url.trim()}
                  className={`w-full py-4 px-8 rounded-xl font-semibold transition-all duration-200 text-lg ${
                    loading || !url.trim()
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-white text-black hover:bg-gray-100 transform hover:scale-[1.02] shadow-lg'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </div>
                  ) : (
                    'Generate Profile Card'
                  )}
                </button>
              </form>
            )}

            {/* Theme Selector */}
            <ThemeSelector
              selectedTheme={selectedTheme}
              customColors={customColors}
              onThemeChange={setSelectedTheme}
              onColorsChange={setCustomColors}
            />

            {error && (
              <div className="p-6 bg-red-900/20 border border-red-800 rounded-xl">
                <p className="text-red-400">{error}</p>
              </div>
            )}
          </div>

          {/* Right Side - Generated Card */}
          <div className="lg:sticky lg:top-32">
            {profile ? (
              <div className="space-y-10">
                <div className="text-center">
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                    Your Profile Card
                  </h2>
                </div>
                <ProfileCard 
                  profile={profile} 
                  theme={selectedTheme}
                  customColors={customColors}
                />
              </div>
            ) : (
              <div className="bg-black/30 border border-dashed border-zinc-600 rounded-2xl p-16 text-center">
                <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SiGithub className="w-10 h-10 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-400 mb-4">
                  Profile Card Preview
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Select a platform and enter your profile URL to see your generated card here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}