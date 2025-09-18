import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bus, MapPin, Shield, Clock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoginModal } from '@/components/LoginModal';

export function HeroSection() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userType: 'user' | 'admin', userData?: any) => {
    setUser({ ...userData, userType });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <section className="min-h-screen hero-gradient flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Login/User Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-8 right-8"
        >
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="text-white text-right">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-white/80 capitalize">{user.userType}</p>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => setShowLogin(true)}
              className="bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-2xl backdrop-blur-sm"
              variant="outline"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          )}
        </motion.div>
        <div className="text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-sm">
                <Bus className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
          >
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <MapPin className="h-8 w-8 mb-3 text-white" />
              <h3 className="text-lg font-semibold mb-2">Multiple Routes</h3>
              <p className="text-white/80 text-center">Choose from premium destinations across the country</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Shield className="h-8 w-8 mb-3 text-white" />
              <h3 className="text-lg font-semibold mb-2">100% Secure</h3>
              <p className="text-white/80 text-center">Safe and secure booking with instant confirmation</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Clock className="h-8 w-8 mb-3 text-white" />
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-white/80 text-center">Round-the-clock customer service for your journey</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="p-1 bg-white/20 rounded-3xl backdrop-blur-sm">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-2">
                <div className="text-6xl">🚌</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </section>
  );
}