import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SeatGrid } from '@/components/SeatGrid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Users, CreditCard, Bus } from 'lucide-react';
import { useBusBooking } from '@/hooks/useBusBooking';
import { useToast } from '@/hooks/use-toast';

export default function Seats() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    selectedDestination, 
    selectedSeats, 
    selectedPlatform,
    pricingData,
    buses,
    addBooking,
    setSelectedSeatNumbers
  } = useBusBooking();
  
  const [selectedSeatNumbers, setLocalSelectedSeatNumbers] = useState<number[]>([]);
  const [selectedBusId, setSelectedBusId] = useState<number>(1);

  const currentPricing = pricingData.find(p => p.destination === selectedDestination);

  if (!selectedDestination || !selectedPlatform || !currentPricing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Incomplete booking information</h1>
          <Button onClick={() => navigate('/')}>Start Over</Button>
        </div>
      </div>
    );
  }

  const pricePerSeat = currentPricing.prices[selectedPlatform as keyof typeof currentPricing.prices];
  const totalPrice = selectedSeatNumbers.length * pricePerSeat;

  const handleSeatSelectionChange = (seats: number[]) => {
    setLocalSelectedSeatNumbers(seats);
  };

  const handleBookNow = () => {
    if (selectedSeatNumbers.length !== selectedSeats) {
      toast({
        title: "Seat selection incomplete",
        description: `Please select exactly ${selectedSeats} seat${selectedSeats > 1 ? 's' : ''}.`,
        variant: "destructive"
      });
      return;
    }

    const booking = {
      busId: selectedBusId,
      destination: selectedDestination,
      seats: selectedSeatNumbers,
      platform: selectedPlatform,
      pricePerSeat,
      totalPrice
    };

    addBooking(booking);
    setSelectedSeatNumbers(selectedSeatNumbers);
    
    toast({
      title: "Booking successful!",
      description: `${selectedSeatNumbers.length} seat${selectedSeatNumbers.length > 1 ? 's' : ''} booked successfully.`,
    });

    navigate('/success');
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'makemytrip': return 'MakeMyTrip';
      case 'redbus': return 'RedBus';
      case 'ixigo': return 'Ixigo';
      case 'own': return 'Our Website';
      default: return platform;
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)] opacity-50"></div>
      <div className="relative z-10">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 text-forest/70">
            {/* Back to Pricing Button */}
            <Button 
              variant="ghost" 
              onClick={() => navigate('/pricing')}
              className="self-start text-forest hover:text-forest-dark hover:bg-forest/5"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pricing
            </Button>

            {/* Route, Seats and Platform Info - All in one line */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {selectedDestination}
              </div>

              <div className="h-4 w-px bg-forest/20"></div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {selectedSeats} seat{selectedSeats > 1 ? 's' : ''}
              </div>

              <div className="h-4 w-px bg-forest/20"></div>

              <Badge className="bg-forest/10 text-forest hover:bg-forest/20 transition-colors py-1.5 px-3">
                {getPlatformName(selectedPlatform)}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-forest/60 font-medium">AVAILABLE BUSES</span>
              <div className="flex flex-wrap gap-2 md:gap-3 mt-4 mb-6 md:mb-8">
                {buses.map((bus) => {
                  const availableSeats = bus.totalSeats - bus.bookedSeats.length;
                  return (
                    <Button
                      key={bus.id}
                      variant="ghost"
                      onClick={() => setSelectedBusId(bus.id)}
                      disabled={availableSeats < selectedSeats}
                      className={`flex flex-col p-3 md:p-4 h-auto rounded-xl border transition-all duration-300 ${
                        selectedBusId === bus.id 
                          ? "bg-forest text-white border-forest" 
                          : "bg-forest/5 text-forest hover:bg-forest/10 border-forest/10"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Bus className="h-4 w-4 md:h-5 md:w-5" />
                        <span className={`text-[10px] md:text-xs ${selectedBusId === bus.id ? "text-white/80" : "text-forest/60"}`}>
                          {availableSeats} seats
                        </span>
                      </div>
                      <span className="text-xs md:text-sm font-medium">{bus.name}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <SeatGrid 
              busId={selectedBusId}
              onSeatSelectionChange={handleSeatSelectionChange}
            />
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="p-4 md:p-6 sticky top-20 md:top-24 border border-gray-100 rounded-2xl md:rounded-3xl">
              <span className="text-forest/60 font-medium">BOOKING SUMMARY</span>
              
              <div className="space-y-4 mt-6 mb-8">
                <div className="flex justify-between">
                  <span className="text-forest-dark/60">Route</span>
                  <span className="font-medium text-forest-dark">{selectedDestination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-forest-dark/60">Platform</span>
                  <span className="font-medium text-forest-dark">{getPlatformName(selectedPlatform)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-forest-dark/60">Bus</span>
                  <span className="font-medium text-forest-dark">
                    {buses.find(b => b.id === selectedBusId)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-forest-dark/60">Price per seat</span>
                  <span className="font-medium text-forest-dark">₹{pricePerSeat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-forest-dark/60">Selected seats</span>
                  <span className="font-medium text-forest-dark">
                    {selectedSeatNumbers.length} / {selectedSeats}
                  </span>
                </div>
                
                {selectedSeatNumbers.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-forest-dark/60">Seat numbers</span>
                    <span className="font-medium text-sm text-forest-dark">
                      {selectedSeatNumbers.sort((a, b) => a - b).join(', ')}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-forest/10 pt-6 mb-8">
                <div className="flex justify-between text-lg">
                  <span className="font-medium text-forest-dark">Total Amount</span>
                  <span className="font-bold text-forest">₹{totalPrice}</span>
                </div>
              </div>

              <Button 
                onClick={handleBookNow}
                disabled={selectedSeatNumbers.length !== selectedSeats}
                className="w-full h-12 bg-forest hover:bg-forest-dark text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer after:duration-1000"
              >
                {selectedSeatNumbers.length === selectedSeats 
                  ? `Book Now - ₹${totalPrice}`
                  : `Select ${selectedSeats - selectedSeatNumbers.length} more seat${selectedSeats - selectedSeatNumbers.length > 1 ? 's' : ''}`
                }
              </Button>

              <p className="text-xs text-forest/60 mt-4 text-center">
                By booking, you agree to our terms and conditions
              </p>
            </Card>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}