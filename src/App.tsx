
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import SeatSelection from "./pages/SeatSelection";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";
import LocationSelect from "./pages/LocationSelect";
import Movies from "./pages/Movies";
import { LocationProvider } from "./contexts/LocationContext";

const queryClient = new QueryClient();

// Location guard component to check if location is selected
const LocationGuard = ({ children }: { children: React.ReactNode }) => {
  const selectedCity = localStorage.getItem('selectedCity');
  
  // If no city is selected, redirect to location selection
  if (!selectedCity) {
    return <Navigate to="/location" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LocationProvider>
            <Routes>
              <Route path="/location" element={<LocationSelect />} />
              <Route path="/" element={
                <LocationGuard>
                  <Index />
                </LocationGuard>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/movies" element={
                <LocationGuard>
                  <Movies />
                </LocationGuard>
              } />
              <Route path="/movie/:id" element={
                <LocationGuard>
                  <MovieDetails />
                </LocationGuard>
              } />
              <Route path="/seat-selection/:movieId/:showtimeId" element={
                <LocationGuard>
                  <SeatSelection />
                </LocationGuard>
              } />
              <Route path="/checkout/:movieId/:showtimeId/:selectedSeats" element={
                <LocationGuard>
                  <Checkout />
                </LocationGuard>
              } />
              <Route path="/dashboard" element={
                <LocationGuard>
                  <Dashboard />
                </LocationGuard>
              } />
              <Route path="/admin" element={<Admin />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/refund" element={<Refund />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LocationProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
