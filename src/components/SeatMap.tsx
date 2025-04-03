
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface SeatProps {
  id: string;
  row: string;
  number: number;
  type: "standard" | "vip";
  status: "available" | "occupied";
  price: number;
  onSelect: (seatId: string) => void;
  isSelected: boolean;
}

const Seat: React.FC<SeatProps> = ({ 
  id, row, number, type, status, price, onSelect, isSelected 
}) => {
  // Define classes for different seat states
  const baseClass = "seat w-8 h-8 m-1 flex items-center justify-center text-xs rounded cursor-pointer transition-colors";
  
  let seatClass = baseClass;
  
  if (status === "occupied") {
    seatClass += " bg-red-500/60 text-white cursor-not-allowed";
  } else if (isSelected) {
    seatClass += " bg-cinema-purple text-white";
  } else if (type === "vip") {
    seatClass += " bg-amber-500/60 hover:bg-amber-500/80 text-white";
  } else {
    seatClass += " bg-blue-500/60 hover:bg-blue-500/80 text-white";
  }
  
  return (
    <div 
      className={seatClass}
      onClick={() => status === "available" && onSelect(id)}
      title={`${row}${number} - ${type.toUpperCase()} - $${price}`}
    >
      {row}{number}
    </div>
  );
};

interface SeatMapProps {
  showtime: {
    id: number;
    time: string;
    date: string;
  };
  movie: {
    id: number;
    title: string;
  };
  onProceed: (selectedSeats: string[]) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({ showtime, movie, onProceed }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [allSeats, setAllSeats] = useState<Array<{
    id: string;
    row: string;
    number: number;
    type: "standard" | "vip";
    status: "available" | "occupied";
    price: number;
  }>>([]);
  
  // Generate mock seat data only once when component mounts
  useEffect(() => {
    const generateSeats = () => {
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      const seatsPerRow = 12;
      const seats = [];
      
      for (const row of rows) {
        for (let i = 1; i <= seatsPerRow; i++) {
          const isVip = row === 'E' || row === 'F';
          // Fix: Use a consistent pattern for occupied seats based on seat ID
          // This ensures occupied seats remain consistent between renders
          const isOccupied = ((row.charCodeAt(0) + i) % 7 === 0);
          
          seats.push({
            id: `${row}${i}`,
            row,
            number: i,
            type: isVip ? "vip" : "standard",
            status: isOccupied ? "occupied" : "available",
            price: isVip ? 15 : 10,
          });
        }
      }
      
      return seats;
    };
    
    setAllSeats(generateSeats());
  }, []);
  
  const handleSeatSelect = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length >= 10) {
        toast({
          title: "Maximum Seats Reached",
          description: "You can only select up to 10 seats at a time.",
          variant: "destructive",
        });
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };
  
  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = allSeats.find(seat => seat.id === seatId);
      return total + (seat ? seat.price : 0);
    }, 0);
  };
  
  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      toast({
        title: "No Seats Selected",
        description: "Please select at least one seat to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    onProceed(selectedSeats);
  };

  if (allSeats.length === 0) {
    return <div className="flex justify-center p-12">Loading seats...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1 mb-6">
        <div className="text-sm text-muted-foreground">
          Screen this way
        </div>
        <div className="h-2 bg-gradient-to-b from-cinema-purple/30 to-transparent rounded-full w-3/4 mx-auto"></div>
        <div className="h-1 bg-cinema-purple rounded-full w-2/3 mx-auto"></div>
      </div>
      
      <div className="flex flex-col items-center space-y-2">
        {Array.from(new Set(allSeats.map(seat => seat.row))).map(row => (
          <div key={row} className="flex justify-center">
            <div className="w-6 flex items-center justify-center font-medium text-muted-foreground">
              {row}
            </div>
            <div className="flex flex-wrap justify-center">
              {allSeats
                .filter(seat => seat.row === row)
                .map(seat => (
                  <Seat
                    key={seat.id}
                    id={seat.id}
                    row={seat.row}
                    number={seat.number}
                    type={seat.type}
                    status={seat.status}
                    price={seat.price}
                    onSelect={handleSeatSelect}
                    isSelected={selectedSeats.includes(seat.id)}
                  />
                ))}
            </div>
            <div className="w-6 flex items-center justify-center font-medium text-muted-foreground">
              {row}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center gap-8 mt-8 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500/60 rounded"></div>
          <span className="text-sm">Standard</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-amber-500/60 rounded"></div>
          <span className="text-sm">VIP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-cinema-purple rounded"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-500/60 rounded"></div>
          <span className="text-sm">Occupied</span>
        </div>
      </div>
      
      <div className="bg-muted/50 p-4 rounded-lg mt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-bold">Booking Summary</h3>
            <p className="text-sm text-muted-foreground">
              {movie.title} - {new Date(showtime.date).toLocaleDateString()} at {showtime.time}
            </p>
            <div className="mt-2">
              <p className="text-sm">
                Seats: <span className="font-medium">{selectedSeats.length > 0 ? selectedSeats.join(", ") : "None selected"}</span>
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total Price</div>
            <div className="text-2xl font-bold">${getTotalPrice().toFixed(2)}</div>
            <Button 
              className="mt-2" 
              disabled={selectedSeats.length === 0}
              onClick={handleProceed}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
