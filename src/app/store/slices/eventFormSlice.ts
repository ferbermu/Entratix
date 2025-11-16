import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EventFormState {
  title: string;
  category: string;
  description: string;
  date: string | null;
  startTime: string;
  endTime: string;
  address: string;
  location: string;
  cardImageUrl: string;
  bannerImageUrls: string[];
  carouselImageUrl: string;
  isFeatured: boolean;
  isCarousel: boolean;
  organizerName: string;
  organizerEmail: string;
  organizerPhone: string;
  organizerLogo: string;
  tags: string[];
  rrppEmails: string[];
  tickets: {
    type: string;
    price: number;
    quantity: string;
    maxQuantity: string;
    description: string;
    benefits: string[];
  }[];
  artists: {
    name: string;
    photoUrl: string;
  }[];
}

const initialState: EventFormState = {
  title: '',
  category: '',
  description: '',
  date: null,
  startTime: '',
  endTime: '',
  address: '',
  location: '',
  cardImageUrl: '',
  bannerImageUrls: [],
  carouselImageUrl: '',
  isFeatured: false,
  isCarousel: false,
  organizerName: '',
  organizerEmail: '',
  organizerPhone: '',
  organizerLogo: '',
  tags: [],
  rrppEmails: [],
  tickets: [],
  artists: [],
};

const eventFormSlice = createSlice({
  name: 'eventForm',
  initialState,
  reducers: {
    setEventField: (
      state,
      action: PayloadAction<{
        field: keyof EventFormState;
        value: string | boolean | string[];
      }>
    ) => {
      const { field, value } = action.payload;
      (state[field] as typeof value) = value;
    },
    addTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload.trim();
      if (!tag) return;
      if (!state.tags.includes(tag)) {
        state.tags.push(tag);
      }
    },
    removeTag: (state, action: PayloadAction<number>) => {
      state.tags.splice(action.payload, 1);
    },
    addRrppEmail: (state, action: PayloadAction<string>) => {
      const email = action.payload.trim();
      if (!email) return;
      if (!state.rrppEmails.includes(email)) {
        state.rrppEmails.push(email);
      }
    },
    removeRrppEmail: (state, action: PayloadAction<number>) => {
      state.rrppEmails.splice(action.payload, 1);
    },
    addTicket: (state, action: PayloadAction<EventFormState['tickets'][0]>) => {
      state.tickets.push(action.payload);
    },
    updateTicket: (
      state,
      action: PayloadAction<{ index: number; ticket: EventFormState['tickets'][0] }>
    ) => {
      const { index, ticket } = action.payload;
      if (state.tickets[index]) {
        state.tickets[index] = ticket;
      }
    },
    removeTicket: (state, action: PayloadAction<number>) => {
      state.tickets.splice(action.payload, 1);
    },
    addArtist: (state, action: PayloadAction<EventFormState['artists'][0]>) => {
      state.artists.push(action.payload);
    },
    updateArtist: (
      state,
      action: PayloadAction<{ index: number; artist: EventFormState['artists'][0] }>
    ) => {
      const { index, artist } = action.payload;
      if (state.artists[index]) {
        state.artists[index] = artist;
      }
    },
    removeArtist: (state, action: PayloadAction<number>) => {
      state.artists.splice(action.payload, 1);
    },
    addBannerImage: (state, action: PayloadAction<string>) => {
      state.bannerImageUrls.push(action.payload);
    },
    removeBannerImage: (state, action: PayloadAction<number>) => {
      state.bannerImageUrls.splice(action.payload, 1);
    },
    resetEventForm: () => initialState,
  },
});

export const {
  setEventField,
  addTag,
  removeTag,
  addRrppEmail,
  removeRrppEmail,
  addTicket,
  updateTicket,
  removeTicket,
  addArtist,
  updateArtist,
  removeArtist,
  addBannerImage,
  removeBannerImage,
  resetEventForm,
} = eventFormSlice.actions;

export default eventFormSlice.reducer;

