'use client'

import { useEffect, useOptimistic } from 'react'
import { Likes } from '../likes/likes'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export const Tweets = ({ tweets }: { tweets: TweetWithAuthor[] }) => {
  const [optimisticTweets, addOptimisticTweet] = useOptimistic<TweetWithAuthor[],TweetWithAuthor>(
    tweets, 
    (currentOptimisticTweets, newTweet) => {
    const newOptimisticTweets = [...currentOptimisticTweets]
    const index = newOptimisticTweets.findIndex(
      (tweet) => tweet.id === newTweet.id
    )
    newOptimisticTweets[index] = newTweet
    return newOptimisticTweets
  })

  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const channel = supabase.channel('realtime tweets').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'tweets'
    }, (payload) => {
      router.refresh()
    }).subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, router])

  return optimisticTweets.map(tweet => (
    <div key={tweet.id} className="border border-gray-800 border-t-0 px-4 py-8 flex">
      <p>{tweet.author.name} {tweet.author.username}</p>
      <p>{tweet.title}</p>
      <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
    </div>
    )
  )
}