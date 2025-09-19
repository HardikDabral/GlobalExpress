import { useState } from 'react'
import { PopupForm } from './Popupform'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Clock, MapPin, Star, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import agraIcon from "../../public/images/agra.webp"
import lucknowIcon from "../../public/images/lucknow.webp"
import chandigarhIcon from "../../public/images/chandigarh.webp"
import jaipur from "../../public/images/jaipur.webp"

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const PopularDestination = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');
  const destinations = [
    {
      id: 1,
      name: "Agra",
      image: agraIcon,
      duration: "4h 45m",
      price: "from ₹380",
      rating: 4.8,
      description: "Home to the iconic Taj Mahal",
      features: ["AC Bus", "WiFi", "Snacks"]
    },
    {
      id: 2,
      name: "Jaipur",
      image: jaipur,
      duration: "5h 30m",
      price: "from ₹480",
      rating: 4.9,
      description: "The Pink City with royal heritage",
      features: ["AC Bus", "WiFi", "Meals"]
    },
    {
      id: 3,
      name: "Chandigarh",
      image: chandigarhIcon,
      duration: "6h 15m",
      price: "from ₹580",
      rating: 4.7,
      description: "Modern city with beautiful architecture",
      features: ["AC Bus", "WiFi", "Refreshments"]
    },
    {
      id: 4,
      name: "Lucknow",
      image: lucknowIcon,
      duration: "8h 20m",
      price: "from ₹680",
      rating: 4.6,
      description: "City of Nawabs and delicious cuisine",
      features: ["AC Bus", "WiFi", "Dinner"]
    }
  ]

  return (
    <section className="py-16 bg-white relative mt-30 md:mt-0">
      {/* Dotted Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-forest via-forest-light to-forest-lighter text-transparent bg-clip-text">
            Popular Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing places with our premium bus services. Comfortable, safe, and reliable travel.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          speed={600}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className="popular-destinations-swiper"
        >
          {destinations.map((destination) => (
            <SwiperSlide key={destination.id}>
              <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 gpu-accelerated will-change-transform">
                {/* Desktop Image */}
                <div className="relative h-48 overflow-hidden hidden md:block">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="400"
                    height="192"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="h-4 w-4 text-forest fill-current mr-1" />
                      <span className="text-sm font-semibold text-gray-800">{destination.rating}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
                    <p className="text-white/90 text-sm">{destination.description}</p>
                  </div>
                </div>

                {/* Mobile Header - No Image */}
                <div className="md:hidden p-6 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                    <div className="flex items-center bg-forest/10 rounded-full px-3 py-1">
                      <Star className="h-4 w-4 text-forest fill-current mr-1" />
                      <span className="text-sm font-semibold text-forest">{destination.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{destination.description}</p>
                </div>
                
                <div className="p-6 md:pt-6 pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{destination.duration}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-700">{destination.price}</p>
                      <p className="text-xs text-muted-foreground">per seat</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {destination.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-forest-lighter/20 text-forest text-xs font-medium rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-forest hover:bg-forest-dark text-white transition-colors duration-200"
                    onClick={() => {
                      setSelectedDestination(destination.name);
                      setShowBooking(true);
                    }}
                  >
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Booking Popup */}
        <PopupForm 
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
          defaultDestination={selectedDestination}
        />
      </div>
    </section>
  )
}

export default PopularDestination