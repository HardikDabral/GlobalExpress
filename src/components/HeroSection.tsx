import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { MapPin, Users, ArrowRight, Star, Calendar, Clock } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useBusBooking } from '@/hooks/useBusBooking';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import heroBg from "../../public/images/herosection4.webp";
import googleIcon from "../../public/images/google.svg";
import trustPilotIcon from "../../public/images/trust-pilot.svg";

export function HeroSection() {
  const navigate = useNavigate();
  const { user, setShowLogin, pendingFormData, setPendingFormData } = useAuth();
  const { destinations, setSelectedDestination, setSelectedSeats, selectedDestination, selectedSeats, selectedDateTime, setSelectedDateTime } = useBusBooking();
  const [localDestination, setLocalDestination] = useState(selectedDestination);
  const [localSeats, setLocalSeats] = useState<number | ''>(selectedSeats);
  const [date, setDate] = useState<Date | undefined>(
    selectedDateTime ? new Date(selectedDateTime) : undefined
  );
  const [time, setTime] = useState<string>(
    selectedDateTime ? format(new Date(selectedDateTime), 'HH:mm') : "12:00"
  );
  const [errors, setErrors] = useState<{destination?: string; seats?: string; date?: string}>({});

  // Handle pending form data after login
  useEffect(() => {
    if (user && pendingFormData) {
      // Set the form data and navigate
      setSelectedDestination(pendingFormData.destination);
      setSelectedSeats(pendingFormData.seats);
      setSelectedDateTime(pendingFormData.dateTime);
      setPendingFormData(null); // Clear pending data
      navigate(pendingFormData.navigateTo);
    }
  }, [user, pendingFormData, setSelectedDestination, setSelectedSeats, setSelectedDateTime, setPendingFormData, navigate]);

  const handleViewPricing = () => {
    const newErrors: {destination?: string; seats?: string; date?: string} = {};
    
    // Validate destination
    if (!localDestination) {
      newErrors.destination = "Please select a destination";
    }
    
    // Validate seats
    if (!localSeats || typeof localSeats !== 'number' || localSeats < 1) {
      newErrors.seats = "Please enter at least 1 seat";
    } else if (localSeats > 10) {
      newErrors.seats = "Maximum 10 seats allowed";
    }
    
    // Validate date
    if (!date) {
      newErrors.date = "Please select a date";
    }
    
    setErrors(newErrors);
    
    // If there are errors, don't proceed
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    const dateTime = date ? `${format(date, 'yyyy-MM-dd')}T${time}` : '';
    
    // Check if user is logged in
    if (!user) {
      // Store form data for after login
      setPendingFormData({
        destination: localDestination,
        seats: localSeats as number, // Type assertion since we've validated it's a number
        dateTime: dateTime,
        navigateTo: '/pricing'
      });
      setShowLogin(true);
      return;
    }
    
    // User is logged in, proceed directly
    setSelectedDestination(localDestination);
    setSelectedSeats(localSeats as number); // Type assertion since we've validated it's a number
    setSelectedDateTime(dateTime);
    navigate('/pricing');
  };

  return (
    <div className="relative bg-white">

      <section className="h-[500px] md:h-[500px] lg:h-[600px] flex max-w-[1440px] mx-auto items-center justify-center relative pb-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-b-3xl"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>
        </div>
        
        {/* Preload critical images */}
        <link rel="preload" as="image" href={heroBg} />

        <div className="container mx-auto px-6 py-20 relative z-10 flex flex-col justify-between h-full">
        {/* Main Content */}
        <div className="text-center text-white flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-7xl font-bold leading-tight mb-6">
              Book Your Ride.
              <br />
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Fast, Simple, Secure.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Experience premium bus travel with instant booking, real-time tracking, and guaranteed comfort.
            </p>
          </motion.div>
        </div>

        {/* Ratings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mb-8 mt-8 md:mt-4"
        >
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-3 md:px-6">
            <div className="flex items-start md:items-center">
              <img 
                src={googleIcon} 
                alt="Google" 
                className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3 mt-1 md:mt-0" 
                loading="eager"
                width="24"
                height="24"
              />
              <div className="text-left">
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-xs md:text-base">Google Rating 4.9</span>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 md:h-4 md:w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mx-3 md:mx-4 h-6 md:h-8 w-px bg-white/30"></div>
            
            <div className="flex items-start md:items-center">
              <img 
                src={trustPilotIcon} 
                alt="TrustPilot" 
                className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3 mt-1 md:mt-0" 
                loading="eager"
                width="24"
                height="24"
              />
              <div className="text-left">
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-xs md:text-base">Trustpilot Rating 4.2</span>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 md:h-4 md:w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        </div>
      </section>

      {/* Booking Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative -mt-16 md:-mt-24"
      >
        <div className="container mx-auto px-6 max-w-[1440px]">
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-end">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Select Destination
              </label>
              <Select value={localDestination} onValueChange={(value) => {
                setLocalDestination(value);
                if (errors.destination) {
                  setErrors(prev => ({ ...prev, destination: undefined }));
                }
              }}>
                <SelectTrigger className={`h-12 bg-gray-50 border rounded-xl ${errors.destination ? 'border-red-500 border-2' : 'border-gray-200'}`}>
                  <SelectValue placeholder="Choose destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((destination) => (
                    <SelectItem key={destination} value={destination}>
                      {destination}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.destination && (
                <p className="text-red-500 text-sm mt-2">{errors.destination}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Users className="h-4 w-4 inline mr-2" />
                Number of Seats
              </label>
              <Input
                type="number"
                min="1"
                max="10"
                value={localSeats}
                onChange={(e) => {
                  const value = e.target.value.replace(/^0+/, '');
                  if (value === '') {
                    setLocalSeats('');
                  } else {
                    const numValue = Number(value);
                    if (!isNaN(numValue) && numValue >= 0 && numValue <= 10) {
                      setLocalSeats(numValue);
                    }
                  }
                  if (errors.seats) {
                    setErrors(prev => ({ ...prev, seats: undefined }));
                  }
                }}
                className={`h-12 bg-gray-50 border rounded-xl ${errors.seats ? 'border-red-500 border-2' : 'border-gray-200'}`}
                placeholder="Enter seats"
              />
              {errors.seats && (
                <p className="text-red-500 text-sm mt-2">{errors.seats}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-2" />
                Date & Time
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 bg-gray-50 border rounded-xl justify-start text-left font-normal hover:bg-gray-100 hover:border-gray-300 hover:text-black focus:ring-gray-400 focus:bg-gray-100 focus:text-black",
                      errors.date ? "border-red-500 border-2" : "border-gray-200",
                      !date && "text-muted-foreground"
                    )}
                    onClick={() => {
                      if (errors.date) {
                        setErrors(prev => ({ ...prev, date: undefined }));
                      }
                    }}
                  >
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">
                      {date ? format(date, "PPP") : "Pick a date"}
                    </span>
                  </Button>
                </PopoverTrigger>
                 <PopoverContent 
                   className="w-auto p-0 z-30" 
                   align="start" 
                   side="bottom" 
                   sideOffset={8}
                   avoidCollisions={false}
                   collisionPadding={0}
                   sticky="always"
                 >
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      if (errors.date) {
                        setErrors(prev => ({ ...prev, date: undefined }));
                      }
                    }}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                  <div className="p-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="h-8"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              {errors.date && (
                <p className="text-red-500 text-sm mt-2">{errors.date}</p>
              )}
            </div>
            
            <div>
              <Button 
                onClick={handleViewPricing}
                className="w-full h-12 bg-forest hover:bg-forest-dark text-white font-semibold rounded-xl transition-all duration-300 relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer after:duration-1000"
              >
                Get Bus Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}