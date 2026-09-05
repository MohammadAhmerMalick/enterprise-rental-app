'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { linkGroups } from '@/data/footerData'

const Footer = () => {
  return (
    <footer className="py-8">
      <Container>
        <div className="flex flex-col justify-between gap-12 xl:flex-row xl:gap-24">
          <div className="shrink-0 space-y-8 xl:w-100">
            <div className="flex items-center gap-2">
              <div className="text-primary">
                <Image
                  className="h-full w-full object-contain"
                  src="https://placehold.co/500x100.png"
                  alt="Real State Logo"
                  width={500}
                  height={100}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Stay in the loop.</h3>
              <form
                className="relative flex max-w-sm items-center"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-none border-transparent bg-muted py-6 pr-32 pl-6 shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.5)] outline-none focus-visible:border-none focus-visible:ring-1 focus-visible:ring-primary dark:shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_2px_0_0px_rgba(255,255,255,0.1)]"
                />
                <Button
                  type="submit"
                  className="absolute right-1.5 h-9 rounded-none border-primary px-5 shadow-[0_0_0_0.5px_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.05),inset_0_1px_0_0px_rgba(255,255,255,0.5)]"
                >
                  Subscribe
                </Button>
              </form>
              <p className="max-w-sm text-muted-foreground text-xs leading-relaxed">
                By subscribing you agree to our Terms & Conditions and Privacy
                Policy. You can unsubscribe at any time.
              </p>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-8">
            {linkGroups.map((group) => (
              <div key={group.title} className="space-y-5">
                <h4 className="font-medium text-foreground text-sm">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center border-t pt-4">
          <p className="text-center text-muted-foreground text-xs">
            © 2026 Watermelon, Inc. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
