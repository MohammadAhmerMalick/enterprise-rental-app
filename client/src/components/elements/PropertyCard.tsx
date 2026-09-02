'use client'

import { Bath, BedDouble, Camera, Heart, Maximize2, Ruler } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import 'swiper/css'
import 'swiper/css/pagination'

type PropertyStatus = 'rent' | 'sale'

type PropertyCardProps = {
  baths: number
  beds: number
  className?: string
  description: string
  href?: string
  images: string[]
  listedAt: string
  location: string
  price: number
  sqft: number
  status?: PropertyStatus
  title: string
}

const formatListedAt = (listedAt: string) =>
  new Date(listedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

const formatPrice = (price: number) =>
  `${new Intl.NumberFormat('en-US', {
    currency: 'USD',
    minimumFractionDigits: 2,
    style: 'currency',
    useGrouping: false,
  }).format(price)}*`

const PropertyCard = ({
  baths,
  beds,
  className,
  description,
  href = '/',
  images,
  listedAt,
  location,
  price,
  sqft,
  status = 'sale',
  title,
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const photoCount = images.length

  return (
    <Card
      className={cn(
        'gap-0 overflow-hidden rounded-2xl border-0 bg-white py-0 shadow-[0_12px_40px_rgba(15,23,42,0.08)] ring-0',
        className
      )}
    >
      <div className="relative h-72 overflow-hidden bg-muted">
        {photoCount > 0 ? (
          <Swiper
            nested
            watchOverflow
            grabCursor={photoCount > 1}
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            loop={photoCount > 1}
            allowTouchMove={photoCount > 1}
            touchMoveStopPropagation
            navigation={photoCount > 1 ? true : false}
            pagination={photoCount > 1 ? { clickable: true } : false}
            className="property-card-swiper h-full"
          >
            {images.map((image) => (
              <SwiperSlide key={image} className="h-full">
                <div className="relative h-full">
                  <Image
                    fill
                    alt={title}
                    src={image}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}

        <Badge
          className={cn(
            'absolute top-4 left-4 z-10 h-6 rounded-md px-2.5 font-semibold text-[11px] text-white uppercase tracking-wider',
            status === 'sale'
              ? 'bg-rose-500 shadow-[0_6px_16px_rgba(244,63,94,0.45)]'
              : 'bg-slate-800 shadow-[0_6px_16px_rgba(15,23,42,0.35)]'
          )}
        >
          {status}
        </Badge>

        {photoCount > 0 ? (
          <span className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-md bg-slate-900 px-2 py-1 font-medium text-white text-xs">
            <Camera className="size-3.5" />
            {photoCount}
          </span>
        ) : null}

        <div className="absolute right-4 bottom-4 z-10 flex flex-col justify-end gap-3">
          <Button
            variant="outline"
            aria-label="Compare property"
            className="w-max px-2 text-slate-700"
          >
            <Maximize2 className="size-5" />
          </Button>

          <Button
            variant="outline"
            aria-label={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
            onClick={() => setIsFavorite((current) => !current)}
            className="w-max px-2 text-slate-700 transition-colors duration-500 hover:text-rose-500"
          >
            <Heart
              className={cn(
                'size-5 fill-white transition-fill duration-500',
                isFavorite && 'fill-rose-500 text-rose-500'
              )}
            />
          </Button>
        </div>
      </div>

      <CardContent className="flex flex-col gap-6 px-6 pt-6 pb-6">
        <div className="space-y-1.5">
          <p className="font-medium text-neutral-400 text-xs uppercase tracking-[0.18em]">
            {location}
          </p>
          <h3 className="font-bold text-slate-800 text-xl leading-snug">
            <Link href={href} className="transition-colors hover:text-rose-500">
              {title}
            </Link>
          </h3>
          <p className="font-medium text-base text-rose-500">
            {formatPrice(price)}
          </p>
          <p className="line-clamp-2 pt-1 text-neutral-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap items-center text-neutral-500 text-sm">
          <span className="flex items-center gap-1.5 pr-4">
            <BedDouble className="size-4" />
            Bed : {beds}
          </span>
          <span className="flex items-center gap-1.5 border-neutral-200 border-l px-4">
            <Bath className="size-4" />
            Baths : {baths}
          </span>
          <span className="flex items-center gap-1.5 border-neutral-200 border-l pl-4">
            <Ruler className="size-4" />
            Sq Ft : {sqft}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <time dateTime={listedAt} className="text-neutral-400 text-sm">
            {formatListedAt(listedAt)}
          </time>
          <Button
            asChild
            variant="outline"
            className="h-8 rounded-full border-neutral-300 border-dashed bg-white px-5 font-medium text-slate-800 hover:bg-neutral-50"
          >
            <Link href={href}>Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default PropertyCard
