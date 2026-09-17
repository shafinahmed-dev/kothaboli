'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PersonaAvatar } from './PersonaAvatar'
import { TagPill } from './TagPill'
import { Clock, Share } from 'lucide-react'
import { getTimeAgo, getTimeRemaining, getTimerUrgencyStyle, cn } from '@/lib/utils'

export function ThreadCard({ thread }: { thread: any }) {
  const router = useRouter()
  const profile = thread.profiles || {}

  const commentsData = thread.comments
  const repliesCount = Array.isArray(commentsData) 
    ? (commentsData[0]?.count || 0) 
    : (commentsData?.count || 0)

  const viewsCount = thread.views || 0

  const handleCardClick = (e: React.MouseEvent) => {
    router.push(`/thread/${thread.id}`)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}/thread/${thread.id}`)
    }
  }

  return (
    <div 
      onClick={handleCardClick} 
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          router.push(`/thread/${thread.id}`)
        }
      }}
      className="block w-full p-4 md:p-5 rounded-3xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-colors duration-150 group mb-4 shadow-lg backdrop-blur-sm cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {profile.handle ? (
            <Link 
              href={`/profile/${encodeURIComponent(profile.handle)}`}
              onClick={(e) => e.stopPropagation()}
              className="hover:underline flex items-center gap-3 group/author cursor-pointer z-10"
            >
              <PersonaAvatar archetypeId={profile.persona || profile.archetype} className="w-8 h-8 text-sm shrink-0" />
              <div>
                <div className="text-sm font-bold text-slate-200 group-hover/author:text-white group-hover/author:underline">{profile.handle}</div>
                <div className="text-xs text-neutral-500 font-medium">{getTimeAgo(thread.created_at)}</div>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <PersonaAvatar archetypeId={profile.persona || profile.archetype} className="w-8 h-8 text-sm shrink-0" />
              <div>
                <div className="text-sm font-bold text-slate-200">Anonymous</div>
                <div className="text-xs text-neutral-500 font-medium">{getTimeAgo(thread.created_at)}</div>
              </div>
            </div>
          )}
        </div>
        <TagPill tag={thread.tag} nonInteractive />
      </div>
      
      <div className="mb-4 text-left">
        <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors duration-150">{thread.title}</h3>
        <p className="text-sm text-neutral-400 line-clamp-3 whitespace-pre-wrap leading-relaxed">{thread.body}</p>
      </div>

      <div className="flex items-center gap-4 text-xs font-semibold text-neutral-400 flex-wrap">
        <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-bold transition-all duration-150", getTimerUrgencyStyle(thread.expires_at))}>
          <Clock className="w-3.5 h-3.5" />
          <span>{getTimeRemaining(thread.expires_at)} left</span>
        </div>
        <span>🔥 {viewsCount} views</span>
        <span>💬 {repliesCount} comments</span>
        <button onClick={handleShare} className="flex flex-1 justify-end items-center gap-1.5 hover:text-white transition-colors duration-150 text-neutral-400">
          <Share className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  )
}

