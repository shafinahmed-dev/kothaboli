'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ArchetypeAvatar } from '@/components/boards/ArchetypeAvatar'
import { Bell, LogOut, Loader2 } from 'lucide-react'
import { useState } from 'react'

export function Navbar({ profile }: { profile: any }) {
  const router = useRouter()
  const supabase = createClient()
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleSignIn = async () => {
    setIsSigningIn(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) setIsSigningIn(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            KothaBoli <span className="opacity-50 font-normal">| কথাবলি</span>
          </span>
        </Link>
        
        <nav className="flex items-center gap-4">
          {profile ? (
            <>
              <button className="relative p-2 text-slate-300 hover:text-white transition rounded-full hover:bg-slate-800">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border border-slate-950"></span>
              </button>
              
              <Link href="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 transition">
                <ArchetypeAvatar archetypeId={profile.archetype} className="w-6 h-6 text-sm" />
                <span className="text-sm font-medium text-slate-200">{profile.handle}</span>
              </Link>

              <button onClick={handleSignOut} className="p-2 text-slate-400 hover:text-white transition rounded-full hover:bg-slate-800" title="Sign Out">
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button 
              onClick={handleSignIn}
              disabled={isSigningIn}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-900 bg-slate-100 rounded-full hover:bg-white transition disabled:opacity-50"
            >
              {isSigningIn ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Sign in with Google
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
