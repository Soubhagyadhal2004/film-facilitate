
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  genre: string[];
  duration: number; // in minutes
  releaseDate: string;
  rating: number;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card group">
      <div className="relative overflow-hidden aspect-[2/3]">
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-cinema-blue text-white">
            {movie.rating}/10
          </Badge>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="font-bold truncate">{movie.title}</h3>
        
        <div className="flex flex-wrap gap-1">
          {movie.genre.slice(0, 2).map((genre, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
          {movie.genre.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{movie.genre.length - 2}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
          </div>
        </div>
        
        <Button asChild className="w-full mt-2">
          <Link to={`/movie/${movie.id}`}>Book Now</Link>
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
