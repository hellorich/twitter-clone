import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthButtonServer } from './components/auth-button/auth-button-server'
import { NewTweet } from './components/new-tweet/new-tweet'
import { Likes } from './components/likes/likes'

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session }} = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }

  const { data: tweets } = await supabase.from('tweets').select('*, profiles(*), likes(*)')
  
  return (
    <>
      <AuthButtonServer />
      <NewTweet />
      {tweets?.map(tweet => (
        <div key={tweet.id}>
          <p>{tweet?.profiles?.name} {tweet?.profiles?.username}</p>
          <p>{tweet.title}</p>
          <Likes tweet={tweet} />
        </div>
        )
      )}
    </>
  )
}
