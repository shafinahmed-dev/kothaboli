'use client'

import Link from 'next/link'
import { ArchetypeAvatar } from './ArchetypeAvatar'
import { TagPill } from './TagPill'
import { MessageSquare, Clock, Share } from 'lucide-react'
import { getTimeAgo, getTimeRemaining } from '@/lib/utils'

export function ThreadCard({ thread }: { thread: any }) {
  const profile = thread.profiles || {}

  // Next.js Supabase response nested structures vary, it could be array or object.
  // We'll safely check where count lives.
  const commentsData = thread.comments
  const repliesCount = Array.isArray(commentsData) 
    ? (commentsData[0]?.count || 0) 
    : (commentsData?.count || 0)

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}/thread/${thread.id}`)
    }
  }

  return (
    <Link href={`/thread/${thread.id}`} className="block w-full p-4 md:p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 transition group mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <ArchetypeAvatar archetypeId={profile.archetype} className="w-8 h-8 text-sm" />
          <div>
            <div className="text-sm font-bold text-slate-200">{profile.handle}</div>
            <div className="text-xs text-slate-500 font-medium">{getTimeAgo(thread.created_at)}</div>
          </div>
        </div>
        <TagPill tag={thread.tag} nonInteractive className="bg-neutral-800 text-neutral-300" />
      </div>
      
      <div className="mb-4 text-left">
        <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">{thread.title}</h3>
        <p className="text-sm text-neutral-400 line-clamp-3 whitespace-pre-wrap">{thread.body}</p>
      </div>

      <div className="flex items-center gap-4 text-xs font-semibold text-neutral-500">
        <div className="flex items-center gap-1.5 text-orange-400/90 bg-orange-500/10 px-2.5 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5" />
          <span>{getTimeRemaining(thread.expires_at)} left</span>
        </div>
        <div className="flex items-center gap-1.5 group-hover:text-neutral-300 transition-colors">
          <MessageSquare className="w-4 h-4" />
          <span>{repliesCount} replies (total interactions: {thread.total_interactions})</span>
        </div>
        <button onClick={handleShare} className="flex flex-1 justify-end items-center gap-1.5 hover:text-white transition-colors">
          <Share className="w-4 h-4" />
          Share
        </button>
      </div>
    </Link>
  )
}
