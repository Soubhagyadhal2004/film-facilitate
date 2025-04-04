
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface City {
  id: number;
  name: string;
  state: string;
}

interface LocationContextType {
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
  cityName: string;
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
  
  // Sample cities data - in a real app this would come from an API or be more complete
  const cities: Record<number, City> = {
    1: { id: 1, name: "New York", state: "NY" },
    2: { id: 2, name: "Los Angeles", state: "CA" },
    3: { id: 3, name: "Chicago", state: "IL" },
    4: { id: 4, name: "Houston", state: "TX" },
    5: { id: 5, name: "Phoenix", state: "AZ" },
  };
  
  useEffect(() => {
    const savedCityId = localStorage.getItem('selectedCity');
    if (savedCityId) {
      const cityId = parseInt(savedCityId);
      if (cities[cityId]) {
        setSelectedCity(cities[cityId]);
      }
    }
  }, []);
  
  const handleSetSelectedCity = (city: City | null) => {
    setSelectedCity(city);
    if (city) {
      localStorage.setItem('selectedCity', city.id.toString());
    } else {
      localStorage.removeItem('selectedCity');
    }
  };
  
  // Get city name with state, or default text if no city selected
  const cityName = selectedCity ? `${selectedCity.name}, ${selectedCity.state}` : "Select City";
  
  return (
    <LocationContext.Provider value={{ 
      selectedCity, 
      setSelectedCity: handleSetSelectedCity,
      cityName
    }}>
      {children}
    </LocationContext.Provider>
  );
};
