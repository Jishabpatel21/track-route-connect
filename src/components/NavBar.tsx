
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Train, Calendar, Search, Ticket, Users, LogOut, UserRound } from "lucide-react";

const NavBar: React.FC = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  return (
    <header className="railway-gradient text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Train className="h-6 w-6" />
              <span className="text-xl font-bold">RailConnect</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-railway-light-gray transition-colors">
              Home
            </Link>
            <Link to="/search" className="hover:text-railway-light-gray transition-colors">
              Search Trains
            </Link>
            <Link to="/pnr" className="hover:text-railway-light-gray transition-colors">
              PNR Status
            </Link>
            {isAuthenticated && (
              <Link to="/bookings" className="hover:text-railway-light-gray transition-colors">
                My Bookings
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="hover:text-railway-light-gray transition-colors">
                Admin Panel
              </Link>
            )}
          </nav>

          <div>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:bg-railway-accent">
                    <span>{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center w-full">
                      <UserRound className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/bookings" className="flex items-center w-full">
                      <Ticket className="mr-2 h-4 w-4" />
                      <span>My Bookings</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center w-full">
                        <Train className="mr-2 h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button asChild variant="ghost" className="text-white hover:bg-railway-accent">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-white text-railway-blue hover:bg-gray-100">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden flex overflow-x-auto pb-2 pt-1 space-x-6">
          <Link to="/" className="flex flex-col items-center text-xs">
            <Train className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link to="/search" className="flex flex-col items-center text-xs">
            <Search className="h-5 w-5" />
            <span>Search</span>
          </Link>
          <Link to="/pnr" className="flex flex-col items-center text-xs">
            <Ticket className="h-5 w-5" />
            <span>PNR</span>
          </Link>
          {isAuthenticated && (
            <Link to="/bookings" className="flex flex-col items-center text-xs">
              <Calendar className="h-5 w-5" />
              <span>Bookings</span>
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/profile" className="flex flex-col items-center text-xs">
              <UserRound className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="flex flex-col items-center text-xs">
              <Users className="h-5 w-5" />
              <span>Admin</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
