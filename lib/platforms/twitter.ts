import { Profile } from '@/types/profile'

/**
 * Fetches X (formerly Twitter) user profile using X API v2
 * Documentation: https://developer.x.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by-username-username
 * Authentication: OAuth 2.0 Bearer Token (App-Only)
 */
export async function fetchTwitterProfile(username: string): Promise<Profile> {
  const cleanUsername = username.replace('@', '').trim()
  
  // Check if Bearer Token is configured
  const bearerToken = process.env.X_BEARER_TOKEN || process.env.TWITTER_BEARER_TOKEN
  
  if (!bearerToken) {
    console.warn('X API Bearer Token not configured. Using demo mode.')
    return {
      platform: 'x',
      username: cleanUsername,
      name: cleanUsername,
      avatar: null,
      bio: 'X API credentials not configured. Add X_BEARER_TOKEN to .env.local',
      link: `https://x.com/${cleanUsername}`
    }
  }

  try {
    // X API v2 endpoint for user lookup by username
    // Includes user.fields for additional profile information
    const url = `https://api.twitter.com/2/users/by/username/${cleanUsername}?user.fields=name,username,description,profile_image_url,public_metrics,verified,verified_type`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'User-Agent': 'Pixiefie-Profile-Generator/1.0',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`X user @${cleanUsername} not found`)
      } else if (response.status === 401) {
        throw new Error('Invalid X API credentials. Please check your X_BEARER_TOKEN in .env.local')
      } else if (response.status === 429) {
        throw new Error('X API rate limit exceeded. Please try again later.')
      }
      
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || errorData.title || `X API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data.data) {
      throw new Error(`X user @${cleanUsername} not found`)
    }

    const user = data.data
    
    // Convert profile_image_url to higher resolution
    // Default is 48x48 (_normal), replace with 400x400 for better quality
    let avatarUrl = user.profile_image_url || null
    if (avatarUrl) {
      avatarUrl = avatarUrl.replace('_normal', '_400x400')
    }

    return {
      platform: 'x',
      username: user.username,
      name: user.name || user.username,
      avatar: avatarUrl,
      bio: user.description || null,
      link: `https://x.com/${user.username}`
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to fetch X profile')
  }
}

// Main export - use this one
export const fetchXProfile = fetchTwitterProfile