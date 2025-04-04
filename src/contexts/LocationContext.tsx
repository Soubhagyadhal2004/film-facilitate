
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface City {
  id: number;
  name: string;
  state: string;
}

interface LocationContextType {
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
  cityName: string;
  clearLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  
  // Indian cities data - in a real app this would come from an API or be more complete
  const cities: Record<number, City> = {
    1: { id: 1, name: "Mumbai", state: "Maharashtra" },
    2: { id: 2, name: "Delhi", state: "Delhi" },
    3: { id: 3, name: "Bangalore", state: "Karnataka" },
    4: { id: 4, name: "Hyderabad", state: "Telangana" },
    5: { id: 5, name: "Chennai", state: "Tamil Nadu" },
    6: { id: 6, name: "Kolkata", state: "West Bengal" },
    7: { id: 7, name: "Pune", state: "Maharashtra" },
    8: { id: 8, name: "Ahmedabad", state: "Gujarat" },
    9: { id: 9, name: "Jaipur", state: "Rajasthan" },
    10: { id: 10, name: "Lucknow", state: "Uttar Pradesh" },
  };
  
  // Load saved location from localStorage
  useEffect(() => {
    const savedCityId = localStorage.getItem('selectedCity');
    if (savedCityId) {
      const cityId = parseInt(savedCityId);
      if (cities[cityId]) {
        setSelectedCity(cities[cityId]);
      }
    }
  }, []);
  
  // Handle setting selected city
  const handleSetSelectedCity = (city: City | null) => {
    setSelectedCity(city);
    if (city) {
      localStorage.setItem('selectedCity', city.id.toString());
    } else {
      localStorage.removeItem('selectedCity');
    }
  };
  
  // Clear location
  const clearLocation = () => {
    setSelectedCity(null);
    localStorage.removeItem('selectedCity');
  };
  
  // Get city name with state, or default text if no city selected
  const cityName = selectedCity ? `${selectedCity.name}, ${selectedCity.state}` : "Select City";
  
  return (
    <LocationContext.Provider value={{ 
      selectedCity, 
      setSelectedCity: handleSetSelectedCity,
      cityName,
      clearLocation
    }}>
      {children}
    </LocationContext.Provider>
  );
};
