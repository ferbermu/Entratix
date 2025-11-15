import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import {
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
  type TicketForm,
  type ArtistForm,
} from '../../store/slices/eventFormSlice';

export type EventFormErrors = Partial<{
  title: string;
  category: string;
  description: string;
  dateIso: string;
  startTime: string;
  endTime: string;
  address: string;
  location: string;
}>;

function isValidTime(value: string) {
  return /^\d{2}:\d{2}$/.test(value);
}

export function useEventForm() {
  const dispatch = useDispatch();
  const form = useSelector((s: RootState) => s.eventForm);

  const errors: EventFormErrors = useMemo(() => {
    const e: EventFormErrors = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.category.trim()) e.category = 'Category is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.dateIso) e.dateIso = 'Date is required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.location.trim()) e.location = 'Location is required';
    if (!isValidTime(form.startTime)) e.startTime = 'Start time must be HH:MM';
    if (!isValidTime(form.endTime)) e.endTime = 'End time must be HH:MM';
    return e;
  }, [form]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  // setters
  const onChangeTitle = useCallback(
    (v: string) => dispatch(setTitle(v)),
    [dispatch]
  );
  const onChangeCategory = useCallback(
    (v: string) => dispatch(setCategory(v)),
    [dispatch]
  );
  const onChangeDescription = useCallback(
    (v: string) => dispatch(setDescription(v)),
    [dispatch]
  );
  const onChangeDate = useCallback(
    (v: Date | null) => dispatch(setDateIso(v ? v.toISOString() : null)),
    [dispatch]
  );
  const onChangeStartTime = useCallback(
    (v: string) => dispatch(setStartTime(v)),
    [dispatch]
  );
  const onChangeEndTime = useCallback(
    (v: string) => dispatch(setEndTime(v)),
    [dispatch]
  );
  const onChangeAddress = useCallback(
    (v: string) => dispatch(setAddress(v)),
    [dispatch]
  );
  const onChangeLocation = useCallback(
    (v: string) => dispatch(setLocation(v)),
    [dispatch]
  );
  const onChangeCardImageUrl = useCallback(
    (v: string) => dispatch(setCardImageUrl(v)),
    [dispatch]
  );
  const onChangeBannerImageUrls = useCallback(
    (v: string[]) => dispatch(setBannerImageUrls(v)),
    [dispatch]
  );
  const onChangeCarouselImageUrl = useCallback(
    (v: string) => dispatch(setCarouselImageUrl(v)),
    [dispatch]
  );
  const onChangeIsFeatured = useCallback(
    (v: boolean) => dispatch(setIsFeatured(v)),
    [dispatch]
  );
  const onChangeIsCarousel = useCallback(
    (v: boolean) => dispatch(setIsCarousel(v)),
    [dispatch]
  );
  const onChangeOrganizerName = useCallback(
    (v: string) => dispatch(setOrganizerName(v)),
    [dispatch]
  );
  const onChangeOrganizerDescription = useCallback(
    (v: string) => dispatch(setOrganizerDescription(v)),
    [dispatch]
  );
  const onChangeOrganizerAvatarUrl = useCallback(
    (v: string) => dispatch(setOrganizerAvatarUrl(v)),
    [dispatch]
  );
  const onChangeOrganizerEmail = useCallback(
    (v: string) => dispatch(setOrganizerEmail(v)),
    [dispatch]
  );
  const onChangeOrganizerPhone = useCallback(
    (v: string) => dispatch(setOrganizerPhone(v)),
    [dispatch]
  );

  const updateTickets = useCallback(
    (v: TicketForm[]) => dispatch(setTickets(v)),
    [dispatch]
  );
  const updateArtists = useCallback(
    (v: ArtistForm[]) => dispatch(setArtists(v)),
    [dispatch]
  );
  const updateTags = useCallback(
    (v: string[]) => dispatch(setTags(v)),
    [dispatch]
  );
  const updateRrpp = useCallback(
    (v: string[]) => dispatch(setRrppEmails(v)),
    [dispatch]
  );

  const reset = useCallback(() => dispatch(resetEventForm()), [dispatch]);
  const uiDate = form.dateIso ? new Date(form.dateIso) : undefined;

  return {
    form,
    errors,
    isValid,
    uiDate,
    onChangeTitle,
    onChangeCategory,
    onChangeDescription,
    onChangeDate,
    onChangeStartTime,
    onChangeEndTime,
    onChangeAddress,
    onChangeLocation,
    onChangeCardImageUrl,
    onChangeBannerImageUrls,
    onChangeCarouselImageUrl,
    onChangeIsFeatured,
    onChangeIsCarousel,
    onChangeOrganizerName,
    onChangeOrganizerDescription,
    onChangeOrganizerAvatarUrl,
    onChangeOrganizerEmail,
    onChangeOrganizerPhone,
    updateTickets,
    updateArtists,
    updateTags,
    updateRrpp,
    reset,
  };
}
