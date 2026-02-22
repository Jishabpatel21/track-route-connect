
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    const isSuccess = login(values.email, values.password);
    if (isSuccess) {
      navigate("/");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="railway-card p-8">
        <h2 className="text-2xl font-bold text-center text-railway-blue mb-6">
          Login to RailConnect
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your email" 
                      type="email"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your password" 
                      type="password"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="railway-gradient w-full">
              Login
            </Button>

            <div className="text-center text-sm">
              <Link to="/forgot-password" className="text-railway-light-blue hover:underline">
                Forgot your password?
              </Link>
              <div className="mt-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-railway-light-blue hover:underline">
                  Register here
                </Link>
              </div>
            </div>
          </form>
        </Form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">Demo Logins:</p>
          <div className="mt-2 space-y-2 text-sm text-center">
            <p><span className="font-semibold">Admin:</span> admin@railway.com / admin123</p>
            <p><span className="font-semibold">User:</span> user@example.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
