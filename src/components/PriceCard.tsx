import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Sparkles } from 'lucide-react';

interface PriceCardProps {
  platform: string;
  price: number;
  isPopular?: boolean;
  onSelect: () => void;
}

const getPlatformConfig = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'makemytrip':
      return {
        gradient: 'bg-gradient-makemytrip',
        logo: '✈️',
        icon: <Sparkles className="h-12 w-12" />,
        features: ['24/7 Premium Support', 'Easy Cancellation', 'Instant Refund', 'Travel Insurance']
      };
    case 'redbus':
      return {
        gradient: 'bg-gradient-redbus',
        logo: '🚌',
        icon: <Star className="h-12 w-12" />,
        features: ['Live Bus Tracking', 'Premium Seats', 'Flexible Booking', 'Mobile Tickets']
      };
    case 'ixigo':
      return {
        gradient: 'bg-gradient-ixigo',
        logo: '🎯',
        icon: <Check className="h-12 w-12" />,
        features: ['Best Price Guarantee', 'Quick Booking', 'Travel Insurance', 'Reward Points']
      };
    case 'own':
      return {
        gradient: 'bg-gradient-primary',
        logo: '⭐',
        icon: <Sparkles className="h-12 w-12 text-white" />,
        features: ['Direct Booking', 'Zero Extra Fees', 'Premium Service', 'VIP Support']
      };
    default:
      return {
        gradient: 'bg-gradient-primary',
        logo: '🚌',
        icon: <Star className="h-12 w-12" />,
        features: ['Direct Booking', 'Zero Extra Fees', 'Premium Service', 'VIP Support']
      };
  }
};

export function PriceCard({ platform, price, isPopular, onSelect }: PriceCardProps) {
  const config = getPlatformConfig(platform);
  const platformName = platform === 'own' ? 'Premium Direct' : platform.charAt(0).toUpperCase() + platform.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative"
    >
      <Card className="relative p-6 bg-white border border-gray-100 hover:border-forest/20 transition-all duration-500 cursor-pointer group rounded-2xl">
        {isPopular && (
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-forest/10 text-forest text-xs border-0 px-3 py-1 rounded-full font-medium hidden md:block">
            Most Popular
          </Badge>
        )}
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)] opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium mb-1 text-forest-dark group-hover:text-forest transition-colors">{platformName}</h3>
            <div className="text-sm text-forest/60 mb-4">-15% Discount</div>
            <div className="text-4xl font-bold text-forest">₹{price}</div>
            <div className="text-forest/60 text-sm font-medium mt-1">per seat</div>
          </div>

          <div className="space-y-2 mb-6 text-center">
            {config.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-sm text-forest-dark/70"
              >
                {feature}
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={onSelect}
              className="w-full h-10 bg-white text-forest border border-forest/20 hover:bg-forest hover:text-white font-medium text-sm rounded-xl transition-all duration-300"
              size="lg"
            >
              Book Now
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}