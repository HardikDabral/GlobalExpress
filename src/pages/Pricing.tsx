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
    { key: 'makemytrip', name: 'Makemytrip', isPopular: false },
    { key: 'redbus', name: 'Redbus', isPopular: true },
    { key: 'ixigo', name: 'Ixigo', isPopular: false },
    { key: 'own', name: 'Premium Direct', isPopular: false }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)] opacity-50"></div>
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 text-forest hover:text-forest-dark hover:bg-forest/5"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-forest-dark">Compare Prices</h1>
              <div className="flex items-center gap-4 text-forest/70 mt-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {selectedDestination}
                </div>
                <div className="w-px h-4 bg-forest/20"></div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {selectedSeats} seat{selectedSeats > 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <Badge className="bg-forest/10 text-forest hover:bg-forest/20 transition-colors py-2 px-4">
              Total: {selectedSeats} × Price per seat
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <span className="text-forest/60 font-medium">PRICING</span>
          <h2 className="text-4xl font-bold mt-2 mb-2 bg-gradient-to-r from-forest via-forest-light to-forest-lighter text-transparent bg-clip-text">Choose Your Platform</h2>
          <p className="text-muted-foreground">
            Compare prices from different platforms and select the best option for you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto px-4">
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

        <div className="text-center mt-16 max-w-2xl mx-auto">
          <div className="bg-forest/5 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-forest-dark/80 mb-6">
              All prices are per seat and include taxes. Final price will be calculated for {selectedSeats} seat{selectedSeats > 1 ? 's' : ''}.
            </p>
            <div className="flex justify-center gap-8 text-sm text-forest">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-forest"></div>
                <span>Instant confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-forest"></div>
                <span>Easy cancellation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-forest"></div>
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}