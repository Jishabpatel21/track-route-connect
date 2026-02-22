
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Check, ArrowLeft } from "lucide-react";
import { Booking } from "@/data/mockData";

const AdminRefunds: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getAllBookings } = useBooking();
  const [refundBookingId, setRefundBookingId] = useState<number | null>(null);
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [processedRefunds, setProcessedRefunds] = useState<Record<number, boolean>>({});
  const [refundNote, setRefundNote] = useState<string>("");
  const [filter, setFilter] = useState<string>("cancelled");

  React.useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      toast({
        title: "Access Denied",
        description: "You must be logged in as an admin to access this page",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [isAuthenticated, navigate, user?.role, toast]);

  const allBookings = getAllBookings();
  const cancelledBookings = allBookings.filter((booking) => 
    filter === "all" ? true : booking.status === filter
  );

  const handleRefundDialogOpen = (booking: Booking) => {
    // Calculate default refund amount (75% of total fare)
    const calculatedRefund = Math.round(booking.totalFare * 0.75);
    
    setRefundBookingId(booking.id);
    setRefundAmount(calculatedRefund);
    setRefundNote("");
    setRefundDialogOpen(true);
  };

  const processRefund = () => {
    if (!refundBookingId) return;
    
    // In a real application, this would call a payment gateway API to process the refund
    
    // Mark this booking as refunded in our local state
    setProcessedRefunds({
      ...processedRefunds,
      [refundBookingId]: true
    });
    
    toast({
      title: "Refund Processed",
      description: `Refund of ₹${refundAmount} has been processed successfully.`,
    });
    
    setRefundDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/admin")} 
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Admin
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-railway-blue">
              Refund Management
            </h1>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4">
              <Label htmlFor="filter">Filter by status:</Label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              >
                <option value="all">All Bookings</option>
                <option value="cancelled">Cancelled Only</option>
                <option value="confirmed">Confirmed Only</option>
              </select>
            </div>
          </div>

          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-xl text-railway-blue">Booking Refunds</CardTitle>
              <CardDescription>
                Process refunds for cancelled bookings. Once processed, refunds cannot be reversed.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>PNR</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Booking Date</TableHead>
                    <TableHead>Journey Date</TableHead>
                    <TableHead>Total Fare (₹)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Refund Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cancelledBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-4">
                        No bookings found matching the criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    cancelledBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>{booking.pnr}</TableCell>
                        <TableCell>{booking.userId}</TableCell>
                        <TableCell>{booking.bookingDate}</TableCell>
                        <TableCell>{booking.journeyDate}</TableCell>
                        <TableCell>{booking.totalFare}</TableCell>
                        <TableCell>
                          <Badge className={booking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{booking.paymentMethod || "Card"}</TableCell>
                        <TableCell>
                          {processedRefunds[booking.id] ? (
                            <Badge className="bg-green-100 text-green-800">
                              <Check className="h-3 w-3 mr-1" /> Processed
                            </Badge>
                          ) : booking.status === "cancelled" ? (
                            <Badge variant="outline" className="text-amber-600 border-amber-300">
                              Pending
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-gray-500">
                              Not Applicable
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {booking.status === "cancelled" && !processedRefunds[booking.id] && (
                            <Button 
                              size="sm" 
                              onClick={() => handleRefundDialogOpen(booking)}
                            >
                              Process Refund
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Process Refund</DialogTitle>
                <DialogDescription>
                  Enter the refund amount and any notes about this refund.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="refundAmount">Refund Amount (₹)</Label>
                  <Input
                    id="refundAmount"
                    type="number"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(Number(e.target.value))}
                  />
                  <p className="text-sm text-gray-500">
                    Standard refund amount is 75% of the original fare.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="refundNote">Refund Note (Optional)</Label>
                  <Input
                    id="refundNote"
                    value={refundNote}
                    onChange={(e) => setRefundNote(e.target.value)}
                    placeholder="Optional note about this refund"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setRefundDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={processRefund}>
                  Process Refund
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminRefunds;
