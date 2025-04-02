
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, QrCode, Download, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock booking data
const mockBookings = [
  {
    id: "BK123456",
    movieTitle: "Inception",
    date: "2023-07-30",
    time: "7:30 PM",
    cinema: "Cinema 3",
    seats: ["E5", "E6"],
    totalAmount: 31.50,
    status: "upcoming"
  },
  {
    id: "BK123457",
    movieTitle: "The Dark Knight",
    date: "2023-08-05",
    time: "8:00 PM",
    cinema: "Cinema 1",
    seats: ["A12", "A13", "A14"],
    totalAmount: 31.50,
    status: "upcoming"
  },
  {
    id: "BK123458",
    movieTitle: "Interstellar",
    date: "2023-06-20",
    time: "4:00 PM",
    cinema: "Cinema 5",
    seats: ["F7", "F8"],
    totalAmount: 31.50,
    status: "past"
  },
  {
    id: "BK123459",
    movieTitle: "The Matrix",
    date: "2023-06-15",
    time: "6:30 PM",
    cinema: "Cinema 2",
    seats: ["C9", "C10"],
    totalAmount: 21.00,
    status: "past"
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookings, setBookings] = useState(mockBookings);
  
  const filteredBookings = bookings.filter(
    booking => booking.status === activeTab
  );
  
  const handleCancelBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      // In a real app, this would make an API call to cancel the booking
      
      // Update bookings state
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      
      toast({
        title: "Booking Cancelled",
        description: `Booking ${bookingId} has been cancelled. A refund will be processed in 3-5 business days.`,
      });
    }
  };
  
  const handleDownloadTicket = (bookingId: string) => {
    // In a real app, this would generate and download a PDF ticket
    toast({
      title: "Ticket Downloaded",
      description: `Ticket for booking ${bookingId} has been downloaded.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
            <TabsTrigger value="past">Past Bookings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No upcoming bookings</h3>
                <p className="text-muted-foreground mb-6">You don't have any upcoming movie bookings.</p>
                <Button asChild>
                  <Link to="/">Book a Movie Now</Link>
                </Button>
              </div>
            ) : (
              filteredBookings.map(booking => (
                <div key={booking.id} className="ticket">
                  <div className="md:flex justify-between">
                    <div className="md:w-2/3 p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-bold text-lg">{booking.movieTitle}</h3>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Upcoming
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-y-2 gap-x-4 mb-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{booking.time}</span>
                        </div>
                        <div>
                          <span className="font-medium">{booking.cinema}</span>
                        </div>
                        <div>
                          <span>Seats: {booking.seats.join(", ")}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap md:flex-nowrap gap-3 mt-4">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleDownloadTicket(booking.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Ticket
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          className="flex-1"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Cancel Booking
                        </Button>
                      </div>
                    </div>
                    
                    <div className="md:w-1/3 border-t md:border-t-0 md:border-l p-4 flex flex-col items-center justify-center">
                      <div className="bg-muted/30 p-4 rounded-lg mb-2">
                        <QrCode className="h-24 w-24" />
                      </div>
                      <p className="text-xs text-center text-muted-foreground">
                        Scan this QR code at the theater entrance
                      </p>
                      <p className="font-medium mt-2">Booking ID: {booking.id}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-6">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No past bookings</h3>
                <p className="text-muted-foreground mb-6">You don't have any past movie bookings.</p>
                <Button asChild>
                  <Link to="/">Book a Movie Now</Link>
                </Button>
              </div>
            ) : (
              filteredBookings.map(booking => (
                <div key={booking.id} className="bg-card border rounded-lg shadow-sm overflow-hidden">
                  <div className="md:flex">
                    <div className="p-4 flex-1">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-bold">{booking.movieTitle}</h3>
                        <Badge variant="outline" className="bg-muted text-muted-foreground">
                          Completed
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-y-2 gap-x-4 mb-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{booking.time}</span>
                        </div>
                        <div>
                          <span className="font-medium">{booking.cinema}</span>
                        </div>
                        <div>
                          <span>Seats: {booking.seats.join(", ")}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="mt-2" onClick={() => handleDownloadTicket(booking.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Receipt
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
