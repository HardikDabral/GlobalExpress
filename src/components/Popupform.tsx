import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { MapPin, Users, ArrowRight, Calendar, Clock, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useBusBooking } from '@/hooks/useBusBooking';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
}

export function PopupForm({ isOpen, onClose, defaultDestination }: PopupFormProps) {
  const navigate = useNavigate();
  const { user, setShowLogin, pendingFormData, setPendingFormData } = useAuth();
  const { destinations, setSelectedDestination, setSelectedSeats, selectedDateTime, setSelectedDateTime } = useBusBooking();
  const [localDestination, setLocalDestination] = useState(defaultDestination || '');
  const [localSeats, setLocalSeats] = useState<number | ''>(1);
  const [date, setDate] = useState<Date | undefined>(
    selectedDateTime ? new Date(selectedDateTime) : undefined
  );
  const [time, setTime] = useState<string>(
    selectedDateTime ? format(new Date(selectedDateTime), 'HH:mm') : "12:00"
  );

  // Handle pending form data after login
  useEffect(() => {
    if (user && pendingFormData) {
      // Set the form data and navigate
      setSelectedDestination(pendingFormData.destination);
      setSelectedSeats(pendingFormData.seats);
      setSelectedDateTime(pendingFormData.dateTime);
      setPendingFormData(null); // Clear pending data
      onClose(); // Close the popup
      navigate(pendingFormData.navigateTo);
    }
  }, [user, pendingFormData, setSelectedDestination, setSelectedSeats, setSelectedDateTime, setPendingFormData, navigate, onClose]);

  const handleViewPricing = () => {
    if (!localDestination || !localSeats || typeof localSeats !== 'number' || localSeats < 1 || localSeats > 10 || !date) return;
    
    const dateTime = date ? `${format(date, 'yyyy-MM-dd')}T${time}` : '';
    
    // Check if user is logged in
    if (!user) {
      // Store form data for after login
      setPendingFormData({
        destination: localDestination,
        seats: localSeats,
        dateTime: dateTime,
        navigateTo: '/pricing'
      });
      setShowLogin(true);
      onClose(); // Close the popup form
      return;
    }
    
    // User is logged in, proceed directly
    setSelectedDestination(localDestination);
    setSelectedSeats(localSeats);
    setSelectedDateTime(dateTime);
    onClose();
    navigate('/pricing');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center z-[100] p-4"
          >
            <div 
              className="relative bg-white rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-2xl mx-auto"
              onClick={(e) => e.stopPropagation()} // Prevent clicks from reaching backdrop
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all hover:bg-gray-100 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Title */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-forest via-forest-light to-forest-lighter text-transparent bg-clip-text">Book Your Journey</h2>
                <p className="text-muted-foreground mt-2">Fill in the details to get started</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Select Destination
                  </label>
                  <Select value={localDestination} onValueChange={setLocalDestination}>
                    <SelectTrigger className="h-12 bg-gray-50 border border-gray-200 rounded-xl">
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
                    }}
                    className="h-12 bg-gray-50 border border-gray-200 rounded-xl"
                    placeholder="Enter seats"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Date & Time
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 bg-gray-50 border border-gray-200 rounded-xl justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
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
                </div>
              </div>

              <div className="mt-8">
                <Button 
                  onClick={handleViewPricing}
                  disabled={!localDestination || !localSeats || typeof localSeats !== 'number' || localSeats < 1 || localSeats > 10 || !date}
                  className="w-full h-12 bg-forest hover:bg-forest-dark text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer after:duration-1000"
                >
                  Get Bus Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
