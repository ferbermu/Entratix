'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { calculateOrderTotal, createOrder, type TicketSelection } from '../../../actions/orders';
import { useRouter } from 'next/navigation';

interface IEventCheckout {
  eventId: string;
  userId?: string;
  ticketOptions: IEventTicketOptions[];
}

interface TicketState {
  [key: string]: number; // Changed to string for UUID compatibility
}

interface OrderCalculation {
  items: Array<{
    ticketId: string;
    ticketType: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }>;
  subtotal: number;
  taxes: number;
  serviceFee: number;
  total: number;
  currency: string;
}

export const EventCheckout = ({ eventId, userId, ticketOptions }: IEventCheckout) => {
  const router = useRouter();
  const [ticketCounts, setTicketCounts] = useState<TicketState>({});
  const [calculation, setCalculation] = useState<OrderCalculation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Recalcular totales cuando cambian las cantidades
  useEffect(() => {
    const recalculate = async () => {
      const selections = Object.keys(ticketCounts)
        .filter(id => ticketCounts[id] > 0)
        .map(id => ({
          ticketId: id,
          quantity: ticketCounts[id],
        }));

      if (selections.length === 0) {
        setCalculation(null);
        setError(null);
        return;
      }

      setIsCalculating(true);
      setError(null);

      const result = await calculateOrderTotal(eventId, selections);

      if ('error' in result) {
        setError(result.error);
        setCalculation(null);
      } else {
        setCalculation(result);
      }

      setIsCalculating(false);
    };

    recalculate();
  }, [ticketCounts, eventId]);

  const handleQuantityChange = (id: string, quantity: number) => {
    setTicketCounts(prev => ({
      ...prev,
      [id]: quantity,
    }));
  };

  const handleCheckout = async () => {
    if (!userId) {
      alert('Debes iniciar sesión para comprar tickets');
      router.push('/login');
      return;
    }

    if (!calculation || calculation.items.length === 0) {
      alert('Selecciona al menos un ticket');
      return;
    }

    const ticketSelections: TicketSelection[] = calculation.items.map(item => ({
      ticketId: item.ticketId,
      quantity: item.quantity,
    }));

    startTransition(async () => {
      const result = await createOrder({
        userId,
        eventId,
        ticketSelections,
        paymentMethod: 'cash', // Por ahora solo cash
      });

      if (result.success) {
        alert(`¡Orden creada exitosamente! Número de orden: ${result.orderNumber}`);
        router.push('/my-tickets');
      } else {
        alert(`Error: ${result.message}`);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tabla de Tickets Disponibles */}
      <div className="w-full bg-[#3BAFBB0D] max-[700px]:bg-transparent rounded-lg overflow-hidden divide-y divide-[#3BAFBB29]">
        <div className="grid grid-cols-3 max-[700px]:grid-cols-2 text-[#3BAFBB] text-lg">
          <div className="pl-4 p-4 font-normal text-start">Ticket</div>
          <div className="p-4 font-normal text-center max-[700px]:text-end">
            Price
          </div>
          <div className="p-4 font-normal justify-self-end flex max-[700px]:hidden">
            <div className="flex w-fit px-14">Buy</div>
          </div>
        </div>

        <div className="flex flex-col max-[700px]:gap-2.5 max-[700px]:py-4 divide-y divide-[#3BAFBB29]">
          {ticketOptions.map(opt => (
            <EventTicketOptions
              key={opt.id}
              id={opt.id}
              ticketType={opt.ticketType}
              price={opt.price}
              quantity={opt.quantity}
              onQuantityChange={quantity =>
                handleQuantityChange(opt.id, quantity)
              }
            />
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="w-full bg-red-500/10 border border-red-500 rounded-lg p-4">
          <p className="text-red-500 text-center">{error}</p>
        </div>
      )}

      {/* Tickets Seleccionados */}
      {calculation && calculation.items.length > 0 && (
        <div className="w-full bg-[#3BAFBB0D] rounded-lg overflow-hidden divide-y divide-[#3BAFBB29]">
          <div className="grid grid-cols-4 text-[#3BAFBB] text-lg">
            <div className="pl-4 p-4 font-normal text-start">Ticket</div>
            <div className="p-4 font-normal text-center">Price($)</div>
            <div className="p-4 font-normal text-center">Qty</div>
            <div className="p-4 font-normal text-end">Sub-total($)</div>
          </div>

          {calculation.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 text-xl text-white"
            >
              <div className="pl-4 p-4 text-start">{item.ticketType}</div>
              <div className="p-4 text-center">{item.unitPrice}</div>
              <div className="p-4 text-center">{item.quantity}</div>
              <div className="p-4 text-end">${item.subtotal.toFixed(2)}</div>
            </div>
          ))}

          {/* Subtotal, Taxes, Service Fee */}
          <div className="flex flex-col divide-y divide-[#3BAFBB29]">
            <div className="grid grid-cols-2 text-lg text-gray-300 p-4">
              <div className="text-start">Subtotal:</div>
              <div className="text-end">${calculation.subtotal.toFixed(2)}</div>
            </div>
            <div className="grid grid-cols-2 text-lg text-gray-300 p-4">
              <div className="text-start">Taxes (10%):</div>
              <div className="text-end">${calculation.taxes.toFixed(2)}</div>
            </div>
            <div className="grid grid-cols-2 text-lg text-gray-300 p-4">
              <div className="text-start">Service Fee (5%):</div>
              <div className="text-end">${calculation.serviceFee.toFixed(2)}</div>
            </div>
          </div>

          <div className="p-4 items-center flex">
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-center">
                <button 
                  onClick={handleCheckout}
                  disabled={isPending || isCalculating}
                  className="bg-[#3BAFBB] text-white px-14 py-3 rounded-lg hover:bg-[#3BAFBB]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Procesando...' : 'Checkout'}
                </button>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-sm text-[#FBFBFB]/75">Total</span>
                <span className="text-[32px] font-semibold text-[#3BAFBB]">
                  ${isCalculating ? '...' : calculation.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface EventTicketOptionsProps extends IEventTicketOptions {
  onQuantityChange: (quantity: number) => void;
}

export const EventTicketOptions = ({
  ticketType,
  price,
  quantity: maxQuantity,
  onQuantityChange,
}: EventTicketOptionsProps) => {
  const [count, setCount] = useState(0);

  const handleDecrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      onQuantityChange(newCount);
    }
  };

  const handleIncrement = () => {
    // Check if there's a max quantity limit
    if (maxQuantity !== null && maxQuantity !== undefined && count >= maxQuantity) {
      alert(`Solo hay ${maxQuantity} tickets disponibles de este tipo`);
      return;
    }
    
    const newCount = count + 1;
    setCount(newCount);
    onQuantityChange(newCount);
  };

  return (
    <div className="grid grid-cols-3 max-[700px]:grid-cols-2 text-2xl text-white max-[700px]:border max-[700px]:bg-[#3BAFBB0D] max-[700px]:border-[#3BAFBB29] max-[700px]:rounded-lg">
      <div className="p-4 text-start">{ticketType}</div>
      <div className="p-4 text-center max-[700px]:text-end max-[700px]:w-full">
        ${price}
      </div>
      <div className="p-4 flex justify-end items-center max-[700px]:col-span-2">
        <div className="flex gap-6 w-fit max-[700px]:w-full items-center max-[700px]:text-start">
          <button
            onClick={handleDecrement}
            className="bg-[#3BAFBB1A]/90 h-10 w-10 rounded-lg text-2xl cursor-pointer hover:bg-[#3BAFBB1A] text-white"
          >
            -
          </button>
          <span>{count}</span>
          <button
            onClick={handleIncrement}
            className="bg-[#3BAFBB] h-10 w-10 rounded-lg text-2xl cursor-pointer hover:bg-[#3BAFBB]/80 text-white"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export interface IEventTicketOptions {
  id: string; // Changed to string for UUID
  ticketType: string;
  price: number;
  quantity?: number | null;
}
