import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setEventField,
  addTicket,
  updateTicket,
  removeTicket,
  addArtist,
  updateArtist,
  removeArtist,
  addBannerImage,
  removeBannerImage,
  resetEventForm,
  addTag,
  removeTag,
  addRrppEmail,
  removeRrppEmail,
} from '../../store/slices/eventFormSlice';
import { createEventAction } from '../actions';
import { useTransition } from 'react';

export const useEventForm = () => {
  const dispatch = useAppDispatch();
  const eventForm = useAppSelector(state => state.eventForm);
  const [isPending] = useTransition();

  const updateField = (field: string, value: string | boolean | string[]) => {
    dispatch(setEventField({ field: field as keyof typeof eventForm, value }));
  };

  const handleAddTicket = (ticket: {
    type: string;
    price: number;
    quantity: string;
    maxQuantity: string;
    description: string;
    benefits: string[];
  }) => {
    dispatch(addTicket(ticket));
  };

  const handleUpdateTicket = (index: number, ticket: typeof eventForm.tickets[0]) => {
    dispatch(updateTicket({ index, ticket }));
  };

  const handleRemoveTicket = (index: number) => {
    dispatch(removeTicket(index));
  };

  const handleAddArtist = (artist: { name: string; photoUrl: string }) => {
    dispatch(addArtist(artist));
  };

  const handleUpdateArtist = (index: number, artist: typeof eventForm.artists[0]) => {
    dispatch(updateArtist({ index, artist }));
  };

  const handleRemoveArtist = (index: number) => {
    dispatch(removeArtist(index));
  };

  const handleAddBannerImage = (imageUrl: string) => {
    dispatch(addBannerImage(imageUrl));
  };

  const handleRemoveBannerImage = (index: number) => {
    dispatch(removeBannerImage(index));
  };

  const handleAddTag = (tag: string) => {
    dispatch(addTag(tag));
  };

  const handleRemoveTag = (index: number) => {
    dispatch(removeTag(index));
  };

  const handleAddRrppEmail = (email: string) => {
    dispatch(addRrppEmail(email));
  };

  const handleRemoveRrppEmail = (index: number) => {
    dispatch(removeRrppEmail(index));
  };

  const handleCreateEvent = async () => {
    if (!eventForm.date) {
      return { success: false, message: 'Please select a date' };
    }

    const result = await createEventAction({
      ...eventForm,
      date: new Date(eventForm.date),
    });

    if (result.success) {
      dispatch(resetEventForm());
    }

    return result;
  };

  const handleResetForm = () => {
    dispatch(resetEventForm());
  };

  return {
    eventForm,
    updateField,
    addTicket: handleAddTicket,
    updateTicket: handleUpdateTicket,
    removeTicket: handleRemoveTicket,
    addArtist: handleAddArtist,
    updateArtist: handleUpdateArtist,
    removeArtist: handleRemoveArtist,
    addBannerImage: handleAddBannerImage,
    removeBannerImage: handleRemoveBannerImage,
    addTag: handleAddTag,
    removeTag: handleRemoveTag,
    addRrppEmail: handleAddRrppEmail,
    removeRrppEmail: handleRemoveRrppEmail,
    createEvent: handleCreateEvent,
    resetForm: handleResetForm,
    isPending,
  };
};
