
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

export const passengerSchema = z.object({
  name: z.string().min(2, {
    message: "Passenger name must be at least 2 characters.",
  }),
  age: z.coerce.number().min(1, {
    message: "Age must be greater than 0.",
  }).max(120, {
    message: "Age must be less than 120.",
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender.",
  }),
  berthPreference: z.string().optional(),
});

export type Passenger = z.infer<typeof passengerSchema>;

type PassengerFormProps = {
  form: UseFormReturn<any>;
  train?: any;
  selectedClass?: string | null;
};

const PassengerForm: React.FC<PassengerFormProps> = ({ form, train, selectedClass }) => {
  const addPassenger = () => {
    form.setValue("passengers", [...form.getValues().passengers, { name: "", age: 1, gender: "other", berthPreference: "no_preference" }]);
  };

  const removePassenger = (index: number) => {
    const updatedPassengers = [...form.getValues().passengers];
    updatedPassengers.splice(index, 1);
    form.setValue("passengers", updatedPassengers);
  };

  // Get available berth types for the selected class
  const getAvailableBerthTypes = () => {
    if (!train || !selectedClass) return [];
    
    const classInfo = train.classes.find((cls: any) => cls.type === selectedClass);
    return classInfo?.berthTypes || [];
  };

  const berthTypes = getAvailableBerthTypes();

  return (
    <FormField
      control={form.control}
      name="passengers"
      render={() => (
        <div>
          <Label>Passengers:</Label>
          {form.getValues().passengers.map((_, index) => (
            <div key={index} className="grid gap-4 py-4 border-b border-gray-100 last:border-0">
              <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4">
                <FormField
                  control={form.control}
                  name={`passengers.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Passenger Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`passengers.${index}.age`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`passengers.${index}.gender`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {berthTypes && berthTypes.length > 0 && (
                  <FormField
                    control={form.control}
                    name={`passengers.${index}.berthPreference`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Berth Preference</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value || "no_preference"}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select berth" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="no_preference">No Preference</SelectItem>
                              {berthTypes.map((berth: string) => (
                                <SelectItem key={berth} value={berth}>{berth}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {form.getValues().passengers.length > 1 && (
                  <div className="flex items-end justify-end mt-2 md:mt-0">
                    <Button type="button" variant="destructive" size="sm" onClick={() => removePassenger(index)}>
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <Button type="button" onClick={addPassenger} className="mt-2">
            Add Passenger
          </Button>
        </div>
      )}
    />
  );
};

export default PassengerForm;
