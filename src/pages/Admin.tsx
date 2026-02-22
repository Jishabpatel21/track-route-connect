
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SeatManagement from "@/components/admin/SeatManagement";
import { useToast } from "@/components/ui/use-toast";
import { Users, BookOpen, Train, Settings, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>

          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="seats">Seat Management</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center text-xl text-railway-blue">
                      <Users className="mr-2" />
                      User Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <CardDescription className="mb-4">
                      Manage user accounts, roles, and permissions
                    </CardDescription>
                    <Button asChild>
                      <Link to="/admin/users">Manage Users</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center text-xl text-railway-blue">
                      <BookOpen className="mr-2" />
                      Booking Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <CardDescription className="mb-4">
                      View and manage all bookings in the system
                    </CardDescription>
                    <Button asChild>
                      <Link to="/admin/bookings">Manage Bookings</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center text-xl text-railway-blue">
                      <Train className="mr-2" />
                      Train Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <CardDescription className="mb-4">
                      Add, edit, or remove trains and their schedules
                    </CardDescription>
                    <Button asChild>
                      <Link to="/admin/trains">Manage Trains</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center text-xl text-railway-blue">
                      <RefreshCw className="mr-2" />
                      Refund Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <CardDescription className="mb-4">
                      Process refunds for cancelled bookings
                    </CardDescription>
                    <Button asChild>
                      <Link to="/admin/refunds">Process Refunds</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center text-xl text-railway-blue">
                    <Settings className="mr-2" />
                    System Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-4">
                    Welcome to the admin dashboard! You can manage users, bookings, and
                    trains from this central control panel.
                  </p>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="font-semibold mb-2">Admin Information</h3>
                    <p>Logged in as: {user?.name}</p>
                    <p>Role: {user?.role}</p>
                    <p>Last Login: {new Date().toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seats">
              <div className="mb-6">
                <SeatManagement />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
