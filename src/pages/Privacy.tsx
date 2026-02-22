
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-railway-blue mb-2">Privacy Policy</h1>
          <p className="text-gray-600 mb-6">Last updated: May 1, 2025</p>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-railway-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-railway-blue">Your Privacy Matters</h2>
                  <p className="text-gray-600">
                    At RailConnect, we respect your privacy and are committed to protecting your personal data.
                  </p>
                </div>
              </div>
              
              <p className="mb-4">
                This Privacy Policy explains how we collect, use, process, and disclose your information, including personal information, in conjunction with your access to and use of the RailConnect platform.
              </p>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-3">1. Information We Collect</h3>
                  <p className="text-gray-700 mb-2">
                    We collect various types of information to provide and improve our services to you:
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">1.1 Personal Information</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Name, email address, phone number, and password</li>
                      <li>Payment information when you make bookings</li>
                      <li>Profile information including profile picture (if provided)</li>
                      <li>ID proof information required for booking</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">1.2 Usage Information</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Log data including IP address, browser type, and pages visited</li>
                      <li>Device information including hardware model and operating system</li>
                      <li>Location data with your consent</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-3">2. How We Use Your Information</h3>
                  <p className="text-gray-700 mb-2">We use your information for the following purposes:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>To create and manage your account</li>
                    <li>To process and manage your bookings</li>
                    <li>To communicate with you about your bookings and our services</li>
                    <li>To improve our services and develop new features</li>
                    <li>To ensure the security of our platform</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-3">3. Data Sharing and Disclosure</h3>
                  <p className="text-gray-700 mb-2">
                    We may share your information with:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Railway authorities to facilitate your booking</li>
                    <li>Payment processors to process your transactions</li>
                    <li>Service providers who help us operate our platform</li>
                    <li>Legal authorities when required by law</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    We do not sell your personal information to third parties.
                  </p>
                </section>
                
                <section>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="bg-blue-50 p-2 rounded-full">
                      <Lock className="h-5 w-5 text-railway-blue" />
                    </div>
                    <h3 className="text-lg font-semibold">4. Data Security</h3>
                  </div>
                  <p className="text-gray-700 mb-2">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
                  </p>
                  <p className="text-gray-700">
                    However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security of your data.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-3">5. Your Rights</h3>
                  <p className="text-gray-700 mb-2">
                    Depending on your location, you may have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>The right to access your personal information</li>
                    <li>The right to rectify incorrect personal information</li>
                    <li>The right to erasure of your personal information</li>
                    <li>The right to restrict processing of your personal information</li>
                    <li>The right to data portability</li>
                    <li>The right to object to processing of your personal information</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    To exercise these rights, please contact us using the details provided at the end of this policy.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-3">6. Cookies and Similar Technologies</h3>
                  <p className="text-gray-700 mb-2">
                    We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content.
                  </p>
                  <p className="text-gray-700 mb-2">
                    You can control cookies through your browser settings, but disabling certain cookies may limit your ability to use some features of our platform.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-3">7. Changes to This Privacy Policy</h3>
                  <p className="text-gray-700 mb-2">
                    We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-lg font-semibold mb-3">8. Contact Us</h3>
                  <p className="text-gray-700 mb-2">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700">Email: privacy@railconnect.com</p>
                    <p className="text-gray-700">Address: Rail Bhavan, New Delhi - 110001, India</p>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
          
          <p className="text-center text-gray-600">
            By using our service, you agree to our{" "}
            <Link to="/terms" className="text-railway-blue hover:underline">
              Terms and Conditions
            </Link>{" "}
            and this Privacy Policy.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
