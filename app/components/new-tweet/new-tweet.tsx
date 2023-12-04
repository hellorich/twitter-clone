import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Image from 'next/image'

export const NewTweet = ({ user } : { user: User }) => {
  const addTweet = async (formData: FormData) => {
    'use server'
    const title = String(formData.get('title'))
    const supabase = createServerActionClient<Database>({ cookies })
    await supabase.from('tweets').insert({ title, user_id: user.id })
  }

  return (
    <form action={addTweet} className="border border-gray-800 border-top-0">
      <div className="flex py-8 px-4">
        <div className="h-12 w-12">
          <Image 
            alt=""
            className="rounded-full"
            src={user.user_metadata.avatar_url}
            height={48}
            width={48}
          />
        </div>
        <input 
          name="title" 
          className="bg-inherit flex-1 ml-2 text-2xl leading-loose placeholder-gray-500 px-2"
          placeholder="What is happening?!"
        />
      </div>
    </form>
  )
}