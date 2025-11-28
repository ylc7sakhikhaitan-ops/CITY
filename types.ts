export enum ViewState {
  HOME = 'HOME',
  BUDDY = 'BUDDY',
  FOOD = 'FOOD'
}

export interface CityBuddy {
  id: string;
  name: string;
  expertise: string;
  isVerified: boolean;
  languages: string[];
  imageUrl: string;
  rating: number;
}

export interface Venue {
  id: string;
  name: string;
  type: string; // e.g., "Dining", "Cocktails"
  tags: string[];
  description: string;
  imageUrl: string;
  priceLevel: '$$' | '$$$' | '$$$$';
}

export interface Mood {
  title: string;
  subtitle: string;
  description: string;
}