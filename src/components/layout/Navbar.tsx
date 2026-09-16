'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { PersonaAvatar } from '@/components/boards/PersonaAvatar'
import { LogOut, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { NotificationDropdown } from './NotificationDropdown'

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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition group">
          <span className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            KothaBoli <span className="text-neutral-500 font-medium">|</span> <span className="opacity-90 font-bold bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">কথাবলি</span>
          </span>
        </Link>
        
        <nav className="flex items-center gap-3 md:gap-4">
          {profile ? (
            <>
              <NotificationDropdown />
              
              <Link href="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 transition">
                <PersonaAvatar archetypeId={profile.persona} className="w-6 h-6 text-sm" />
                <span className="text-sm font-bold text-slate-200 hidden sm:inline">{profile.handle}</span>
              </Link>

              <button onClick={handleSignOut} className="p-2 text-neutral-500 hover:text-red-400 transition rounded-full hover:bg-neutral-900" title="Sign Out">
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button 
              onClick={handleSignIn}
              disabled={isSigningIn}
              className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-black bg-white rounded-full hover:bg-neutral-200 transition disabled:opacity-50"
            >
              {isSigningIn ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Log In / Sign In
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

