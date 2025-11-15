'use client';

import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, Plus, X, Star, CaretCircleDoubleRight } from '@phosphor-icons/react';

interface EventImagesProps {
  cardImageUrl: string;
  bannerImageUrls: string[];
  carouselImageUrl: string;
  isFeatured: boolean;
  isCarousel: boolean;
  onChangeCardImageUrl: (url: string) => void;
  onChangeBannerImageUrls: (urls: string[]) => void;
  onChangeCarouselImageUrl: (url: string) => void;
  onChangeIsFeatured: (value: boolean) => void;
  onChangeIsCarousel: (value: boolean) => void;
}

export const EventImages: React.FC<EventImagesProps> = ({
  cardImageUrl,
  bannerImageUrls,
  carouselImageUrl,
  isFeatured,
  isCarousel,
  onChangeCardImageUrl,
  onChangeBannerImageUrls,
  onChangeCarouselImageUrl,
  onChangeIsFeatured,
  onChangeIsCarousel,
}) => {
  const [cardUrl, setCardUrl] = useState(cardImageUrl);
  const [bannerUrls, setBannerUrls] = useState<string[]>(bannerImageUrls);
  const [carouselUrl, setCarouselUrl] = useState(carouselImageUrl);
  const [newBannerUrl, setNewBannerUrl] = useState('');

  useEffect(() => {
    setCardUrl(cardImageUrl);
  }, [cardImageUrl]);

  useEffect(() => {
    setBannerUrls(bannerImageUrls);
  }, [bannerImageUrls]);

  useEffect(() => {
    setCarouselUrl(carouselImageUrl);
  }, [carouselImageUrl]);

  const addBannerUrl = () => {
    if (newBannerUrl.trim()) {
      const updated = [...bannerUrls, newBannerUrl.trim()];
      setBannerUrls(updated);
      onChangeBannerImageUrls(updated);
      setNewBannerUrl('');
    }
  };

  const removeBannerUrl = (index: number) => {
    const updated = bannerUrls.filter((_, i) => i !== index);
    setBannerUrls(updated);
    onChangeBannerImageUrls(updated);
  };

  // Cuando se marca/desmarca isCarousel, agregar/quitar imagen de alta calidad
  const handleCarouselChange = (checked: boolean) => {
    onChangeIsCarousel(checked);
    
    if (checked && !carouselUrl) {
      // Si se marca carousel y no hay imagen, agregar una imagen de alta calidad
      const highQualityImageId = Math.floor(Math.random() * 1000) + 100;
      const highQualityUrl = `https://picsum.photos/1920/1080?${highQualityImageId}`;
      setCarouselUrl(highQualityUrl);
      onChangeCarouselImageUrl(highQualityUrl);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-[#4E4B4B]/20 border border-[#4E4B4B]/80 rounded-lg">
      <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
        <ImageIcon size={32} className="text-[#3BAFBB]" />
        Event Images & Settings
      </h2>

      {/* Card Image */}
      <div className="flex flex-col gap-3">
        <label className="text-white text-lg">
          Card Image URL <span className="text-red-500">*</span>
        </label>
        <p className="text-gray-400 text-sm">
          Esta imagen se mostrará en la card del evento en la página principal
        </p>
        <input
          type="url"
          value={cardUrl}
          onChange={(e) => {
            setCardUrl(e.target.value);
            onChangeCardImageUrl(e.target.value);
          }}
          placeholder="https://example.com/card-image.jpg"
          className="w-full px-4 py-3 bg-[#1C1A1A] border border-[#4E4B4B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3BAFBB]"
        />
        {cardUrl && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-[#1C1A1A] border border-[#4E4B4B]">
            <img
              src={cardUrl}
              alt="Card preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Banner Images (Multiple) */}
      <div className="flex flex-col gap-3">
        <label className="text-white text-lg">
          Banner Image URLs <span className="text-red-500">*</span>
        </label>
        <p className="text-gray-400 text-sm">
          Estas imágenes se mostrarán como carrusel en el banner del evento
        </p>
        
        {/* Add new banner URL */}
        <div className="flex gap-2">
          <input
            type="url"
            value={newBannerUrl}
            onChange={(e) => setNewBannerUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addBannerUrl()}
            placeholder="https://example.com/banner-image.jpg"
            className="flex-1 px-4 py-3 bg-[#1C1A1A] border border-[#4E4B4B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3BAFBB]"
          />
          <button
            type="button"
            onClick={addBannerUrl}
            className="px-4 py-3 bg-[#3BAFBB] hover:bg-[#2A8C99] text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus size={20} weight="bold" />
            Add
          </button>
        </div>

        {/* List of banner URLs */}
        {bannerUrls.length > 0 && (
          <div className="flex flex-col gap-2">
            {bannerUrls.map((url, index) => (
              <div key={index} className="flex flex-col gap-2 p-3 bg-[#1C1A1A] border border-[#4E4B4B] rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm flex-1 truncate">{url}</span>
                  <button
                    type="button"
                    onClick={() => removeBannerUrl(index)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X size={20} weight="bold" />
                  </button>
                </div>
                <div className="relative w-full h-32 rounded-lg overflow-hidden bg-[#1C1A1A] border border-[#4E4B4B]">
                  <img
                    src={url}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Event Settings */}
      <div className="flex flex-col gap-4 p-4 bg-[#1C1A1A] border border-[#4E4B4B] rounded-lg">
        <h3 className="text-lg font-semibold text-white">Event Visibility</h3>
        
        {/* Featured Event */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => onChangeIsFeatured(e.target.checked)}
            className="w-5 h-5 rounded border-[#4E4B4B] bg-[#1C1A1A] text-[#3BAFBB] focus:ring-[#3BAFBB] focus:ring-offset-0 cursor-pointer"
          />
          <Star size={24} className={isFeatured ? 'text-yellow-400' : 'text-gray-400'} weight={isFeatured ? 'fill' : 'regular'} />
          <div className="flex-1">
            <p className="text-white font-medium">Featured Event</p>
            <p className="text-gray-400 text-sm">Aparecerá en la sección de eventos destacados</p>
          </div>
        </label>

        {/* Carousel Event */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={isCarousel}
            onChange={(e) => handleCarouselChange(e.target.checked)}
            className="w-5 h-5 rounded border-[#4E4B4B] bg-[#1C1A1A] text-[#3BAFBB] focus:ring-[#3BAFBB] focus:ring-offset-0 cursor-pointer"
          />
          <CaretCircleDoubleRight size={24} className={isCarousel ? 'text-[#3BAFBB]' : 'text-gray-400'} weight={isCarousel ? 'fill' : 'regular'} />
          <div className="flex-1">
            <p className="text-white font-medium">Carousel Event</p>
            <p className="text-gray-400 text-sm">Aparecerá en el carrusel principal de la home</p>
          </div>
        </label>
      </div>

      {/* Carousel Image - Solo visible si isCarousel está marcado */}
      {isCarousel && (
        <div className="flex flex-col gap-3 p-4 bg-[#1C1A1A] border border-[#3BAFBB]/50 rounded-lg">
          <label className="text-white text-lg flex items-center gap-2">
            <CaretCircleDoubleRight size={24} className="text-[#3BAFBB]" weight="fill" />
            Carousel Image URL <span className="text-red-500">*</span>
          </label>
          <p className="text-gray-400 text-sm">
            Esta imagen de alta calidad (1920x1080) se mostrará en el carrusel principal de la home
          </p>
          <input
            type="url"
            value={carouselUrl}
            onChange={(e) => {
              setCarouselUrl(e.target.value);
              onChangeCarouselImageUrl(e.target.value);
            }}
            placeholder="https://example.com/carousel-image-hd.jpg"
            className="w-full px-4 py-3 bg-[#1C1A1A] border border-[#4E4B4B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3BAFBB]"
          />
          {carouselUrl && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden bg-[#1C1A1A] border border-[#3BAFBB]/30">
              <img
                src={carouselUrl}
                alt="Carousel preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      )}

      <div className="bg-[#3BAFBB]/10 border border-[#3BAFBB]/30 rounded-lg p-4 text-gray-300 text-sm">
        <p className="font-semibold text-[#3BAFBB] mb-2">💡 Sugerencias:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Card: Proporción recomendada 16:9 o 4:3 (400x600px)</li>
          <li>Banner: Proporción recomendada 21:9 o 16:9 (1200x400px)</li>
          <li>Carousel: Alta calidad recomendada Full HD (1920x1080px)</li>
          <li>Puedes agregar múltiples imágenes de banner para crear un carrusel</li>
          <li>Al marcar "Carousel Event" se agrega automáticamente una imagen de alta calidad</li>
          <li>Puedes usar servicios como Imgur, Cloudinary, o tu propio hosting</li>
          <li>También puedes usar URLs de Picsum Photos para pruebas: https://picsum.photos/1920/1080</li>
        </ul>
      </div>
    </div>
  );
};

