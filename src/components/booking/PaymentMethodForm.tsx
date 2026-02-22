
import React, { useEffect } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

type PaymentMethodFormProps = {
  form: UseFormReturn<any>;
};

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ form }) => {
  const paymentMethod = form.watch("paymentMethod");

  useEffect(() => {
    // Reset payment details when payment method changes
    form.setValue("paymentDetails", "");
  }, [paymentMethod, form]);

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Payment Method</FormLabel>
            <FormControl>
              <RadioGroup 
                defaultValue={field.value} 
                onValueChange={field.onChange} 
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="credit_card" id="credit_card" />
                  <FormLabel htmlFor="credit_card">Credit Card</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <FormLabel htmlFor="paypal">PayPal</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="upi" id="upi" />
                  <FormLabel htmlFor="upi">UPI</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {paymentMethod && (
        <FormField
          control={form.control}
          name="paymentDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {paymentMethod === "credit_card" && "Card Number"}
                {paymentMethod === "paypal" && "PayPal ID"}
                {paymentMethod === "upi" && "UPI ID"}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    paymentMethod === "credit_card" 
                      ? "Enter your card number" 
                      : paymentMethod === "paypal" 
                        ? "Enter your PayPal ID" 
                        : "Enter your UPI ID"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default PaymentMethodForm;
