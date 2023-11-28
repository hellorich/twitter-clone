import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButtonClient } from './auth-button-client'

export const AuthButtonServer = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { 
    data: {session} 
  } = await supabase.auth.getSession()

  return <AuthButtonClient session={session} />
}