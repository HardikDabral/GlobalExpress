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
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleTypeSelect = (type: 'user' | 'admin') => {
    setUserType(type);
    setStep('login');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app this would authenticate
    const mockUserData = {
      name: userType === 'admin' ? 'Admin User' : 'John Doe',
      email: formData.email,
      phone: userType === 'admin' ? '+91 9999999999' : '+91 8888888888',
      userType
    };
    onLogin(userType, mockUserData);
    onClose();
    setStep('select');
  };

  const handleBack = () => {
    setStep('select');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gradient-card border-0 rounded-3xl">
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
                  className="p-6 cursor-pointer hover:shadow-premium-lg transition-all duration-300 bg-gradient-subtle border-0 rounded-2xl"
                  onClick={() => handleTypeSelect('user')}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-primary rounded-2xl">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground">User Login</h3>
                      <p className="text-muted-foreground">Book tickets and view history</p>
                    </div>
                    <div className="flex flex-col text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center">
                        <History className="h-4 w-4 mr-2" />
                        <span>Booking History</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="p-6 cursor-pointer hover:shadow-premium-lg transition-all duration-300 bg-gradient-secondary border-0 rounded-2xl"
                  onClick={() => handleTypeSelect('admin')}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-accent rounded-2xl">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground">Admin Login</h3>
                      <p className="text-muted-foreground">Manage bookings and buses</p>
                    </div>
                    <div className="flex flex-col text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        <span>Dashboard Access</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        ) : (
          <div>
            <DialogHeader className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="flex justify-center mb-4"
              >
                <div className={`p-4 ${userType === 'admin' ? 'bg-gradient-accent' : 'bg-gradient-primary'} rounded-2xl`}>
                  {userType === 'admin' ? 
                    <Shield className="h-10 w-10 text-white" /> : 
                    <User className="h-10 w-10 text-white" />
                  }
                </div>
              </motion.div>
              <DialogTitle className="text-3xl font-bold text-foreground mb-2">
                {userType === 'admin' ? 'Admin Login' : 'User Login'}
              </DialogTitle>
              <p className="text-muted-foreground">
                Enter your credentials to continue
              </p>
            </DialogHeader>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email" className="flex items-center text-foreground font-semibold mb-3">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
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
                  <Lock className="h-5 w-5 mr-3 text-primary" />
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
                  className="flex-1 h-12 rounded-2xl"
                >
                  Back
                </Button>
                <Button 
                  type="submit"
                  className={`flex-1 h-12 ${userType === 'admin' ? 'bg-gradient-accent' : 'bg-gradient-primary'} text-white hover:shadow-premium-lg rounded-2xl font-bold`}
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