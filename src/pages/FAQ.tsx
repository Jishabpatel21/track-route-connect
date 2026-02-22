
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<string>("all");

  const faqCategories = [
    { id: "all", name: "All Questions" },
    { id: "booking", name: "Booking" },
    { id: "cancellation", name: "Cancellation & Refunds" },
    { id: "payment", name: "Payment" },
    { id: "accounts", name: "Account" },
  ];

  const faqItems = [
    {
      category: "booking",
      question: "How do I book a train ticket?",
      answer: "You can book a train ticket by navigating to the search page, entering your origin, destination, and travel date. Then select a suitable train from the results and follow the booking process.",
    },
    {
      category: "booking",
      question: "How far in advance can I book a ticket?",
      answer: "You can book tickets up to 120 days in advance for most trains. The booking window opens at 8:00 AM on the first day of booking.",
    },
    {
      category: "booking",
      question: "Can I book a ticket for someone else?",
      answer: "Yes, you can book tickets for family, friends, or anyone else. Just enter their details in the passenger information section during booking.",
    },
    {
      category: "cancellation",
      question: "How do I cancel my booking?",
      answer: "You can cancel your booking by going to 'My Bookings' in your account, selecting the ticket you want to cancel, and clicking on the 'Cancel Booking' button.",
    },
    {
      category: "cancellation",
      question: "What is the refund policy?",
      answer: "Refunds depend on when you cancel. Cancellations more than 48 hours before departure receive 75% refund, between 48 and 12 hours receive 50% refund, and less than 12 hours receive 25% refund.",
    },
    {
      category: "cancellation",
      question: "How long does it take to process a refund?",
      answer: "Refunds are usually processed within 5-7 working days, depending on your bank or payment provider.",
    },
    {
      category: "payment",
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, UPI, and PayPal for payments.",
    },
    {
      category: "payment",
      question: "Is it safe to pay online?",
      answer: "Yes, our payment system is fully secured with industry-standard encryption protocols to ensure your payment information is safe.",
    },
    {
      category: "payment",
      question: "My payment was deducted but I didn't get a ticket. What should I do?",
      answer: "If your payment was deducted but you didn't receive a ticket confirmation, please check your email for a booking confirmation or check 'My Bookings' in your account. If you don't see your booking, contact our support team with your payment reference number.",
    },
    {
      category: "accounts",
      question: "How do I create an account?",
      answer: "You can create an account by clicking on the 'Register' link at the top of the page and filling in the required information.",
    },
    {
      category: "accounts",
      question: "How do I reset my password?",
      answer: "If you've forgotten your password, click on the 'Forgot Password' link on the login page and follow the instructions sent to your registered email.",
    },
  ];

  const filteredFaqs = faqItems
    .filter((item) => activeCategory === "all" || item.category === activeCategory)
    .filter((item) => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-railway-blue mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 mb-8">Find answers to the most common questions about our services.</p>
          
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search questions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {faqCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={activeCategory === category.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-base font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
                <p className="text-gray-600 mb-6">
                  If you can't find the answer to your question in our FAQ, our dedicated customer support team is here to help.
                </p>
                <Button 
                  onClick={() => window.location.href = "/contact-us"}
                  className="px-8"
                >
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
