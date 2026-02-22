
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTrain } from "@/context/TrainContext";
import { Train } from "@/data/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import BookingForm from "@/components/booking/BookingForm";

const Booking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { trains } = useTrain();
  const { toast } = useToast();
  const [train, setTrain] = useState<Train | undefined>(undefined);
  const [totalFare, setTotalFare] = useState<number>(0);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to book tickets",
        variant: "destructive",
      });
      navigate("/login", { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location, toast]);

  useEffect(() => {
    if (id) {
      const foundTrain = trains.find((train) => train.id === parseInt(id));
      setTrain(foundTrain);
    }
  }, [id, trains]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const classParam = searchParams.get("class");
    setSelectedClass(classParam);
  }, [location.search]);

  if (!train) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="page-container">
          <h2>Train not found</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="page-container">
        <Card>
          <CardHeader>
            <CardTitle>Book Train</CardTitle>
            <CardDescription>Complete the form below to book your train ticket.</CardDescription>
          </CardHeader>
          <CardContent>
            <BookingForm 
              train={train} 
              selectedClass={selectedClass} 
              totalFare={totalFare}
              setTotalFare={setTotalFare}
            />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
