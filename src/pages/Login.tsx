
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LogIn, User, Mail } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    // For demo purposes, we'll just simulate a successful login
    toast.success("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-cinema-blue-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-xl w-full max-w-md p-8 border border-white/20">
        <div className="mb-6 text-center">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center gap-2 mb-2">
              <LogIn className="h-8 w-8 text-cinema-purple" />
            </div>
            <h1 className="text-3xl font-bold cinema-text-gradient">CineTix</h1>
          </Link>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="you@example.com" 
                        className="pl-10 bg-white/5 border-white/10 focus:border-cinema-purple"
                        {...field} 
                      />
                    </div>
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
                  <FormLabel className="text-gray-200">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="password" 
                        placeholder="******" 
                        className="pl-10 bg-white/5 border-white/10 focus:border-cinema-purple"
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    <Link to="/forgot-password" className="text-xs text-cinema-purple hover:underline">
                      Forgot password?
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-cinema-purple hover:bg-cinema-purple/90">
              Sign In
            </Button>
          </form>
        </Form>
        
        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-cinema-purple hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
