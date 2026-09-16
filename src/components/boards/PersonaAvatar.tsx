import { PERSONAS } from '@/lib/constants/personas'
import { User } from 'lucide-react'

export function PersonaAvatar({ 
  personaId, 
  archetypeId, 
  className 
}: { 
  personaId?: string; 
  archetypeId?: string; 
  className?: string 
}) {
  const targetId = personaId || archetypeId
  const arch = PERSONAS.find((a) => a.id === targetId)
  const Icon = arch?.icon || User
  
  return (
    <div className={`flex items-center justify-center rounded-full bg-neutral-900 text-slate-100 ${className}`}>
      <Icon className="w-1/2 h-1/2" />
    </div>
  )
}

export const ArchetypeAvatar = PersonaAvatar

