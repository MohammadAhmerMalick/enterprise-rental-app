'use client'

import { useAuthenticator } from '@aws-amplify/ui-react'

interface AuthFormHeaderProps {
  description: string
  title: string
}

const AuthFormHeader = ({ description, title }: AuthFormHeaderProps) => {
  return (
    <div className="space-y-1 pt-6 pb-1">
      <h2 className="font-medium text-2xl text-neutral-900 tracking-tight">
        {title}
      </h2>
      <p className="text-neutral-500 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

const authComponents = {
  ConfirmResetPassword: {
    Header() {
      return (
        <AuthFormHeader
          title="Choose a new password"
          description="Enter the code we sent you, then pick a password you have not used before."
        />
      )
    },
  },
  ConfirmSignUp: {
    Header() {
      return (
        <AuthFormHeader
          title="Check your email"
          description="We sent a verification code to confirm your account. It may take a minute to arrive."
        />
      )
    },
  },
  ForgotPassword: {
    Header() {
      return (
        <AuthFormHeader
          title="Reset your password"
          description="Enter the email on your account and we will send a reset code."
        />
      )
    },
  },
  SignIn: {
    Footer() {
      const { toForgotPassword } = useAuthenticator()

      return (
        <div className="pt-1 text-center">
          <button
            className="font-medium text-neutral-500 text-sm transition-colors hover:text-neutral-900"
            onClick={toForgotPassword}
            type="button"
          >
            Forgot password?
          </button>
        </div>
      )
    },
    Header() {
      return (
        <AuthFormHeader
          title="Welcome back"
          description="Sign in to save homes, message hosts, and manage your rentals."
        />
      )
    },
  },
  SignUp: {
    Header() {
      return (
        <AuthFormHeader
          title="Create your account"
          description="Join Real State to browse verified listings and keep your search in one place."
        />
      )
    },
  },
}

export default authComponents
