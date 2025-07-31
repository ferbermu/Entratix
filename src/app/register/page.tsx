'use client';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { RegisterForm } from './RegisterForm';

export default function RegisterPage() {
  const [date, setDate] = useState<DateRange | undefined>();
  return (
    <div>
      <RegisterForm date={date} setDate={setDate} />
    </div>
  );
}
