import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the structure of a listed card
export interface ListedCard {
  id: string; // Unique identifier for the listing
  name: string;
  set: string;
  number: string;
  rarity: string;
  condition: string;
  grade: string;
  isFirstEdition: boolean;
  isHolographic: boolean;
  imageUrl: string;
  price: number | null; // null for auctions until sold
  listingType: 'fixed-price' | 'auction';
  blockchain: string;
  royalties: number;
  includesPhysical: boolean;
  description?: string;
  listTimestamp: number;
  // Auction specific fields
  startingPrice?: number;
  reservePrice?: number;
  auctionEndDate?: number; // Timestamp
}

// Define the state shape and actions
interface ListedCardsState {
  listedCards: ListedCard[];
  addListedCard: (card: Omit<ListedCard, 'id' | 'listTimestamp'>) => void;
  // Potentially add actions for removing or updating listings later
}

// Wrap the store definition with the persist middleware
export const useListedCardsStore = create<ListedCardsState>()(
  persist(
    (set) => ({
      listedCards: [], // Initial state: empty array of listed cards

      addListedCard: (cardData) =>
        set((state) => {
          const newCard: ListedCard = {
            ...cardData,
            id: crypto.randomUUID(), // Generate a simple unique ID
            listTimestamp: Date.now(),
          };
          return { listedCards: [...state.listedCards, newCard] };
        }),
    }),
    {
      name: 'listed-cards-storage', // Unique name for the localStorage key
      storage: createJSONStorage(() => localStorage), // (optional) Use localStorage explicitly
    }
  )
);
