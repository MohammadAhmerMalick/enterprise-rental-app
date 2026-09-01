'use client'

import { Blocks, Command, Sparkles, Workflow, Zap } from 'lucide-react'
import { motion } from 'motion/react'

const trustedList = [
  {
    icon: Command,
    name: 'novo',
    weight: 'font-bold tracking-tighter',
  },
  {
    icon: Workflow,
    name: 'Telia Cygate',
    weight: 'font-medium tracking-tight',
  },
  {
    icon: Blocks,
    name: 'customer.io',
    weight: 'font-bold tracking-tight',
  },
  {
    icon: Sparkles,
    name: 'Fastmail',
    weight: 'font-medium tracking-tight',
  },
  {
    icon: Zap,
    name: 'Medtronic',
    weight: 'font-bold tracking-tighter',
  },
]

interface HeroBlockProps {
  trustedByText?: string
}

export default function HeroBlock({
  trustedByText = 'TRUSTED BY AMBITIOUS TEAMS',
}: HeroBlockProps) {
  return (
    <div className="relative h-screen max-h-150 w-full overflow-hidden bg-black font-sans text-white antialiased selection:bg-white/20">
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        {/* Video */}
        <iframe
          allowFullScreen
          title="YouTube video player"
          referrerPolicy="strict-origin-when-cross-origin"
          src="https://www.youtube.com/embed/MSYQyz9xly8?si=LJ_FCO5oETzVWu_b&amp;controls=0&mute=1&autoplay=1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture mute"
          className="pointer-events-none absolute top-1/2 left-1/2 h-[56.25vw] min-h-screen w-screen min-w-[177.77vw] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6 py-8 md:px-12">
        {/* Trusted By Logos */}
        <motion.div className="mt-auto flex flex-col gap-8 rounded-4xl bg-black/40 p-8 backdrop-blur-xs md:flex-row md:items-center md:gap-12 lg:gap-16">
          <span className="shrink-0 font-bold text-sm text-white tabular-nums tracking-wide">
            {trustedByText}
          </span>
          <div className="flex flex-wrap items-center gap-8 md:gap-12 lg:gap-16">
            {trustedList.map(({ icon: Icon, name, weight }) => (
              <motion.div
                key={name}
                className="flex items-center gap-2 mix-blend-screen grayscale transition-all duration-300 hover:grayscale-0"
              >
                <Icon className="h-6 w-6" />
                <span className={`text-xl ${weight}`}>{name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
