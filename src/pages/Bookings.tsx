
import React from "react";
import { Link, Navigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Train as TrainIcon, CreditCard, Wallet, IndianRupee } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import { useTrain } from "@/context/TrainContext";

const Bookings = () => {
  const { isAuthenticated, user } = useAuth();
  const { getUserBookings, cancelBooking } = useBooking();
  const { getTrainById } = useTrain();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const bookings = getUserBookings();
  const upcomingBookings = bookings.filter(booking => booking.status === "confirmed");
  const cancelledBookings = bookings.filter(booking => booking.status === "cancelled");
  
  const handleCancelBooking = (bookingId: number) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(bookingId);
    }
  };
  
  const getTrainInfo = (trainId: number) => {
    return getTrainById(trainId);
  };
  
  const getPaymentMethodIcon = (method: string | undefined) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="h-4 w-4 mr-1" />;
      case "upi":
        return <Wallet className="h-4 w-4 mr-1" />;
      case "net_banking":
        return <IndianRupee className="h-4 w-4 mr-1" />;
      default:
        return <CreditCard className="h-4 w-4 mr-1" />;
    }
  };
  
  const formatPaymentMethod = (method: string | undefined) => {
    switch (method) {
      case "credit_card":
        return "Credit/Debit Card";
      case "upi":
        return "UPI Payment";
      case "net_banking":
        return "Net Banking";
      default:
        return "Credit/Debit Card";
    }
  };
  
  const renderBookingCard = (booking: any) => {
    const train = getTrainInfo(booking.trainId);
    if (!train) return null;
    
    return (
      <Card key={booking.id} className="railway-card mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{train.name} ({train.number})</CardTitle>
              <p className="text-sm text-gray-500">PNR: {booking.pnr}</p>
            </div>
            <Badge className={booking.status === "confirmed" ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"}>
              {booking.status === "confirmed" ? "Confirmed" : "Cancelled"}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <div className="flex items-center">
                <TrainIcon className="h-4 w-4 mr-1 text-railway-blue" />
                <span className="text-sm">{train.source} to {train.destination}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-railway-blue" />
                <span className="text-sm">{booking.journeyDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-railway-blue" />
                <span className="text-sm">Booked on {booking.bookingDate}</span>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <div className="flex flex-col sm:flex-row justify-between text-sm gap-2">
                <span>Passengers: {booking.passengers.length}</span>
                <span>Class: {booking.class}</span>
                <div className="flex items-center">
                  {getPaymentMethodIcon(booking.paymentMethod)}
                  <span>{formatPaymentMethod(booking.paymentMethod)}</span>
                </div>
                <span>Fare: ₹{booking.totalFare}</span>
              </div>
            </div>
            
            <div className="pt-2 flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to={`/booking-details/${booking.id}`}>View Details</Link>
              </Button>
              {booking.status === "confirmed" && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-railway-blue mb-6">
            My Bookings
          </h1>
          
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="upcoming">Upcoming Journeys</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled Bookings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {upcomingBookings.length > 0 ? (
                <div>
                  {upcomingBookings.map(booking => renderBookingCard(booking))}
                </div>
              ) : (
                <Card className="railway-card py-12 text-center">
                  <CardContent>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No Upcoming Journeys</h3>
                    <p className="text-gray-500 mb-6">You don't have any upcoming train journeys</p>
                    <Button asChild>
                      <Link to="/search">Search Trains</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="cancelled">
              {cancelledBookings.length > 0 ? (
                <div>
                  {cancelledBookings.map(booking => renderBookingCard(booking))}
                </div>
              ) : (
                <Card className="railway-card py-12 text-center">
                  <CardContent>
                    <h3 className="text-lg font-semibold text-gray-700">No Cancelled Bookings</h3>
                    <p className="text-gray-500">You don't have any cancelled bookings</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Bookings;
