import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Shield, Clock, MapPin, Banknote, HeadphonesIcon, Wifi, Coffee, Snowflake, BatteryCharging, Tv, Sofa, Utensils, Stethoscope, Navigation, Smile } from 'lucide-react';

const advantages = [
  { text: "Free WiFi Onboard", icon: Wifi },
  { text: "Complimentary Beverages", icon: Coffee },
  { text: "Air Conditioning", icon: Snowflake },
  { text: "Charging Points", icon: BatteryCharging },
  { text: "Entertainment System", icon: Tv },
  { text: "Reclining Seats", icon: Sofa },
  { text: "Meal Options", icon: Utensils },
  { text: "First Aid Kit", icon: Stethoscope },
  { text: "Live Tracking", icon: Navigation },
  { text: "Friendly Staff", icon: Smile },
  { text: "24/7 Support", icon: HeadphonesIcon },
  { text: "3000+ Routes", icon: MapPin },
  { text: "Quick Refunds", icon: Banknote },
  { text: "Safe Travel", icon: Shield },
  { text: "On-Time Service", icon: Clock },
];

const services = [
  {
    title: "24/7 Support",
    description: "Always here when you need us",
    icon: HeadphonesIcon,
    stat: "24/7",
    accent: "bg-forest"
  },
  {
    title: "Wide Network",
    description: "Connecting cities across India",
    icon: MapPin,
    stat: "3000+",
    accent: "bg-forest-light"
  },
  {
    title: "Quick Refunds",
    description: "Money back in your wallet",
    icon: Banknote,
    stat: "< 24h",
    accent: "bg-forest-lighter"
  },
  {
    title: "Safe Travel",
    description: "Your safety is our priority",
    icon: Shield,
    stat: "100%",
    accent: "bg-forest"
  },
  {
    title: "On Time",
    description: "Punctual departures & arrivals",
    icon: Clock,
    stat: "95%",
    accent: "bg-forest-light"
  }
];

const OurServices = () => {
  return (
    <section className="bg-white relative overflow-hidden">
      {/* Dotted Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="text-forest/60 uppercase tracking-wider font-medium">Why Choose Us</span>
          
          </motion.div>
        </div>
        </div>
        <div className="overflow-hidden py-6 bg-white/80 backdrop-blur-md border-y border-gray-100">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...services, ...services, ...services, ...services].map((service, index) => (
              <div
                key={index}
                className="flex items-center mx-8 group"
              >
                <service.icon className={`h-4 w-4 ${service.accent.replace('bg-', 'text-')} opacity-70 group-hover:opacity-100 transition-opacity`} />
                <div className="ml-2.5 flex items-center">
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{service.title}</span>
                  <span className="mx-2 text-gray-300">·</span>
                  <span className={`text-sm font-semibold ${service.accent.replace('bg-', 'text-')} opacity-70 group-hover:opacity-100 transition-opacity`}>{service.stat}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;