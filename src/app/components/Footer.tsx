import React from 'react';
import Image from 'next/image';
import { SocialLink, SocialLinkProps } from './SocialLink';
import { FooterOptionProps, FooterOption } from './FooterOptions';

const SocialLinkData: SocialLinkProps[] = [
  {
    url: 'https://twitter.com/entratix',
    icon: '/assets/icons/social-media/twitter.svg',
    alt: 'Twitter',
    width: 24,
    height: 24,
  },
  {
    url: 'https://www.facebook.com/entratix/',
    icon: '/assets/icons/social-media/facebook.svg',
    alt: 'facebook',
    width: 24,
    height: 24,
  },

  {
    url: 'https://www.instagram.com/entratix',
    icon: '/assets/icons/social-media/instagram.svg',
    alt: 'instagram',
    width: 24,
    height: 24,
  },
];

const FooterOptionsData: FooterOptionProps[] = [
  {
    title: 'Quick Links',

    option: [
      { url: '/', name: 'Home' },
      { url: '/about', name: 'About Us' },
      { url: '/how-it-works', name: 'How it Works' },
    ],
  },
  {
    title: 'Help',

    option: [
      { url: '/support', name: 'Customer Support' },
      { url: '/faqs', name: 'FAQs' },
      { url: '/terms', name: 'Terms & Conditions' },
    ],
  },
  {
    title: 'User Area',

    option: [
      { url: '/login', name: 'Login' },
      { url: '/signup', name: 'Sign Up' },
    ],
  },
];

export const Footer = () => {
  return (
    <>
      <footer className="w-full mt-auto bg-[#121010] text-white py-12 relative overflow-hidden ">
        <div className="flex max-[1280px]:flex-col max-[1280px]:items-center">
          <div className=" flex max-[1280px]:flex-col max-[1280px]:gap-4 max-[1280px]:w-full ">
            <div className="flex flex-col max-[1280px]:items-center   ml-25 max-[1280px]:ml-0 ">
              <Image
                width={200}
                height={50}
                src={'/assets/EntratixFullLogo.png'}
                alt={''}
              ></Image>
              <p className="text-gray-300 text-md mb-4 pt-4 max-[1280px]:text-center ">
                Rock, Electronica, Latin, and Beyond:
                <br />
                Entratix - Your Platform for Musical Diversity.
              </p>

              <div className="flex space-x-4 pt-8 gap-4  ">
                {SocialLinkData.map(item => (
                  <SocialLink
                    key={item.alt}
                    url={item.url}
                    icon={item.icon}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                  />
                ))}
              </div>
            </div>
            <div className="flex max-[1280px]:flex-col gap-34 max-[1280px]:gap-10  ml-37 max-[1280px]:ml-4">
              {FooterOptionsData.map((item, key) => (
                <FooterOption
                  key={key}
                  title={item.title}
                  option={item.option}
                />
              ))}
            </div>
          </div>

          <div className=" absolute -right-10 top-1/2 transform -translate-y-1/2 z-0 ">
            <Image
              src="/assets/Entratix-Logo.png"
              alt="{'Entratix Logo'}"
              width={200}
              height={50}
              className=" transform rotate-180 scale-150 opacity-10 max-[1280px]:hidden"
              priority={true}
            />
          </div>
        </div>
      </footer>

      <div className="w-full bg-black text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          © 2024 Entratix. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
