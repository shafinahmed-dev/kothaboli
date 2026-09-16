'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createComment({ threadId, parentId, body }: { threadId: string; parentId?: string | null; body: string }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (!profile) throw new Error('Profile required.')

  if (!body || body.length < 2 || body.length > 2000) {
    throw new Error('Comment must be between 2 and 2000 characters.')
  }

  const { data: thread } = await supabase.from('threads').select('*').eq('id', threadId).single()
  if (!thread || thread.is_expired) throw new Error('Thread is expired or does not exist.')

  const { data: comment, error } = await supabase
    .from('comments')
    .insert({
      thread_id: threadId,
      author_id: user.id,
      parent_id: parentId || null,
      body
    })
    .select()
    .single()

  if (error) throw new Error(error.message)

  await supabase
    .from('threads')
    .update({ total_interactions: (thread.total_interactions || 0) + 1 })
    .eq('id', threadId)
    
  let notificationTarget = null
  let type = ''
  
  if (parentId) {
    const { data: parent } = await supabase.from('comments').select('author_id').eq('id', parentId).single()
    if (parent && parent.author_id !== user.id) {
      notificationTarget = parent.author_id
      type = 'comment_reply'
    }
  } else {
    if (thread.author_id !== user.id) {
      notificationTarget = thread.author_id
      type = 'thread_reply'
    }
  }

  if (notificationTarget) {
    await supabase.from('notifications').insert({
      recipient_id: notificationTarget,
      actor_handle: profile.handle,
      thread_id: threadId,
      comment_id: comment.id,
      type
    })
  }

  revalidatePath(`/thread/${threadId}`)
  return comment
}

export async function getThreadWithComments(threadId: string) {
  const supabase = await createClient()
  
  const { data: thread } = await supabase
    .from('threads')
    .select(`
      *,
      profiles!threads_author_id_fkey(handle, archetype)
    `)
    .eq('id', threadId)
    .single()
    
  if (!thread) return null

  const { data: comments } = await supabase
    .from('comments')
    .select(`
      *,
      profiles!comments_author_id_fkey(handle, archetype)
    `)
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true })

  return { thread, comments: comments || [] }
}
