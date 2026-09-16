'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PERSONAS } from '@/lib/constants/personas'
import { createProfile } from '@/app/actions/profile'
import { Loader2 } from 'lucide-react'

function PersonaModalContent({ hasProfile }: { hasProfile: boolean }) {
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
      <div className="max-w-4xl w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl relative my-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Choose Your Persona</h2>
          <p className="text-neutral-400">This will define your identity in KothaBoli.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {PERSONAS.map((arch) => (
            <button
              key={arch.id}
              onClick={() => handleSelect(arch.id)}
              disabled={loadingId !== null}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-600 transition disabled:opacity-50 group"
            >
              {loadingId === arch.id ? (
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin mb-3" />
              ) : (
                <arch.icon className="w-8 h-8 text-neutral-400 group-hover:text-white mb-3 transition" />
              )}
              <span className="font-semibold text-neutral-300 group-hover:text-white text-sm">{arch.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PersonaModal({ hasProfile }: { hasProfile: boolean }) {
  return (
    <Suspense fallback={null}>
      <PersonaModalContent hasProfile={hasProfile} />
    </Suspense>
  )
}

export const ArchetypeModal = PersonaModal

