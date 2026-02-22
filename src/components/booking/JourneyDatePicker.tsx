
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

type JourneyDatePickerProps = {
  form: UseFormReturn<any>;
  date: Date | null;
  setDate: (date: Date | null) => void;
  isDateOpen: boolean;
  setIsDateOpen: (isOpen: boolean) => void;
};

const JourneyDatePicker: React.FC<JourneyDatePickerProps> = ({ 
  form, 
  date, 
  setDate, 
  isDateOpen, 
  setIsDateOpen 
}) => {
  return (
    <FormField
      control={form.control}
      name="journeyDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Date of Journey</FormLabel>
          <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  form.setValue("journeyDate", newDate);
                  field.onChange(newDate);
                }}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default JourneyDatePicker;
