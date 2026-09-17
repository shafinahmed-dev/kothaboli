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

export async function toggleCommentLike(commentId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: existing } = await supabase
    .from('comment_likes')
    .select('*')
    .eq('comment_id', commentId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing) {
    await supabase
      .from('comment_likes')
      .delete()
      .eq('comment_id', commentId)
      .eq('user_id', user.id)
    return { liked: false }
  } else {
    await supabase
      .from('comment_likes')
      .insert({ comment_id: commentId, user_id: user.id })
    return { liked: true }
  }
}

export async function getThreadWithComments(threadId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: thread } = await supabase
    .from('threads')
    .select(`
      *,
      profiles:author_id(handle, archetype)
    `)
    .eq('id', threadId)
    .single()
    
  if (!thread) return null

  // Increment view count asynchronously
  const newViews = (thread.views || 0) + 1
  thread.views = newViews
  supabase
    .from('threads')
    .update({ views: newViews })
    .eq('id', threadId)
    .then()

  const { data: comments } = await supabase
    .from('comments')
    .select(`
      *,
      profiles:author_id(handle, archetype),
      comment_likes(user_id)
    `)
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true })

  const formattedComments = (comments || []).map((c: any) => {
    const likesCount = Array.isArray(c.comment_likes) ? c.comment_likes.length : 0
    const isLikedByMe = user ? Array.isArray(c.comment_likes) && c.comment_likes.some((l: any) => l.user_id === user.id) : false
    return {
      ...c,
      likes_count: likesCount,
      is_liked: isLikedByMe
    }
  })

  return { thread, comments: formattedComments }
}
