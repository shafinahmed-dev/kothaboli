'use client'

import { useState } from 'react'
import { PersonaAvatar } from '../boards/PersonaAvatar'
import { getTimeAgo } from '@/lib/utils'
import { createComment } from '@/app/actions/comments'
import { useRouter } from 'next/navigation'
import { Loader2, Reply } from 'lucide-react'

export function CommentItem({ comment, threadId, isExpired, isAuthenticated, depth = 0 }: { comment: any, threadId: string, isExpired: boolean, isAuthenticated: boolean, depth?: number }) {
  const profile = comment.profiles || {}
  const [isReplying, setIsReplying] = useState(false)
  const [replyBody, setReplyBody] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const submitReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyBody.trim() || replyBody.length < 2) return
    setLoading(true)
    try {
      await createComment({ threadId, parentId: comment.id, body: replyBody })
      setReplyBody('')
      setIsReplying(false)
      router.refresh()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const paddingLeft = depth > 0 ? `${Math.min(depth * 1, 3)}rem` : '0'

  return (
    <div className="flex flex-col gap-3 relative" style={{ marginLeft: paddingLeft }}>
      {depth > 0 && <div className="absolute left-[-10px] sm:left-[-1rem] top-4 bottom-0 w-px bg-neutral-800" />}

      <div className="bg-neutral-900/20 border border-neutral-800/50 rounded-xl p-4 transition-colors hover:bg-neutral-900/40">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <PersonaAvatar archetypeId={profile.persona || profile.archetype} className="w-6 h-6 text-xs" />
            <span className="text-sm font-bold text-slate-300">{profile.handle}</span>
            <span className="text-xs text-neutral-600 font-bold whitespace-nowrap">
              {getTimeAgo(comment.created_at)}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed font-medium">
          {comment.body}
        </p>

        {!isExpired && isAuthenticated && (
          <div className="mt-3 flex">
            <button 
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-500 hover:text-white transition"
            >
              <Reply className="w-3.5 h-3.5" />
              Reply
            </button>
          </div>
        )}

        {isReplying && (
          <form onSubmit={submitReply} className="mt-4">
            <textarea
              autoFocus
              placeholder="Write your counter-intel..."
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
              className="w-full bg-neutral-950/80 border border-neutral-800 text-white rounded-lg px-3 py-2 placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-700 transition resize-none custom-scrollbar text-sm"
              rows={2}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsReplying(false)}
                className="px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white transition text-xs font-bold uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || replyBody.length < 2 || replyBody.length > 2000}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-neutral-200 text-black font-bold hover:bg-white transition disabled:opacity-50 text-xs uppercase tracking-wider"
              >
                {loading && <Loader2 className="w-3 h-3 animate-spin" />}
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      {comment.children?.length > 0 && (
        <div className="flex flex-col gap-3 mt-1">
          {comment.children.map((child: any) => (
            <CommentItem 
              key={child.id} 
              comment={child} 
              threadId={threadId} 
              isExpired={isExpired} 
              isAuthenticated={isAuthenticated} 
              depth={depth + 1} 
            />
          ))}
        </div>
      )}
    </div>
  )
}
