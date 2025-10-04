import { fetchGitHubProfile } from './github'
import { fetchRedditProfile } from './reddit'
import { fetchInstagramProfile } from './instagram'
import { fetchTwitterProfile, fetchXProfile } from './twitter'
import { fetchLinkedInProfile } from './linkedin'
import { Profile } from '@/types/profile'

export async function fetchProfileFromUrl(url: string, platform: string): Promise<Profile> {
  const normalizedUrl = url.toLowerCase().trim()

  // Validate that the URL/username matches the selected platform
  switch (platform.toLowerCase()) {
    case 'github': {
      let username = ''
      
      if (normalizedUrl.includes('github.com')) {
        // Handle full GitHub URLs like https://github.com/something
        username = url.split('github.com/')[1]?.split('/')[0]
        if (!username) throw new Error('Invalid GitHub URL')
      } else {
        // Handle direct usernames
        username = url.trim()
      }
      
      // Validate username
      if (!/^[a-zA-Z0-9\-]+$/.test(username)) {
        throw new Error('Invalid GitHub username format. Use only letters, numbers, and hyphens.')
      }
      
      return fetchGitHubProfile(username)
    }

    case 'reddit': {
      let username = ''
      
      if (normalizedUrl.includes('reddit.com')) {
        if (url.includes('/u/')) {
          username = url.split('/u/')[1]?.split('/')[0]
        } else if (url.includes('/user/')) {
          username = url.split('/user/')[1]?.split('/')[0]
        } else {
          throw new Error('Invalid Reddit URL format. Use /u/username or /user/username')
        }
      } else {
        // Direct username
        username = url.trim()
      }
      
      if (!username) throw new Error('Invalid Reddit username')
      
      // Validate Reddit username format
      if (!/^[a-zA-Z0-9_\-]+$/.test(username)) {
        throw new Error('Invalid Reddit username format. Use only letters, numbers, underscores, and hyphens.')
      }
      
      return fetchRedditProfile(username)
    }

    case 'instagram': {
      let username = ''
      
      if (normalizedUrl.includes('instagram.com')) {
        username = url.split('instagram.com/')[1]?.split('/')[0]?.replace('@', '')
      } else {
        // Direct username
        username = url.trim().replace('@', '')
      }
      
      if (!username) throw new Error('Invalid Instagram username')
      
      // Validate Instagram username format
      if (!/^[a-zA-Z0-9._]+$/.test(username)) {
        throw new Error('Invalid Instagram username format. Use only letters, numbers, periods, and underscores.')
      }
      
      return fetchInstagramProfile(username)
    }
    case 'x': {
      let username = ''
      
      if (normalizedUrl.includes('x.com')) {
        const parts = url.split('/')
        username = parts[parts.length - 1]?.replace('@', '')
      } else {
        // Direct username
        username = url.trim().replace('@', '')
      }
      
      if (!username) throw new Error('Invalid X username')

      // Validate X username format
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        throw new Error('Invalid X username format. Use only letters, numbers, and underscores.')
      }
      
      return fetchTwitterProfile(username)
    }

    case 'linkedin': {
      if (!normalizedUrl.includes('linkedin.com/in/')) {
        throw new Error('Invalid LinkedIn URL. Please provide a full LinkedIn profile URL (e.g., https://linkedin.com/in/username)')
      }
      
      return fetchLinkedInProfile(url)
    }

    default:
      throw new Error(`Unsupported platform: ${platform}. Please select a valid platform.`)
  }
}