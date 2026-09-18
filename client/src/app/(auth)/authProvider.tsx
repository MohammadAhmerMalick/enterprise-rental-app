'use client'

import { useAuthenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

const UnauthenticatedApp = dynamic(
  () => import('@/app/(auth)/UnauthenticatedApp')
)

const userPoolClientId =
  process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID || ''
const userPoolId = process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID || ''
const userPoolEndpoint = process.env.NEXT_PUBLIC_AWS_ENDPOINT || ''

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId,
      userPoolEndpoint,
      userPoolId,
    },
  },
})

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus])
  const pathname = usePathname()
  const isAuthPage = pathname.match(/^\/(auth|signin|signup)$/)
  // const isDashboardPage = pathname.match(/^\/dashboard$/)

  if (authStatus === 'authenticated') {
    return children
  }

  return isAuthPage ? <UnauthenticatedApp /> : children
}

export default AuthProvider
