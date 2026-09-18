'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper/types'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import HeadingUnit from '@/components/unit/HeadingUnit'
import PropertySliderUnit from '@/components/unit/PropertySliderUnit'

const EMIRATES = [
  'Abu Dhabi',
  'Dubai',
  'Ajman',
  'Ras Al Khaimah',
  'Umm Al Quwain',
  'Sharjah',
  'Fujairah',
] as const

const PropertiesByStateBlock = () => {
  const swiperRef = useRef<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const syncSwiper = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }, [])

  return (
    <Container>
      <HeadingUnit
        as="h2"
        className="mb-6"
        heading="Find properties by Emirates"
        layout="left"
      />
      <Tabs
        className="gap-4"
        defaultValue="Abu Dhabi"
        onValueChange={() => {
          swiperRef.current = null
          setIsBeginning(true)
          setIsEnd(false)
        }}
      >
        <div className="mb-4 flex items-center justify-between gap-6">
          <TabsList className="min-h-12 rounded-3xl border bg-transparent p-1.5">
            {EMIRATES.map((name) => (
              <TabsTrigger
                key={name}
                className="rounded-2xl px-4 py-3 font-medium text-md transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground"
                value={name}
              >
                {name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex shrink-0 items-center justify-end gap-2">
            <Button
              className="size-12 rounded-full"
              disabled={isBeginning}
              onClick={() => swiperRef.current?.slidePrev()}
              size="icon-lg"
              type="button"
              variant="outline"
            >
              <ChevronLeft className="size-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              className="size-12 rounded-full"
              disabled={isEnd}
              onClick={() => swiperRef.current?.slideNext()}
              size="icon-lg"
              type="button"
              variant="outline"
            >
              <ChevronRight className="size-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>

        {EMIRATES.map((name) => (
          <TabsContent key={name} value={name}>
            <PropertySliderUnit onSwiper={syncSwiper} />
          </TabsContent>
        ))}
      </Tabs>
    </Container>
  )
}

export default PropertiesByStateBlock
