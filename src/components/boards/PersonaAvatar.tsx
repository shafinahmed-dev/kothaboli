import { PERSONAS, normalizePersonaId } from '@/lib/constants/personas'
import { User } from 'lucide-react'

export function PersonaAvatar({ 
  personaId, 
  archetypeId, 
  profile,
  className 
}: { 
  personaId?: string; 
  archetypeId?: string; 
  profile?: any;
  className?: string 
}) {
  const targetId = personaId || archetypeId || profile?.archetype || profile?.persona
  const resolvedId = normalizePersonaId(targetId)
  const arch = PERSONAS.find((a) => a.id === resolvedId)
  const Icon = arch?.icon || User
  
  return (
    <div className={`flex items-center justify-center rounded-full bg-neutral-900 text-slate-100 shrink-0 ${className || ''}`}>
      <Icon className="w-1/2 h-1/2" />
    </div>
  )
}

export const ArchetypeAvatar = PersonaAvatar



