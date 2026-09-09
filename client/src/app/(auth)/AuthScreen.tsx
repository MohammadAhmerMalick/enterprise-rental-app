'use client'

import { Building2, MapPin, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import type { ReactNode } from 'react'

import '@aws-amplify/ui-react/styles.css'
import './auth.css'

const AUTH_IMAGE =
  'https://sheltos-react-sooty.vercel.app/assets/images/feature/4.jpg'

const highlights = [
  { icon: Building2, label: '12k+ listings' },
  { icon: MapPin, label: '40+ cities' },
  { icon: ShieldCheck, label: 'Verified hosts' },
]

function BrandMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={
          inverted
            ? 'flex size-9 items-center justify-center rounded-lg bg-white/15 text-white ring-1 ring-white/20'
            : 'flex size-9 items-center justify-center rounded-lg bg-neutral-900 text-white'
        }
      >
        <Building2 className="size-4.5" />
      </span>
      <span
        className={
          inverted
            ? 'font-medium text-lg text-white tracking-tight'
            : 'font-medium text-lg text-neutral-900 tracking-tight'
        }
      >
        Real State
      </span>
    </div>
  )
}

export function AuthSpinner() {
  return (
    <div className="flex min-h-80 items-center justify-center">
      <div className="size-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
      <span className="sr-only">Loading</span>
    </div>
  )
}

const AuthScreen = ({ children }: { children: ReactNode }) => {
  return (
    <div className="auth-screen grid min-h-svh bg-white lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden lg:sticky lg:top-0 lg:block lg:h-svh">
        <Image
          fill
          priority
          alt="Sunlit living room in a listed rental home"
          className="object-cover"
          sizes="50vw"
          src={AUTH_IMAGE}
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/55 to-neutral-950/20" />

        <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
          <BrandMark inverted />

          <div className="max-w-lg space-y-8">
            <div className="space-y-3">
              <p className="font-medium text-sm text-white/70 uppercase tracking-[0.2em]">
                Rentals & homes
              </p>
              <h1 className="font-medium text-4xl leading-tight tracking-tight xl:text-5xl">
                A better way to find your next home.
              </h1>
              <p className="max-w-md text-base text-white/75 leading-relaxed">
                Browse verified listings, save the places you love, and pick up
                the conversation with hosts in one account.
              </p>
            </div>

            <ul className="flex flex-wrap gap-2">
              {highlights.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/90 ring-1 ring-white/15 backdrop-blur-sm"
                >
                  <Icon className="size-3.5" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <main className="flex flex-col justify-center px-6 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-100">
          <div className="mb-8 lg:hidden">
            <BrandMark />
          </div>
          {children}
          <p className="mt-8 text-center text-neutral-400 text-xs leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>
    </div>
  )
}

export default AuthScreen
