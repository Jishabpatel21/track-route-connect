
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useBooking } from "@/context/BookingContext";
import { useTrain } from "@/context/TrainContext";
import { Booking } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, Calendar, Train as TrainIcon, User } from "lucide-react";
import { format } from "date-fns";

const PNR = () => {
  const [pnrNumber, setPnrNumber] = useState("");
  const [searched, setSearched] = useState(false);
  const { getBookingByPnr } = useBooking();
  const { getTrainById } = useTrain();
  const [booking, setBooking] = useState<Booking | null>(null);

  const handlePnrSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const foundBooking = getBookingByPnr(pnrNumber);
    setBooking(foundBooking || null);
    setSearched(true);
  };

  const train = booking ? getTrainById(booking.trainId) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="railway-gradient py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
              PNR Status
            </h1>
            
            <div className="max-w-xl mx-auto">
              <Card className="railway-card">
                <CardHeader>
                  <CardTitle className="text-railway-blue">Check PNR Status</CardTitle>
                  <CardDescription>
                    Enter your 10-digit PNR number to check the current status of your booking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePnrSearch} className="flex space-x-2">
                    <Input 
                      type="text"
                      placeholder="Enter PNR number (e.g., PNR1234567)"
                      value={pnrNumber}
                      onChange={(e) => setPnrNumber(e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Button type="submit" className="railway-gradient">
                      Check Status
                    </Button>
                  </form>
                </CardContent>
                
                <CardFooter className="text-sm text-gray-500 flex items-center border-t p-4 bg-gray-50">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Demo PNR numbers: PNR1234567, PNR7654321
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {searched && (
          <div className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
              {booking && train ? (
                <div className="max-w-3xl mx-auto">
                  <Card className="railway-card mb-6">
                    <CardHeader className="bg-white border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-railway-blue">PNR: {booking.pnr}</CardTitle>
                          <CardDescription>Booked on {format(new Date(booking.bookingDate), "PPP")}</CardDescription>
                        </div>
                        <div className={`px-4 py-1 rounded-full text-white ${
                          booking.status === "confirmed"
                            ? "bg-green-500"
                            : booking.status === "waiting"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <TrainIcon className="mr-2 h-5 w-5 text-railway-blue" />
                          Train Details
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Train Name & Number</p>
                            <p className="font-medium">{train.name} ({train.number})</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Journey Date</p>
                            <p className="font-medium">{format(new Date(booking.journeyDate), "PP")}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">From</p>
                            <p className="font-medium">{train.source}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">To</p>
                            <p className="font-medium">{train.destination}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Departure</p>
                            <p className="font-medium">{train.departureTime}, {format(new Date(booking.journeyDate), "EEE, MMM d")}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Class</p>
                            <p className="font-medium">{booking.class}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <User className="mr-2 h-5 w-5 text-railway-blue" />
                          Passenger Details
                        </h3>
                        
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>No.</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Age</TableHead>
                              <TableHead>Gender</TableHead>
                              <TableHead>Seat</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {booking.passengers.map((passenger, index) => (
                              <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{passenger.name}</TableCell>
                                <TableCell>{passenger.age}</TableCell>
                                <TableCell>{passenger.gender.charAt(0).toUpperCase() + passenger.gender.slice(1)}</TableCell>
                                <TableCell>{passenger.seatNo || "-"}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    booking.status === "confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : booking.status === "waiting"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-red-100 text-red-800"
                                  }`}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="text-center text-sm text-gray-500">
                    <p className="flex items-center justify-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      For any changes to your booking, please contact customer care at 1800-123-4567
                    </p>
                  </div>
                </div>
              ) : (
                <div className="max-w-xl mx-auto">
                  <Card className="railway-card text-center py-8">
                    <CardContent>
                      <div className="flex justify-center mb-4">
                        <AlertCircle className="h-12 w-12 text-amber-500" />
                      </div>
                      <CardTitle className="mb-2">No Booking Found</CardTitle>
                      <CardDescription className="mb-6">
                        We couldn't find any booking with the PNR number: {pnrNumber}
                      </CardDescription>
                      <p className="text-sm text-gray-500 mb-4">
                        Please verify the PNR number and try again.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setPnrNumber("");
                          setSearched(false);
                        }}
                      >
                        Try Again
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PNR;
