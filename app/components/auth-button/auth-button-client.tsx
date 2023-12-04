'use client'

import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

interface AuthButtonClientProps {
  session: Session | null
}

export const AuthButtonClient = ({ session }: AuthButtonClientProps) => {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return session ? (
    <button className="text-xs text-gray-400" onClick={handleSignOut}>Logout</button>
  ) : (
    <button className="text-xs text-gray-400" onClick={handleSignIn}>Login</button>
  )
}