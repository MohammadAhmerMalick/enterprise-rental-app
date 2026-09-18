import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type FeaturedCardProps = {
  availablePropertiesCount: number
  imageSrc: string
  city: string
  className?: string
}

const FeaturedCard = ({
  availablePropertiesCount,
  imageSrc,
  city,
  className,
}: FeaturedCardProps) => {
  return (
    <Card
      className={cn(
        'group relative max-w-md overflow-hidden border-0 bg-black/50 py-0 shadow-sm',
        className
      )}
    >
      <CardContent className="px-0">
        <Image
          alt={city}
          width={300}
          height={400}
          src={imageSrc}
          className="h-90 w-full object-cover opacity-90 transition-all duration-500 group-hover:scale-105"
        />
      </CardContent>
      <div className="absolute inset-0 mt-auto h-1/2 bg-linear-to-t from-black/90 to-transparent transition-all duration-500 group-hover:h-full" />
      <div className="absolute inset-x-0 bottom-0 z-10">
        <CardHeader className="space-y-2 pb-4 text-center text-white">
          <CardTitle className="text-2xl duration-500 group-hover:pb-1">
            {city}
          </CardTitle>
          <p className="text-white duration-500 group-hover:pb-4">
            {availablePropertiesCount} Properties
          </p>
        </CardHeader>
      </div>
    </Card>
  )
}

export default FeaturedCard
