import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, ArrowLeft, FileText, Printer, Download } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import { useTrain } from "@/context/TrainContext";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { getAllBookings, cancelBooking, downloadTicket, downloadCancellationReceipt, printTicket, printCancellationReceipt } = useBooking();
  const { getTrainById } = useTrain();
  
  const [booking, setBooking] = useState<any>(null);
  const [train, setTrain] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }
    
    if (id) {
      const allBookings = getAllBookings();
      const foundBooking = allBookings.find(b => b.id === parseInt(id));
      
      if (!foundBooking) {
        navigate("/bookings", { replace: true });
        return;
      }
      
      setBooking(foundBooking);
      
      const trainData = getTrainById(foundBooking.trainId);
      if (trainData) {
        setTrain(trainData);
      }
    }
  }, [id, isAuthenticated, getAllBookings, getTrainById, navigate]);
  
  const handleCancelBooking = () => {
    if (!booking || !id) return;
    
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(booking.id);
      setBooking({ ...booking, status: "cancelled" });
    }
  };

  const handleDownloadTicket = () => {
    if (!booking) return;
    
    setIsDownloading(true);
    downloadTicket(booking.pnr);
    
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };
  
  const handleDownloadCancellationReceipt = () => {
    if (!booking || !id) return;
    
    setIsDownloading(true);
    downloadCancellationReceipt(booking.id);
    
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };
  
  const handlePrintTicket = () => {
    if (!booking) return;
    
    setIsPrinting(true);
    printTicket(booking.pnr);
    
    setTimeout(() => {
      setIsPrinting(false);
    }, 2000);
  };
  
  const handlePrintCancellationReceipt = () => {
    if (!booking || !id) return;
    
    setIsPrinting(true);
    printCancellationReceipt(booking.id);
    
    setTimeout(() => {
      setIsPrinting(false);
    }, 2000);
  };
  
  if (!booking || !train) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)} 
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-railway-blue">
              Booking Details
            </h1>
          </div>
          
          <Card className="railway-card mb-6">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>PNR: {booking.pnr}</CardTitle>
                  <CardDescription>Booking ID: {booking.id}</CardDescription>
                </div>
                <Badge className={booking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                  {booking.status === "confirmed" ? "Confirmed" : "Cancelled"}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Train Details */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{train.name} ({train.number})</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4">
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-medium">{train.source}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-medium">{train.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{booking.journeyDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Class</p>
                    <p className="font-medium">{booking.class}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm mt-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-railway-blue" />
                    <span>Departure: {train.departureTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-railway-blue" />
                    <span>Arrival: {train.arrivalTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-railway-blue" />
                    <span>Booked on: {booking.bookingDate}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Passenger Details */}
              <div className="space-y-2">
                <h3 className="font-semibold">Passenger Details</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Seat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {booking.passengers.map((passenger: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{passenger.name}</TableCell>
                        <TableCell>{passenger.age}</TableCell>
                        <TableCell className="capitalize">{passenger.gender}</TableCell>
                        <TableCell>{passenger.seatNo || `${booking.class}-${index + 1}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <Separator />
              
              {/* Payment Details */}
              <div className="space-y-2">
                <h3 className="font-semibold">Payment Details</h3>
                <div className="flex justify-between">
                  <span>Total Amount Paid:</span>
                  <span className="font-bold">₹{booking.totalFare}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between pt-4">
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={booking.status === "confirmed" ? handleDownloadTicket : handleDownloadCancellationReceipt}
                  disabled={isDownloading}
                >
                  <FileText className="h-4 w-4" /> 
                  {isDownloading ? "Downloading..." : booking.status === "confirmed" ? "Download E-Ticket" : "Download Receipt"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={booking.status === "confirmed" ? handlePrintTicket : handlePrintCancellationReceipt}
                  disabled={isPrinting}
                >
                  <Printer className="h-4 w-4" /> 
                  {isPrinting ? "Printing..." : "Print"}
                </Button>
              </div>
              
              {booking.status === "confirmed" && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleCancelBooking}
                >
                  Cancel Booking
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingDetails;
