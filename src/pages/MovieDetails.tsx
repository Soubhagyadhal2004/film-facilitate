
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Calendar, Star, Share2, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Movie } from "@/components/MovieCard";

// Mock movie data
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    posterUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Sci-Fi", "Action", "Thriller"],
    duration: 148,
    releaseDate: "2023-07-16",
    rating: 8.8
  },
  {
    id: 2,
    title: "The Dark Knight",
    posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Action", "Crime", "Drama"],
    duration: 152,
    releaseDate: "2023-07-18",
    rating: 9.0
  },
  {
    id: 3,
    title: "Interstellar",
    posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    duration: 169,
    releaseDate: "2023-07-20",
    rating: 8.6
  },
  {
    id: 4,
    title: "The Matrix",
    posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Action", "Sci-Fi"],
    duration: 136,
    releaseDate: "2023-07-22",
    rating: 8.7
  },
  {
    id: 5,
    title: "Pulp Fiction",
    posterUrl: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Crime", "Drama"],
    duration: 154,
    releaseDate: "2023-07-24",
    rating: 8.9
  },
  {
    id: 6,
    title: "The Godfather",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Crime", "Drama"],
    duration: 175,
    releaseDate: "2023-07-26",
    rating: 9.2
  }
];

// Mock showtimes data
const showtimesByDay = [
  {
    date: new Date(),
    showtimes: [
      { id: 101, time: "10:30 AM" },
      { id: 102, time: "1:15 PM" },
      { id: 103, time: "4:00 PM" },
      { id: 104, time: "7:30 PM" },
      { id: 105, time: "10:00 PM" },
    ]
  },
  {
    date: new Date(Date.now() + 86400000), // Tomorrow
    showtimes: [
      { id: 106, time: "11:00 AM" },
      { id: 107, time: "1:45 PM" },
      { id: 108, time: "4:30 PM" },
      { id: 109, time: "8:00 PM" },
      { id: 110, time: "10:30 PM" },
    ]
  },
  {
    date: new Date(Date.now() + 2 * 86400000), // Day after tomorrow
    showtimes: [
      { id: 111, time: "10:30 AM" },
      { id: 112, time: "1:15 PM" },
      { id: 113, time: "4:00 PM" },
      { id: 114, time: "7:30 PM" },
      { id: 115, time: "10:00 PM" },
    ]
  }
];

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedShowtime, setSelectedShowtime] = useState<null | { id: number; time: string }>(null);
  
  const movie = mockMovies.find(m => m.id === Number(id));
  
  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
            <Button onClick={() => navigate("/")}>Go Back to Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBooking = () => {
    if (selectedShowtime) {
      navigate(`/seat-selection/${movie.id}/${selectedShowtime.id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
          alt="Movie Background"
          className="w-full h-64 md:h-96 object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 -mt-32 md:-mt-40 relative z-20">
        <div className="bg-background rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 lg:w-1/4">
              <div className="p-6">
                <div className="aspect-[2/3] overflow-hidden rounded-md shadow-lg">
                  <img 
                    src={movie.posterUrl} 
                    alt={movie.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 size={16} className="mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Heart size={16} className="mr-2" />
                      Favorite
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 lg:w-3/4 p-6">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
                
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-cinema-gold fill-cinema-gold" />
                    <span className="ml-1 font-semibold">{movie.rating}/10</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="ml-1 text-sm text-muted-foreground">
                      {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="ml-1 text-sm text-muted-foreground">
                      {new Date(movie.releaseDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genre.map((genre, index) => (
                    <Badge key={index} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-4">
                  A mind-bending journey through dreams within dreams, where a skilled thief is tasked with planting an idea in a target's subconscious. As the layers of reality blur, the team navigates through increasingly complex dreamscapes, facing personal demons and dangerous projections.
                </p>
              </div>
              
              <Tabs defaultValue="showtimes" className="mt-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="showtimes">Showtimes</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="showtimes">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Select Date</h3>
                      <div className="flex overflow-x-auto pb-2 gap-2">
                        {showtimesByDay.map((day, index) => (
                          <Button
                            key={index}
                            variant={selectedDay === index ? "default" : "outline"}
                            onClick={() => {
                              setSelectedDay(index);
                              setSelectedShowtime(null);
                            }}
                            className="min-w-[120px]"
                          >
                            <div className="flex flex-col">
                              <span className="text-xs">{day.date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                              <span>{day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Select Time</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {showtimesByDay[selectedDay].showtimes.map((showtime) => (
                          <Button
                            key={showtime.id}
                            variant={selectedShowtime?.id === showtime.id ? "default" : "outline"}
                            onClick={() => setSelectedShowtime(showtime)}
                          >
                            {showtime.time}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        size="lg"
                        className="w-full md:w-auto"
                        disabled={!selectedShowtime}
                        onClick={handleBooking}
                      >
                        Book Tickets
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="details">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">Synopsis</h3>
                      <p className="text-muted-foreground">
                        Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg">Cast & Crew</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="text-center">
                            <div className="w-20 h-20 mx-auto bg-muted rounded-full overflow-hidden mb-2">
                              <img 
                                src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`} 
                                alt="Cast Member" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="font-medium text-sm">Actor Name</p>
                            <p className="text-xs text-muted-foreground">Character</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        <Star className="h-6 w-6 text-cinema-gold fill-cinema-gold" />
                        <span className="ml-1 text-xl font-bold">{movie.rating}/10</span>
                      </div>
                      <span className="text-muted-foreground">Based on 5.2k reviews</span>
                    </div>
                    
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border-b pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">John Doe</h4>
                              <div className="flex items-center">
                                {Array(5).fill(0).map((_, j) => (
                                  <Star 
                                    key={j} 
                                    className={`h-4 w-4 ${j < 4 ? 'text-cinema-gold fill-cinema-gold' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date().toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm">
                            Absolutely mind-blowing! The concept is original and executed brilliantly. 
                            The visuals are stunning, and the performances are top-notch. 
                            One of my favorite movies of all time.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-12"></div>
      <Footer />
    </div>
  );
};

export default MovieDetails;
