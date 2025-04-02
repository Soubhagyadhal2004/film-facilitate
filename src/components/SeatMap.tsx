
import React, { useState } from "react";
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
  let seatClass = "seat ";
  
  if (status === "occupied") {
    seatClass += "seat-occupied";
  } else if (isSelected) {
    seatClass += "seat-selected";
  } else if (type === "vip") {
    seatClass += "seat-vip";
  } else {
    seatClass += "seat-available";
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
  
  // Generate mock seat data
  const generateSeats = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    const seats = [];
    
    for (const row of rows) {
      for (let i = 1; i <= seatsPerRow; i++) {
        const isVip = row === 'E' || row === 'F';
        const isRandomlyOccupied = Math.random() > 0.7;
        
        seats.push({
          id: `${row}${i}`,
          row,
          number: i,
          type: isVip ? "vip" : "standard",
          status: isRandomlyOccupied ? "occupied" : "available",
          price: isVip ? 15 : 10,
        });
      }
    }
    
    return seats;
  };
  
  const seats = generateSeats();
  
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
      const seat = seats.find(seat => seat.id === seatId);
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
        {Array.from(new Set(seats.map(seat => seat.row))).map(row => (
          <div key={row} className="flex justify-center">
            <div className="w-6 flex items-center justify-center font-medium text-muted-foreground">
              {row}
            </div>
            <div className="flex flex-wrap justify-center">
              {seats
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
      
      <div className="flex justify-center gap-8 mt-8">
        <div className="flex items-center gap-2">
          <div className="seat-available seat w-6 h-6"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="seat-selected seat w-6 h-6"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="seat-occupied seat w-6 h-6"></div>
          <span className="text-sm">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="seat-vip seat w-6 h-6"></div>
          <span className="text-sm">VIP ($15)</span>
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
