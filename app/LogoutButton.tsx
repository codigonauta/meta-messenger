'use client'

import { signOut } from 'next-auth/react'

function LogoutButton() {
  return (
    <button
      className="px-4 py-2 font-bold text-white bg-blue-400 rounded hover:bg-blue-500"
      onClick={() => signOut()}>
      Sign Out
    </button>
  )
}

export default LogoutButton
