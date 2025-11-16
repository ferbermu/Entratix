'use client';
import React from 'react';
import { useEventForm } from './hooks/useEventForm';

export const EventImages = () => {
  const { eventForm, updateField, addBannerImage, removeBannerImage } =
    useEventForm();

  const handleCardImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('cardImageUrl', e.target.value);
  };

  const handleCarouselImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateField('carouselImageUrl', e.target.value);
  };

  const handleBannerImageAdd = () => {
    const input = document.getElementById(
      'banner-image-input'
    ) as HTMLInputElement;
    if (input && input.value.trim()) {
      addBannerImage(input.value.trim());
      input.value = '';
    }
  };

  const handleCarouselToggle = (checked: boolean) => {
    updateField('isCarousel', checked);
    if (checked && !eventForm.carouselImageUrl) {
      // Auto-generate a carousel image if checkbox is checked and no image is set
      const randomNum = Math.floor(Math.random() * 1000);
      updateField(
        'carouselImageUrl',
        `https://picsum.photos/1920/600?${randomNum}`
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 border border-pink-500/30 max-w-[1400px] rounded-xl p-8 mx-auto mt-8 backdrop-blur-sm relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-cyan-400/5 pointer-events-none"></div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-xl font-bold relative">
          Event Images
          <div className="absolute inset-0 text-pink-500 blur-sm opacity-30">Event Images</div>
        </div>

        {/* Card image */}
        <div className="flex flex-col">
          <label className="text-cyan-300 text-sm mb-2">Card Image URL</label>
          <input
            type="text"
            value={eventForm.cardImageUrl}
            onChange={handleCardImageChange}
            placeholder="https://example.com/image.jpg"
            className="w-full bg-black/20 text-cyan-300 placeholder-gray-400 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
          />
        </div>

        {/* Banner images */}
        <div className="flex flex-col gap-3">
          <label className="text-cyan-300 text-sm">Banner Images</label>
          <div className="flex gap-2">
            <input
              id="banner-image-input"
              type="text"
              placeholder="https://example.com/banner.jpg"
              className="flex-1 bg-black/20 text-cyan-300 placeholder-gray-400 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
            />
            <button
              type="button"
              onClick={handleBannerImageAdd}
              className="cursor-pointer px-4 py-2 bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-400/40 hover:from-pink-500/60 hover:via-purple-500/60 hover:to-cyan-400/60 text-white rounded-lg transition-all duration-300 backdrop-blur-sm border border-pink-500/20 hover:border-cyan-400 relative overflow-hidden"
            >
              <span className="relative z-10">Add</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {eventForm.bannerImageUrls.map((url, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 border border-pink-500/20 px-3 py-2 rounded-lg backdrop-blur-sm"
              >
                <span className="text-cyan-300 text-sm truncate flex-1">{url}</span>
                <button
                  type="button"
                  onClick={() => removeBannerImage(index)}
                  className="ml-2 text-cyan-300 hover:text-pink-400 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel toggle + url */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-cyan-300">
            <input
              type="checkbox"
              checked={eventForm.isCarousel}
              onChange={e => handleCarouselToggle(e.target.checked)}
              className="w-4 h-4"
            />
            Show in Carousel
          </label>
          {eventForm.isCarousel && (
            <input
              type="text"
              value={eventForm.carouselImageUrl}
              onChange={handleCarouselImageChange}
              placeholder="https://example.com/carousel.jpg"
              className="w-full bg-black/20 text-cyan-300 placeholder-gray-400 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
            />
          )}
        </div>

        {/* Featured toggle */}
        <div>
          <label className="flex items-center gap-2 text-cyan-300">
            <input
              type="checkbox"
              checked={eventForm.isFeatured}
              onChange={e => updateField('isFeatured', e.target.checked)}
              className="w-4 h-4"
            />
            Featured Event
          </label>
        </div>
      </div>
    </div>
  );
};
