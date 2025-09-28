import { Profile } from '@/types/profile'

export async function fetchInstagramProfile(username: string): Promise<Profile> {
  // Just a demo implementation
  const cleanUsername = username.replace('@', '')
  
  return {
    platform: 'instagram',
    username: cleanUsername,
    name: null,
    avatar: null,
    bio: null,
    link: `https://instagram.com/${cleanUsername}`
  }
}