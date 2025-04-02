
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Film, Users, TicketIcon, Plus, Search, Edit, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock movies data
const mockMovies = [
  {
    id: 1,
    title: "Inception",
    releaseDate: "2023-07-16",
    duration: 148,
    status: "Now Playing"
  },
  {
    id: 2,
    title: "The Dark Knight",
    releaseDate: "2023-07-18",
    duration: 152,
    status: "Now Playing"
  },
  {
    id: 3,
    title: "Interstellar",
    releaseDate: "2023-07-20",
    duration: 169,
    status: "Coming Soon"
  },
  {
    id: 4,
    title: "The Matrix",
    releaseDate: "2023-07-22",
    duration: 136,
    status: "Now Playing"
  },
  {
    id: 5,
    title: "Pulp Fiction",
    releaseDate: "2023-07-24",
    duration: 154,
    status: "Coming Soon"
  }
];

// Mock bookings data
const mockBookings = [
  {
    id: "BK123456",
    customerName: "John Doe",
    movieTitle: "Inception",
    date: "2023-07-30",
    seats: ["E5", "E6"],
    amount: 31.50,
    status: "Confirmed"
  },
  {
    id: "BK123457",
    customerName: "Jane Smith",
    movieTitle: "The Dark Knight",
    date: "2023-08-05",
    seats: ["A12", "A13", "A14"],
    amount: 31.50,
    status: "Confirmed"
  },
  {
    id: "BK123458",
    customerName: "Robert Johnson",
    movieTitle: "Interstellar",
    date: "2023-06-20",
    seats: ["F7", "F8"],
    amount: 31.50,
    status: "Completed"
  },
  {
    id: "BK123459",
    customerName: "Emily Davis",
    movieTitle: "The Matrix",
    date: "2023-06-15",
    seats: ["C9", "C10"],
    amount: 21.00,
    status: "Cancelled"
  },
  {
    id: "BK123460",
    customerName: "Michael Wilson",
    movieTitle: "Inception",
    date: "2023-07-25",
    seats: ["B7", "B8"],
    amount: 21.00,
    status: "Confirmed"
  }
];

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    bookingsCount: 5,
    registeredDate: "2023-01-15"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    bookingsCount: 3,
    registeredDate: "2023-02-20"
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    bookingsCount: 8,
    registeredDate: "2023-01-05"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    bookingsCount: 2,
    registeredDate: "2023-03-10"
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    bookingsCount: 4,
    registeredDate: "2023-02-05"
  }
];

const AdminPage = () => {
  const [movieSearch, setMovieSearch] = useState("");
  const [bookingSearch, setBookingSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  
  const filteredMovies = mockMovies.filter(movie => 
    movie.title.toLowerCase().includes(movieSearch.toLowerCase())
  );
  
  const filteredBookings = mockBookings.filter(booking => 
    booking.customerName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
    booking.movieTitle.toLowerCase().includes(bookingSearch.toLowerCase()) ||
    booking.id.toLowerCase().includes(bookingSearch.toLowerCase())
  );
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );
  
  const handleDeleteMovie = (movieId: number) => {
    toast({
      title: "Movie Deleted",
      description: `Movie ID ${movieId} has been deleted successfully.`,
    });
  };
  
  const handleEditMovie = (movieId: number) => {
    toast({
      title: "Edit Movie",
      description: `Edit functionality for Movie ID ${movieId} would open a form in a real app.`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-6">Manage movies, bookings, and users</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
              <Film className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMovies.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockMovies.filter(m => m.status === "Now Playing").length} now playing
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <TicketIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockBookings.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockBookings.filter(b => b.status === "Confirmed").length} active bookings
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUsers.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 new users this week
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="movies" className="space-y-4">
          <TabsList>
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="movies">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Movies</CardTitle>
                  <CardDescription>Manage your movie listings</CardDescription>
                </div>
                <Button className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Movie
                </Button>
              </CardHeader>
              <CardContent>
                <div className="mb-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input 
                    placeholder="Search movies..." 
                    className="pl-10"
                    value={movieSearch}
                    onChange={(e) => setMovieSearch(e.target.value)}
                  />
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Release Date</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMovies.map((movie) => (
                        <TableRow key={movie.id}>
                          <TableCell className="font-medium">{movie.title}</TableCell>
                          <TableCell>{new Date(movie.releaseDate).toLocaleDateString()}</TableCell>
                          <TableCell>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</TableCell>
                          <TableCell>
                            <Badge variant={movie.status === "Now Playing" ? "default" : "outline"}>
                              {movie.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditMovie(movie.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteMovie(movie.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Bookings</CardTitle>
                <CardDescription>Manage customer bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input 
                    placeholder="Search bookings by customer, movie, or booking ID..." 
                    className="pl-10"
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                  />
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Movie</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.id}</TableCell>
                          <TableCell>{booking.customerName}</TableCell>
                          <TableCell>{booking.movieTitle}</TableCell>
                          <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                          <TableCell>${booking.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={
                              booking.status === "Confirmed" ? "default" : 
                              booking.status === "Completed" ? "outline" : 
                              "destructive"
                            }>
                              {booking.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input 
                    placeholder="Search users by name or email..." 
                    className="pl-10"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Total Bookings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{new Date(user.registeredDate).toLocaleDateString()}</TableCell>
                          <TableCell>{user.bookingsCount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
