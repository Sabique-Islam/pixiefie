import { fetchGitHubProfile } from './github'
import { fetchRedditProfile } from './reddit'
import { fetchInstagramProfile } from './instagram'
import { fetchTwitterProfile } from './twitter'
import { fetchLinkedInProfile } from './linkedin'
import { Profile } from '@/types/profile'

export async function fetchProfileFromUrl(url: string): Promise<Profile> {
  const normalizedUrl = url.toLowerCase().trim()

  // Task : Accept both user-name and full URL for GitHub
  if (normalizedUrl.includes('github.com') || (!normalizedUrl.includes('.') && !normalizedUrl.includes('/') && normalizedUrl.length > 0)) {
    let username = ''
    
    if (normalizedUrl.includes('github.com')) {
      // To handle full GitHub URLs like https://github.com/username
      username = url.split('github.com/')[1]?.split('/')[0]
      if (!username) throw new Error('Invalid GitHub URL')
    } else {
      // To handle direct usernames (no dots or slashes, indicating it's likely a username)
      username = url.trim()
    }
    
    // Validate username format (GitHub usernames can contain alphanumeric characters and hyphens) [AFLL stonks]
    if (!/^[a-zA-Z0-9\-]+$/.test(username)) {
      throw new Error('Invalid GitHub username format')
    }
    
    return fetchGitHubProfile(username)
  }

  // Reddit
  if (normalizedUrl.includes('reddit.com')) {
    let username = ''
    if (url.includes('/u/')) {
      username = url.split('/u/')[1]?.split('/')[0]
    } else if (url.includes('/user/')) {
      username = url.split('/user/')[1]?.split('/')[0]
    } else {
      throw new Error('Invalid Reddit URL format')
    }
    if (!username) throw new Error('Invalid Reddit URL')
    return fetchRedditProfile(username)
  }

  // Instagram
  if (normalizedUrl.includes('instagram.com')) {
    const username = url.split('instagram.com/')[1]?.split('/')[0]?.replace('@', '')
    if (!username) throw new Error('Invalid Instagram URL')
    return fetchInstagramProfile(username)
  }

  // Twitter/X
  if (normalizedUrl.includes('twitter.com') || normalizedUrl.includes('x.com')) {
    const parts = url.split('/')
    const username = parts[parts.length - 1]?.replace('@', '')
    if (!username) throw new Error('Invalid Twitter/X URL')
    return fetchTwitterProfile(username)
  }

  // LinkedIn
  if (normalizedUrl.includes('linkedin.com/in/')) {
    return fetchLinkedInProfile(url)
  }

  throw new Error('Unsupported platform. Please use GitHub, Reddit, Instagram, Twitter/X, or LinkedIn URLs.')
}