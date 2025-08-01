'use client';
import React, { useState } from 'react';
import { RegisterForm } from './RegisterForm';

export default function RegisterPage() {
  const [birthDate, setBirthDate] = useState<Date | undefined>();

  return (
    <div>
      <RegisterForm birthDate={birthDate} setBirthDate={setBirthDate} />
    </div>
  );
}
