
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTrain } from "@/context/TrainContext";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Train, TrainClass } from "@/data/mockData";
import { Trash2, Edit } from "lucide-react";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
type Weekday = typeof weekdays[number];

const formSchema = z.object({
  name: z.string().min(3, "Train name must be at least 3 characters"),
  number: z.string().min(2, "Train number is required"),
  source: z.string().min(2, "Source station is required"),
  destination: z.string().min(2, "Destination station is required"),
  departureTime: z.string().min(1, "Departure time is required"),
  arrivalTime: z.string().min(1, "Arrival time is required"),
  duration: z.string().min(1, "Duration is required"),
  distance: z.string().min(1, "Distance is required"),
  days: z.array(z.string()).min(1, "Select at least one day"),
  classes: z.array(z.object({
    type: z.string().min(1),
    price: z.number().min(1),
    seatsAvailable: z.number().min(0)
  })).min(1, "Add at least one class")
});

const AdminTrains: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { trains, addTrain, updateTrain, deleteTrain } = useTrain();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedTrain, setSelectedTrain] = React.useState<Train | null>(null);
  const [trainToDelete, setTrainToDelete] = React.useState<Train | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      number: "",
      source: "",
      destination: "",
      departureTime: "",
      arrivalTime: "",
      duration: "",
      distance: "",
      days: [],
      classes: [
        { type: "1A", price: 0, seatsAvailable: 0 },
        { type: "2A", price: 0, seatsAvailable: 0 },
        { type: "3A", price: 0, seatsAvailable: 0 },
        { type: "SL", price: 0, seatsAvailable: 0 }
      ]
    },
  });

  React.useEffect(() => {
    // Reset form with selected train data when editing
    if (selectedTrain) {
      form.reset({
        name: selectedTrain.name,
        number: selectedTrain.number,
        source: selectedTrain.source,
        destination: selectedTrain.destination,
        departureTime: selectedTrain.departureTime,
        arrivalTime: selectedTrain.arrivalTime,
        duration: selectedTrain.duration,
        distance: selectedTrain.distance,
        days: selectedTrain.days,
        classes: selectedTrain.classes
      });
    }
  }, [selectedTrain, form]);

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (selectedTrain) {
      // Update existing train
      updateTrain(selectedTrain.id, values);
      toast({
        title: "Train Updated",
        description: `Train ${values.name} (${values.number}) has been updated successfully.`,
      });
    } else {
      // Add new train
      addTrain(values);
      toast({
        title: "Train Added",
        description: `Train ${values.name} (${values.number}) has been added successfully.`,
      });
    }

    setOpenDialog(false);
    setSelectedTrain(null);
    form.reset();
  };

  const handleEditTrain = (train: Train) => {
    setSelectedTrain(train);
    setOpenDialog(true);
  };

  const handleDeleteTrain = (train: Train) => {
    setTrainToDelete(train);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteTrain = () => {
    if (trainToDelete) {
      deleteTrain(trainToDelete.id);
      setTrainToDelete(null);
      setOpenDeleteDialog(false);
    }
  };

  const handleAddNewTrain = () => {
    setSelectedTrain(null);
    form.reset({
      name: "",
      number: "",
      source: "",
      destination: "",
      departureTime: "",
      arrivalTime: "",
      duration: "",
      distance: "",
      days: [],
      classes: [
        { type: "1A", price: 0, seatsAvailable: 0 },
        { type: "2A", price: 0, seatsAvailable: 0 },
        { type: "3A", price: 0, seatsAvailable: 0 },
        { type: "SL", price: 0, seatsAvailable: 0 }
      ]
    });
    setOpenDialog(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-railway-blue">Train Management</h1>
            <Button onClick={handleAddNewTrain} className="bg-railway-blue hover:bg-blue-700">
              Add New Train
            </Button>
          </div>

          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-xl text-railway-blue">Trains List</CardTitle>
              <CardDescription>
                View and manage all trains in the system. Click on a train to edit its details or delete it.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Number</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Arrival</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trains.map((train) => (
                    <TableRow key={train.id}>
                      <TableCell>{train.id}</TableCell>
                      <TableCell>{train.name}</TableCell>
                      <TableCell>{train.number}</TableCell>
                      <TableCell>{train.source}</TableCell>
                      <TableCell>{train.destination}</TableCell>
                      <TableCell>{train.departureTime}</TableCell>
                      <TableCell>{train.arrivalTime}</TableCell>
                      <TableCell>{train.days.join(", ")}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditTrain(train)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteTrain(train)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedTrain ? "Edit Train" : "Add New Train"}
                </DialogTitle>
                <DialogDescription>
                  {selectedTrain
                    ? "Update the train details below."
                    : "Fill in the train details below to add a new train."}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Train Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Rajdhani Express" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Train Number</FormLabel>
                          <FormControl>
                            <Input placeholder="12301" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="source"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Source</FormLabel>
                          <FormControl>
                            <Input placeholder="Mumbai" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Destination</FormLabel>
                          <FormControl>
                            <Input placeholder="Delhi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="departureTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Departure Time</FormLabel>
                          <FormControl>
                            <Input placeholder="16:50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="arrivalTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Arrival Time</FormLabel>
                          <FormControl>
                            <Input placeholder="10:20" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <Input placeholder="8h 30m" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="distance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Distance</FormLabel>
                          <FormControl>
                            <Input placeholder="1250 KM" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Running Days</h3>
                    <div className="flex flex-wrap gap-4">
                      <FormField
                        control={form.control}
                        name="days"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex flex-wrap gap-4">
                              {weekdays.map((day) => (
                                <div key={day} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`day-${day}`}
                                    checked={field.value.includes(day)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([...field.value, day]);
                                      } else {
                                        field.onChange(
                                          field.value.filter((value) => value !== day)
                                        );
                                      }
                                    }}
                                  />
                                  <label htmlFor={`day-${day}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {day}
                                  </label>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Class Types & Pricing</h3>
                    {form.watch('classes').map((_, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                        <FormField
                          control={form.control}
                          name={`classes.${index}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Class Type</FormLabel>
                              <FormControl>
                                <Input {...field} readOnly={index < 4} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`classes.${index}.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price (₹)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`classes.${index}.seatsAvailable`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Seats</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {selectedTrain ? "Update Train" : "Add Train"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the train {trainToDelete?.name} ({trainToDelete?.number}).
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setTrainToDelete(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDeleteTrain} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminTrains;
