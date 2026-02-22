
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import TrainSearch from "@/components/TrainSearch";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Search = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="search-page-gradient py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
              Search Trains
            </h1>
            
            <Tabs defaultValue="one-way" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6 bg-purple-900/20 rounded-lg">
                <TabsTrigger value="one-way" className="text-sm md:text-base text-white data-[state=active]:bg-purple-800 data-[state=active]:text-white rounded-lg">One Way</TabsTrigger>
                <TabsTrigger value="round-trip" className="text-sm md:text-base text-white data-[state=active]:bg-purple-800 data-[state=active]:text-white rounded-lg">Round Trip</TabsTrigger>
              </TabsList>
              
              <TabsContent value="one-way">
                <TrainSearch />
              </TabsContent>
              
              <TabsContent value="round-trip">
                <Card className="search-train-card p-6 shadow-md">
                  <p className="text-center text-purple-800">
                    Round trip booking feature coming soon!
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold text-railway-blue mb-6 text-center">
              Travel Tips
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="railway-card p-6">
                <h3 className="font-semibold text-lg mb-2 text-railway-blue">
                  Book in Advance
                </h3>
                <p className="text-gray-600 text-sm">
                  For the best availability and fares, book your tickets at least 60 days before your journey.
                </p>
              </Card>
              
              <Card className="railway-card p-6">
                <h3 className="font-semibold text-lg mb-2 text-railway-blue">
                  Check PNR Status
                </h3>
                <p className="text-gray-600 text-sm">
                  Regularly monitor your PNR status to stay updated about your ticket confirmation status.
                </p>
              </Card>
              
              <Card className="railway-card p-6">
                <h3 className="font-semibold text-lg mb-2 text-railway-blue">
                  Be Flexible
                </h3>
                <p className="text-gray-600 text-sm">
                  Try different dates or trains if your preferred option isn't available. Look for Tatkal booking options.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
