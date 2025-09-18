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
        icon: <Sparkles className="h-12 w-12 text-white" />,
        features: ['24/7 Premium Support', 'Easy Cancellation', 'Instant Refund', 'Travel Insurance']
      };
    case 'redbus':
      return {
        gradient: 'bg-gradient-redbus',
        logo: '🚌',
        icon: <Star className="h-12 w-12 text-white" />,
        features: ['Live Bus Tracking', 'Premium Seats', 'Flexible Booking', 'Mobile Tickets']
      };
    case 'ixigo':
      return {
        gradient: 'bg-gradient-ixigo',
        logo: '🎯',
        icon: <Check className="h-12 w-12 text-white" />,
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
        icon: <Star className="h-12 w-12 text-white" />,
        features: ['Standard Service', 'Reliable Journey', 'Affordable Rates', 'Safe Travel']
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
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative"
    >
      <Card className={`relative p-8 ${config.gradient} text-white border-0 shadow-premium-lg hover:shadow-premium-xl transition-all duration-500 cursor-pointer group rounded-3xl overflow-hidden`}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl transform -translate-x-12 translate-y-12"></div>
        
        {isPopular && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
          >
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-white border-0 px-4 py-2 rounded-full font-bold shadow-lg">
              <Star className="h-4 w-4 mr-2" />
              Most Popular
            </Badge>
          </motion.div>
        )}
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              {config.icon}
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">{platformName}</h3>
            <div className="w-16 h-1 bg-white/30 rounded-full mx-auto"></div>
          </div>

          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.4 }}
            >
              <div className="text-5xl font-bold mb-2">₹{price}</div>
              <div className="text-white/80 text-lg font-medium">per seat</div>
            </motion.div>
          </div>

          <div className="space-y-3 mb-8">
            {config.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center text-white/95 font-medium"
              >
                <Check className="h-5 w-5 mr-3 text-white bg-white/20 rounded-full p-1" />
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
              className="w-full h-14 bg-white text-gray-900 hover:bg-white/95 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              Choose {platformName}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}