'use server'

import { createClient } from '@/lib/supabase/server'
import { generateArchetypeHandle } from '@/lib/constants/archetypes'
import { revalidatePath } from 'next/cache'

export async function createProfile(archetypeId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const handle = generateArchetypeHandle(archetypeId)

  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: user.id,
      handle,
      archetype: archetypeId
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/')
  return data
}
