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
    <div className="space-y-4">
      <div>
        <label className="block text-white mb-2">Card Image URL</label>
        <input
          type="text"
          value={eventForm.cardImageUrl}
          onChange={handleCardImageChange}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-2 bg-black/50 border border-cyan-400/30 rounded-lg text-white focus:border-pink-500/50 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-white mb-2">Banner Images</label>
        <div className="flex gap-2">
          <input
            id="banner-image-input"
            type="text"
            placeholder="https://example.com/banner.jpg"
            className="flex-1 px-4 py-2 bg-black/50 border border-cyan-400/30 rounded-lg text-white focus:border-pink-500/50 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleBannerImageAdd}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700"
          >
            Add
          </button>
        </div>
        <div className="mt-2 space-y-1">
          {eventForm.bannerImageUrls.map((url, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-black/30 px-3 py-2 rounded"
            >
              <span className="text-cyan-300 text-sm truncate flex-1">
                {url}
              </span>
              <button
                type="button"
                onClick={() => removeBannerImage(index)}
                className="ml-2 text-red-400 hover:text-red-300"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-white mb-2">
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
            className="w-full px-4 py-2 bg-black/50 border border-cyan-400/30 rounded-lg text-white focus:border-pink-500/50 focus:outline-none"
          />
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-white">
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
  );
};
