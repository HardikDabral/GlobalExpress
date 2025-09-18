import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MapPin, Users, ArrowRight, Sparkles } from 'lucide-react';
import { useBusBooking } from '@/hooks/useBusBooking';

export function BookingForm() {
  const navigate = useNavigate();
  const { destinations, setSelectedDestination, setSelectedSeats, selectedDestination, selectedSeats } = useBusBooking();
  const [localDestination, setLocalDestination] = useState(selectedDestination);
  const [localSeats, setLocalSeats] = useState(selectedSeats);

  const handleViewPricing = () => {
    if (!localDestination || localSeats < 1 || localSeats > 10) return;
    
    setSelectedDestination(localDestination);
    setSelectedSeats(localSeats);
    navigate('/pricing');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-xl"
    >
      <Card className="p-10 bg-gradient-card shadow-premium-xl border-0 rounded-3xl backdrop-blur-sm">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="p-4 bg-gradient-primary rounded-2xl">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          <h2 className="text-3xl font-bold text-foreground mb-3">Start Your Journey</h2>
          <p className="text-muted-foreground text-lg">Choose your destination and number of seats</p>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="flex items-center text-foreground font-semibold mb-3 text-lg">
              <MapPin className="h-5 w-5 mr-3 text-primary" />
              Select Destination
            </label>
            <Select value={localDestination} onValueChange={setLocalDestination}>
              <SelectTrigger className="h-14 bg-muted border-0 text-foreground rounded-2xl text-lg hover:bg-muted/80 transition-all">
                <SelectValue placeholder="Choose your premium route" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {destinations.map((destination) => (
                  <SelectItem key={destination} value={destination} className="text-lg py-3">
                    {destination}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label className="flex items-center text-foreground font-semibold mb-3 text-lg">
              <Users className="h-5 w-5 mr-3 text-primary" />
              Number of Seats
            </label>
            <Input
              type="number"
              min="1"
              max="10"
              value={localSeats}
              onChange={(e) => setLocalSeats(Number(e.target.value))}
              className="h-14 bg-muted border-0 text-foreground rounded-2xl text-lg placeholder:text-muted-foreground hover:bg-muted/80 transition-all"
              placeholder="Enter number of seats"
            />
            <p className="text-muted-foreground text-sm mt-2 ml-1">Maximum 10 seats per booking</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button 
              onClick={handleViewPricing}
              disabled={!localDestination || localSeats < 1 || localSeats > 10}
              className="w-full h-16 bg-gradient-primary text-white hover:shadow-premium-lg hover:scale-105 font-bold text-lg rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              size="lg"
            >
              View Premium Pricing
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}