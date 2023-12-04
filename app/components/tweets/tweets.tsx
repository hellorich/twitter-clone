'use client'

import { useOptimistic } from 'react'
import { Likes } from '../likes/likes'

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

  return optimisticTweets.map(tweet => (
    <div key={tweet.id}>
      <p>{tweet.author.name} {tweet.author.username}</p>
      <p>{tweet.title}</p>
      <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
    </div>
    )
  )
}