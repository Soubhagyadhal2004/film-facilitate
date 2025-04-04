
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieCard, { Movie } from "@/components/MovieCard";

// Using the same mock movie data from Index.tsx
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    posterUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Sci-Fi", "Action", "Thriller"],
    duration: 148,
    releaseDate: new Date(2010, 6, 16).toISOString(), // July 16, 2010
    rating: 8.8
  },
  {
    id: 2,
    title: "The Dark Knight",
    posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Action", "Crime", "Drama"],
    duration: 152,
    releaseDate: new Date(2008, 6, 18).toISOString(), // July 18, 2008
    rating: 9.0
  },
  {
    id: 3,
    title: "Interstellar",
    posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    duration: 169,
    releaseDate: new Date(2014, 10, 7).toISOString(), // November 7, 2014
    rating: 8.6
  },
  {
    id: 4,
    title: "The Matrix",
    posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Action", "Sci-Fi"],
    duration: 136,
    releaseDate: new Date(1999, 2, 31).toISOString(), // March 31, 1999
    rating: 8.7
  },
  {
    id: 5,
    title: "Pulp Fiction",
    posterUrl: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Crime", "Drama"],
    duration: 154,
    releaseDate: new Date(1994, 9, 14).toISOString(), // October 14, 1994
    rating: 8.9
  },
  {
    id: 6,
    title: "The Godfather",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&h=951&q=80",
    genre: ["Crime", "Drama"],
    duration: 175,
    releaseDate: new Date(1972, 2, 24).toISOString(), // March 24, 1972
    rating: 9.2
  }
];

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  
  // Get all unique genres
  const allGenres = Array.from(
    new Set(mockMovies.flatMap(movie => movie.genre))
  ).sort();
  
  // Filter movies based on search query and selected genres
  const filteredMovies = mockMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenres.length === 0 || 
      movie.genre.some(g => selectedGenres.includes(g));
    return matchesSearch && matchesGenre;
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
          <h1 className="text-3xl font-bold">Browse All Movies</h1>
          <p className="text-white/80 mt-2">Discover and book your favorite movies</p>
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
          </div>
          
          {/* Movies Grid */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredMovies.length} of {mockMovies.length} movies
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
                <p className="text-gray-600">No movies found matching your criteria.</p>
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
