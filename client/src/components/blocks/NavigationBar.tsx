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
import { Fragment } from 'react/jsx-runtime'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
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
import { navbarData } from '@/data/navbar'
import { cn } from '@/lib/utils'

export default function NavigationBar() {
  return (
    <div className="relative w-full border-neutral-200 border-b bg-white dark:border-neutral-800 dark:bg-neutral-950 [&_a]:no-underline">
      <Container className="mx-auto flex h-17 items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 items-center justify-center text-primary dark:text-primary">
              <Image
                className="h-full w-full object-contain"
                src="https://placehold.co/200x40.png"
                alt="Real State Logo"
                width={200}
                height={40}
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
                {navbarData.map((menuItem) => (
                  <NavigationMenuItem key={menuItem.label}>
                    {menuItem.type === 'megaMenu' && (
                      <Fragment key={menuItem.label}>
                        <NavigationMenuTrigger className="h-auto rounded-xl bg-transparent px-3 py-1.5 font-medium text-neutral-700 text-sm transition-all hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 data-[active]:bg-neutral-100 data-[state=open]:bg-neutral-100 dark:text-neutral-300 dark:data-[active]:bg-neutral-800/50 dark:data-[state=open]:bg-neutral-800/50 dark:focus:bg-neutral-800/50 dark:focus:text-neutral-50 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50">
                          {menuItem.label}
                        </NavigationMenuTrigger>

                        <NavigationMenuContent className="w-full!">
                          <div className="mx-auto grid max-w-6xl grid-cols-4 gap-6 divide-x px-6 py-8">
                            {menuItem.menu.map((menu) => (
                              <div
                                key={menu.label}
                                className="flex flex-col gap-3 pl-6"
                              >
                                {menu.type === 'list' && (
                                  <Fragment key={menu.label}>
                                    <h4 className="mb-1 text-neutral-400 text-xs uppercase dark:text-neutral-500">
                                      {menu.label}
                                    </h4>
                                    {menu.links.map((item) => (
                                      <Link
                                        key={item.label}
                                        href={item.href}
                                        className="font-medium text-neutral-500 text-sm no-underline hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </Fragment>
                                )}
                                {menu.type === 'featured' && (
                                  <Link
                                    key={menu.label}
                                    href={menu.href}
                                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 no-underline ring ring-primary/50 transition-all"
                                  >
                                    <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent group-hover:opacity-100 dark:from-primary/10" />
                                    <div className="absolute inset-0 -z-10 bg-neutral-100 dark:bg-neutral-900" />
                                    <div>
                                      <Badge
                                        variant="outline"
                                        className="mb-3 border-primary bg-white text-primary dark:border-primary dark:bg-neutral-950 dark:text-primary"
                                      >
                                        {menu.title}
                                      </Badge>

                                      <p className="text-neutral-600 text-sm dark:text-neutral-400">
                                        {menu.description}
                                      </p>
                                    </div>

                                    <div className="mt-4 flex items-center font-medium text-primary text-sm dark:text-primary">
                                      {menu.label}{' '}
                                      <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </Fragment>
                    )}
                    {menuItem.type === 'link' && (
                      <NavigationMenuLink
                        href={menuItem.href}
                        className="rounded-xl bg-transparent px-3 py-1.5 font-medium text-neutral-700 text-sm transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50"
                      >
                        {menuItem.label}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
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
              <SheetContent side="right" className="w-full sm:max-w-xs">
                <div className="flex h-full flex-col overflow-y-auto px-6 py-8">
                  <Image
                    className="mb-6"
                    src="https://placehold.co/200x40.png"
                    alt="Real State Logo"
                    width={200}
                    height={40}
                  />

                  {/* Sheet Search */}
                  <div className="relative mb-6">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <Input
                      placeholder="Search..."
                      className="rounded-lg pl-10"
                    />
                  </div>

                  <div className="flex flex-col gap-1 font-medium text-base">
                    {navbarData.map((menuItem) => (
                      <Fragment key={menuItem.label}>
                        {menuItem.type === 'megaMenu' && (
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem
                              value={menuItem.label}
                              className="border-none"
                            >
                              <AccordionTrigger className="justify-between py-2 font-medium text-base text-neutral-900 no-underline transition-colors hover:text-primary hover:no-underline dark:text-neutral-50 dark:hover:text-primary">
                                {menuItem.label}
                              </AccordionTrigger>
                              <AccordionContent className="mt-1 ml-2 flex h-auto! flex-col gap-3 border-neutral-200 border-l pb-0 pl-4 dark:border-neutral-800 [&_a]:no-underline">
                                {menuItem.menu.map((menu, index) => (
                                  <Fragment key={menu.label}>
                                    {menu.type === 'list' && (
                                      <div
                                        className={cn(
                                          'flex flex-col gap-2',
                                          index && 'mt-2'
                                        )}
                                      >
                                        <span className="text-neutral-400 text-xs uppercase">
                                          {menu.label}
                                        </span>
                                        {menu.links.map((item) => (
                                          <Link
                                            key={item.label}
                                            href={item.href}
                                            className="font-medium text-neutral-600 text-sm tracking-tight hover:text-primary dark:text-neutral-300 dark:hover:text-primary"
                                          >
                                            {item.label}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                    {menu.type === 'featured' && (
                                      <Link
                                        key={menu.label}
                                        href={menu.href}
                                        className="group relative mr-1 mb-1 flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 no-underline ring ring-primary/50 transition-all"
                                      >
                                        <Badge
                                          variant="outline"
                                          className="mb-3 border-primary bg-white text-primary dark:border-primary dark:bg-neutral-950 dark:text-primary"
                                        >
                                          {menu.title}
                                        </Badge>

                                        <p className="text-neutral-600 text-sm dark:text-neutral-400">
                                          {menu.description}
                                        </p>

                                        <div className="mt-4 flex items-center font-medium text-primary text-sm dark:text-primary">
                                          {menu.label}{' '}
                                          <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                      </Link>
                                    )}
                                  </Fragment>
                                ))}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        )}
                        {menuItem.type === 'link' && (
                          <Link
                            key={menuItem.label}
                            href={menuItem.href}
                            className="block py-2 text-neutral-900 no-underline transition-colors hover:text-primary dark:text-neutral-50"
                          >
                            {menuItem.label}
                          </Link>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </div>
  )
}
