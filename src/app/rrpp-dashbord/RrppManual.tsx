'use client';
import { BookOpen } from '@phosphor-icons/react';
import React from 'react';
import { motion } from 'framer-motion';

export default function RrppManual() {
  const sections = [
    {
      title: 'Link Sales',
      content: (
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
      ),
    },
    {
      title: 'Cash Sales',
      content: (
        <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
          <li>Go to Cash Sales section for events where its enabled</li>
          <li>Click Sell Tickets for the desired event</li>
          <li>Fill in buyer information name, email, phone</li>
          <li>Select ticket quantity and confirm the sale</li>
          <li>Collect payment and provide ticket confirmation to buyer</li>
        </ol>
      ),
    },
    {
      title: 'Best Practices',
      content: (
        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
          <li>Build relationships with your customers for repeat sales</li>
          <li>Use the analytics to understand your audience better</li>
          <li>Create targeted campaigns based on customer preferences</li>
          <li>Follow up with customers after events for feedback</li>
          <li>Leverage social media to expand your reach</li>
        </ul>
      ),
    },
  ];

  return (
    <motion.div
      className="w-full max-w-[1000px] mx-auto flex flex-col gap-6 text-white bg-[#3BAFBB]/10 p-6 rounded-lg shadow-lg"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <motion.h1
        className="text-2xl font-semibold flex items-center gap-4"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      >
        <BookOpen className="text-[#3BAFBB]" size={30} /> RRPP Manual
      </motion.h1>

      {sections.map((section, idx) => (
        <motion.div
          key={idx}
          className="bg-[#3BAFBB]/10 border border-[#3BAFBB40] rounded-xl p-5"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <h2 className="text-lg font-medium text-white">{section.title}</h2>
          <div className="mt-2">{section.content}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
