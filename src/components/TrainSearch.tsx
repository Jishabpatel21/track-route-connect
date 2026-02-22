
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrain } from "@/context/TrainContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  source: z.string().min(1, "Source city is required"),
  destination: z.string().min(1, "Destination city is required"),
  date: z.date({ required_error: "Travel date is required" }),
});

type SearchFormValues = z.infer<typeof formSchema>;

const TrainSearch: React.FC = () => {
  const { cities } = useTrain();
  const navigate = useNavigate();
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: "",
      destination: "",
      date: new Date(),
    },
  });

  const onSubmit = (values: SearchFormValues) => {
    const dateString = format(values.date, "yyyy-MM-dd");
    navigate(`/search-results?source=${values.source}&destination=${values.destination}&date=${dateString}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="search-train-card p-6 shadow-md rounded-xl">
        <h2 className="text-xl md:text-2xl font-bold text-purple-800 mb-6 text-center">
          Search Trains
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-purple-900 font-medium">From</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value} 
                      open={isSourceOpen}
                      onOpenChange={setIsSourceOpen}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full border-purple-300 text-purple-900 bg-white hover:border-purple-500 focus:border-purple-500 focus:ring-purple-500">
                          <SelectValue placeholder="Select source station" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {cities.map((city) => (
                          <SelectItem key={city} value={city} className="text-purple-900 hover:bg-purple-50">
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />

              <div className="hidden md:flex items-center justify-center">
                <ArrowRightIcon className="text-purple-800" />
              </div>

              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-purple-900 font-medium">To</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value} 
                      open={isDestinationOpen}
                      onOpenChange={setIsDestinationOpen}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full border-purple-300 text-purple-900 bg-white hover:border-purple-500 focus:border-purple-500 focus:ring-purple-500">
                          <SelectValue placeholder="Select destination station" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {cities.map((city) => (
                          <SelectItem key={city} value={city} className="text-purple-900 hover:bg-purple-50">
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-purple-900 font-medium">Date of Journey</FormLabel>
                  <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal border-purple-300 text-purple-900 bg-white hover:border-purple-500 focus:border-purple-500 focus:ring-purple-500",
                            !field.value && "text-purple-900"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setIsDateOpen(false);
                        }}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                        className="p-3 pointer-events-auto rounded-md bg-white"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-rose-500" />
                </FormItem>
              )}
            />

            <div className="mt-6 text-center">
              <Button 
                type="submit" 
                className="search-train-button w-full md:w-1/3 text-white font-semibold"
              >
                Search Trains
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TrainSearch;
