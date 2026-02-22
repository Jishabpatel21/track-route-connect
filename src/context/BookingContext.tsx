import React, { createContext, useState, useContext, useEffect } from "react";
import { bookings as initialBookings, Booking, Passenger } from "../data/mockData";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "./AuthContext";
import { useTrain } from "./TrainContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "pnr">) => string;
  cancelBooking: (id: number) => void;
  getUserBookings: () => Booking[];
  getBookingByPnr: (pnr: string) => Booking | undefined;
  getAllBookings: () => Booking[];
  downloadTicket: (pnr: string) => void;
  downloadCancellationReceipt: (bookingId: number) => void;
  printTicket: (pnr: string) => void;
  printCancellationReceipt: (bookingId: number) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Local storage key for bookings
const BOOKINGS_STORAGE_KEY = "railconnect_bookings";

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize bookings from localStorage or fallback to initialBookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const storedBookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    return storedBookings ? JSON.parse(storedBookings) : initialBookings;
  });
  
  const { toast } = useToast();
  const { user } = useAuth();
  const { updateSeatAvailability, getTrainById } = useTrain();

  // Update localStorage whenever bookings change
  useEffect(() => {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  // Generate a random PNR number
  const generatePnr = () => {
    const prefix = "PNR";
    const randomDigits = Math.floor(1000000 + Math.random() * 9000000).toString();
    return prefix + randomDigits;
  };

  const addBooking = (bookingData: Omit<Booking, "id" | "pnr">) => {
    const pnr = generatePnr();
    const newBooking: Booking = {
      ...bookingData,
      id: bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1,
      pnr,
    };
    
    // Update seat availability in the train
    const success = updateSeatAvailability(
      bookingData.trainId, 
      bookingData.class, 
      bookingData.passengers.length
    );
    
    if (!success) {
      return ""; // Return empty string if seats couldn't be updated
    }
    
    setBookings([...bookings, newBooking]);
    
    toast({
      title: "Booking Confirmed",
      description: `Your booking has been confirmed. PNR: ${pnr}`,
    });
    
    // Navigate to booking confirmation with PNR
    if (typeof window !== 'undefined') {
      window.location.href = `/booking-confirmation?pnr=${pnr}`;
    }
    
    return pnr;
  };

  const cancelBooking = (id: number) => {
    const booking = bookings.find(b => b.id === id);
    
    if (!booking || booking.status === "cancelled") {
      toast({
        title: "Error",
        description: "Invalid booking or already cancelled",
        variant: "destructive",
      });
      return;
    }
    
    // Update bookings state
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: "cancelled" } : booking
    ));
    
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    });
    
    // Automatically download cancellation receipt
    downloadCancellationReceipt(id);
  };

  const getUserBookings = () => {
    if (!user) return [];
    return bookings.filter(booking => booking.userId === user.id);
  };

  const getBookingByPnr = (pnr: string) => {
    return bookings.find(booking => booking.pnr === pnr);
  };

  const getAllBookings = () => {
    return bookings;
  };

  // Function to generate PDF ticket
  const downloadTicket = (pnr: string) => {
    const booking = getBookingByPnr(pnr);
    if (!booking) {
      toast({
        title: "Error",
        description: "Booking not found",
        variant: "destructive",
      });
      return;
    }

    const train = getTrainById(booking.trainId);
    if (!train) {
      toast({
        title: "Error",
        description: "Train information not found",
        variant: "destructive",
      });
      return;
    }

    // Create PDF document
    const pdf = new jsPDF();
    
    // Add title and logo
    pdf.setFontSize(22);
    pdf.setTextColor(0, 48, 120); // Railway blue color
    pdf.text("RailConnect E-Ticket", 105, 20, { align: 'center' });
    
    // Add PNR and booking info
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`PNR: ${booking.pnr}`, 20, 40);
    pdf.text(`Booking Date: ${booking.bookingDate}`, 20, 50);
    pdf.text(`Journey Date: ${booking.journeyDate}`, 20, 60);
    
    // Add train info
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${train.name} (${train.number})`, 20, 75);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`From: ${train.source}`, 20, 85);
    pdf.text(`To: ${train.destination}`, 120, 85);
    pdf.text(`Departure: ${train.departureTime}`, 20, 95);
    pdf.text(`Arrival: ${train.arrivalTime}`, 120, 95);
    pdf.text(`Class: ${booking.class}`, 20, 105);
    
    // Add passenger details
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text("Passenger Details", 20, 120);
    
    // Add passenger table
    const tableColumn = ["No.", "Name", "Age", "Gender", "Status"];
    const tableRows = booking.passengers.map((passenger, index) => [
      (index + 1).toString(),
      passenger.name,
      passenger.age.toString(),
      passenger.gender,
      booking.status === "confirmed" ? "Confirmed" : "Cancelled"
    ]);
    
    autoTable(pdf, {
      head: [tableColumn],
      body: tableRows,
      startY: 125,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 48, 120] }
    });
    
    // Add payment info
    const finalY = (pdf as any).lastAutoTable.finalY + 10;
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text("Payment Details", 20, finalY);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Payment Method: ${booking.paymentMethod || "Credit Card"}`, 20, finalY + 10);
    pdf.text(`Total Fare: ₹${booking.totalFare}`, 20, finalY + 20);
    
    // Add important information
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 150);
    pdf.text("Important Information:", 20, finalY + 35);
    pdf.setFontSize(10);
    pdf.text("• This e-ticket is valid along with a valid photo ID card in original.", 25, finalY + 45);
    pdf.text("• Please carry the ID proof during the journey.", 25, finalY + 52);
    pdf.text("• Arrive at the station at least 30 minutes before the departure time.", 25, finalY + 59);
    
    // Add footer
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated on: ${format(new Date(), "PPP p")}`, 20, 285);
    pdf.text("RailConnect - Your Digital Travel Partner", 105, 285, { align: 'center' });
    
    // Save the PDF
    pdf.save(`RailConnect_Ticket_${booking.pnr}.pdf`);
    
    toast({
      title: "Ticket Downloaded",
      description: `E-ticket for PNR ${pnr} has been downloaded successfully.`,
    });
  };

  // Function to generate PDF cancellation receipt
  const downloadCancellationReceipt = (bookingId: number) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) {
      toast({
        title: "Error",
        description: "Booking not found",
        variant: "destructive",
      });
      return;
    }

    const train = getTrainById(booking.trainId);
    if (!train) {
      toast({
        title: "Error",
        description: "Train information not found",
        variant: "destructive",
      });
      return;
    }

    // Create PDF document
    const pdf = new jsPDF();
    
    // Add title and logo
    pdf.setFontSize(20);
    pdf.setTextColor(180, 0, 0); // Red color for cancellation
    pdf.text("RailConnect - Booking Cancellation", 105, 20, { align: 'center' });
    
    // Add cancellation info
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`PNR: ${booking.pnr}`, 20, 40);
    pdf.text(`Booking ID: ${booking.id}`, 120, 40);
    pdf.text(`Cancellation Date: ${format(new Date(), "yyyy-MM-dd")}`, 20, 50);
    pdf.text(`Original Journey Date: ${booking.journeyDate}`, 20, 60);
    
    // Add train info
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${train.name} (${train.number})`, 20, 75);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`From: ${train.source}`, 20, 85);
    pdf.text(`To: ${train.destination}`, 120, 85);
    pdf.text(`Class: ${booking.class}`, 20, 95);
    
    // Add passenger details
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text("Cancelled Tickets", 20, 110);
    
    // Add passenger table
    const tableColumn = ["No.", "Name", "Age", "Gender"];
    const tableRows = booking.passengers.map((passenger, index) => [
      (index + 1).toString(),
      passenger.name,
      passenger.age.toString(),
      passenger.gender
    ]);
    
    autoTable(pdf, {
      head: [tableColumn],
      body: tableRows,
      startY: 115,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [180, 0, 0] }
    });
    
    // Add refund info
    const finalY = (pdf as any).lastAutoTable.finalY + 10;
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text("Refund Information", 20, finalY);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    
    // Calculate refund amount (mock - 75% of total fare)
    const refundAmount = Math.round(booking.totalFare * 0.75);
    
    pdf.text(`Original Fare: ₹${booking.totalFare}`, 20, finalY + 10);
    pdf.text(`Cancellation Charges: ₹${booking.totalFare - refundAmount}`, 20, finalY + 20);
    pdf.text(`Refund Amount: ₹${refundAmount}`, 20, finalY + 30);
    pdf.text(`Refund Status: Processing`, 20, finalY + 40);
    
    // Add note
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text("Note: The refund will be processed to the original payment method within 5-7 business days.", 20, finalY + 55);
    
    // Add footer
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated on: ${format(new Date(), "PPP p")}`, 20, 285);
    pdf.text("RailConnect - Your Digital Travel Partner", 105, 285, { align: 'center' });
    
    // Save the PDF
    pdf.save(`RailConnect_Cancellation_${booking.pnr}.pdf`);
    
    toast({
      title: "Cancellation Receipt Downloaded",
      description: "Your cancellation receipt has been downloaded successfully.",
    });
  };
  
  // Function to generate and print ticket
  const printTicket = (pnr: string) => {
    const booking = getBookingByPnr(pnr);
    if (!booking) {
      toast({
        title: "Error",
        description: "Booking not found",
        variant: "destructive",
      });
      return;
    }

    const train = getTrainById(booking.trainId);
    if (!train) {
      toast({
        title: "Error",
        description: "Train information not found",
        variant: "destructive",
      });
      return;
    }

    // Create PDF document specifically for printing
    const pdf = new jsPDF();
    
    // Add title and logo
    pdf.setFontSize(22);
    pdf.setTextColor(0, 48, 120); // Railway blue color
    pdf.text("RailConnect E-Ticket", 105, 20, { align: 'center' });
    
    // Add PNR and booking info
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`PNR: ${booking.pnr}`, 20, 40);
    pdf.text(`Booking Date: ${booking.bookingDate}`, 20, 50);
    pdf.text(`Journey Date: ${booking.journeyDate}`, 20, 60);
    
    // Add train info
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${train.name} (${train.number})`, 20, 75);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`From: ${train.source}`, 20, 85);
    pdf.text(`To: ${train.destination}`, 120, 85);
    pdf.text(`Departure: ${train.departureTime}`, 20, 95);
    pdf.text(`Arrival: ${train.arrivalTime}`, 120, 95);
    pdf.text(`Class: ${booking.class}`, 20, 105);
    
    // Add passenger details
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text("Passenger Details", 20, 120);
    
    // Add passenger table
    const tableColumn = ["No.", "Name", "Age", "Gender", "Status"];
    const tableRows = booking.passengers.map((passenger: any, index: number) => [
      (index + 1).toString(),
      passenger.name,
      passenger.age.toString(),
      passenger.gender,
      booking.status === "confirmed" ? "Confirmed" : "Cancelled"
    ]);
    
    autoTable(pdf, {
      head: [tableColumn],
      body: tableRows,
      startY: 125,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 48, 120] }
    });
    
    // Add payment info
    const finalY = (pdf as any).lastAutoTable.finalY + 10;
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text("Payment Details", 20, finalY);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Payment Method: ${booking.paymentMethod || "Credit Card"}`, 20, finalY + 10);
    pdf.text(`Total Fare: ₹${booking.totalFare}`, 20, finalY + 20);
    
    // Add important information
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 150);
    pdf.text("Important Information:", 20, finalY + 35);
    pdf.setFontSize(10);
    pdf.text("• This e-ticket is valid along with a valid photo ID card in original.", 25, finalY + 45);
    pdf.text("• Please carry the ID proof during the journey.", 25, finalY + 52);
    pdf.text("• Arrive at the station at least 30 minutes before the departure time.", 25, finalY + 59);
    
    // Add footer
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated on: ${format(new Date(), "PPP p")}`, 20, 285);
    pdf.text("RailConnect - Your Digital Travel Partner", 105, 285, { align: 'center' });
    
    // Print the PDF directly
    pdf.autoPrint();
    pdf.output('dataurlnewwindow');
    
    toast({
      title: "Printing Ticket",
      description: "Print dialog opened. Please confirm to print your ticket.",
    });
  };

  // Function to generate and print cancellation receipt
  const printCancellationReceipt = (bookingId: number) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) {
      toast({
        title: "Error",
        description: "Booking not found",
        variant: "destructive",
      });
      return;
    }

    const train = getTrainById(booking.trainId);
    if (!train) {
      toast({
        title: "Error",
        description: "Train information not found",
        variant: "destructive",
      });
      return;
    }

    // Create PDF document for printing
    const pdf = new jsPDF();
    
    // Add title
    pdf.setFontSize(20);
    pdf.setTextColor(180, 0, 0); // Red color for cancellation
    pdf.text("RailConnect - Booking Cancellation", 105, 20, { align: 'center' });
    
    // Add cancellation info
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`PNR: ${booking.pnr}`, 20, 40);
    pdf.text(`Booking ID: ${booking.id}`, 120, 40);
    pdf.text(`Cancellation Date: ${format(new Date(), "yyyy-MM-dd")}`, 20, 50);
    pdf.text(`Original Journey Date: ${booking.journeyDate}`, 20, 60);
    
    // Add train info
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${train.name} (${train.number})`, 20, 75);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`From: ${train.source}`, 20, 85);
    pdf.text(`To: ${train.destination}`, 120, 85);
    pdf.text(`Class: ${booking.class}`, 20, 95);
    
    // Add passenger details
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text("Cancelled Tickets", 20, 110);
    
    // Add passenger table
    const tableColumn = ["No.", "Name", "Age", "Gender"];
    const tableRows = booking.passengers.map((passenger, index) => [
      (index + 1).toString(),
      passenger.name,
      passenger.age.toString(),
      passenger.gender
    ]);
    
    autoTable(pdf, {
      head: [tableColumn],
      body: tableRows,
      startY: 115,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [180, 0, 0] }
    });
    
    // Add refund info
    const finalY = (pdf as any).lastAutoTable.finalY + 10;
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text("Refund Information", 20, finalY);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    
    // Calculate refund amount (mock - 75% of total fare)
    const refundAmount = Math.round(booking.totalFare * 0.75);
    
    pdf.text(`Original Fare: ₹${booking.totalFare}`, 20, finalY + 10);
    pdf.text(`Cancellation Charges: ₹${booking.totalFare - refundAmount}`, 20, finalY + 20);
    pdf.text(`Refund Amount: ₹${refundAmount}`, 20, finalY + 30);
    pdf.text(`Refund Status: Processing`, 20, finalY + 40);
    
    // Add note
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text("Note: The refund will be processed to the original payment method within 5-7 business days.", 20, finalY + 55);
    
    // Add footer
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated on: ${format(new Date(), "PPP p")}`, 20, 285);
    pdf.text("RailConnect - Your Digital Travel Partner", 105, 285, { align: 'center' });
    
    // Print the PDF directly
    pdf.autoPrint();
    pdf.output('dataurlnewwindow');
    
    toast({
      title: "Printing Receipt",
      description: "Print dialog opened. Please confirm to print your cancellation receipt.",
    });
  };

  return (
    <BookingContext.Provider value={{ 
      bookings, 
      addBooking, 
      cancelBooking, 
      getUserBookings,
      getBookingByPnr,
      getAllBookings,
      downloadTicket,
      downloadCancellationReceipt,
      printTicket,
      printCancellationReceipt
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
