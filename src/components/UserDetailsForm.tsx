import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, CreditCard } from 'lucide-react';

interface UserDetailsFormProps {
  onSubmit: (userDetails: UserDetails) => void;
  totalPrice: number;
}

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
}

export function UserDetailsForm({ onSubmit, totalPrice }: UserDetailsFormProps) {
  const [formData, setFormData] = useState<UserDetails>({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Partial<UserDetails>>({});

  const validateForm = () => {
    const newErrors: Partial<UserDetails> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Phone must be 10 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof UserDetails, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="p-10 bg-gradient-card shadow-premium-xl border-0 rounded-3xl">
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 bg-gradient-primary rounded-2xl">
              <CreditCard className="h-10 w-10 text-white" />
            </div>
          </motion.div>
          <h2 className="text-3xl font-bold text-foreground mb-3">Complete Your Booking</h2>
          <p className="text-muted-foreground text-lg">Enter your details to secure your seats</p>
          <div className="mt-4 p-4 bg-primary/10 rounded-2xl">
            <div className="text-2xl font-bold text-primary">Total: ₹{totalPrice}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Label htmlFor="name" className="flex items-center text-foreground font-semibold mb-3 text-lg">
              <User className="h-5 w-5 mr-3 text-primary" />
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`h-14 bg-muted border-0 text-foreground rounded-2xl text-lg placeholder:text-muted-foreground ${
                errors.name ? 'ring-2 ring-destructive' : ''
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-destructive text-sm mt-2 ml-1">{errors.name}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Label htmlFor="email" className="flex items-center text-foreground font-semibold mb-3 text-lg">
              <Mail className="h-5 w-5 mr-3 text-primary" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`h-14 bg-muted border-0 text-foreground rounded-2xl text-lg placeholder:text-muted-foreground ${
                errors.email ? 'ring-2 ring-destructive' : ''
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-2 ml-1">{errors.email}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Label htmlFor="phone" className="flex items-center text-foreground font-semibold mb-3 text-lg">
              <Phone className="h-5 w-5 mr-3 text-primary" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`h-14 bg-muted border-0 text-foreground rounded-2xl text-lg placeholder:text-muted-foreground ${
                errors.phone ? 'ring-2 ring-destructive' : ''
              }`}
              placeholder="Enter your 10-digit phone number"
            />
            {errors.phone && (
              <p className="text-destructive text-sm mt-2 ml-1">{errors.phone}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="pt-4"
          >
            <Button 
              type="submit"
              className="w-full h-16 bg-gradient-primary text-white hover:shadow-premium-lg hover:scale-105 font-bold text-lg rounded-2xl transition-all duration-300"
              size="lg"
            >
              Confirm Booking - ₹{totalPrice}
            </Button>
          </motion.div>
        </form>
      </Card>
    </motion.div>
  );
}