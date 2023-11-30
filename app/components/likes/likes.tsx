'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export const Likes = ({ tweet }) => {
  const router = useRouter()
  const handleLikes = async () => {
    const supabase = createClientComponentClient<Database>()
    const { 
      data: { user } 
    } = await supabase.auth.getUser()

    if (user) {
      await supabase.from('likes').insert({ user_id: user.id, tweet_id: tweet.id })
      router.refresh()
    }
  }

  return <button onClick={handleLikes}>{tweet.likes.length} Likes</button>
}