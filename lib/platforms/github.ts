import { Octokit } from '@octokit/core'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

export async function fetchGitHubProfile(username: string) {
  try {
    // Clean the username to ensure it's properly formatted
    const cleanUsername = username.replace(/^@/, '').trim()
    
    const res = await octokit.request('GET /users/{username}', {
      username: cleanUsername,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    const data = res.data

    return {
      platform: 'github',
      username: data.login,
      name: data.name,
      avatar: data.avatar_url,
      bio: data.bio,
      link: `https://github.com/${data.login}`
    }
  } catch (err: unknown) {
    console.error('GitHub API Error:', (err as Error).message)
    throw new Error('Failed to fetch GitHub profile')
  }
}