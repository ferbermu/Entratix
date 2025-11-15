'use client';
import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { EventDetails } from './EventDetails';
import { CreateTicket } from './CreateTicket';
import { CreateArtist } from './CreateArtist';
import { EventTags } from './EventTags';
import { EventImages } from './EventImages';
import { EventOrganizer } from './EventOrganizer';
import { FloppyDisk } from '@phosphor-icons/react';
import { AddRrpp } from './AddRrpp';
import { createEventAction } from './actions';
import { useEventForm } from './hooks/useEventForm';
import { generateRandomEventData } from './utils/randomEventData';

export default function CreateEventPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
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
  } = useEventForm();

  const showDevButton = process.env.NEXT_PUBLIC_NODE_ENV === 'DEV';

  const fillWithRandom = () => {
    const randomData = generateRandomEventData();

    // Actualizar store Redux (solo llenar el formulario)
    onChangeDate(randomData.date);
    onChangeStartTime(randomData.startTime);
    onChangeEndTime(randomData.endTime);
    onChangeTitle(randomData.title);
    onChangeCategory(randomData.category);
    onChangeDescription(randomData.description);
    onChangeAddress(randomData.address);
    onChangeLocation(randomData.location);
    onChangeCardImageUrl(randomData.cardImageUrl);
    onChangeBannerImageUrls(randomData.bannerImageUrls);
    onChangeCarouselImageUrl(randomData.carouselImageUrl);
    onChangeIsFeatured(randomData.isFeatured);
    onChangeIsCarousel(randomData.isCarousel);
    onChangeOrganizerName(randomData.organizerName);
    onChangeOrganizerDescription(randomData.organizerDescription);
    onChangeOrganizerAvatarUrl(randomData.organizerAvatarUrl);
    onChangeOrganizerEmail(randomData.organizerEmail);
    onChangeOrganizerPhone(randomData.organizerPhone);
    updateTickets(randomData.tickets);
    updateArtists(randomData.artists);
    updateTags(randomData.tags);
    updateRrpp(randomData.rrppEmails);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center justify-center py-30 gap-4">
        <h1 className="text-5xl text-[#3BAFBB] font-bold">Create New Event</h1>
        <p className="text-gray-300 text-xl">
          Bring your vision to life and create unforgettable experiences
        </p>
      </div>
      <EventDetails
        eventDate={uiDate}
        setEventDate={d => onChangeDate(d ?? null)}
        location={form.location}
        setLocation={onChangeLocation}
        title={form.title}
        category={form.category}
        description={form.description}
        address={form.address}
        startTime={form.startTime}
        endTime={form.endTime}
        onChangeTitle={onChangeTitle}
        onChangeCategory={onChangeCategory}
        onChangeDescription={onChangeDescription}
        onChangeAddress={onChangeAddress}
        onChangeTimes={(start, end) => {
          if (start) onChangeStartTime(start);
          if (end) onChangeEndTime(end);
        }}
      />
      <div>
        <CreateArtist artists={form.artists} onUpdate={updateArtists} />
      </div>
      <div>
        <CreateTicket tickets={form.tickets} onUpdate={updateTickets} />
      </div>
      <div>
        <EventTags tags={form.tags} onUpdate={updateTags} />
      </div>
      <div>
        <EventImages
          cardImageUrl={form.cardImageUrl}
          bannerImageUrls={form.bannerImageUrls}
          carouselImageUrl={form.carouselImageUrl}
          isFeatured={form.isFeatured}
          isCarousel={form.isCarousel}
          onChangeCardImageUrl={onChangeCardImageUrl}
          onChangeBannerImageUrls={onChangeBannerImageUrls}
          onChangeCarouselImageUrl={onChangeCarouselImageUrl}
          onChangeIsFeatured={onChangeIsFeatured}
          onChangeIsCarousel={onChangeIsCarousel}
        />
      </div>
      <div>
        <EventOrganizer
          organizerName={form.organizerName}
          organizerDescription={form.organizerDescription}
          organizerAvatarUrl={form.organizerAvatarUrl}
          organizerEmail={form.organizerEmail}
          organizerPhone={form.organizerPhone}
          onChangeOrganizerName={onChangeOrganizerName}
          onChangeOrganizerDescription={onChangeOrganizerDescription}
          onChangeOrganizerAvatarUrl={onChangeOrganizerAvatarUrl}
          onChangeOrganizerEmail={onChangeOrganizerEmail}
          onChangeOrganizerPhone={onChangeOrganizerPhone}
        />
      </div>
      <div>
        <AddRrpp rrppEmails={form.rrppEmails} onUpdate={updateRrpp} />
      </div>

      <div className="flex items-center justify-center w-full py-10 ">
        {showDevButton && (
          <button
            onClick={fillWithRandom}
            type="button"
            className="mr-4 cursor-pointer flex gap-2 items-center text-lg bg-[#3baebb32] hover:bg-[#3baebb32]/20 text-white font-semibold px-6 py-4 rounded-2xl transition-all"
          >
            Auto-fill (DEV)
          </button>
        )}
        <button
          onClick={() => {
            if (!isValid) {
              // Puedes reemplazar por un toast
              alert('Por favor completa los campos obligatorios.');
              return;
            }
            startTransition(async () => {
              await createEventAction({
                title: form.title,
                category: form.category,
                description: form.description,
                date: new Date(form.dateIso!),
                startTime: form.startTime,
                endTime: form.endTime,
                address: form.address,
                location: form.location,
                cardImageUrl: form.cardImageUrl || undefined,
                bannerImageUrls:
                  form.bannerImageUrls.length > 0
                    ? form.bannerImageUrls
                    : undefined,
                carouselImageUrl: form.carouselImageUrl || undefined,
                isFeatured: form.isFeatured,
                isCarousel: form.isCarousel,
                organizerName: form.organizerName || undefined,
                organizerDescription: form.organizerDescription || undefined,
                organizerAvatarUrl: form.organizerAvatarUrl || undefined,
                organizerEmail: form.organizerEmail || undefined,
                organizerPhone: form.organizerPhone || undefined,
                tickets: form.tickets.map(t => ({
                  type: t.type,
                  price: parseFloat(t.price || '0'),
                  quantity: parseInt(t.quantity || '0', 10),
                  description: t.description || undefined,
                })),
                artists: form.artists.map(a => ({
                  name: a.name,
                  photoUrl: a.photoUrl || undefined,
                  description: a.description || undefined,
                  socialLinks: a.socialLinks || [],
                })),
                tags: form.tags,
                rrppEmails: form.rrppEmails,
              });
              reset();
              router.push('/');
            });
          }}
          disabled={isPending}
          className="cursor-pointer flex gap-2 items-center text-xl bg-[#3BAFBB] hover:bg-[#2A8C99] text-white font-semibold px-16 py-5 rounded-2xl transition-all disabled:opacity-60"
        >
          <FloppyDisk size={32} />
          {isPending ? 'Creating...' : 'Create Event'}
        </button>
      </div>
    </div>
  );
}
