
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import TrainSearch from "@/components/TrainSearch";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Train, Calendar, Clock, Ticket, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="railway-gradient relative text-white py-16 md:py-24">
          <div className="container mx-auto px-4 z-10 relative">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Book Your Train Tickets with Ease
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Search trains, check availability, book tickets, and more - all in one place.
              </p>
            </div>

            <div className="mt-8">
              <TrainSearch />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-railway-blue mb-12">
              Why Choose RailConnect?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="railway-card">
                <CardContent className="pt-6 pb-4 px-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-railway-light-gray rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-railway-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-railway-blue">
                    Easy Search
                  </h3>
                  <p className="text-gray-600">
                    Find trains between any stations with our simple and fast search engine.
                  </p>
                </CardContent>
              </Card>

              <Card className="railway-card">
                <CardContent className="pt-6 pb-4 px-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-railway-light-gray rounded-full flex items-center justify-center mb-4">
                    <Ticket className="h-8 w-8 text-railway-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-railway-blue">
                    Instant Booking
                  </h3>
                  <p className="text-gray-600">
                    Book your tickets in seconds with our streamlined booking process.
                  </p>
                </CardContent>
              </Card>

              <Card className="railway-card">
                <CardContent className="pt-6 pb-4 px-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-railway-light-gray rounded-full flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-railway-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-railway-blue">
                    PNR Status
                  </h3>
                  <p className="text-gray-600">
                    Check your PNR status online anytime, anywhere with just a few clicks.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Routes Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-railway-blue mb-8">
              Popular Routes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularRoutes.map((route, index) => (
                <Link
                  key={index}
                  to={`/search-results?source=${route.source}&destination=${route.destination}&date=${new Date().toISOString().split('T')[0]}`}
                  className="railway-card hover:border-railway-light-blue transition-all duration-300 border-2 border-transparent"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-medium">{route.source}</span>
                      <Train className="h-5 w-5 text-railway-light-blue mx-2" />
                      <span className="text-lg font-medium">{route.destination}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Distance: {route.distance}</span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> {route.duration}
                      </span>
                      <span>From ₹{route.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/search"
                className="inline-flex items-center text-railway-blue hover:text-railway-light-blue font-medium"
              >
                View all routes
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-railway-blue mb-12">
              Our Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-12 h-12 bg-railway-light-gray rounded-full flex items-center justify-center">
                    <Train className="h-6 w-6 text-railway-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-railway-blue">
                    Train Search
                  </h3>
                  <p className="text-gray-600">
                    Search for trains between any stations across India. Filter by date, class, and quota.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-12 h-12 bg-railway-light-gray rounded-full flex items-center justify-center">
                    <Ticket className="h-6 w-6 text-railway-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-railway-blue">
                    Ticket Booking
                  </h3>
                  <p className="text-gray-600">
                    Book tickets seamlessly with multiple payment options. Get instant confirmation.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-12 h-12 bg-railway-light-gray rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-railway-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-railway-blue">
                    Passenger Management
                  </h3>
                  <p className="text-gray-600">
                    Save your frequent passenger details for faster booking. Add multiple passengers with ease.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-12 h-12 bg-railway-light-gray rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-railway-blue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-railway-blue">
                    PNR Status & History
                  </h3>
                  <p className="text-gray-600">
                    Track your PNR status and booking history all in one place. Get real-time updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Popular routes data
const popularRoutes = [
  {
    source: "Delhi",
    destination: "Mumbai",
    distance: "1384 KM",
    duration: "15h 20m",
    price: "720",
  },
  {
    source: "Mumbai",
    destination: "Bangalore",
    distance: "984 KM",
    duration: "12h 45m",
    price: "550",
  },
  {
    source: "Delhi",
    destination: "Kolkata",
    distance: "1472 KM",
    duration: "17h 15m",
    price: "650",
  },
  {
    source: "Chennai",
    destination: "Hyderabad",
    distance: "629 KM",
    duration: "8h 35m",
    price: "380",
  },
  {
    source: "Bangalore",
    destination: "Chennai",
    distance: "346 KM",
    duration: "5h 30m",
    price: "240",
  },
  {
    source: "Delhi",
    destination: "Jaipur",
    distance: "308 KM",
    duration: "4h 35m",
    price: "190",
  },
];

export default Index;
