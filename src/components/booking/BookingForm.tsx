
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import { useTrain } from "@/context/TrainContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import PassengerForm, { passengerSchema } from "./PassengerForm";
import PaymentMethodForm from "./PaymentMethodForm";
import JourneyDatePicker from "./JourneyDatePicker";
import { Train } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const bookingSchema = z.object({
  passengers: z.array(passengerSchema).min(1, {
    message: "At least one passenger is required.",
  }),
  paymentMethod: z.enum(["credit_card", "paypal", "upi"], {
    required_error: "Please select a payment method.",
  }),
  paymentDetails: z.string().min(1, "Payment details are required"),
  journeyDate: z.date().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  train: Train;
  selectedClass: string | null;
  totalFare: number;
  setTotalFare: (fare: number) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ train, selectedClass, totalFare, setTotalFare }) => {
  const { user } = useAuth();
  const { addBooking } = useBooking();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [isDateOpen, setIsDateOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      passengers: [{ name: "", age: 1, gender: "other", berthPreference: "no_preference" }],
      paymentMethod: "credit_card",
      paymentDetails: "",
      journeyDate: new Date(),
    },
  });

  useEffect(() => {
    if (train && selectedClass) {
      const selectedClassInfo = train.classes.find((cls) => cls.type === selectedClass);
      if (selectedClassInfo) {
        setTotalFare(selectedClassInfo.price * form.getValues().passengers.length);
      }
    }
  }, [train, selectedClass, form.watch("passengers"), setTotalFare]);

  const generateSeatNumber = (): string => {
    const seatNumber = Math.floor(Math.random() * 100) + 1;
    return seatNumber.toString();
  };

  const handleBooking = async (values: BookingFormValues) => {
    if (!train || !selectedClass || !date) {
      toast({
        title: "Error",
        description: "Train, class, or date not selected.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const dateString = format(date, "yyyy-MM-dd");
    const selectedClassInfo = train.classes.find((cls) => cls.type === selectedClass);

    if (!selectedClassInfo) {
      toast({
        title: "Error",
        description: "Selected class not found.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    const bookingData = {
      userId: user?.id || 0,
      trainId: train?.id,
      seatNo: generateSeatNumber(),
      bookingDate: format(new Date(), "yyyy-MM-dd"),
      journeyDate: dateString,
      passengers: values.passengers.map(p => ({
        name: p.name,
        age: p.age,
        gender: p.gender,
        berthPreference: p.berthPreference
      })),
      class: selectedClass,
      totalFare: totalFare,
      status: "confirmed" as const,
      paymentMethod: values.paymentMethod,
      paymentDetails: values.paymentDetails
    };

    const pnr = addBooking(bookingData);
    
    if (pnr) {
      setIsProcessing(false);
      // The redirect is handled in the addBooking function
    } else {
      setIsProcessing(false);
      toast({
        title: "Booking Failed",
        description: "Could not complete booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleBooking)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Train Name:</Label>
            <Input type="text" value={train.name} disabled />
          </div>

          <div>
            <Label>Selected Class:</Label>
            <Input type="text" value={selectedClass || ""} disabled />
          </div>
        </div>

        <PassengerForm 
          form={form} 
          train={train} 
          selectedClass={selectedClass} 
        />

        <JourneyDatePicker 
          form={form} 
          date={date} 
          setDate={setDate} 
          isDateOpen={isDateOpen} 
          setIsDateOpen={setIsDateOpen} 
        />

        <PaymentMethodForm form={form} />

        <div>
          <Label>Total Fare:</Label>
          <Input type="text" value={`₹${totalFare}`} disabled />
        </div>

        <Button type="submit" disabled={isProcessing} className="w-full">
          {isProcessing ? "Processing Payment..." : "Book Now"}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;

// Import the format function at the top of the file
import { format } from "date-fns";
