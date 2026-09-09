'use client'

import {
  Authenticator,
  ThemeProvider,
  useAuthenticator,
} from '@aws-amplify/ui-react'
import { I18n } from 'aws-amplify/utils'
import AuthScreen, { AuthSpinner } from '@/app/(auth)/AuthScreen'
import authComponents from '@/app/(auth)/authComponents'
import authTheme from '@/app/(auth)/authTheme'

I18n.putVocabularies({
  en: {
    Confirm: 'Verify code',
    'Create Account': 'Create account',
    'Enter your Email': 'you@example.com',
    'Enter your Password': 'Enter your password',
    'Forgot your password?': 'Forgot password?',
    'Please confirm your Password': 'Re-enter your password',
    'Reset Password': 'Reset password',
    'Send code': 'Send reset code',
    'Sign In': 'Sign in',
    'Sign in': 'Sign in',
    Submit: 'Continue',
    'We Emailed You': 'Check your email',
  },
})

const formFields = {
  confirmResetPassword: {
    confirm_password: {
      label: 'Confirm new password',
      placeholder: 'Re-enter your new password',
    },
    confirmation_code: {
      label: 'Verification code',
      placeholder: 'Enter the 6-digit code',
    },
    password: {
      label: 'New password',
      placeholder: 'Create a new password',
    },
  },
  confirmSignUp: {
    confirmation_code: {
      label: 'Verification code',
      placeholder: 'Enter the 6-digit code',
    },
  },
  forgotPassword: {
    username: {
      label: 'Email',
      placeholder: 'you@example.com',
    },
  },
  signIn: {
    password: {
      isRequired: true,
      label: 'Password',
      order: 2,
      placeholder: 'Enter your password',
    },
    username: {
      isRequired: true,
      label: 'Email',
      order: 1,
      placeholder: 'you@example.com',
    },
  },
  signUp: {
    confirm_password: {
      isRequired: true,
      label: 'Confirm Password',
      order: 4,
      placeholder: 'Confirm your password',
    },
    email: {
      isRequired: true,
      label: 'Email',
      order: 2,
      placeholder: 'you@example.com',
    },
    password: {
      isRequired: true,
      label: 'Password',
      order: 3,
      placeholder: 'Create a password',
    },
    username: {
      isRequired: true,
      label: 'Username',
      order: 1,
      placeholder: 'Enter your username',
    },
  },
}

const UnauthenticatedApp = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus])

  return (
    <AuthScreen>
      <ThemeProvider colorMode="light" theme={authTheme}>
        {authStatus === 'configuring' ? (
          <AuthSpinner />
        ) : (
          <Authenticator
            className="w-full"
            components={authComponents}
            formFields={formFields}
            loginMechanisms={['email']}
          />
        )}
      </ThemeProvider>
    </AuthScreen>
  )
}

export default UnauthenticatedApp
