
import React from "react";
import { Navigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-railway-blue mb-8">
            Login to Your Account
          </h1>
          
          <LoginForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
