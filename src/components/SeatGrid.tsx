import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBusBooking } from '@/hooks/useBusBooking';

interface SeatGridProps {
  busId: number;
  onSeatSelectionChange: (seats: number[]) => void;
}

export function SeatGrid({ busId, onSeatSelectionChange }: SeatGridProps) {
  const { buses, selectedSeats } = useBusBooking();
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState<number[]>([]);
  
  const bus = buses.find(b => b.id === busId);
  if (!bus) return null;

  const handleSeatClick = (seatNumber: number) => {
    if (bus.bookedSeats.includes(seatNumber)) return; // Can't select booked seats

    const newSelection = selectedSeatNumbers.includes(seatNumber)
      ? selectedSeatNumbers.filter(s => s !== seatNumber)
      : selectedSeatNumbers.length < selectedSeats
        ? [...selectedSeatNumbers, seatNumber]
        : selectedSeatNumbers; // Don't add if already at limit

    setSelectedSeatNumbers(newSelection);
    onSeatSelectionChange(newSelection);
  };

  const getSeatStatus = (seatNumber: number) => {
    if (bus.bookedSeats.includes(seatNumber)) return 'booked';
    if (selectedSeatNumbers.includes(seatNumber)) return 'selected';
    return 'available';
  };

  const getSeatClass = (seatNumber: number) => {
    const status = getSeatStatus(seatNumber);
    const baseClass = 'w-12 h-12 rounded-2xl font-bold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center';
    
    switch (status) {
      case 'booked':
        return `${baseClass} bg-seatBooked text-white cursor-not-allowed opacity-60`;
      case 'selected':
        return `${baseClass} bg-gradient-primary text-white shadow-premium-md scale-110 ring-2 ring-primary-light`;
      case 'available':
        return `${baseClass} bg-seatAvailable hover:bg-seatAvailable/80 text-white hover:scale-105 hover:shadow-premium-sm`;
    }
  };

  // Generate seat layout (6 rows x 6 seats = 36 seats total) - Indian bus format (3+3)
  const seatRows = [];
  for (let row = 0; row < 6; row++) {
    const rowSeats = [];
    for (let col = 0; col < 6; col++) {
      const seatNumber = row * 6 + col + 1;
      rowSeats.push(seatNumber);
    }
    seatRows.push(rowSeats);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-8 bg-gradient-card shadow-premium-xl border-0 rounded-3xl">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-4 text-foreground">{bus.name}</h3>
            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-seatAvailable rounded-xl shadow-sm"></div>
                <span className="font-medium text-foreground">Available</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-primary rounded-xl shadow-sm"></div>
                <span className="font-medium text-foreground">Selected</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-seatBooked rounded-xl shadow-sm opacity-60"></div>
                <span className="font-medium text-foreground">Booked</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Driver section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-gradient-secondary rounded-2xl p-4 text-center text-lg font-bold text-white shadow-premium-md">
            🚗 Driver Section
          </div>
        </motion.div>

        {/* Seat grid */}
        <div className="space-y-4 mb-8">
          {seatRows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + rowIndex * 0.1 }}
              className="flex justify-between items-center"
            >
              <div className="flex gap-3">
                {row.slice(0, 3).map(seatNumber => (
                  <motion.div
                    key={seatNumber}
                    whileHover={{ scale: getSeatStatus(seatNumber) === 'available' ? 1.1 : 1 }}
                    whileTap={{ scale: getSeatStatus(seatNumber) === 'available' ? 0.95 : 1 }}
                  >
                    <Button
                      variant="ghost"
                      className={getSeatClass(seatNumber)}
                      onClick={() => handleSeatClick(seatNumber)}
                      disabled={bus.bookedSeats.includes(seatNumber)}
                    >
                      {seatNumber}
                    </Button>
                  </motion.div>
                ))}
              </div>
              
              {/* Aisle */}
              <div className="w-12 text-center text-muted-foreground font-medium">
                —
              </div>
              
              <div className="flex gap-3">
                {row.slice(3).map(seatNumber => (
                  <motion.div
                    key={seatNumber}
                    whileHover={{ scale: getSeatStatus(seatNumber) === 'available' ? 1.1 : 1 }}
                    whileTap={{ scale: getSeatStatus(seatNumber) === 'available' ? 0.95 : 1 }}
                  >
                    <Button
                      variant="ghost"
                      className={getSeatClass(seatNumber)}
                      onClick={() => handleSeatClick(seatNumber)}
                      disabled={bus.bookedSeats.includes(seatNumber)}
                    >
                      {seatNumber}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selection info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-between items-center bg-primary/10 p-6 rounded-2xl"
        >
          <div>
            <p className="font-bold text-lg text-foreground">
              Selected: {selectedSeatNumbers.length} / {selectedSeats} seats
            </p>
            {selectedSeatNumbers.length > 0 && (
              <p className="text-muted-foreground mt-1">
                Seats: {selectedSeatNumbers.sort((a, b) => a - b).join(', ')}
              </p>
            )}
          </div>
          <Badge 
            variant={selectedSeatNumbers.length === selectedSeats ? "default" : "secondary"}
            className="px-4 py-2 text-sm font-bold rounded-xl"
          >
            {selectedSeatNumbers.length === selectedSeats ? "Ready to book" : "Select more seats"}
          </Badge>
        </motion.div>
      </Card>
    </motion.div>
  );
}