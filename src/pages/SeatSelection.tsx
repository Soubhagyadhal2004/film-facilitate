import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeatMap from "@/components/SeatMap";
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
  // Other movies...
];

// Mock showtimes
const mockShowtimes = [
  { id: 101, movieId: 1, time: "10:30 AM", date: new Date().toISOString() },
  { id: 102, movieId: 1, time: "1:15 PM", date: new Date().toISOString() },
  { id: 103, movieId: 1, time: "4:00 PM", date: new Date().toISOString() },
  { id: 104, movieId: 1, time: "7:30 PM", date: new Date().toISOString() },
  { id: 105, movieId: 1, time: "10:00 PM", date: new Date().toISOString() },
  // Other showtimes...
];

const SeatSelection = () => {
  const { movieId, showtimeId } = useParams<{ movieId: string; showtimeId: string }>();
  const navigate = useNavigate();
  
  const movie = mockMovies.find(m => m.id === Number(movieId));
  const showtime = mockShowtimes.find(s => s.id === Number(showtimeId));
  
  if (!movie || !showtime) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Movie or showtime not found</h2>
            <p className="mb-6">The movie or showtime you're looking for could not be found.</p>
            <button 
              onClick={() => navigate("/")}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              Go Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleSeatSelection = (selectedSeats: string[]) => {
    // In a real app, we'd pass selected seats through state or context
    // For this demo, we'll encode it in the URL
    const seatsParam = selectedSeats.join(',');
    navigate(`/checkout/${movieId}/${showtimeId}/${seatsParam}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <button 
              onClick={() => navigate(`/movie/${movieId}`)}
              className="flex items-center text-muted-foreground hover:text-foreground mb-2"
            >
              <span>← Back to movie</span>
            </button>
            
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <p className="text-muted-foreground">
              {new Date(showtime.date).toLocaleDateString()} • {showtime.time} • Cinema 3
            </p>
          </div>
          
          <SeatMap 
            showtime={{
              id: showtime.id,
              time: showtime.time,
              date: showtime.date
            }}
            movie={{
              id: movie.id,
              title: movie.title
            }}
            onProceed={handleSeatSelection}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SeatSelection;
