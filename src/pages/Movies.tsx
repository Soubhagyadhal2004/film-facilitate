
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieCard, { Movie } from "@/components/MovieCard";
import { useLocation } from "@/contexts/LocationContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock movie data with theater locations
const mockMovies: (Movie & { theaters: number[] })[] = [
  {
    id: 1,
    title: "Inception",
    posterUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Sci-Fi", "Action", "Thriller"],
    duration: 148,
    releaseDate: new Date(2010, 6, 16).toISOString(), // July 16, 2010
    rating: 8.8,
    theaters: [1, 2, 3] // Theater IDs where this movie is playing
  },
  {
    id: 2,
    title: "The Dark Knight",
    posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Action", "Crime", "Drama"],
    duration: 152,
    releaseDate: new Date(2008, 6, 18).toISOString(), // July 18, 2008
    rating: 9.0,
    theaters: [1, 4, 5]
  },
  {
    id: 3,
    title: "Interstellar",
    posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    duration: 169,
    releaseDate: new Date(2014, 10, 7).toISOString(), // November 7, 2014
    rating: 8.6,
    theaters: [2, 3]
  },
  {
    id: 4,
    title: "The Matrix",
    posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Action", "Sci-Fi"],
    duration: 136,
    releaseDate: new Date(1999, 2, 31).toISOString(), // March 31, 1999
    rating: 8.7,
    theaters: [1, 5]
  },
  {
    id: 5,
    title: "Pulp Fiction",
    posterUrl: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Crime", "Drama"],
    duration: 154,
    releaseDate: new Date(1994, 9, 14).toISOString(), // October 14, 1994
    rating: 8.9,
    theaters: [3, 4]
  },
  {
    id: 6,
    title: "The Godfather",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Crime", "Drama"],
    duration: 175,
    releaseDate: new Date(1972, 2, 24).toISOString(), // March 24, 1972
    rating: 9.2,
    theaters: [2, 5]
  }
];

// Mock theaters data by city
const theatersByCity: Record<number, number[]> = {
  1: [1, 2, 3], // New York theaters
  2: [4, 5], // Los Angeles theaters
  3: [1, 4], // Chicago theaters
  4: [2, 5], // Houston theaters
  5: [3] // Phoenix theaters
};

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const { selectedCity, cityName } = useLocation();
  const navigate = useNavigate();
  
  // Get theaters for the selected city
  const cityTheaters = selectedCity ? theatersByCity[selectedCity.id] || [] : [];
  
  // Get all unique genres
  const allGenres = Array.from(
    new Set(mockMovies.flatMap(movie => movie.genre))
  ).sort();
  
  // Filter movies based on search query, selected genres, and city theaters
  const filteredMovies = mockMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenres.length === 0 || 
      movie.genre.some(g => selectedGenres.includes(g));
    const matchesCity = movie.theaters.some(theaterId => cityTheaters.includes(theaterId));
    
    return matchesSearch && matchesGenre && matchesCity;
  });
  
  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Page Title */}
      <section className="bg-cinema-blue text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Movies in {cityName}</h1>
          <p className="text-white/80 mt-2">Discover and book your favorite movies in {cityName}</p>
        </div>
      </section>
      
      {/* Movies List Section */}
      <section className="py-8 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <div className="w-full md:w-64 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search movies..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="bg-white rounded-md shadow p-4 space-y-3">
              <h3 className="font-medium text-lg">Genres</h3>
              <div className="space-y-2">
                {allGenres.map(genre => (
                  <div key={genre} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`genre-${genre}`}
                      checked={selectedGenres.includes(genre)}
                      onChange={() => toggleGenre(genre)}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-cinema-blue focus:ring-cinema-blue"
                    />
                    <label htmlFor={`genre-${genre}`} className="text-sm">{genre}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Location change button */}
            <div className="bg-white rounded-md shadow p-4 space-y-3">
              <h3 className="font-medium text-lg">Location</h3>
              <p className="text-sm text-gray-600">{cityName}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                onClick={() => navigate("/location")}
              >
                Change Location
              </Button>
            </div>
          </div>
          
          {/* Movies Grid */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredMovies.length} movies in {cityName}
              </p>
            </div>
            
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No movies found in {cityName} matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedGenres([]);
                  }}
                  className="mt-4 text-cinema-blue hover:text-cinema-blue/80"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Movies;
