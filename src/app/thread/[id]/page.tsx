import { getThreadWithComments } from '@/app/actions/comments'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArchetypeAvatar } from '@/components/boards/ArchetypeAvatar'
import { TagPill } from '@/components/boards/TagPill'
import { getTimeAgo, getTimeRemaining } from '@/lib/utils'
import { CommentList } from '@/components/threads/CommentList'
import { ArrowLeft, Clock, MessageSquare, AlertCircle } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params
  const data = await getThreadWithComments(resolved.id)
  return { title: data?.thread?.title ? `${data.thread.title} | KothaBoli` : 'Thread | KothaBoli' }
}

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const resolved = await params
  const threadId = resolved.id
  const data = await getThreadWithComments(threadId)
  
  if (!data) notFound()
    
  const { thread, comments } = data
  const profile = thread.profiles || {}

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAuthenticated = !!user

  const isExpiredByTime = new Date(thread.expires_at).getTime() <= Date.now()
  const isExpired = thread.is_expired || isExpiredByTime

  return (
    <div className="max-w-3xl mx-auto w-full pb-20 pt-2 lg:pt-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-500 hover:text-white transition mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Feed
      </Link>

      {isExpired && (
        <div className="flex items-start gap-3 p-4 mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>This discussion expired after 7 days and has locked itself permanently. Interaction is disabled.</p>
        </div>
      )}

      <article className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <ArchetypeAvatar archetypeId={profile.archetype} className="w-10 h-10 text-lg" />
            <div>
              <div className="text-base font-bold text-slate-200">{profile.handle}</div>
              <div className="text-xs text-neutral-500 font-bold">{getTimeAgo(thread.created_at)}</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-xl border border-orange-500/20">
              <Clock className="w-3.5 h-3.5" />
              <span>{isExpired ? 'EXPIRED' : `${getTimeRemaining(thread.expires_at)}`}</span>
            </div>
            <TagPill tag={thread.tag} nonInteractive className="bg-neutral-800 border border-neutral-700 text-neutral-300" />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-6 leading-snug">
          {thread.title}
        </h1>

        <div className="text-[15px] md:text-base text-neutral-300 leading-relaxed whitespace-pre-wrap font-medium">
          {thread.body}
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800/60 flex items-center justify-between text-xs font-bold text-neutral-500 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>{thread.total_interactions} Interlinks</span>
          </div>
        </div>
      </article>

      <CommentList 
        threadId={thread.id} 
        comments={comments} 
        isExpired={isExpired} 
        isAuthenticated={isAuthenticated} 
      />
    </div>
  )
}
