
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TrainProvider } from "./context/TrainContext";
import { BookingProvider } from "./context/BookingContext";

// Import page components
import Index from "./pages/Index";
import Search from "./pages/Search";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PNR from "./pages/PNR";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import Bookings from "./pages/Bookings";
import BookingDetails from "./pages/BookingDetails";
import Admin from "./pages/Admin";
import AdminBookings from "./pages/AdminBookings";
import AdminUsers from "./pages/AdminUsers";
import AdminTrains from "./pages/AdminTrains";
import AdminRefunds from "./pages/AdminRefunds";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
// Import footer pages
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <TrainProvider>
          <BookingProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<Search />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pnr" element={<PNR />} />
                <Route path="/booking/:id" element={<Booking />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/booking-details/:id" element={<BookingDetails />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/trains" element={<AdminTrains />} />
                <Route path="/admin/refunds" element={<AdminRefunds />} />
                <Route path="/profile" element={<Profile />} />
                {/* Footer pages with corrected paths */}
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy-policy" element={<Privacy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </BookingProvider>
        </TrainProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
