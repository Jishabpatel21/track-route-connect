import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useBooking } from "@/context/BookingContext";
import { useTrain } from "@/context/TrainContext";
import { Check, Download, Ticket, CreditCard, Wallet, IndianRupee, Printer, FileText } from "lucide-react";

const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const pnr = searchParams.get("pnr");
  const navigate = useNavigate();
  const { getBookingByPnr, downloadTicket, printTicket } = useBooking();
  const { getTrainById } = useTrain();
  
  const [booking, setBooking] = useState<any>(null);
  const [train, setTrain] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  
  useEffect(() => {
    if (!pnr) {
      navigate("/", { replace: true });
      return;
    }
    
    const bookingData = getBookingByPnr(pnr);
    if (!bookingData) {
      navigate("/", { replace: true });
      return;
    }
    
    setBooking(bookingData);
    
    const trainData = getTrainById(bookingData.trainId);
    if (trainData) {
      setTrain(trainData);
    }
  }, [pnr, getBookingByPnr, getTrainById, navigate]);
  
  const handleDownloadTicket = () => {
    if (!pnr) return;
    
    setIsDownloading(true);
    downloadTicket(pnr);
    
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };
  
  const handlePrintTicket = () => {
    if (!pnr) return;
    
    setIsPrinting(true);
    printTicket(pnr);
    
    setTimeout(() => {
      setIsPrinting(false);
    }, 2000);
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
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 flex items-center">
            <div className="bg-green-100 rounded-full p-2 mr-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-green-800 font-semibold text-lg">Booking Successful</h2>
              <p className="text-green-700 text-sm">Your ticket has been booked successfully</p>
            </div>
          </div>
          
          <Card className="railway-card mb-6">
            <CardHeader className="flex flex-row items-center justify-between bg-railway-blue text-white rounded-t-lg">
              <div>
                <CardTitle>E-Ticket / Reservation Voucher</CardTitle>
                <CardDescription className="text-white/80">PNR: <span className="font-semibold">{booking.pnr}</span></CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={handleDownloadTicket}
                  disabled={isDownloading}
                >
                  <FileText className="h-4 w-4" /> 
                  {isDownloading ? "Downloading..." : "Download PDF"}
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={handlePrintTicket}
                  disabled={isPrinting}
                >
                  <Printer className="h-4 w-4" /> 
                  {isPrinting ? "Printing..." : "Print"}
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="space-y-6">
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
                </div>
                
                <Separator />
                
                {/* Passenger Details */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Passenger Details</h3>
                  <Table>
                    <TableHeader className="bg-gray-100">
                      <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {booking.passengers.map((passenger: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{passenger.name}</TableCell>
                          <TableCell>{passenger.age}</TableCell>
                          <TableCell className="capitalize">{passenger.gender}</TableCell>
                          <TableCell>
                            <span className="text-green-600 font-medium">Confirmed</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <Separator />
                
                {/* Payment Details */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Payment Details</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="mr-2">Payment Method:</span>
                        <div className="flex items-center text-railway-blue">
                          {getPaymentMethodIcon(booking.paymentMethod)}
                          <span>{formatPaymentMethod(booking.paymentMethod)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">Transaction ID: </span>
                        <span className="text-sm font-medium">TXN{Math.floor(Math.random() * 1000000)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Amount Paid:</span>
                      <span className="font-bold">₹{booking.totalFare}</span>
                    </div>
                  </div>
                </div>
                
                {/* Important Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-800">
                  <p className="font-semibold mb-1">Important:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>The passenger must carry the original ID card during the journey.</li>
                    <li>E-ticket is valid along with a valid photo ID card in original.</li>
                    <li>Arrive at the station at least 30 minutes before the departure.</li>
                    <li>For ticket cancellations, please visit the bookings section in your profile.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/pnr">
                <Ticket className="mr-2 h-4 w-4" /> Check PNR Status
              </Link>
            </Button>
            <Button asChild>
              <Link to="/bookings">View My Bookings</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Go to Homepage</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
