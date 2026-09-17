'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createThread } from '@/app/actions/threads'
import { BOARDS } from '@/lib/constants/boards'
import { Loader2, Plus, AlertTriangle, X, LogIn } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function CreateThreadModal({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthWall, setShowAuthWall] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState('')
  
  const router = useRouter()
  const supabase = createClient()

  const handleTriggerClick = () => {
    if (isAuthenticated) {
      setIsOpen(true)
    } else {
      setShowAuthWall(true)
    }
  }

  const handleSignIn = async () => {
    setIsSigningIn(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

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
      <div className="mb-6">
        <button 
          onClick={handleTriggerClick}
          type="button"
          className="w-full p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900 transition-all group flex items-center justify-between gap-4 text-left shadow-lg hover:shadow-white/5 cursor-pointer backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-neutral-500 transition shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm md:text-base font-medium text-neutral-400 group-hover:text-slate-200 transition">
              Have something to share? Start a thread...
            </span>
          </div>
          <span className="px-4 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs md:text-sm hover:bg-neutral-200 transition shadow-sm group-hover:scale-105 shrink-0">
            Start A Thread
          </span>
        </button>
      </div>

      {showAuthWall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 text-center relative shadow-2xl my-8">
            <button 
              onClick={() => setShowAuthWall(false)} 
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-neutral-700/80 flex items-center justify-center mx-auto mb-5 text-white shadow-inner">
              <LogIn className="w-7 h-7" />
            </div>

            <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2">
              Log In / Sign In to post a thread
            </h2>

            <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-medium">
              KothaBoli is built for pseudo-anonymous discussions. Log in to choose your persona and ignite temporary conversations.
            </p>

            <button
              onClick={handleSignIn}
              disabled={isSigningIn}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition shadow-lg disabled:opacity-50"
            >
              {isSigningIn ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      )}

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
