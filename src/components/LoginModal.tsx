import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { User, Shield, Mail, Lock, History, Settings } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userType: 'user' | 'admin', userData?: any) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [step, setStep] = useState<'select' | 'login'>('select');
  const [userType, setUserType] = useState<'user' | 'admin'>('user');
  const [formData, setFormData] = useState(() => {
    // Check if there's stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      return {
        name: userData.name || '',
        email: userData.email || '',
        password: '' // For security, we don't store/retrieve password
      };
    }
    return {
      name: '',
      email: '',
      password: ''
    };
  });

  const handleTypeSelect = (type: 'user' | 'admin') => {
    setUserType(type);
    setStep('login');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app this would authenticate
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: userType === 'admin' ? '+91 9999999999' : '+91 8888888888',
      userType,
      isLoggedIn: true,
      lastLogin: new Date().toISOString()
    };

    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    onLogin(userType, userData);
    onClose();
    setStep('select');
  };

  const handleBack = () => {
    setStep('select');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border-0 rounded-3xl shadow-2xl overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)] opacity-50"></div>
        {step === 'select' ? (
          <div>
            <DialogHeader className="text-center mb-8">
              <DialogTitle className="text-3xl font-bold text-foreground mb-4">
                Welcome Back
              </DialogTitle>
              <p className="text-muted-foreground text-lg">
                Choose your account type to continue
              </p>
            </DialogHeader>

            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 bg-forest/5 hover:bg-forest/10 border-0 rounded-2xl relative overflow-hidden group"
                  onClick={() => handleTypeSelect('user')}
                >
                  <div className="flex items-center justify-between p-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">User Login</h3>
                      <p className="text-muted-foreground">Book tickets and view history</p>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <History className="h-4 w-4 mr-2" />
                      <span>Booking History</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 bg-forest-lighter/10 hover:bg-forest-lighter/20 border-0 rounded-2xl relative overflow-hidden group"
                  onClick={() => handleTypeSelect('admin')}
                >
                  <div className="flex items-center justify-between p-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Admin Login</h3>
                      <p className="text-muted-foreground">Manage bookings and buses</p>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Dashboard Access</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="relative z-50">
            <DialogHeader className="text-center mb-8">
              <DialogTitle className="text-3xl font-bold text-foreground mb-2">
                {userType === 'admin' ? 'Admin Login' : 'User Login'}
              </DialogTitle>
              <p className="text-muted-foreground">
                Enter your credentials to continue
              </p>
            </DialogHeader>

            <form onSubmit={handleLogin} className="space-y-6 relative">
              <div>
                <Label htmlFor="name" className="flex items-center text-foreground font-semibold mb-3">
                  <User className="h-5 w-5 mr-3 text-forest" />
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="h-12 bg-muted border-0 text-foreground rounded-2xl"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center text-foreground font-semibold mb-3">
                  <Mail className="h-5 w-5 mr-3 text-forest" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="h-12 bg-muted border-0 text-foreground rounded-2xl"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="flex items-center text-foreground font-semibold mb-3">
                  <Lock className="h-5 w-5 mr-3 text-forest" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="h-12 bg-muted border-0 text-foreground rounded-2xl"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-12 rounded-2xl bg-gray-100 hover:bg-gray-200 border-0 text-gray-700 font-medium transition-all duration-300"
                >
                  Back
                </Button>
                <Button 
                  type="submit"
                  className={`flex-1 h-12 ${userType === 'admin' ? 'bg-forest-light' : 'bg-forest'} text-white hover:opacity-90 rounded-2xl font-bold transition-all duration-300 relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer after:duration-1000`}
                >
                  Login as {userType === 'admin' ? 'Admin' : 'User'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}