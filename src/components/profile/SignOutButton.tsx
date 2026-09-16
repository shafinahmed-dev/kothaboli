'use client'
import { createClient } from '@/lib/supabase/client'
import { LogOut, Loader2 } from 'lucide-react'
import { useState } from 'react'

export function SignOutButton() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <button 
      onClick={handleSignOut}
      disabled={loading}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition font-bold text-sm tracking-widest uppercase disabled:opacity-50 border border-red-500/20 hover:border-red-500"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
      Sign Out
    </button>
  )
}

