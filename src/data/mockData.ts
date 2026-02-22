
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  contact: string;
  role: 'user' | 'admin';
}

export interface Train {
  id: number;
  name: string;
  number: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distance: string;
  classes: TrainClass[];
  days: string[];
}

export interface TrainClass {
  type: string;
  price: number;
  seatsAvailable: number;
  berthTypes?: string[]; // Available berth types for this class
}

export interface Booking {
  id: number;
  userId: number;
  trainId: number;
  seatNo: string;
  status: 'confirmed' | 'cancelled' | 'waiting';
  pnr: string;
  bookingDate: string;
  journeyDate: string;
  passengers: Passenger[];
  class: string;
  totalFare: number;
  paymentMethod?: string; 
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  seatNo?: string;
  berthPreference?: string; // Added berth preference
}

// Mock Users
export const users: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@railway.com',
    password: 'admin123',
    contact: '9876543210',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Test User',
    email: 'user@example.com',
    password: 'password123',
    contact: '8765432109',
    role: 'user'
  }
];

// Mock Trains
export const trains: Train[] = [
  {
    id: 1,
    name: 'Rajdhani Express',
    number: '12301',
    source: 'Delhi',
    destination: 'Mumbai',
    departureTime: '16:55',
    arrivalTime: '08:15',
    duration: '15h 20m',
    distance: '1384 KM',
    classes: [
      { 
        type: '1A', 
        price: 3200, 
        seatsAvailable: 18,
        berthTypes: ['Lower', 'Upper', 'Side Lower', 'Side Upper']
      },
      { 
        type: '2A', 
        price: 1900, 
        seatsAvailable: 42,
        berthTypes: ['Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper']
      },
      { 
        type: '3A', 
        price: 1280, 
        seatsAvailable: 64,
        berthTypes: ['Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper']
      },
    ],
    days: ['Mon', 'Wed', 'Fri', 'Sun']
  },
  {
    id: 2,
    name: 'Shatabdi Express',
    number: '12002',
    source: 'Delhi',
    destination: 'Jaipur',
    departureTime: '06:05',
    arrivalTime: '10:40',
    duration: '4h 35m',
    distance: '308 KM',
    classes: [
      { 
        type: 'CC', 
        price: 750, 
        seatsAvailable: 72,
        berthTypes: ['Window', 'Aisle', 'Middle']
      },
      { 
        type: 'EC', 
        price: 1450, 
        seatsAvailable: 48,
        berthTypes: ['Window', 'Aisle']
      },
    ],
    days: ['Daily']
  },
  {
    id: 3,
    name: 'Duronto Express',
    number: '12213',
    source: 'Mumbai',
    destination: 'Delhi',
    departureTime: '11:10',
    arrivalTime: '05:55',
    duration: '18h 45m',
    distance: '1384 KM',
    classes: [
      { 
        type: '1A', 
        price: 3500, 
        seatsAvailable: 24,
        berthTypes: ['Lower', 'Upper', 'Side Lower', 'Side Upper']
      },
      { 
        type: '2A', 
        price: 2100, 
        seatsAvailable: 46,
        berthTypes: ['Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper']
      },
      { 
        type: '3A', 
        price: 1450, 
        seatsAvailable: 72,
        berthTypes: ['Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper']
      },
      { 
        type: 'SL', 
        price: 620, 
        seatsAvailable: 120,
        berthTypes: ['Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper']
      },
    ],
    days: ['Tue', 'Thu', 'Sat']
  },
  {
    id: 4,
    name: 'Vande Bharat Express',
    number: '20901',
    source: 'Delhi',
    destination: 'Varanasi',
    departureTime: '06:00',
    arrivalTime: '14:00',
    duration: '8h 00m',
    distance: '759 KM',
    classes: [
      { 
        type: 'EC', 
        price: 1800, 
        seatsAvailable: 64,
        berthTypes: ['Window', 'Aisle']
      },
      { 
        type: 'CC', 
        price: 900, 
        seatsAvailable: 78,
        berthTypes: ['Window', 'Aisle', 'Middle']
      },
    ],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  {
    id: 5,
    name: 'Chennai Express',
    number: '12674',
    source: 'Chennai',
    destination: 'Delhi',
    departureTime: '21:15',
    arrivalTime: '19:30',
    duration: '22h 15m',
    distance: '2175 KM',
    classes: [
      { 
        type: '2A', 
        price: 2400, 
        seatsAvailable: 46,
        berthTypes: ['Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper']
      },
      { 
        type: '3A', 
        price: 1650, 
        seatsAvailable: 72,
        berthTypes: ['Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper']
      },
      { 
        type: 'SL', 
        price: 720, 
        seatsAvailable: 110,
        berthTypes: ['Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper']
      },
    ],
    days: ['Mon', 'Thu', 'Sun']
  }
];

// List of popular Indian cities for train routes
export const indianCities = [
  'Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bangalore', 'Hyderabad', 'Ahmedabad',
  'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
  'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
  'Ranchi', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad',
  'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Howrah', 'Gwalior', 'Jabalpur',
  'Coimbatore', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati',
  'Chandigarh', 'Solapur', 'Hubli', 'Mysore', 'Tiruchirappalli', 'Bareilly', 'Aligarh'
];

// Mock Bookings
export const bookings: Booking[] = [
  {
    id: 1,
    userId: 2,
    trainId: 1,
    seatNo: '3A-32',
    status: 'confirmed',
    pnr: 'PNR1234567',
    bookingDate: '2025-04-28',
    journeyDate: '2025-05-15',
    passengers: [
      {
        name: 'Test User',
        age: 28,
        gender: 'male',
        seatNo: '3A-32'
      }
    ],
    class: '3A',
    totalFare: 1280,
    paymentMethod: 'credit_card'
  },
  {
    id: 2,
    userId: 2,
    trainId: 4,
    seatNo: 'EC-12',
    status: 'confirmed',
    pnr: 'PNR7654321',
    bookingDate: '2025-04-20',
    journeyDate: '2025-05-10',
    passengers: [
      {
        name: 'Test User',
        age: 28,
        gender: 'male',
        seatNo: 'EC-12'
      },
      {
        name: 'Jane Doe',
        age: 26,
        gender: 'female',
        seatNo: 'EC-13'
      }
    ],
    class: 'EC',
    totalFare: 3600,
    paymentMethod: 'paypal'
  }
];
