'use client'

import { FormEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'
import useSWR from 'swr'
import { Message } from '../types'
import fetcher from '../utils/fetchMessages'
import { unstable_getServerSession } from 'next-auth/next'

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>
}

function ChatInput({ session }: Props) {
  const [input, setInput] = useState('')
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher)

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input) return

    const messageToSend = input

    setInput('')

    const id = uuid()

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profile_pic: session?.user?.image!,
      email: session?.user?.email!
    }

    const uploadMessageToUpstash = async () => {
      const res = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message
        })
      })

      const data = await res.json()

      return [data.message, ...messages!]
    }

    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true
    })
  }

  return (
    <form
      className="fixed bottom-0 z-50 flex w-full px-10 py-5 space-x-2 bg-white border-t border-gray-100"
      onSubmit={addMessage}>
      <input
        type="text"
        disabled={!session}
        placeholder="Enter message here..."
        className="flex-1 px-5 py-3 border border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        disabled={!input}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
        Send
      </button>
    </form>
  )
}

export default ChatInput
