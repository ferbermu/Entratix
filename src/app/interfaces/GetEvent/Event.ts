export interface GetEvent {
  id: string;
  title: string;
  location?: string | null;
  address?: string | null;
  date?: Date | string | null;
  startTime?: string | null;
  cardImageUrl?: string | null;
  carouselImageUrl?: string | null;
  bannerImageUrls?: string[] | null;
}



