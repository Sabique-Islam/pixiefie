import { Profile } from '@/types/profile'

export async function fetchTwitterProfile(username: string): Promise<Profile> {
  // Just a demo implementation
  const cleanUsername = username.replace('@', '')
  
  return {
    platform: 'twitter',
    username: cleanUsername,
    name: null,
    avatar: null,
    bio: null,
    link: `https://x.com/${cleanUsername}`
  }
}