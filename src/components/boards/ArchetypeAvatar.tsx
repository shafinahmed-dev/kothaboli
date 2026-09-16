import { ARCHETYPES } from '@/lib/constants/archetypes'
import { User } from 'lucide-react'

export function ArchetypeAvatar({ archetypeId, className }: { archetypeId: string; className?: string }) {
  const arch = ARCHETYPES.find((a) => a.id === archetypeId)
  const Icon = arch?.icon || User
  
  return (
    <div className={`flex items-center justify-center rounded-full bg-slate-900 text-slate-100 ${className}`}>
      <Icon className="w-1/2 h-1/2" />
    </div>
  )
}
