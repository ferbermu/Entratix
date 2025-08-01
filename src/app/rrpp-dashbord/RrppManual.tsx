'use client';
import { BookOpen } from '@phosphor-icons/react';
import React from 'react';

export default function RrppManual() {
  return (
    <div className="w-full max-w-[1000px] mx-auto  flex flex-col gap-6 text-white  bg-[#3BAFBB]/10 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold flex items-center gap-4">
        <BookOpen className="text-[#3BAFBB] " size={30} /> RRPP Manual
      </h1>
      <h2 className="text-lg font-medium text-white ">Link Sales</h2>
      <div className="bg-[#3BAFBB]/10 border border-[#3BAFBB40] rounded-xl p-5">
        <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
          <li>
            Copy your personalized event link from the Active Links section
          </li>
          <li>Share the link through your social media, WhatsApp, or email</li>
          <li>
            When someone purchases through your link, youll earn commission
          </li>
          <li>Track your sales in real time through the dashboard</li>
        </ol>
      </div>
      <h2 className="text-lg font-medium text-white ">Cash Sales</h2>
      <div className="bg-[#3BAFBB]/10 border border-[#3BAFBB40] rounded-xl p-5">
        <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
          <li>Go to Cash Sales section for events where its enabled</li>
          <li>Click Sell Tickets for the desired event</li>
          <li>Fill in buyer information name, email, phone</li>
          <li>Select ticket quantity and confirm the sale</li>
          <li>Collect payment and provide ticket confirmation to buyer</li>
        </ol>
      </div>
      <h2 className="text-lg font-medium text-white ">Best Practices</h2>
      <div className="bg-[#3BAFBB]/10 border border-[#3BAFBB40] rounded-xl p-5">
        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
          <li>Build relationships with your customers for repeat sales</li>
          <li>Use the analytics to understand your audience better</li>
          <li>Create targeted campaigns based on customer preferences</li>
          <li>Follow up with customers after events for feedback</li>
          <li>Leverage social media to expand your reach</li>
        </ul>
      </div>
    </div>
  );
}
