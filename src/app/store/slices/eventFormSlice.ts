import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TicketForm = {
  type: string;
  price: string; // keep as string for inputs; convert later
  quantity: string; // keep as string for inputs; convert later
  description?: string;
};

export type ArtistForm = {
  name: string;
  photoUrl?: string;
  description?: string;
  socialLinks?: string[];
};

export type EventFormState = {
  title: string;
  category: string;
  description: string;
  dateIso: string | null;
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  address: string;
  location: string;
  cardImageUrl: string;
  bannerImageUrls: string[]; // Array de URLs de banner
  carouselImageUrl: string; // Imagen para el carrusel principal
  isFeatured: boolean;
  isCarousel: boolean;
  // Información del organizador
  organizerName: string;
  organizerDescription: string;
  organizerAvatarUrl: string;
  organizerEmail: string;
  organizerPhone: string;
  tickets: TicketForm[];
  artists: ArtistForm[];
  tags: string[];
  rrppEmails: string[];
};

const initialState: EventFormState = {
  title: '',
  category: '',
  description: '',
  dateIso: null,
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
  organizerDescription: '',
  organizerAvatarUrl: '',
  organizerEmail: '',
  organizerPhone: '',
  tickets: [],
  artists: [],
  tags: [],
  rrppEmails: [],
};

const eventFormSlice = createSlice({
  name: 'eventForm',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setDateIso: (state, action: PayloadAction<string | null>) => {
      state.dateIso = action.payload;
    },
    setStartTime: (state, action: PayloadAction<string>) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action: PayloadAction<string>) => {
      state.endTime = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setCardImageUrl: (state, action: PayloadAction<string>) => {
      state.cardImageUrl = action.payload;
    },
    setBannerImageUrls: (state, action: PayloadAction<string[]>) => {
      state.bannerImageUrls = action.payload;
    },
    setCarouselImageUrl: (state, action: PayloadAction<string>) => {
      state.carouselImageUrl = action.payload;
    },
    setIsFeatured: (state, action: PayloadAction<boolean>) => {
      state.isFeatured = action.payload;
    },
    setIsCarousel: (state, action: PayloadAction<boolean>) => {
      state.isCarousel = action.payload;
    },
    setOrganizerName: (state, action: PayloadAction<string>) => {
      state.organizerName = action.payload;
    },
    setOrganizerDescription: (state, action: PayloadAction<string>) => {
      state.organizerDescription = action.payload;
    },
    setOrganizerAvatarUrl: (state, action: PayloadAction<string>) => {
      state.organizerAvatarUrl = action.payload;
    },
    setOrganizerEmail: (state, action: PayloadAction<string>) => {
      state.organizerEmail = action.payload;
    },
    setOrganizerPhone: (state, action: PayloadAction<string>) => {
      state.organizerPhone = action.payload;
    },
    setTickets: (state, action: PayloadAction<TicketForm[]>) => {
      state.tickets = action.payload;
    },
    setArtists: (state, action: PayloadAction<ArtistForm[]>) => {
      state.artists = action.payload;
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    setRrppEmails: (state, action: PayloadAction<string[]>) => {
      state.rrppEmails = action.payload;
    },
    resetEventForm: () => initialState,
  },
});

export const {
  setTitle,
  setCategory,
  setDescription,
  setDateIso,
  setStartTime,
  setEndTime,
  setAddress,
  setLocation,
  setCardImageUrl,
  setBannerImageUrls,
  setCarouselImageUrl,
  setIsFeatured,
  setIsCarousel,
  setOrganizerName,
  setOrganizerDescription,
  setOrganizerAvatarUrl,
  setOrganizerEmail,
  setOrganizerPhone,
  setTickets,
  setArtists,
  setTags,
  setRrppEmails,
  resetEventForm,
} = eventFormSlice.actions;

export default eventFormSlice.reducer;
