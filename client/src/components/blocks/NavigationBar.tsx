import {
  ArrowUpRight,
  Bookmark,
  ChevronDown,
  LogOut,
  Menu,
  MoonStar,
  Search,
  Settings,
  User,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export default function NavigationBar() {
  return (
    <div className="relative w-full border-neutral-200 border-b bg-white dark:border-neutral-800 dark:bg-neutral-950 [&_a]:no-underline">
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 items-center justify-center text-primary dark:text-primary">
              <Image
                className="h-full w-full object-contain"
                src="https://placehold.co/500x100.png"
                alt="Real State Logo"
                width={400}
                height={100}
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <NavigationMenu
              className={cn(
                'static',
                '[&>.absolute]:inset-x-0 [&>.absolute]:top-full [&>.absolute]:w-full',
                '[&_[data-slot=navigation-menu-viewport]]:!w-full [&_[data-slot=navigation-menu-viewport]]:mt-1',
                '[&_[data-slot=navigation-menu-viewport]]:rounded-none [&_[data-slot=navigation-menu-viewport]]:shadow-none [&_[data-slot=navigation-menu-viewport]]:ring-0',
                '[&_[data-slot=navigation-menu-viewport]]:border-0 [&_[data-slot=navigation-menu-viewport]]:border-b',
                '[&_[data-slot=navigation-menu-viewport]]:border-neutral-200 dark:[&_[data-slot=navigation-menu-viewport]]:border-neutral-800',
                '[&_[data-slot=navigation-menu-viewport]]:bg-white dark:[&_[data-slot=navigation-menu-viewport]]:bg-neutral-950',
                '[&_[data-slot=navigation-menu-viewport]]:transition-all [&_[data-slot=navigation-menu-viewport]]:duration-300 [&_[data-slot=navigation-menu-viewport]]:ease-in-out',
                '[&_[data-slot=navigation-menu-viewport]]:data-open:fade-in-0 [&_[data-slot=navigation-menu-viewport]]:data-closed:fade-out-0',
                '[&_[data-slot=navigation-menu-viewport]]:data-open:zoom-in-100 [&_[data-slot=navigation-menu-viewport]]:data-closed:zoom-out-100'
              )}
            >
              <NavigationMenuList className="gap-6">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-auto rounded-xl bg-transparent px-3 py-1.5 font-medium text-neutral-700 text-sm transition-all hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 data-[active]:bg-neutral-100 data-[state=open]:bg-neutral-100 dark:text-neutral-300 dark:data-[active]:bg-neutral-800/50 dark:data-[state=open]:bg-neutral-800/50 dark:focus:bg-neutral-800/50 dark:focus:text-neutral-50 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50">
                    Buy
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-full!">
                    <div className="mx-auto grid max-w-6xl grid-cols-4 gap-6 divide-x px-6 py-8">
                      <div className="flex flex-col gap-3 pl-6">
                        <h4 className="mb-1 text-neutral-400 text-xs uppercase dark:text-neutral-500">
                          Properties for Sale
                        </h4>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Apartments
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Houses
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Villas
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Land
                        </Link>
                      </div>
                      <div className="flex flex-col gap-3 pl-6">
                        <h4 className="mb-1 text-neutral-400 text-xs uppercase dark:text-neutral-500">
                          Buyer Tools
                        </h4>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Mortgage Calculator
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Sold House Prices
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Sale Price Map
                        </Link>
                      </div>
                      <div className="flex flex-col gap-3 pl-6">
                        <h4 className="mb-1 text-neutral-400 text-xs uppercase dark:text-neutral-500">
                          Buying Insights
                        </h4>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Buyer&apos;s Guide
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Area Insights
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Community Guides
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Tower & Compound Guides
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Schools & University Guides
                        </Link>
                      </div>
                      <div className="flex flex-col pl-6">
                        <Link
                          href="#"
                          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 no-underline ring ring-primary/50 transition-all"
                        >
                          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent group-hover:opacity-100 dark:from-primary/10" />
                          <div className="absolute inset-0 -z-10 bg-neutral-100 dark:bg-neutral-900" />
                          <div>
                            <Badge
                              variant="outline"
                              className="mb-3 border-primary bg-white text-primary dark:border-primary dark:bg-neutral-950 dark:text-primary"
                            >
                              Featured
                            </Badge>

                            <p className="text-neutral-600 text-sm dark:text-neutral-400">
                              Get the right mortgage for you
                            </p>
                          </div>

                          <div className="mt-4 flex items-center font-medium text-primary text-sm dark:text-primary">
                            See Your Mortgage Estimate{' '}
                            <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-auto rounded-xl bg-transparent px-3 py-1.5 font-medium text-neutral-700 text-sm transition-all hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 data-[active]:bg-neutral-100 data-[state=open]:bg-neutral-100 dark:text-neutral-300 dark:data-[active]:bg-neutral-800/50 dark:data-[state=open]:bg-neutral-800/50 dark:focus:bg-neutral-800/50 dark:focus:text-neutral-50 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50">
                    Rent
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-full!">
                    <div className="mx-auto grid max-w-6xl grid-cols-4 gap-6 divide-x px-6 py-8">
                      <div className="flex flex-col gap-3 pl-6">
                        <h4 className="mb-1 text-neutral-400 text-xs uppercase dark:text-neutral-500">
                          Properties for Rent
                        </h4>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Apartments
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Houses
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Villas
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Land
                        </Link>
                      </div>
                      <div className="flex flex-col gap-3 pl-6">
                        <h4 className="mb-1 text-neutral-400 text-xs uppercase dark:text-neutral-500">
                          Renter Tools
                        </h4>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Pay rent monthly
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Rent vs Buy Calculator
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Rented House Prices
                        </Link>
                      </div>
                      <div className="flex flex-col gap-3 pl-6">
                        <h4 className="mb-1 text-neutral-400 text-xs uppercase dark:text-neutral-500">
                          Renter Insights
                        </h4>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Renter&apos;s Guide
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Renter&apos;s Area Insights
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Renter&apos;s Community Guides
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Renter&apos;s Tower & Compound Guides
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Renter&apos;s Schools & University Guides
                        </Link>
                      </div>
                      <div className="flex flex-col pl-6">
                        <Link
                          href="#"
                          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 no-underline ring ring-primary/50 transition-all"
                        >
                          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent group-hover:opacity-100 dark:from-primary/10" />
                          <div className="absolute inset-0 -z-10 bg-neutral-100 dark:bg-neutral-900" />
                          <div>
                            <Badge
                              variant="outline"
                              className="mb-3 border-primary bg-white text-primary dark:border-primary dark:bg-neutral-950 dark:text-primary"
                            >
                              Featured
                            </Badge>

                            <p className="text-neutral-600 text-sm dark:text-neutral-400">
                              Get the right mortgage for you
                            </p>
                          </div>

                          <div className="mt-4 flex items-center font-medium text-primary text-sm dark:text-primary">
                            See Your Mortgage Estimate{' '}
                            <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="rounded-xl bg-transparent px-3 py-1.5 font-medium text-neutral-700 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50"
                    href="#"
                  >
                    Find Agents
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-auto rounded-xl bg-transparent px-3 py-1.5 font-medium text-neutral-700 text-sm transition-all hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 data-[active]:bg-neutral-100 data-[state=open]:bg-neutral-100 dark:text-neutral-300 dark:data-[active]:bg-neutral-800/50 dark:data-[state=open]:bg-neutral-800/50 dark:focus:bg-neutral-800/50 dark:focus:text-neutral-50 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50">
                    Morgague
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-full!">
                    <div className="mx-auto grid max-w-6xl grid-cols-4 gap-6 divide-x px-6 py-8">
                      <div className="flex flex-col gap-3 pl-6">
                        <h4 className="mb-1 text-neutral-400 text-xs uppercase dark:text-neutral-500">
                          Explore your options
                        </h4>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Rent vs buy calculator
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Eligibility calculator
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Mortgage calculator
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Take the next step
                        </Link>
                      </div>
                      <div className="flex flex-col gap-3 pl-6">
                        <h4 className="mb-1 text-neutral-400 text-xs uppercase dark:text-neutral-500">
                          Take the next step
                        </h4>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Get pre-approved
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Refinance
                        </Link>
                        <Link
                          href="#"
                          className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                        >
                          Equity release
                        </Link>
                      </div>
                      <div className="flex flex-col pl-6">
                        <Link
                          href="#"
                          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 no-underline ring ring-primary/50 transition-all"
                        >
                          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent group-hover:opacity-100 dark:from-primary/10" />
                          <div className="absolute inset-0 -z-10 bg-neutral-100 dark:bg-neutral-900" />
                          <div>
                            <h4 className="mb-2 font-semibold text-neutral-900 text-sm dark:text-neutral-50">
                              What can you afford?
                            </h4>
                            <p className="text-neutral-600 text-sm dark:text-neutral-400">
                              Compare rates from 20+ banks. End-to-end support,
                              free.
                            </p>
                          </div>
                          <div className="mt-4 flex items-center font-medium text-primary text-sm dark:text-primary">
                            Chat with an advisor{' '}
                            <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mx-8 hidden max-w-md flex-1 lg:block">
          <div className="group relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search properties..."
              className="w-full rounded-lg border-neutral-200 bg-neutral-50 pr-4 pl-10 text-sm transition-all focus:ring-2 focus:ring-primary/20 dark:border-neutral-800 dark:bg-neutral-900"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden items-center gap-2 lg:block">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg p-0 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <MoonStar className="h-5 w-5" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg p-0 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <Bookmark className="h-5 w-5" />
              <span className="sr-only">Bookmarks</span>
            </Button>
          </div>

          <div className="hidden h-6 w-px bg-neutral-200 lg:block dark:bg-neutral-800" />

          {/* Avatar Section */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto rounded-xl p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 rounded-full border border-neutral-200 dark:border-neutral-800">
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-neutral-400" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 rounded-xl p-1.5 shadow-xl"
            >
              <DropdownMenuLabel className="px-2 py-1.5 text-neutral-400 text-xs uppercase">
                Account
              </DropdownMenuLabel>
              <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm">
                <User className="h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm">
                <Settings className="h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                className="flex items-center gap-2 rounded-lg !focus:bg-red-600/10 px-2 py-2 text-sm"
              >
                <LogOut className="h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="text-neutral-700 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-10 w-10 rounded-xl p-0 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:max-w-xs"
              ></SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  )
}
