'use client'

import { Authenticator } from '@aws-amplify/ui-react'
import AuthProvider from '@/app/(auth)/authProvider'
import StoreProvider from '@/state/redux'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <Authenticator.Provider>
        <AuthProvider>{children}</AuthProvider>
      </Authenticator.Provider>
    </StoreProvider>
  )
}

export default Providers
