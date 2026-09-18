'use client'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper/types'
import PropertyCard from '@/components/elements/PropertyCard'

import 'swiper/css'
import 'swiper/css/pagination'
import propertiesData from '@/data/propertiesData'

const pagination = { clickable: true }
const modules = [Pagination]
const breakpoints = {
  0: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
  1200: { slidesPerView: 3 },
}

interface PropertySliderUnitProps {
  onSwiper: (swiper: SwiperType) => void
}

const PropertySliderUnit = ({ onSwiper }: PropertySliderUnitProps) => {
  return (
    <Swiper
      breakpoints={breakpoints}
      modules={modules}
      onFromEdge={onSwiper}
      onLock={onSwiper}
      onResize={onSwiper}
      onSlideChange={onSwiper}
      onSwiper={onSwiper}
      onUnlock={onSwiper}
      pagination={pagination}
      spaceBetween={20}
      watchOverflow
    >
      {propertiesData.map((property) => (
        <SwiperSlide key={property.title}>
          <PropertyCard {...property} className="mb-16" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default PropertySliderUnit
