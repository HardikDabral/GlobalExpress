import { Button } from '@/components/ui/button';
import { Bus, LogIn, Settings, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { LoginModal } from '@/components/LoginModal';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, showLogin, setShowLogin, handleLogin, handleLogout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-forest-lighter/10">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Bus className="h-8 w-8 text-forest" />
            <span className="text-2xl font-bold bg-gradient-to-r from-forest via-forest-light to-forest-lighter text-transparent bg-clip-text">
              <span className="text-lg md:text-2xl">Express</span>
            </span>
          </Link>
          {user ? (
            <div className="flex items-center space-x-2">
              {user.userType === 'admin' && (
                <Link to="/admin">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-forest hover:text-forest-dark border-forest/20 hover:border-forest/40"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              )}
              <Button 
                onClick={handleLogout}
                variant="outline" 
                size="sm"
                className="text-forest hover:text-forest-dark border-forest/20 hover:border-forest/40"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => setShowLogin(true)}
              variant="outline" 
              size="sm"
              className="bg-forest/10 hover:bg-forest text-forest hover:text-white border-0 transition-all duration-300"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Bus className="h-8 w-8 text-forest" />
                <span className="text-2xl font-bold bg-gradient-to-r from-forest via-forest-light to-forest-lighter text-transparent bg-clip-text">
                  <span className="text-lg md:text-2xl">Express</span>
                </span>
              </div>
              <p className="text-muted-foreground">
                Your trusted partner for comfortable and safe bus travel across India.
              </p>
              <div className="flex space-x-4">
                <span className="text-forest-light hover:text-forest transition-colors">
                  <Facebook className="h-5 w-5" />
                </span>
                <span className="text-forest-light hover:text-forest transition-colors">
                  <Twitter className="h-5 w-5" />
                </span>
                <span className="text-forest-light hover:text-forest transition-colors">
                  <Instagram className="h-5 w-5" />
                </span>
                <span className="text-forest-light hover:text-forest transition-colors">
                  <Linkedin className="h-5 w-5" />
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-forest-dark">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-muted-foreground">About Us</span>
                </li>
                <li>
                  <span className="text-muted-foreground">Our Services</span>
                </li>
                <li>
                  <span className="text-muted-foreground">Popular Routes</span>
                </li>
                <li>
                  <span className="text-muted-foreground">Pricing</span>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-forest-dark">Support</h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-muted-foreground">Help Center</span>
                </li>
                <li>
                  <span className="text-muted-foreground">FAQs</span>
                </li>
                <li>
                  <span className="text-muted-foreground">Terms & Conditions</span>
                </li>
                <li>
                  <span className="text-muted-foreground">Privacy Policy</span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-forest-dark">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+91 1234567890</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>support@gmail.com</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-1" />
                  <span>123 Travel Street, Mumbai,<br />Maharashtra, India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Express. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <span className="text-sm text-muted-foreground">
                  Terms
                </span>
                <span className="text-sm text-muted-foreground">
                  Privacy
                </span>
                <span className="text-sm text-muted-foreground">
                  Cookies
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
