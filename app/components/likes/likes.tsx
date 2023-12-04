'use client'

import { startTransition } from 'react'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export const Likes = ({ tweet, addOptimisticTweet } : { 
  tweet: TweetWithAuthor
  addOptimisticTweet: (newTweet: TweetWithAuthor) => void 
}) => {
  const router = useRouter()
  
  const handleLikes = async () => {
    const supabase = createClientComponentClient<Database>()
    const { 
      data: { user } 
    } = await supabase.auth.getUser()

    if (user) {
      startTransition(() => {
        if (tweet.user_has_liked_tweet) {
          addOptimisticTweet({
            ...tweet,
            likes: tweet.likes - 1,
            user_has_liked_tweet: false,
          })
        } else {
          addOptimisticTweet({
            ...tweet,
            likes: tweet.likes + 1,
            user_has_liked_tweet: true,
          })
        }
      })
  
      if (tweet.user_has_liked_tweet) {
        await supabase
          .from('likes')
          .delete()
          .match({ user_id: user.id, tweet_id: tweet.id })
      } else {
        await supabase
          .from('likes')
          .insert({ user_id: user.id, tweet_id: tweet.id })
      }
      router.refresh()
    }
  }

  return <button onClick={handleLikes}>{tweet.likes} Likes</button>
}