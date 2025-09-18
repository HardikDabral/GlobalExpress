import { useNavigate } from 'react-router-dom';
import { PriceCard } from '@/components/PriceCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Users } from 'lucide-react';
import { useBusBooking } from '@/hooks/useBusBooking';

export default function Pricing() {
  const navigate = useNavigate();
  const { 
    selectedDestination, 
    selectedSeats, 
    pricingData, 
    setSelectedPlatform 
  } = useBusBooking();

  const currentPricing = pricingData.find(p => p.destination === selectedDestination);

  if (!selectedDestination || !currentPricing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No destination selected</h1>
          <Button onClick={() => navigate('/')}>Go Back to Home</Button>
        </div>
      </div>
    );
  }

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
    navigate('/seats');
  };

  const platforms = [
    { key: 'makemytrip', name: 'MakeMyTrip', isPopular: false },
    { key: 'redbus', name: 'RedBus', isPopular: true },
    { key: 'ixigo', name: 'Ixigo', isPopular: false },
    { key: 'own', name: 'Our Website', isPopular: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Compare Prices</h1>
              <div className="flex items-center gap-4 text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedDestination}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {selectedSeats} seat{selectedSeats > 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <Badge variant="secondary">
              Total: {selectedSeats} × Price per seat
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Choose Your Platform</h2>
          <p className="text-muted-foreground">
            Compare prices from different platforms and select the best option for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {platforms.map((platform) => (
            <PriceCard
              key={platform.key}
              platform={platform.key}
              price={currentPricing.prices[platform.key as keyof typeof currentPricing.prices]}
              isPopular={platform.isPopular}
              onSelect={() => handlePlatformSelect(platform.key)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            All prices are per seat and include taxes. Final price will be calculated for {selectedSeats} seat{selectedSeats > 1 ? 's' : ''}.
          </p>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <span>✓ Instant confirmation</span>
            <span>✓ Easy cancellation</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </main>
    </div>
  );
}