
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieCard, { Movie } from "@/components/MovieCard";

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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter movies based on search query
  const filteredMovies = mockMovies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-cinema-blue text-white py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Movie Experience</h1>
            <p className="text-lg mb-8">Discover the latest movies and book your tickets online with ease</p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search for movies, genres..." 
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button asChild size="lg" className="bg-cinema-gold hover:bg-cinema-gold/90 text-cinema-blue">
                <Link to="/movies">Browse All Movies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Now Playing Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Now Playing</h2>
          <Button variant="outline" asChild>
            <Link to="/movies">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.slice(0, 4).map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
      
      {/* Coming Soon Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Coming Soon</h2>
            <Button variant="outline" asChild>
              <Link to="/coming-soon">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.slice(2, 6).map(movie => (
              <MovieCard key={`coming-${movie.id}`} movie={{
                ...movie,
                id: movie.id + 100, // Add offset to create different IDs
                releaseDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * (movie.id % 3 + 1)).toISOString() // Future dates
              }} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Promotion */}
      <section className="py-12 container mx-auto px-4">
        <div className="bg-gradient-to-r from-cinema-blue to-cinema-indigo text-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 space-y-4">
              <div className="inline-block bg-cinema-gold text-cinema-blue text-sm font-bold px-3 py-1 rounded-full mb-2">
                Special Offer
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Enjoy 20% off on all VIP seats</h2>
              <p className="text-white/80">
                Book your premium movie experience at a discounted price. 
                Valid for all shows from Monday to Thursday.
              </p>
              <Button size="lg" className="bg-white text-cinema-blue hover:bg-white/90">
                Get Discount Code
              </Button>
            </div>
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img 
                src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                alt="Cinema Experience"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
