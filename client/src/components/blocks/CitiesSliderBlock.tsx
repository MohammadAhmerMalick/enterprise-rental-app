'use client'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import FeaturedCard from '@/components/elements/FeaturedCard'
import { Container } from '@/components/ui/container'
import HeadingUnit from '@/components/unit/HeadingUnit'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const cities = [
  { image: 4, name: 'Abu Dhabi' },
  { image: 5, name: 'Dubai' },
  { image: 7, name: 'Ajman' },
  { image: 6, name: 'Ras Al Khaimah' },
  { image: 1, name: 'Umm Al Quwain' },
  { image: 3, name: 'Sharjah' },
  { image: 2, name: 'Fujairah' },
]

const CitiesSliderBlock = () => {
  return (
    <Container>
      <HeadingUnit
        as="h2"
        layout="split"
        className="mb-10"
        eyebrow="Locations"
        heading="Explore featured cities"
        paragraph="From waterfront living in Dubai to heritage neighborhoods in Sharjah, find the city that matches your next move."
      />
      <Swiper
        navigation
        pagination={{ clickable: true }}
        modules={[Pagination]}
        loop={true}
        autoplay={{ delay: 2500 }}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          576: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
          1200: { slidesPerView: 5, spaceBetween: 40 },
        }}
      >
        {cities.map(({ name, image }) => (
          <SwiperSlide key={name}>
            <FeaturedCard
              city={name}
              className="mx-auto mb-16 max-w-md"
              availablePropertiesCount={50}
              imageSrc={`https://sheltos-react-sooty.vercel.app/assets/images/feature/${image}.jpg`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}

export default CitiesSliderBlock
