
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Contact, Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-railway-blue mb-6">Contact Us</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-50 p-4 rounded-full mb-4">
                    <Phone className="h-6 w-6 text-railway-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">Phone Support</h3>
                  <p className="text-gray-600 mb-2">Our team is available 24/7</p>
                  <p className="font-medium text-railway-blue">+91 1800-111-139</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-50 p-4 rounded-full mb-4">
                    <Mail className="h-6 w-6 text-railway-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-gray-600 mb-2">Get in touch via email</p>
                  <p className="font-medium text-railway-blue">support@railconnect.com</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-50 p-4 rounded-full mb-4">
                    <MapPin className="h-6 w-6 text-railway-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">Office Location</h3>
                  <p className="text-gray-600 mb-2">Headquarters</p>
                  <p className="font-medium text-railway-blue">Rail Bhavan, New Delhi - 110001</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out this form, and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email" required />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input id="subject" placeholder="Subject of your inquiry" required />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Quick answers to common questions, or visit our full FAQ page.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">How can I cancel my ticket?</h4>
                      <p className="text-sm text-gray-600">
                        You can cancel your ticket from the My Bookings section in your profile.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">How do I check my PNR status?</h4>
                      <p className="text-sm text-gray-600">
                        You can check your PNR status from the PNR Status page in the main menu.
                      </p>
                    </div>
                    <Button variant="link" className="p-0" onClick={() => window.location.href = "/faq"}>
                      View all FAQs
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Customer Service Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      * All times are in Indian Standard Time (IST)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactUs;
