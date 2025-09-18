import { useState } from 'react';
import { BookingForm } from '@/components/BookingForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bus, MapPin, Clock, Shield, Users, Star, LogIn, Settings } from 'lucide-react';
import { LoginModal } from '@/components/LoginModal';
import { Link } from 'react-router-dom';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userType: 'user' | 'admin', userData?: any) => {
    setUser({ ...userData, userType });
  };

  const handleLogout = () => {
    setUser(null);
  };
  const features = [
    { icon: Clock, title: '24/7 Service', desc: 'Round-the-clock booking support' },
    { icon: Shield, title: 'Safe Travel', desc: 'GPS tracking and safety measures' },
    { icon: Star, title: 'Premium Comfort', desc: 'Luxury buses with AC and WiFi' },
    { icon: Users, title: 'Easy Booking', desc: 'Simple 3-step booking process' }
  ];

  const destinations = [
    { route: 'Delhi → Jaipur', time: '5h 30m', price: 'from ₹480' },
    { route: 'Delhi → Chandigarh', time: '6h 15m', price: 'from ₹580' },
    { route: 'Delhi → Lucknow', time: '8h 20m', price: 'from ₹680' },
    { route: 'Delhi → Agra', time: '4h 45m', price: 'from ₹380' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bus className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">ExpressTravel</span>
          </div>
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground capitalize">{user.userType}</p>
              </div>
              <div className="flex space-x-2">
                {user.userType === 'admin' && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  size="sm"
                >
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              onClick={() => setShowLogin(true)}
              variant="outline" 
              size="sm"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary text-white">
            <Star className="h-3 w-3 mr-1" />
            Trusted by 50,000+ travelers
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Your Journey<br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Starts Here
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book premium bus tickets with ease. Compare prices, select your perfect seats, 
            and travel in comfort with our luxury fleet.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Booking Form */}
          <div className="flex justify-center lg:justify-start">
            <BookingForm />
          </div>

          {/* Popular Destinations */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-primary" />
              Popular Routes
            </h2>
            <div className="space-y-4">
              {destinations.map((dest, index) => (
                <Card key={index} className="p-4 hover:shadow-travel-md transition-all duration-300 cursor-pointer group">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {dest.route}
                      </h3>
                      <p className="text-muted-foreground text-sm flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {dest.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{dest.price}</p>
                      <p className="text-xs text-muted-foreground">per seat</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-travel-md transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </main>

      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}