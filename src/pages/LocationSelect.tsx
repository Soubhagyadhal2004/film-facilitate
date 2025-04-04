
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useLocation } from "@/contexts/LocationContext";

// Sample cities data for India
const cities = [
  { id: 1, name: "Mumbai", state: "Maharashtra", popular: true },
  { id: 2, name: "Delhi", state: "Delhi", popular: true },
  { id: 3, name: "Bangalore", state: "Karnataka", popular: true },
  { id: 4, name: "Hyderabad", state: "Telangana", popular: true },
  { id: 5, name: "Chennai", state: "Tamil Nadu", popular: true },
  { id: 6, name: "Kolkata", state: "West Bengal", popular: false },
  { id: 7, name: "Pune", state: "Maharashtra", popular: false },
  { id: 8, name: "Ahmedabad", state: "Gujarat", popular: false },
  { id: 9, name: "Jaipur", state: "Rajasthan", popular: false },
  { id: 10, name: "Lucknow", state: "Uttar Pradesh", popular: false },
  { id: 11, name: "Surat", state: "Gujarat", popular: false },
  { id: 12, name: "Kanpur", state: "Uttar Pradesh", popular: false },
  { id: 13, name: "Nagpur", state: "Maharashtra", popular: false },
  { id: 14, name: "Indore", state: "Madhya Pradesh", popular: false },
  { id: 15, name: "Thane", state: "Maharashtra", popular: false },
];

const LocationSelect = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { selectedCity, setSelectedCity } = useLocation();
  
  // Filter cities based on search query
  const filteredCities = searchQuery.length > 0 
    ? cities.filter(city => 
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.state.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cities;
  
  const popularCities = cities.filter(city => city.popular);
  
  const handleCitySelect = (city: typeof cities[0]) => {
    setSelectedCity(city);
    
    // Navigate to home page
    setTimeout(() => {
      navigate('/');
    }, 300);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-cinema-blue/10 to-background flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-1 flex flex-col items-center justify-center max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Select Your Location</h1>
          <p className="text-muted-foreground">
            Choose your city to see movie showtimes in India
          </p>
        </div>
        
        <div className="w-full space-y-6">
          <div>
            <Label htmlFor="location-search">Search for your city</Label>
            <div className="relative mt-1.5">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                id="location-search"
                placeholder="Enter city or state..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search cities..." className="h-9" value={searchQuery} onValueChange={setSearchQuery} />
            <CommandList>
              <CommandEmpty>No cities found</CommandEmpty>
              
              {searchQuery.length === 0 && (
                <CommandGroup heading="Popular Cities">
                  {popularCities.map((city) => (
                    <CommandItem 
                      key={city.id} 
                      value={city.name}
                      onSelect={() => handleCitySelect(city)}
                      className={cn(
                        "cursor-pointer flex items-center justify-between",
                        selectedCity?.id === city.id && "bg-primary text-primary-foreground"
                      )}
                    >
                      <span>{city.name}, {city.state}</span>
                      {selectedCity?.id === city.id && <MapPin className="h-4 w-4" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {filteredCities.length > 0 && searchQuery.length > 0 && (
                <CommandGroup heading={searchQuery.length > 0 ? "Search Results" : "All Cities"}>
                  {filteredCities.map((city) => (
                    <CommandItem 
                      key={city.id} 
                      value={city.name}
                      onSelect={() => handleCitySelect(city)}
                      className={cn(
                        "cursor-pointer flex items-center justify-between",
                        selectedCity?.id === city.id && "bg-primary text-primary-foreground"
                      )}
                    >
                      <span>{city.name}, {city.state}</span>
                      {selectedCity?.id === city.id && <MapPin className="h-4 w-4" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
          
          <div className="pt-4 flex flex-col space-y-2">
            <Button onClick={() => navigate("/")} variant="outline" className="w-full">
              Skip for now
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              You can change your location anytime from the header menu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSelect;
