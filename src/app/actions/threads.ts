'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createThread(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!profile) throw new Error('Profile required to post.')

  const title = formData.get('title') as string
  const body = formData.get('body') as string
  const tag = formData.get('tag') as string

  if (!title || title.length < 5 || title.length > 150) {
    throw new Error('Title must be between 5 and 150 characters.')
  }

  if (!body || body.length < 80 || body.length > 5000) {
    throw new Error('Body must be between 80 and 5000 characters.')
  }

  if (!tag) {
    throw new Error('A board tag must be selected.')
  }

  const { data, error } = await supabase
    .from('threads')
    .insert({
      author_id: user.id,
      tag,
      title,
      body,
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/')
  revalidatePath(`/?tag=${tag}`)
  return data
}

export async function getThreads(tag?: string) {
  const supabase = await createClient()
  
  let query = supabase
    .from('threads')
    .select(`
      *,
      profiles!threads_author_id_fkey(handle, archetype),
      comments(count)
    `)
    .eq('is_expired', false)
    .order('created_at', { ascending: false })

  if (tag && tag !== 'all') {
    query = query.eq('tag', tag)
  }

  const { data, error } = await query

  if (error) {
    console.error(error)
    return []
  }

  return data
}
