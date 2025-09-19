import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Home, MapPin, Bus, Calendar, Users, CreditCard, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useBusBooking } from '@/hooks/useBusBooking';

export default function Success() {
  const navigate = useNavigate();
  const { 
    selectedDestination, 
    selectedPlatform, 
    selectedSeatNumbers, 
    selectedDateTime,
    pricingData,
    buses,
    bookings 
  } = useBusBooking();

  // Get the latest booking (most recent)
  const latestBooking = bookings[bookings.length - 1];

  useEffect(() => {
    if (!latestBooking) {
      navigate('/');
    }
  }, [latestBooking, navigate]);

  if (!latestBooking) {
    return null;
  }

  const bus = buses.find(b => b.id === latestBooking.busId);
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
    <div className="min-h-screen bg-white relative flex items-center justify-center p-4">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)] opacity-50"></div>
      
      <div className="w-full max-w-2xl relative">
        {/* Success Animation */}
        <div className="text-center mb-8">
          {/* <div className="inline-flex items-center justify-center w-24 h-24 bg-forest rounded-2xl mb-6 animate-bounce">
            <CheckCircle className="h-12 w-12 text-white" />
          </div> */}
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-forest via-forest-light to-forest-lighter text-transparent bg-clip-text mb-3">
            Booking Confirmed!
          </h1>
          <p className="text-forest-dark/60">
            Your seats have been successfully booked. Have a great journey!
          </p>
        </div>

        {/* Booking Details Card */}
        <Card className="p-6 md:p-8 border border-gray-100 rounded-2xl md:rounded-3xl relative overflow-hidden">
          {/* Card Background Pattern */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)] opacity-30"></div>
          
          <div className="relative">
            <div className="text-center mb-8">
              <Badge className="bg-forest/10 text-forest text-base px-4 py-2 rounded-full">
                Booking ID: {latestBooking.id}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-forest/5 rounded-lg">
                    <MapPin className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-forest-dark">Route</p>
                    <p className="text-forest-dark/60">{latestBooking.destination}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-forest/5 rounded-lg">
                    <Bus className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-forest-dark">Bus</p>
                    <p className="text-forest-dark/60">{bus?.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-forest/5 rounded-lg">
                    <Calendar className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-forest-dark">Journey Date</p>
                    <p className="text-forest-dark/60">
                      {format(new Date(selectedDateTime), 'PPP')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-forest/5 rounded-lg">
                    <Clock className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-forest-dark">Journey Time</p>
                    <p className="text-forest-dark/60">
                      {format(new Date(selectedDateTime), 'hh:mm a')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-forest/5 rounded-lg">
                    <Calendar className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-forest-dark">Booking Date</p>
                    <p className="text-forest-dark/60">
                      {new Date(latestBooking.timestamp).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-forest/5 rounded-lg">
                    <Users className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-forest-dark">Seats</p>
                    <p className="text-forest-dark/60">
                      {latestBooking.seats.length} seat{latestBooking.seats.length > 1 ? 's' : ''}: {latestBooking.seats.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-forest/5 rounded-lg">
                    <CreditCard className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-forest-dark">Platform</p>
                    <p className="text-forest-dark/60">{getPlatformName(latestBooking.platform)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-forest/5 rounded-lg flex items-center justify-center">
                    <span className="text-forest text-lg font-semibold">₹</span>
                  </div>
                  <div>
                    <p className="font-medium text-forest-dark">Total Amount</p>
                    <p className="text-2xl font-bold text-forest">₹{latestBooking.totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-forest/10 pt-6">
              <div className="bg-forest/5 rounded-xl p-4 mb-6 backdrop-blur-sm">
                <h3 className="font-semibold text-forest-dark mb-3">Important Information:</h3>
                <ul className="text-sm text-forest-dark/60 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-forest"></div>
                    Please arrive at the boarding point 30 minutes before departure
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-forest"></div>
                    Carry a valid ID proof for verification
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-forest"></div>
                    Your booking details have been saved locally
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-forest"></div>
                    For any assistance, contact our 24/7 support
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  className="flex-1 bg-forest hover:bg-forest-dark text-white font-semibold h-12 rounded-xl transition-all duration-300 relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer after:duration-1000"
                >
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    Book Another Trip
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl border-forest/20 text-forest hover:bg-forest/5 hover:border-forest/30 transition-all duration-300"
                  onClick={() => window.print()}
                >
                  Print Ticket
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Info */}
        <div className="text-center mt-8 space-y-1">
          <p className="text-forest-dark/60">Thank you for choosing ExpressTravel!</p>
          <p className="text-forest-dark/60">Have a safe and comfortable journey.</p>
        </div>
      </div>
    </div>
  );
}