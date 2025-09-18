import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface Bus {
  id: number;
  name: string;
  totalSeats: number;
  bookedSeats: number[];
}

export interface Booking {
  id: string;
  busId: number;
  destination: string;
  seats: number[];
  platform: string;
  pricePerSeat: number;
  totalPrice: number;
  timestamp: string;
}

export interface PricingData {
  destination: string;
  prices: {
    makemytrip: number;
    redbus: number;
    ixigo: number;
    own: number;
  };
}

interface BusBookingContextType {
  buses: Bus[];
  bookings: Booking[];
  destinations: string[];
  pricingData: PricingData[];
  selectedDestination: string;
  selectedSeats: number;
  selectedPlatform: string;
  selectedSeatNumbers: number[];
  setSelectedDestination: (destination: string) => void;
  setSelectedSeats: (seats: number) => void;
  setSelectedPlatform: (platform: string) => void;
  setSelectedSeatNumbers: (seats: number[]) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'timestamp'>) => void;
  initializeData: () => void;
}

const BusBookingContext = createContext<BusBookingContextType | undefined>(undefined);

const INITIAL_BUSES: Bus[] = [
  { id: 1, name: "Express Deluxe A", totalSeats: 36, bookedSeats: [] },
  { id: 2, name: "Express Deluxe B", totalSeats: 36, bookedSeats: [] }
];

const DESTINATIONS = [
  "Delhi → Jaipur",
  "Delhi → Chandigarh", 
  "Delhi → Lucknow",
  "Delhi → Agra"
];

const PRICING_DATA: PricingData[] = [
  {
    destination: "Delhi → Jaipur",
    prices: { makemytrip: 550, redbus: 500, ixigo: 520, own: 480 }
  },
  {
    destination: "Delhi → Chandigarh", 
    prices: { makemytrip: 650, redbus: 600, ixigo: 620, own: 580 }
  },
  {
    destination: "Delhi → Lucknow",
    prices: { makemytrip: 750, redbus: 700, ixigo: 720, own: 680 }
  },
  {
    destination: "Delhi → Agra",
    prices: { makemytrip: 450, redbus: 400, ixigo: 420, own: 380 }
  }
];

export function BusBookingProvider({ children }: { children: ReactNode }) {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [destinations] = useState<string[]>(DESTINATIONS);
  const [pricingData] = useState<PricingData[]>(PRICING_DATA);
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<number>(1);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState<number[]>([]);

  const initializeData = () => {
    const storedBuses = localStorage.getItem('buses');
    const storedBookings = localStorage.getItem('bookings');

    if (!storedBuses) {
      localStorage.setItem('buses', JSON.stringify(INITIAL_BUSES));
      setBuses(INITIAL_BUSES);
    } else {
      setBuses(JSON.parse(storedBuses));
    }

    if (!storedBookings) {
      localStorage.setItem('bookings', JSON.stringify([]));
      setBookings([]);
    } else {
      setBookings(JSON.parse(storedBookings));
    }
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'timestamp'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `bk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };

    // Update bookings
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    // Update bus booked seats
    const updatedBuses = buses.map(bus => 
      bus.id === bookingData.busId 
        ? { ...bus, bookedSeats: [...bus.bookedSeats, ...bookingData.seats] }
        : bus
    );
    setBuses(updatedBuses);
    localStorage.setItem('buses', JSON.stringify(updatedBuses));
  };

  useEffect(() => {
    initializeData();
  }, []);

  return (
    <BusBookingContext.Provider value={{
      buses,
      bookings,
      destinations,
      pricingData,
      selectedDestination,
      selectedSeats,
      selectedPlatform,
      selectedSeatNumbers,
      setSelectedDestination,
      setSelectedSeats,
      setSelectedPlatform,
      setSelectedSeatNumbers,
      addBooking,
      initializeData
    }}>
      {children}
    </BusBookingContext.Provider>
  );
}

export function useBusBooking() {
  const context = useContext(BusBookingContext);
  if (context === undefined) {
    throw new Error('useBusBooking must be used within a BusBookingProvider');
  }
  return context;
}