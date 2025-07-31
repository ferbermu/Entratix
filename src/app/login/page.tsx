'use client';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { LoginPage } from './LoginPage';

export default function RegisterPage() {
  const [date, setDate] = useState<DateRange | undefined>();
  return (
    <div>
      <LoginPage date={date} setDate={setDate} />
    </div>
  );
}
