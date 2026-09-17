'use client'

import { useState } from 'react'
import { CommentItem } from './CommentItem'
import { createComment } from '@/app/actions/comments'
import { useRouter } from 'next/navigation'
import { Loader2, Plus, MessageSquare } from 'lucide-react'

export function CommentList({ threadId, comments, isExpired, isAuthenticated }: { threadId: string, comments: any[], isExpired: boolean, isAuthenticated: boolean }) {
  const [rootBody, setRootBody] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const commentMap = new Map()
  const roots: any[] = []
  
  comments.forEach(c => {
    commentMap.set(c.id, { ...c, children: [] })
  })
  
  comments.forEach(c => {
    if (c.parent_id) {
      const parent = commentMap.get(c.parent_id)
      if (parent) {
        parent.children.push(commentMap.get(c.id))
      } else {
        roots.push(commentMap.get(c.id))
      }
    } else {
      roots.push(commentMap.get(c.id))
    }
  })

  const submitRootComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rootBody.trim() || rootBody.length < 2) return
    setLoading(true)
    try {
      await createComment({ threadId, body: rootBody })
      setRootBody('')
      router.refresh()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <MessageSquare className="w-5 h-5 text-neutral-400" />
          Opinions
        </h3>
        
        {!isExpired && isAuthenticated ? (
          <form onSubmit={submitRootComment} className="bg-neutral-900/40 p-4 border border-neutral-800 rounded-2xl">
            <textarea
              placeholder="Drop your thoughts into the void..."
              value={rootBody}
              onChange={(e) => setRootBody(e.target.value)}
              className="w-full bg-neutral-950/50 border border-neutral-800 text-white rounded-xl px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-700 transition resize-none custom-scrollbar text-sm font-medium leading-relaxed"
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={loading || rootBody.length < 2 || rootBody.length > 2000}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-bold hover:bg-neutral-200 transition disabled:opacity-50 text-sm"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Send Reply
              </button>
            </div>
          </form>
        ) : !isAuthenticated && !isExpired ? (
          <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl text-sm text-neutral-400 text-center font-bold">
            Sign in to join the discussion.
          </div>
        ) : null}
      </div>

      <div className="space-y-4">
        {roots.length > 0 ? (
          roots.map(root => (
            <CommentItem 
              key={root.id} 
              comment={root} 
              threadId={threadId} 
              isExpired={isExpired} 
              isAuthenticated={isAuthenticated} 
            />
          ))
        ) : (
          <p className="text-neutral-500 text-sm italic font-medium">It is quiet here... too quiet.</p>
        )}
      </div>
    </div>
  )
}
