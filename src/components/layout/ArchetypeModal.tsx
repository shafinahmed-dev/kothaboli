'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ARCHETYPES } from '@/lib/constants/archetypes'
import { createProfile } from '@/app/actions/profile'
import { Loader2 } from 'lucide-react'

function ArchetypeModalContent({ hasProfile }: { hasProfile: boolean }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const onboarding = searchParams.get('onboarding') === 'true'
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const shouldShow = !hasProfile || onboarding

  if (!shouldShow) return null

  const handleSelect = async (id: string) => {
    setLoadingId(id)
    try {
      await createProfile(id)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error(error)
      setLoadingId(null)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl relative my-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Choose Your Archetype</h2>
          <p className="text-slate-400">This will define your identity in KothaBoli.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {ARCHETYPES.map((arch) => (
            <button
              key={arch.id}
              onClick={() => handleSelect(arch.id)}
              disabled={loadingId !== null}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-500 transition disabled:opacity-50 group"
            >
              {loadingId === arch.id ? (
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin mb-3" />
              ) : (
                <arch.icon className="w-8 h-8 text-slate-300 group-hover:text-white mb-3" />
              )}
              <span className="font-semibold text-slate-200 group-hover:text-white">{arch.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ArchetypeModal({ hasProfile }: { hasProfile: boolean }) {
  return (
    <Suspense fallback={null}>
      <ArchetypeModalContent hasProfile={hasProfile} />
    </Suspense>
  )
}
