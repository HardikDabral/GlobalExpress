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
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/pricing')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pricing
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Select Your Seats</h1>
              <div className="flex items-center gap-4 text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedDestination}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {selectedSeats} seat{selectedSeats > 1 ? 's' : ''}
                </div>
                <Badge variant="outline">
                  {getPlatformName(selectedPlatform)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Available Buses</h2>
              <div className="flex gap-2 mb-4">
                {buses.map((bus) => {
                  const availableSeats = bus.totalSeats - bus.bookedSeats.length;
                  return (
                    <Button
                      key={bus.id}
                      variant={selectedBusId === bus.id ? "default" : "outline"}
                      onClick={() => setSelectedBusId(bus.id)}
                      disabled={availableSeats < selectedSeats}
                      className="flex flex-col p-3 h-auto"
                    >
                      <Bus className="h-4 w-4 mb-1" />
                      <span className="text-xs">{bus.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {availableSeats} available
                      </span>
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
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Booking Summary
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Route</span>
                  <span className="font-medium">{selectedDestination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform</span>
                  <span className="font-medium">{getPlatformName(selectedPlatform)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bus</span>
                  <span className="font-medium">
                    {buses.find(b => b.id === selectedBusId)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price per seat</span>
                  <span className="font-medium">₹{pricePerSeat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Selected seats</span>
                  <span className="font-medium">
                    {selectedSeatNumbers.length} / {selectedSeats}
                  </span>
                </div>
                
                {selectedSeatNumbers.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seat numbers</span>
                    <span className="font-medium text-sm">
                      {selectedSeatNumbers.sort((a, b) => a - b).join(', ')}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{totalPrice}</span>
                </div>
              </div>

              <Button 
                onClick={handleBookNow}
                disabled={selectedSeatNumbers.length !== selectedSeats}
                className="w-full bg-gradient-primary text-white font-semibold py-3"
                size="lg"
              >
                {selectedSeatNumbers.length === selectedSeats 
                  ? `Book Now - ₹${totalPrice}`
                  : `Select ${selectedSeats - selectedSeatNumbers.length} more seat${selectedSeats - selectedSeatNumbers.length > 1 ? 's' : ''}`
                }
              </Button>

              <p className="text-xs text-muted-foreground mt-3 text-center">
                By booking, you agree to our terms and conditions
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}