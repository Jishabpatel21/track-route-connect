
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useTrain } from "@/context/TrainContext";
import { useAuth } from "@/context/AuthContext";
import { Train } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeftRight, ArrowRight, Clock, Calendar, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const SearchResults: React.FC = () => {
  const { searchTrains } = useTrain();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("departure");
  const [results, setResults] = useState<Train[]>([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const source = queryParams.get("source") || "";
    const destination = queryParams.get("destination") || "";
    const date = queryParams.get("date") || "";

    if (!source || !destination) {
      navigate("/search");
      return;
    }

    const searchResults = searchTrains(source, destination, date);
    setResults(searchResults);
  }, [location.search, searchTrains, navigate]);

  const sortResults = (trains: Train[], option: string): Train[] => {
    return [...trains].sort((a, b) => {
      switch (option) {
        case "departure":
          return a.departureTime.localeCompare(b.departureTime);
        case "arrival":
          return a.arrivalTime.localeCompare(b.arrivalTime);
        case "duration":
          return a.duration.localeCompare(b.duration);
        case "price-low":
          return Math.min(...a.classes.map(c => c.price)) - Math.min(...b.classes.map(c => c.price));
        case "price-high":
          return Math.max(...b.classes.map(c => c.price)) - Math.max(...a.classes.map(c => c.price));
        default:
          return 0;
      }
    });
  };

  const handleBook = (train: Train, classType: string) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate(`/booking/${train.id}?class=${classType}`);
  };

  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source") || "";
  const destination = queryParams.get("destination") || "";
  const date = queryParams.get("date") || "";
  const formattedDate = date ? format(new Date(date), "E, MMM d, yyyy") : "";

  const sortedResults = sortResults(results, sortOption);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="bg-railway-gradient py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  Trains from {source} to {destination}
                </h1>
                <p className="text-white text-opacity-90 mt-1">
                  <Calendar className="inline-block mr-1 h-4 w-4" />
                  {formattedDate}
                </p>
              </div>
              
              <Button 
                variant="outline" 
                className="mt-2 md:mt-0 bg-white hover:bg-gray-100"
                onClick={() => navigate("/search")}
              >
                Modify Search
              </Button>
            </div>
          </div>
        </div>

        <div className="py-6 bg-gray-50">
          <div className="container mx-auto px-4">
            {sortedResults.length > 0 ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {sortedResults.length} trains found
                  </p>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="departure">Departure Time</SelectItem>
                        <SelectItem value="arrival">Arrival Time</SelectItem>
                        <SelectItem value="duration">Journey Duration</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {sortedResults.map((train) => (
                  <Card key={train.id} className="railway-card overflow-hidden">
                    <CardHeader className="bg-white border-b border-gray-100 px-6 py-4">
                      <div className="flex flex-wrap items-center justify-between">
                        <CardTitle className="text-lg md:text-xl text-railway-blue">
                          {train.name} ({train.number})
                        </CardTitle>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="hidden md:inline mr-2">Runs on:</span>
                          {train.days.includes("Daily") ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Daily
                            </Badge>
                          ) : (
                            <div className="flex flex-wrap gap-1">
                              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                                <span
                                  key={day}
                                  className={`inline-block w-6 h-6 rounded-full text-xs flex items-center justify-center ${
                                    train.days.includes(day)
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-400"
                                  }`}
                                >
                                  {day[0]}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="px-6 py-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-0">
                          <div className="text-center md:text-left md:mr-8">
                            <p className="text-xl md:text-2xl font-semibold">
                              {train.departureTime}
                            </p>
                            <p className="text-sm text-gray-500">{source}</p>
                          </div>
                          
                          <div className="flex items-center justify-center my-2 md:my-0 md:mx-4">
                            <div className="w-2 h-2 rounded-full bg-railway-blue"></div>
                            <div className="w-16 md:w-24 h-0.5 bg-gray-300 mx-1"></div>
                            <ArrowRight className="h-4 w-4 text-railway-blue mx-1" />
                            <div className="w-16 md:w-24 h-0.5 bg-gray-300 mx-1"></div>
                            <div className="w-2 h-2 rounded-full bg-railway-blue"></div>
                          </div>
                          
                          <div className="text-center md:text-left md:ml-8">
                            <p className="text-xl md:text-2xl font-semibold">
                              {train.arrivalTime}
                            </p>
                            <p className="text-sm text-gray-500">{destination}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center md:items-end">
                          <div className="flex items-center text-sm font-medium text-gray-600 mb-1">
                            <Clock className="h-4 w-4 mr-1" />
                            {train.duration}
                          </div>
                          <p className="text-xs text-gray-500">{train.distance}</p>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="bg-gray-50 border-t border-gray-100 px-6 py-4">
                      <div className="w-full">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                          {train.classes.map((cls) => (
                            <div key={cls.type} className="relative">
                              <div 
                                className={`bg-white border rounded-md p-3 ${
                                  cls.seatsAvailable > 0
                                    ? "border-green-300 cursor-pointer hover:border-green-500"
                                    : "border-red-200 opacity-70"
                                }`}
                                onClick={() => cls.seatsAvailable > 0 && handleBook(train, cls.type)}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-semibold">{cls.type}</span>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="h-3.5 w-3.5 text-gray-400" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{getClassFull(cls.type)}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                                <p className="text-lg font-semibold">₹{cls.price}</p>
                                <p className={`text-xs ${
                                  cls.seatsAvailable > 10 
                                    ? "text-green-600" 
                                    : cls.seatsAvailable > 0 
                                      ? "text-orange-500" 
                                      : "text-red-500"
                                }`}>
                                  {cls.seatsAvailable > 0
                                    ? `${cls.seatsAvailable} available`
                                    : "Not available"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="railway-card py-12">
                <CardContent className="text-center">
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">No Trains Found</h2>
                  <CardDescription>
                    We couldn't find any trains matching your search criteria. Please try different dates or stations.
                  </CardDescription>
                  <Button 
                    className="mt-6 railway-gradient" 
                    onClick={() => navigate("/search")}
                  >
                    Back to Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper function to get full class name
function getClassFull(classType: string): string {
  const classMap: Record<string, string> = {
    '1A': 'AC First Class',
    '2A': 'AC 2-Tier Sleeper',
    '3A': 'AC 3-Tier Sleeper',
    'SL': 'Sleeper Class',
    'CC': 'AC Chair Car',
    'EC': 'Executive Chair Car',
    'FC': 'First Class',
    '2S': 'Second Sitting'
  };
  
  return classMap[classType] || classType;
}

export default SearchResults;
