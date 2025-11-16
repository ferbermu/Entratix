import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setEventField,
  addTicket,
  removeTicket,
  addArtist,
  removeArtist,
  addBannerImage,
  removeBannerImage,
  resetEventForm,
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

  const handleRemoveTicket = (index: number) => {
    dispatch(removeTicket(index));
  };

  const handleAddArtist = (artist: { name: string; photoUrl: string }) => {
    dispatch(addArtist(artist));
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
    removeTicket: handleRemoveTicket,
    addArtist: handleAddArtist,
    removeArtist: handleRemoveArtist,
    addBannerImage: handleAddBannerImage,
    removeBannerImage: handleRemoveBannerImage,
    createEvent: handleCreateEvent,
    resetForm: handleResetForm,
    isPending,
  };
};
