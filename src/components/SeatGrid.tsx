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
    const baseClass = 'w-7 h-7 md:w-9 md:h-9 rounded-lg font-medium text-xs transition-all duration-300 cursor-pointer flex items-center justify-center';
    
    // Check if seat is reserved for special categories
    const isWomenReserved = seatNumber >= 1 && seatNumber <= 4;
    const isDisabledReserved = seatNumber >= 5 && seatNumber <= 8;
    const isSeniorReserved = seatNumber >= 9 && seatNumber <= 12;
    
    switch (status) {
      case 'booked':
        return `${baseClass} bg-gray-200 text-gray-400 cursor-not-allowed`;
      case 'selected':
        return `${baseClass} bg-forest-dark text-white scale-110`;
      case 'available':
        if (isWomenReserved) {
          return `${baseClass} bg-pink-100 text-pink-700 border border-pink-200 hover:bg-pink-200 hover:text-pink-800 hover:scale-105`;
        } else if (isDisabledReserved) {
          return `${baseClass} bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 hover:text-blue-800 hover:scale-105`;
        } else if (isSeniorReserved) {
          return `${baseClass} bg-orange-100 text-orange-700 border border-orange-200 hover:bg-orange-200 hover:text-orange-800 hover:scale-105`;
        } else {
          return `${baseClass} bg-forest-lighter text-forest-dark hover:bg-forest-light hover:text-white hover:scale-105`;
        }
    }
  };

  // Generate seat layout (15 rows x 4 seats = 60 seats total) - Indian bus format (2+2)
  const seatRows = [];
  for (let row = 0; row < 15; row++) {
    const rowSeats = [];
    for (let col = 0; col < 4; col++) {
      const seatNumber = row * 4 + col + 1;
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
      <Card className="p-4 md:p-6 bg-white border border-gray-100 rounded-2xl relative">
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)] opacity-50"></div>
        <div className="relative z-10">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-forest/60 font-medium text-sm">SELECT SEATS</span>
            <h3 className="text-xl md:text-2xl font-bold mt-2 mb-4 text-forest-dark">{bus.name}</h3>
            <div className="flex flex-wrap gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-forest-lighter rounded-lg"></div>
                <span className="font-medium text-forest-dark/70">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-forest-dark rounded-lg"></div>
                <span className="font-medium text-forest-dark/70">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-200 rounded-lg"></div>
                <span className="font-medium text-forest-dark/70">Booked</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Driver section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <div className="bg-forest/5 rounded-xl p-2 md:p-3 text-center text-xs md:text-sm font-medium text-forest">
            Driver Section
          </div>
        </motion.div>

        {/* Reserved Seats Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-r from-forest/5 to-forest-lighter/5 rounded-xl p-4 border border-forest/10">
            <h4 className="text-sm font-semibold text-forest-dark mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-forest"></div>
              Reserved Seats Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pink-200 border border-pink-300 rounded"></div>
                <span className="text-forest-dark/70">Seats 1-4: Women Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-200 border border-blue-300 rounded"></div>
                <span className="text-forest-dark/70">Seats 5-8: Disabled Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-200 border border-orange-300 rounded"></div>
                <span className="text-forest-dark/70">Seats 9-12: Senior Citizens</span>
              </div>
            </div>
            <p className="text-forest/60 text-xs mt-3 leading-relaxed">
              These seats are reserved for specific categories as per government regulations. 
              General passengers can book these seats if not occupied by reserved category passengers.
            </p>
          </div>
        </motion.div>

        {/* Seat grid */}
        <div className="space-y-3 md:space-y-4 mb-8">
          {seatRows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + rowIndex * 0.1 }}
              className="flex justify-between items-center"
            >
              {/* Left side (2 seats) */}
              <div className="flex gap-4 md:gap-5">
                {row.slice(0, 2).map(seatNumber => (
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
              <div className="w-8 md:w-12 text-center text-forest/30 font-medium text-xs">
                ···
              </div>
              
              {/* Right side (2 seats) */}
              <div className="flex gap-4 md:gap-5">
                {row.slice(2).map(seatNumber => (
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
          className="flex justify-between items-center bg-forest/5 p-4 md:p-6 rounded-xl border border-forest/10 mb-6"
        >
          <div>
            <p className="font-medium text-forest-dark">
              Selected: <span className="font-bold text-forest">{selectedSeatNumbers.length} / {selectedSeats}</span> seats
            </p>
            {selectedSeatNumbers.length > 0 && (
              <p className="text-forest/60 text-sm mt-1">
                Seats: {selectedSeatNumbers.sort((a, b) => a - b).join(', ')}
              </p>
            )}
          </div>
          <Badge 
            className={`px-3 py-1.5 text-xs font-medium rounded-full hover:bg-forest/20 hover:text-white transition-colors ${
              selectedSeatNumbers.length === selectedSeats 
                ? "bg-forest text-white hover:bg-forest-dark" 
                : "bg-forest/10 text-forest"
            }`}
          >
            {selectedSeatNumbers.length === selectedSeats ? "Ready to book" : `Select ${selectedSeats - selectedSeatNumbers.length} more`}
          </Badge>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="space-y-4"
        >
          <div className="bg-gradient-to-r from-forest/5 to-forest-lighter/5 rounded-xl p-4 border border-forest/10">
            <h4 className="text-sm font-semibold text-forest-dark mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-forest"></div>
              Seat Selection Guidelines
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-forest-dark/70">
              <div className="space-y-2">
                <p className="font-medium">• Choose seats in the same row for group travel</p>
                <p className="font-medium">• Window seats offer better views and comfort</p>
                <p className="font-medium">• Aisle seats provide easier access to restroom</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium">• Front seats have less legroom but better views</p>
                <p className="font-medium">• Back seats may have more engine noise</p>
                <p className="font-medium">• Middle seats offer balanced comfort</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-forest/5 to-forest-lighter/5 rounded-xl p-4 border border-forest/10">
            <h4 className="text-sm font-semibold text-forest-dark mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-forest"></div>
              Bus Amenities
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-forest"></div>
                <span className="text-forest-dark/70">AC Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-forest"></div>
                <span className="text-forest-dark/70">WiFi Free</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-forest"></div>
                <span className="text-forest-dark/70">Charging Points</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-forest"></div>
                <span className="text-forest-dark/70">Water Bottle</span>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}