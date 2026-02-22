import React, { createContext, useState, useContext, useEffect } from "react";
import { trains as initialTrains, Train, indianCities, TrainClass } from "../data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface TrainContextType {
  trains: Train[];
  addTrain: (train: Omit<Train, "id">) => void;
  updateTrain: (id: number, trainData: Partial<Train>) => void;
  deleteTrain: (id: number) => void;
  searchTrains: (source: string, destination: string, date: string) => Train[];
  getTrainById: (id: number) => Train | undefined;
  cities: string[];
  updateSeatAvailability: (trainId: number, classType: string, seatsBooked: number) => boolean;
  updateTrainSeats: (trainId: number, classType: string, operation: "add" | "set", seats: number) => boolean;
}

const STORAGE_KEY = "railway_trains";

const TrainContext = createContext<TrainContextType | undefined>(undefined);

export const TrainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load trains from localStorage or use initialTrains if none exists
  const loadTrains = (): Train[] => {
    const storedTrains = localStorage.getItem(STORAGE_KEY);
    return storedTrains ? JSON.parse(storedTrains) : initialTrains;
  };

  const [trains, setTrains] = useState<Train[]>(loadTrains);
  const { toast } = useToast();
  const cities = indianCities;

  // Save trains to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trains));
  }, [trains]);

  const addTrain = (trainData: Omit<Train, "id">) => {
    const newTrain = {
      ...trainData,
      id: trains.length > 0 ? Math.max(...trains.map(t => t.id)) + 1 : 1
    };
    setTrains([...trains, newTrain]);
    toast({
      title: "Train Added",
      description: `${newTrain.name} (${newTrain.number}) has been added successfully.`,
    });
  };

  const updateTrain = (id: number, trainData: Partial<Train>) => {
    setTrains(trains.map(train => 
      train.id === id ? { ...train, ...trainData } : train
    ));
    toast({
      title: "Train Updated",
      description: `Train details have been updated successfully.`,
    });
  };

  const deleteTrain = (id: number) => {
    const trainToDelete = trains.find(train => train.id === id);
    if (trainToDelete) {
      setTrains(trains.filter(train => train.id !== id));
      toast({
        title: "Train Deleted",
        description: `${trainToDelete.name} (${trainToDelete.number}) has been removed.`,
      });
    }
  };

  const searchTrains = (source: string, destination: string, date: string) => {
    if (!source || !destination) return [];
    
    // In a real app, we would filter based on the date too
    // For now, we're just filtering based on source and destination
    return trains.filter(train => 
      train.source.toLowerCase() === source.toLowerCase() && 
      train.destination.toLowerCase() === destination.toLowerCase()
    );
  };

  const getTrainById = (id: number) => {
    return trains.find(train => train.id === id);
  };

  // Function to update seat availability when tickets are booked
  const updateSeatAvailability = (trainId: number, classType: string, seatsBooked: number): boolean => {
    const trainIndex = trains.findIndex(train => train.id === trainId);
    
    if (trainIndex === -1) {
      toast({
        title: "Error",
        description: "Train not found.",
        variant: "destructive",
      });
      return false;
    }
    
    const train = trains[trainIndex];
    const classIndex = train.classes.findIndex(cls => cls.type === classType);
    
    if (classIndex === -1) {
      toast({
        title: "Error",
        description: "Class type not found.",
        variant: "destructive",
      });
      return false;
    }
    
    const trainClass = train.classes[classIndex];
    
    if (trainClass.seatsAvailable < seatsBooked) {
      toast({
        title: "Error",
        description: "Not enough seats available.",
        variant: "destructive",
      });
      return false;
    }
    
    // Update the seats available
    const updatedClasses = [...train.classes];
    updatedClasses[classIndex] = {
      ...trainClass,
      seatsAvailable: trainClass.seatsAvailable - seatsBooked
    };
    
    // Create a new train object with updated classes
    const updatedTrain = {
      ...train,
      classes: updatedClasses
    };
    
    // Update the trains array
    const updatedTrains = [...trains];
    updatedTrains[trainIndex] = updatedTrain;
    
    setTrains(updatedTrains);
    
    toast({
      title: "Seats Updated",
      description: `${seatsBooked} seat(s) booked successfully.`,
    });
    
    return true;
  };

  // New function to add or set seats for a specific train and class type
  const updateTrainSeats = (trainId: number, classType: string, operation: "add" | "set", seats: number): boolean => {
    const trainIndex = trains.findIndex(train => train.id === trainId);
    
    if (trainIndex === -1) {
      toast({
        title: "Error",
        description: "Train not found.",
        variant: "destructive",
      });
      return false;
    }
    
    const train = trains[trainIndex];
    const classIndex = train.classes.findIndex(cls => cls.type === classType);
    
    if (classIndex === -1) {
      toast({
        title: "Error",
        description: "Class type not found.",
        variant: "destructive",
      });
      return false;
    }
    
    const trainClass = train.classes[classIndex];
    let newSeatCount: number;
    
    if (operation === "add") {
      newSeatCount = trainClass.seatsAvailable + seats;
    } else { // operation === "set"
      newSeatCount = seats;
    }
    
    if (newSeatCount < 0) {
      toast({
        title: "Error",
        description: "Seat count cannot be negative.",
        variant: "destructive",
      });
      return false;
    }
    
    // Update the seats available
    const updatedClasses = [...train.classes];
    updatedClasses[classIndex] = {
      ...trainClass,
      seatsAvailable: newSeatCount
    };
    
    // Create a new train object with updated classes
    const updatedTrain = {
      ...train,
      classes: updatedClasses
    };
    
    // Update the trains array
    const updatedTrains = [...trains];
    updatedTrains[trainIndex] = updatedTrain;
    
    setTrains(updatedTrains);
    
    toast({
      title: "Seats Updated",
      description: operation === "add" 
        ? `Added ${seats} seats to ${train.name} (${classType})`
        : `Set ${train.name} (${classType}) seats to ${seats}`,
    });
    
    return true;
  };

  return (
    <TrainContext.Provider value={{ 
      trains, 
      addTrain, 
      updateTrain, 
      deleteTrain, 
      searchTrains,
      getTrainById,
      cities,
      updateSeatAvailability,
      updateTrainSeats
    }}>
      {children}
    </TrainContext.Provider>
  );
};

export const useTrain = () => {
  const context = useContext(TrainContext);
  if (context === undefined) {
    throw new Error("useTrain must be used within a TrainProvider");
  }
  return context;
};
