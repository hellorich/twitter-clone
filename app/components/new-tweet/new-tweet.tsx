
export const NewTweet = () => {
  const addTweet = async () => {
    'use server'
    console.log('Submitted')
  }

  return (
    <form action={addTweet}>
      <input name="title" />
    </form>
  )
}