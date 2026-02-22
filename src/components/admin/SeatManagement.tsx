
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTrain } from "@/context/TrainContext";
import { Train } from '@/data/mockData';
import { Plus, Minus } from 'lucide-react';

const formSchema = z.object({
  trainId: z.string().min(1, "Please select a train"),
  classType: z.string().min(1, "Please select a class"),
  operation: z.enum(["add", "set"]),
  seats: z.number().min(1, "Must add at least one seat").max(500, "Maximum 500 seats allowed"),
});

type FormValues = z.infer<typeof formSchema>;

const SeatManagement = () => {
  const { trains, updateTrainSeats } = useTrain();
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trainId: "",
      classType: "",
      operation: "add",
      seats: 1,
    },
  });
  
  const onTrainChange = (trainId: string) => {
    const train = trains.find(t => t.id === parseInt(trainId));
    setSelectedTrain(train || null);
    form.setValue("classType", "");
  };
  
  const onSubmit = (values: FormValues) => {
    updateTrainSeats(
      parseInt(values.trainId),
      values.classType,
      values.operation,
      values.seats
    );
    
    // Reset form
    form.reset();
    setSelectedTrain(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Train Seats</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="trainId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Train</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      onTrainChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a train" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Trains</SelectLabel>
                        {trains.map(train => (
                          <SelectItem key={train.id} value={train.id.toString()}>
                            {train.name} ({train.number})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="classType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Class</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedTrain}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Class Types</SelectLabel>
                        {selectedTrain?.classes.map(cls => (
                          <SelectItem key={cls.type} value={cls.type}>
                            {cls.type} - Available: {cls.seatsAvailable}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="operation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="add">
                        <div className="flex items-center">
                          <Plus className="h-4 w-4 mr-2" />
                          <span>Add Seats</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="set">Set Total Seats</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="seats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Seats</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      onChange={e => field.onChange(parseInt(e.target.value))} 
                      value={field.value}
                      min={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="admin-action-button"
              disabled={!selectedTrain}
            >
              Update Seats
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SeatManagement;
