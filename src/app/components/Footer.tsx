import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
  return (
    <>
      <footer className="w-full mt-auto bg-[#1C1C1C] text-white py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1">
            <Image
              width={200}
              height={20}
              src={'/assets/EntratixFullLogo.png'}
              alt={''}
            ></Image>
            <p className="text-gray-300 text-md mb-4 pt-4">
              Rock, Electronica, Latin, and Beyond:
              <br />
              Entratix - Your Platform for Musical Diversity.
            </p>

            <div className="flex space-x-4 pt-8 gap-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Image
                  src="/assets/icons/social-media/twitter.svg"
                  alt="Twitter"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Image
                  src="/assets/icons/social-media/facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Image
                  src="/assets/icons/social-media/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-32 md:pl-44 ">
            <div className="col-span-1 pl-4">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="text-gray-300 hover:text-white"
                  >
                    How it Works
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Help</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/support"
                    className="text-gray-300 hover:text-white"
                  >
                    Customer Support
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="text-gray-300 hover:text-white">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-300 hover:text-white"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* User Area */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">User Area</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/login"
                    className="text-gray-300 hover:text-white"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="text-gray-300 hover:text-white"
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-0">
            <Image
              src="/assets/Entratix-Logo.png"
              alt=""
              width={200}
              height={200}
              className=" transform rotate-180 scale-150 opacity-10"
              priority
            />
          </div>
        </div>
      </footer>

      {/* Copyright - Fuera del footer */}
      <div className="w-full bg-black text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          © 2024 Entratix. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
