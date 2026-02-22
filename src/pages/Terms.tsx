
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Shield } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-railway-blue mb-2">Terms and Conditions</h1>
          <p className="text-gray-600 mb-6">Last updated: May 1, 2025</p>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-full">
                  <Info className="h-6 w-6 text-railway-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-railway-blue">Welcome to RailConnect</h2>
                  <p className="text-gray-600">
                    These terms and conditions outline the rules and regulations for the use of RailConnect's website.
                  </p>
                </div>
              </div>
              
              <p className="mb-4">
                By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use RailConnect's website if you do not accept all of the terms and conditions stated on this page.
              </p>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-3">1. License</h3>
                  <p className="text-gray-700 mb-2">
                    Unless otherwise stated, RailConnect and/or its licensors own the intellectual property rights for all material on RailConnect. All intellectual property rights are reserved. You may access this from RailConnect for your own personal use subjected to restrictions set in these terms and conditions.
                  </p>
                  
                  <p className="text-gray-700">You must not:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-2">
                    <li>Republish material from RailConnect</li>
                    <li>Sell, rent or sub-license material from RailConnect</li>
                    <li>Reproduce, duplicate or copy material from RailConnect</li>
                    <li>Redistribute content from RailConnect</li>
                  </ul>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-3">2. Booking and Cancellation</h3>
                  <p className="text-gray-700 mb-2">
                    2.1 All bookings are subject to availability and confirmation.
                  </p>
                  <p className="text-gray-700 mb-2">
                    2.2 Your booking is confirmed once you receive a booking confirmation with a valid PNR number.
                  </p>
                  <p className="text-gray-700 mb-2">
                    2.3 Cancellation of tickets is subject to cancellation charges which vary based on the time of cancellation before the scheduled departure:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-2">
                    <li>More than 48 hours before departure: 25% cancellation charge</li>
                    <li>Between 48 and 12 hours before departure: 50% cancellation charge</li>
                    <li>Less than 12 hours before departure: 75% cancellation charge</li>
                  </ul>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-3">3. Payments</h3>
                  <p className="text-gray-700 mb-2">
                    3.1 All payments made on our platform are processed through secure payment gateways.
                  </p>
                  <p className="text-gray-700 mb-2">
                    3.2 We accept credit/debit cards, UPI, and PayPal for payments.
                  </p>
                  <p className="text-gray-700 mb-2">
                    3.3 In case of any payment failures or errors, the amount will be refunded to your original payment method within 5-7 working days.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-3">4. User Responsibilities</h3>
                  <p className="text-gray-700 mb-2">
                    4.1 You are responsible for maintaining the confidentiality of your account information.
                  </p>
                  <p className="text-gray-700 mb-2">
                    4.2 You are responsible for providing accurate and complete information during registration and booking.
                  </p>
                  <p className="text-gray-700 mb-2">
                    4.3 You must carry a valid photo ID proof during the journey for verification.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-3">5. Limitation of Liability</h3>
                  <p className="text-gray-700 mb-2">
                    5.1 We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of our service.
                  </p>
                  <p className="text-gray-700 mb-2">
                    5.2 We are not responsible for any delays, cancellations, or schedule changes by the railway authorities.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-3">6. Changes to Terms</h3>
                  <p className="text-gray-700 mb-2">
                    6.1 We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on our website.
                  </p>
                  <p className="text-gray-700 mb-2">
                    6.2 Your continued use of the platform following the posting of changes constitutes your acceptance of those changes.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-3">7. Governing Law</h3>
                  <p className="text-gray-700">
                    These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in New Delhi, India.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
          
          <p className="text-center text-gray-600">
            By using our service, you agree to these Terms and Conditions and our{" "}
            <Link to="/privacy-policy" className="text-railway-blue hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
