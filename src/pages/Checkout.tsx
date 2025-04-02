import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, CreditCard, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

// Mock movie data
const mockMovies = [
  {
    id: 1,
    title: "Inception",
    genre: ["Sci-Fi", "Action", "Thriller"],
    duration: 148,
    price: {
      standard: 10,
      vip: 15
    }
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: ["Action", "Crime", "Drama"],
    duration: 152,
    price: {
      standard: 10,
      vip: 15
    }
  }
];

// Mock showtimes
const mockShowtimes = [
  { id: 101, movieId: 1, time: "10:30 AM", date: new Date().toISOString() },
  { id: 102, movieId: 1, time: "1:15 PM", date: new Date().toISOString() },
  // Other showtimes...
];

const Checkout = () => {
  const { movieId, showtimeId, selectedSeats } = useParams<{ 
    movieId: string; 
    showtimeId: string;
    selectedSeats: string;
  }>();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const movie = mockMovies.find(m => m.id === Number(movieId));
  const showtime = mockShowtimes.find(s => s.id === Number(showtimeId));
  const seats = selectedSeats ? selectedSeats.split(',') : [];
  
  if (!movie || !showtime || seats.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Invalid Booking Information</h2>
            <Button onClick={() => navigate("/")}>Return to Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Calculate price based on seat type (VIP or standard)
  const calculatePrice = () => {
    const vipSeats = seats.filter(seat => seat.startsWith('E') || seat.startsWith('F'));
    const standardSeats = seats.filter(seat => !seat.startsWith('E') && !seat.startsWith('F'));
    
    return {
      vip: vipSeats.length * movie.price.vip,
      standard: standardSeats.length * movie.price.standard,
      total: (vipSeats.length * movie.price.vip) + (standardSeats.length * movie.price.standard)
    };
  };
  
  const price = calculatePrice();
  
  const handleFormSubmit = (data: any) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Generate a random booking ID
      const bookingId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      
      toast({
        title: "Booking Successful!",
        description: `Your booking reference is #${bookingId}`,
      });
      
      // Navigate to successful booking page (in a real app)
      navigate(`/dashboard`);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <button 
              onClick={() => navigate(`/seat-selection/${movieId}/${showtimeId}`)}
              className="flex items-center text-muted-foreground hover:text-foreground mb-2"
            >
              <span>← Back to seat selection</span>
            </button>
            
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your booking for {movie.title}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Select your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="card">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="card">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Card
                      </TabsTrigger>
                      <TabsTrigger value="upi">
                        <QrCode className="h-4 w-4 mr-2" />
                        UPI
                      </TabsTrigger>
                      <TabsTrigger value="wallet">
                        <Calendar className="h-4 w-4 mr-2" />
                        Wallet
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="space-y-4">
                      <BookingForm onSubmit={handleFormSubmit} isLoading={isProcessing} />
                    </TabsContent>
                    
                    <TabsContent value="upi">
                      <div className="p-6 text-center">
                        <div className="bg-muted p-6 rounded-lg inline-block mb-4">
                          <QrCode className="h-32 w-32 mx-auto" />
                        </div>
                        <p className="text-muted-foreground mb-4">Scan the QR code with any UPI app to pay</p>
                        <p className="font-medium text-lg">Or pay using UPI ID</p>
                        <p className="font-bold text-xl mb-4">cinetix@bankupi</p>
                        <Button onClick={() => handleFormSubmit({})}>I've Completed the Payment</Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="wallet">
                      <div className="space-y-4 p-4">
                        <p className="text-center text-muted-foreground mb-4">
                          Select your preferred digital wallet to continue
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <Button variant="outline" className="h-24 flex flex-col" onClick={() => handleFormSubmit({})}>
                            <span className="text-2xl mb-1">P</span>
                            <span>PayWallet</span>
                          </Button>
                          <Button variant="outline" className="h-24 flex flex-col" onClick={() => handleFormSubmit({})}>
                            <span className="text-2xl mb-1">G</span>
                            <span>GoPay</span>
                          </Button>
                          <Button variant="outline" className="h-24 flex flex-col" onClick={() => handleFormSubmit({})}>
                            <span className="text-2xl mb-1">A</span>
                            <span>AppPay</span>
                          </Button>
                          <Button variant="outline" className="h-24 flex flex-col" onClick={() => handleFormSubmit({})}>
                            <span className="text-2xl mb-1">F</span>
                            <span>FastCash</span>
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-medium">{movie.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(showtime.date).toLocaleDateString()} • {showtime.time}
                    </p>
                    <p className="text-sm">Cinema 3, {seats.length} {seats.length === 1 ? 'seat' : 'seats'}</p>
                  </div>
                  
                  <div className="border-t pt-2">
                    <p className="text-sm font-medium">Seats:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {seats.map((seat) => (
                        <span 
                          key={seat} 
                          className="bg-muted px-2 py-0.5 rounded-md text-xs"
                        >
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    {price.standard > 0 && (
                      <div className="flex justify-between text-sm mb-1">
                        <span>Standard ({seats.filter(s => !s.startsWith('E') && !s.startsWith('F')).length})</span>
                        <span>${price.standard.toFixed(2)}</span>
                      </div>
                    )}
                    
                    {price.vip > 0 && (
                      <div className="flex justify-between text-sm mb-1">
                        <span>VIP ({seats.filter(s => s.startsWith('E') || s.startsWith('F')).length})</span>
                        <span>${price.vip.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm mb-1">
                      <span>Booking Fee</span>
                      <span>$1.50</span>
                    </div>
                    
                    <div className="flex justify-between font-bold text-base mt-3 pt-3 border-t">
                      <span>Total</span>
                      <span>${(price.total + 1.5).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  By completing this booking, you agree to our terms and conditions and cancellation policy.
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
