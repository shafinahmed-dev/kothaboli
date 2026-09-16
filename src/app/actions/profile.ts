'use server'

import { createClient } from '@/lib/supabase/server'
import { generateArchetypeHandle } from '@/lib/constants/personas'
import { revalidatePath } from 'next/cache'

export async function createProfile(archetypeId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const handle = generateArchetypeHandle(archetypeId)

  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: user.id,
      handle,
      persona: archetypeId
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/')
  return data
}

export async function getUserProfile(handle?: string) {
  const supabase = await createClient()

  let userProfile = null
  let isOwnProfile = false

  if (handle) {
    const { data } = await supabase.from('profiles').select('*').eq('handle', handle).single()
    if (!data) throw new Error('Profile not found')
    userProfile = data
    const { data: { user } } = await supabase.auth.getUser()
    if (user && user.id === userProfile.id) isOwnProfile = true
  } else {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (!data) return null
    userProfile = data
    isOwnProfile = true
  }

  if (!userProfile) return null

  const createdAt = new Date(userProfile.created_at).getTime()
  const now = Date.now()
  const daysOnPlatform = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24))
  const ageString = daysOnPlatform < 1 ? 'Joined today' : `${daysOnPlatform} day${daysOnPlatform === 1 ? '' : 's'} on KB`

  const { data: threads } = await supabase
    .from('threads')
    .select('*, comments(count), profiles!threads_author_id_fkey(handle, persona)')
    .eq('author_id', userProfile.id)
    .order('created_at', { ascending: false })

  const ongoing: any[] = []
  const past: any[] = []

  threads?.forEach(thread => {
    const isExpiredByTime = new Date(thread.expires_at).getTime() <= Date.now()
    if (thread.is_expired || isExpiredByTime) {
       past.push(thread)
    } else {
       ongoing.push(thread)
    }
  })

  return {
    profile: userProfile,
    ageString,
    ongoing,
    past,
    isOwnProfile
  }
}
