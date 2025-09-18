import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import user1 from "../../public/images/user1.jpg"
import user2 from "../../public/images/user2.jpg"
import user3 from "../../public/images/user3.jpg"
import user4 from "../../public/images/user4.jpg"
import user5 from "../../public/images/user5.jpg"
import user6 from "../../public/images/user6.jpg"

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "IT Professional",
    image: user1,
    rating: 5,
    text: "Weekend trips to Bangalore are now stress-free. The reclining seats and entertainment system make the journey enjoyable. Perfect for weekend getaways!",
    platform: "Google Reviews"
  },
  {
    name: "Amit Verma",
    role: "Business Traveler",
    image: user2,
    rating: 5,
    text: "Punctual, professional, and perfect! The online booking system is seamless, and their customer support is exceptional. My go-to choice for business trips.",
    platform: "TrustPilot"
  },
  {
    name: "Vikram Singh",
    role: "Sales Executive",
    image: user3,
    rating: 5,
    text: "As someone who travels weekly for client meetings, their reliable service and comfortable seats make a huge difference. The WiFi keeps me productive.",
    platform: "Google Reviews"
  },
  {
    name: "Arun Patel",
    role: "College Student",
    image: user4,
    rating: 5,
    text: "The student discounts are amazing! I travel home every month and ExpressTravel makes it affordable. The night buses are super comfortable.",
    platform: "TrustPilot"
  },
  {
    name: "Suresh Mehta",
    role: "Family Man",
    image: user5,
    rating: 5,
    text: "Traveling with my parents was a delightful experience. The extra legroom and safety measures made them feel comfortable throughout the journey.",
    platform: "Google Reviews"
  },
  {
    name: "Karthik Iyer",
    role: "Software Engineer",
    image: user6,
    rating: 5,
    text: "The charging points and reliable WiFi let me work during my travels. Perfect for tech professionals who need to stay connected.",
    platform: "TrustPilot"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)]"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="text-forest/60 uppercase tracking-wider font-medium">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 bg-gradient-to-r from-forest via-forest-light to-forest-lighter text-transparent bg-clip-text">
              What Our Customers Say
            </h2>
          </motion.div>
        </div>

        <Swiper
          spaceBetween={32}
          slidesPerView={1}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          speed={800}
          freeMode={{
            enabled: true,
            sticky: false,
            momentumBounce: false,
            minimumVelocity: 0.02,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay, FreeMode]}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group h-full"
              >
                <div className="bg-white rounded-2xl p-6 h-full border border-gray-100">
                  <div className="absolute -top-px left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-forest/20 to-transparent"></div>
                  
                  <Quote className="h-8 w-8 text-forest/10 absolute top-4 right-4" />
                  
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-forest/10"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-forest text-forest" />
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    "{testimonial.text}"
                  </p>

                  <div className="text-xs text-muted-foreground">
                    via {testimonial.platform}
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;