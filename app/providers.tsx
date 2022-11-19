'use client'

import { unstable_getServerSession } from 'next-auth/next'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>
  children: ReactNode
}

function Providers({ session, children }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default Providers
