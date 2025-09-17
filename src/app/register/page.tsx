'use client';
import React, { useState } from 'react';
import { RegisterForm } from './RegisterForm';

export default function RegisterPage() {
  const [birthDate, setBirthDate] = useState<Date | undefined>();

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-pink-500/15 via-purple-900/30 to-black relative overflow-hidden">
      {/* Enhanced retrowave background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-pink-500/20 via-purple-900/40 to-black/80 pointer-events-none opacity-100 z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent pointer-events-none opacity-100 z-0"></div>

      {/* Retrowave grid background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 20, 147, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        ></div>
      </div>

      {/* Enhanced neon glow effects */}
      <div
        className="fixed top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-400/30 blur-3xl rounded-full z-0"
        style={{ opacity: 1, isolation: 'isolate', willChange: 'auto' }}
      ></div>
      <div
        className="fixed bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/25 via-pink-500/25 to-purple-500/25 blur-3xl rounded-full z-0"
        style={{ opacity: 1, isolation: 'isolate', willChange: 'auto' }}
      ></div>
      <div
        className="fixed top-1/2 right-10 w-60 h-60 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-400/20 blur-2xl rounded-full z-0"
        style={{
          opacity: 1,
          isolation: 'isolate',
          willChange: 'auto',
          transform: 'translateZ(0)',
        }}
      ></div>

      <div className="relative z-10">
        <RegisterForm birthDate={birthDate} setBirthDate={setBirthDate} />
      </div>
    </div>
  );
}
