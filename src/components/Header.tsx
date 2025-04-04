import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Film, TicketIcon, LogIn, Menu, X, MapPin } from "lucide-react";
import { useLocation as useRouterLocation } from "react-router-dom";
import { useLocation } from "@/contexts/LocationContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { pathname } = useRouterLocation();
  const navigate = useNavigate();
  const { cityName } = useLocation();
  
  // Hide header on login, register and location pages
  if (pathname === "/login" || pathname === "/register" || pathname === "/location") {
    return null;
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2">
          <TicketIcon className="h-6 w-6 text-cinema-purple" />
          <span className="font-bold text-xl cinema-text-gradient">CineTix</span>
        </Link>
        
        {/* Location Selector */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="hidden md:flex items-center gap-1 text-muted-foreground hover:text-foreground"
          onClick={() => navigate("/location")}
        >
          <MapPin size={16} />
          <span>{cityName}</span>
        </Button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium hover:text-cinema-purple transition-colors">
            Home
          </Link>
          <Link to="/movies" className="font-medium hover:text-cinema-purple transition-colors">
            Movies
          </Link>
          <Link to="/about" className="font-medium hover:text-cinema-purple transition-colors">
            About
          </Link>
          <Link to="/contact" className="font-medium hover:text-cinema-purple transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard" className="flex items-center gap-2">
                  <User size={16} />
                  <span>Dashboard</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(false)}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {/* Location Selector (Mobile) */}
            <Button 
              variant="ghost" 
              className="flex items-center justify-start gap-2 font-medium hover:text-cinema-purple transition-colors"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/location");
              }}
            >
              <MapPin size={18} />
              <span>{cityName}</span>
            </Button>
            
            <Link 
              to="/" 
              className="flex items-center gap-2 font-medium hover:text-cinema-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Film size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/movies" 
              className="flex items-center gap-2 font-medium hover:text-cinema-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Film size={18} />
              <span>Movies</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center gap-2 font-medium hover:text-cinema-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>About</span>
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center gap-2 font-medium hover:text-cinema-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Contact</span>
            </Link>
            
            <div className="pt-4 flex flex-col space-y-2">
              {isLoggedIn ? (
                <>
                  <Button asChild variant="outline" onClick={() => setIsMenuOpen(false)}>
                    <Link to="/dashboard" className="flex items-center justify-center gap-2">
                      <User size={16} />
                      <span>Dashboard</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" onClick={() => { setIsLoggedIn(false); setIsMenuOpen(false); }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" onClick={() => setIsMenuOpen(false)}>
                    <Link to="/login" className="flex items-center justify-center gap-2">
                      <LogIn size={16} />
                      <span>Login</span>
                    </Link>
                  </Button>
                  <Button onClick={() => setIsMenuOpen(false)} asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
