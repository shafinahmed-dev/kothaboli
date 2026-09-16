'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createThread } from '@/app/actions/threads'
import { BOARDS } from '@/lib/constants/boards'
import { Loader2, Plus, AlertTriangle, X } from 'lucide-react'

export function CreateThreadModal({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState('')
  
  const router = useRouter()

  if (!isAuthenticated) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('body', body)
      formData.append('tag', tag)
      
      await createThread(formData)
      setIsOpen(false)
      setTitle('')
      setBody('')
      setTag('')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to create thread')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-30 flex items-center gap-2 px-5 py-3 rounded-full bg-slate-100 hover:bg-white text-slate-900 font-bold shadow-lg shadow-white/10 transition hover:scale-105"
      >
        <Plus className="w-5 h-5" />
        <span className="hidden md:inline">New Thread</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl relative my-8">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3 pt-2">Create a Thread</h2>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>This thread and all its replies will self-destruct exactly 7 days from now. No traces left behind.</p>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-3">Select Board</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-2" style={{scrollbarWidth: 'thin'}}>
                  {BOARDS.map((b) => {
                    const isSelected = tag === b.id
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setTag(b.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition font-medium border text-left ${isSelected ? 'bg-white text-black border-transparent' : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'}`}
                      >
                        <b.icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{b.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-between text-sm font-bold text-neutral-300 mb-2">
                    Thread Title
                    <span className={`text-xs ${title.length < 5 || title.length > 150 ? 'text-red-400' : 'text-neutral-500'}`}>
                      {title.length}/150
                    </span>
                  </label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What's strictly on your mind?"
                    className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-neutral-600 transition"
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-sm font-bold text-neutral-300 mb-2">
                    Body (Text only)
                    <span className={`text-xs font-mono font-medium ${body.length < 80 || body.length > 5000 ? 'text-red-400' : 'text-neutral-500'}`}>
                      {body.length}/5000 {body.length < 80 && `(min 80)`}
                    </span>
                  </label>
                  <textarea 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Dive into the details..."
                    rows={7}
                    className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-neutral-600 transition resize-none custom-scrollbar"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading || title.length < 5 || title.length > 150 || body.length < 80 || body.length > 5000 || !tag}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                  Ignite Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
