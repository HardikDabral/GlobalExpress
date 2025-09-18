import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Home, MapPin, Bus, Calendar, Users, CreditCard } from 'lucide-react';
import { useBusBooking } from '@/hooks/useBusBooking';

export default function Success() {
  const navigate = useNavigate();
  const { 
    selectedDestination, 
    selectedPlatform, 
    selectedSeatNumbers, 
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
    <div className="min-h-screen bg-gradient-to-br from-successLight to-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-success rounded-full mb-4 animate-bounce">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-success mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your seats have been successfully booked. Have a great journey!
          </p>
        </div>

        {/* Booking Details Card */}
        <Card className="p-8 shadow-travel-xl border-success/20">
          <div className="text-center mb-6">
            <Badge className="bg-success text-white text-lg px-4 py-2">
              Booking ID: {latestBooking.id}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Route</p>
                  <p className="text-muted-foreground">{latestBooking.destination}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Bus className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Bus</p>
                  <p className="text-muted-foreground">{bus?.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Booking Date</p>
                  <p className="text-muted-foreground">
                    {new Date(latestBooking.timestamp).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Seats</p>
                  <p className="text-muted-foreground">
                    {latestBooking.seats.length} seat{latestBooking.seats.length > 1 ? 's' : ''}: {latestBooking.seats.join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Platform</p>
                  <p className="text-muted-foreground">{getPlatformName(latestBooking.platform)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-5 w-5 bg-primary rounded-full mt-0.5 flex items-center justify-center">
                  <span className="text-white text-xs">₹</span>
                </div>
                <div>
                  <p className="font-medium">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">₹{latestBooking.totalPrice}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="bg-accent/50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">Important Information:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Please arrive at the boarding point 30 minutes before departure</li>
                <li>• Carry a valid ID proof for verification</li>
                <li>• Your booking details have been saved locally</li>
                <li>• For any assistance, contact our 24/7 support</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1 bg-gradient-primary text-white">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Book Another Trip
                </Link>
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                Print Ticket
              </Button>
            </div>
          </div>
        </Card>

        {/* Additional Info */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Thank you for choosing ExpressTravel!</p>
          <p>Have a safe and comfortable journey.</p>
        </div>
      </div>
    </div>
  );
}