import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  Bus, 
  CreditCard,
  Calendar,
  MapPin 
} from 'lucide-react';
import { useBusBooking } from '@/hooks/useBusBooking';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function Admin() {
  const { bookings, buses } = useBusBooking();

  // Calculate statistics
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const totalSeatsBooked = bookings.reduce((sum, booking) => sum + booking.seats.length, 0);

  // Platform statistics
  const platformStats = bookings.reduce((acc, booking) => {
    acc[booking.platform] = (acc[booking.platform] || 0) + booking.totalPrice;
    return acc;
  }, {} as Record<string, number>);

  const platformData = Object.entries(platformStats).map(([platform, revenue]) => ({
    name: platform === 'own' ? 'Our Website' : platform.charAt(0).toUpperCase() + platform.slice(1),
    value: revenue,
    bookings: bookings.filter(b => b.platform === platform).length
  }));

  // Bus statistics
  const busStats = buses.map(bus => ({
    name: bus.name,
    booked: bus.bookedSeats.length,
    available: bus.totalSeats - bus.bookedSeats.length,
    revenue: bookings
      .filter(b => b.busId === bus.id)
      .reduce((sum, b) => sum + b.totalPrice, 0)
  }));

  // Recent bookings (last 7 days trend)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const dailyStats = last7Days.map(date => {
    const dayBookings = bookings.filter(b => 
      b.timestamp.split('T')[0] === date
    );
    return {
      date: new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      bookings: dayBookings.length,
      revenue: dayBookings.reduce((sum, b) => sum + b.totalPrice, 0)
    };
  });

  // Colors for charts
  const COLORS = ['hsl(210, 100%, 50%)', 'hsl(0, 84%, 50%)', 'hsl(25, 100%, 50%)', 'hsl(142, 76%, 36%)'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/">
                <Button variant="ghost">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-3xl font-bold mt-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage bookings and view analytics</p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date().toLocaleDateString('en-IN')}
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-primary text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Total Bookings</p>
                <p className="text-3xl font-bold">{totalBookings}</p>
              </div>
              <Users className="h-10 w-10 text-white/60" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-secondary text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Total Revenue</p>
                <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <CreditCard className="h-10 w-10 text-white/60" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-ixigo text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Seats Booked</p>
                <p className="text-3xl font-bold">{totalSeatsBooked}</p>
              </div>
              <Bus className="h-10 w-10 text-white/60" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-redbus text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Avg. Booking</p>
                <p className="text-3xl font-bold">
                  ₹{totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0}
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-white/60" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Platform Revenue Distribution */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Revenue by Platform</h3>
            {platformData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => `${entry.name} ${((entry.percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {platformData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-muted-foreground">
                No bookings data available
              </div>
            )}
          </Card>

          {/* Daily Booking Trend */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">7-Day Booking Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="hsl(210, 100%, 50%)" 
                  strokeWidth={3}
                  name="Bookings"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Bus Utilization */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Bus Seat Utilization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={busStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="booked" fill="hsl(210, 100%, 50%)" name="Booked Seats" />
              <Bar dataKey="available" fill="hsl(142, 76%, 36%)" name="Available Seats" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Bookings Table */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Recent Bookings</h3>
          {bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Booking ID</th>
                    <th className="text-left p-3">Route</th>
                    <th className="text-left p-3">Bus</th>
                    <th className="text-left p-3">Seats</th>
                    <th className="text-left p-3">Platform</th>
                    <th className="text-left p-3">Amount</th>
                    <th className="text-left p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(-10).reverse().map((booking) => {
                    const bus = buses.find(b => b.id === booking.busId);
                    return (
                      <tr key={booking.id} className="border-b hover:bg-accent/50">
                        <td className="p-3 font-mono text-xs">{booking.id}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                            {booking.destination}
                          </div>
                        </td>
                        <td className="p-3">{bus?.name}</td>
                        <td className="p-3">
                          <Badge variant="outline">
                            {booking.seats.length} seat{booking.seats.length > 1 ? 's' : ''}
                          </Badge>
                        </td>
                        <td className="p-3">
                          {booking.platform === 'own' ? 'Our Website' : 
                           booking.platform.charAt(0).toUpperCase() + booking.platform.slice(1)}
                        </td>
                        <td className="p-3 font-semibold">₹{booking.totalPrice}</td>
                        <td className="p-3 text-muted-foreground">
                          {new Date(booking.timestamp).toLocaleDateString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Bus className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No bookings found</p>
              <p className="text-sm">Bookings will appear here once users start booking seats</p>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}