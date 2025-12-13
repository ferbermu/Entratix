'use client';

import React, { useMemo, useState, useEffect, useTransition } from 'react';
import { createOrder } from '../../../actions/orders';
import { useRouter } from 'next/navigation';

interface IEventTicketOptions {
  id: string;
  name: string;
  price: number;
  benefits: string[];
  maxQuantity: number;
}

interface EventCheckoutProps {
  eventId: string;
  userId: string | undefined;
  eventTickets: IEventTicketOptions[];
}

export const EventCheckout: React.FC<EventCheckoutProps> = ({
  eventId,
  userId,
  eventTickets,
}) => {
  const router = useRouter();
  const [ticketCounts, setTicketCounts] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fallbackTickets = useMemo<IEventTicketOptions[]>(
    () => [
      {
        id: 'placeholder-1',
        name: 'General Admission',
        price: 35,
        benefits: [],
        maxQuantity: 10,
      },
      { id: 'placeholder-2', name: 'VIP', price: 80, benefits: [], maxQuantity: 10 },
    ],
    []
  );

  const ticketsToRender = useMemo<IEventTicketOptions[]>(
    () => (eventTickets.length > 0 ? eventTickets : fallbackTickets),
    [eventTickets, fallbackTickets]
  );

  const ticketIdsKey = useMemo(
    () => ticketsToRender.map(t => t.id).join('|'),
    [ticketsToRender]
  );

  useEffect(() => {
    const initialCounts: Record<string, number> = {};
    ticketsToRender.forEach(ticket => {
      initialCounts[ticket.id] = 0;
    });
    setTicketCounts(prev => {
      const prevKeys = Object.keys(prev).join('|');
      if (prevKeys === ticketIdsKey) return prev;
      return initialCounts;
    });
  }, [ticketIdsKey, ticketsToRender]);

  const handleIncrement = (ticketId: string) => {
    const ticket = ticketsToRender.find(t => t.id === ticketId);
    const maxQty = ticket && ticket.maxQuantity > 0 ? ticket.maxQuantity : 10;
    if ((ticketCounts[ticketId] || 0) < maxQty) {
      setTicketCounts(prev => ({ ...prev, [ticketId]: (prev[ticketId] || 0) + 1 }));
    }
  };

  const handleDecrement = (ticketId: string) => {
    setTicketCounts(prev => ({
      ...prev,
      [ticketId]: Math.max(0, prev[ticketId] - 1),
    }));
  };

  const handleCheckout = async () => {
    if (!userId) {
      alert('Please login to purchase tickets');
      router.push('/login');
      return;
    }

    const selections = Object.entries(ticketCounts)
      .filter(([, count]) => count > 0)
      .map(([ticketId, count]) => ({ ticketId, quantity: count }));

    if (selections.length === 0) {
      alert('Please select at least one ticket');
      return;
    }

    startTransition(async () => {
      const result = await createOrder({
        userId,
        eventId,
        selections,
        paymentMethod: 'cash',
      });

      if (result.success) {
        alert(`Order created successfully! Order #${result.orderNumber}`);
        router.push('/my-tickets');
      } else {
        const msg = result.message || 'Failed to create order';
        setError(msg);
        alert(msg);
      }
    });
  };

  const selectedTickets = Object.entries(ticketCounts)
    .filter(([, qty]) => qty > 0)
    .map(([ticketId, qty]) => {
      const ticket = ticketsToRender.find(t => t.id === ticketId);
      return {
        id: ticketId,
        name: ticket?.name || 'Ticket',
        price: ticket?.price || 0,
        quantity: qty,
        subtotal: (ticket?.price || 0) * qty,
      };
    });

  const total = selectedTickets.reduce((sum, t) => sum + t.subtotal, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Tabla de Tickets Disponibles (misma estética que /events) */}
      <div className="w-full bg-gradient-to-r from-gray-900 via-black to-gray-800 overflow-hidden divide-y divide-cyan-400/40 shadow-2xl transition-all duration-300">
        <div className="grid grid-cols-3 max-[700px]:grid-cols-2 text-pink-500 text-lg font-condensed">
          <div className="pl-4 p-4 font-normal text-start drop-shadow-[0_0_8px_rgba(255,20,147,0.6)]">
            Ticket
          </div>
          <div className="p-4 font-normal text-center max-[700px]:text-end drop-shadow-[0_0_8px_rgba(255,20,147,0.6)]">
            Price
          </div>
          <div className="p-4 font-normal justify-self-end flex max-[700px]:hidden">
            <div className="flex w-fit px-14 drop-shadow-[0_0_8px_rgba(255,20,147,0.6)]">
              Buy
            </div>
          </div>
        </div>

        <div className="flex flex-col max-[700px]:gap-2.5 max-[700px]:py-4 divide-y divide-gray-600/40">
          {ticketsToRender.map(ticket => (
            <EventTicketOptions
              key={ticket.id}
              id={ticket.id}
              name={ticket.name}
              price={ticket.price}
              count={ticketCounts[ticket.id] || 0}
              maxQuantity={ticket.maxQuantity}
              onIncrement={() => handleIncrement(ticket.id)}
              onDecrement={() => handleDecrement(ticket.id)}
            />
          ))}
        </div>
      </div>

      {/* Tickets Seleccionados */}
      {selectedTickets.length > 0 && (
        <div className="w-full bg-gradient-to-r from-gray-900 via-black to-gray-800 overflow-hidden divide-y divide-cyan-400/40 shadow-2xl transition-all duration-300">
          <div className="grid grid-cols-4 text-purple-500 text-lg font-condensed">
            <div className="pl-4 p-4 font-normal text-start drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
              Ticket
            </div>
            <div className="p-4 font-normal text-center drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
              Price($)
            </div>
            <div className="p-4 font-normal text-center drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
              Qty
            </div>
            <div className="p-4 font-normal text-end drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
              Sub-total($)
            </div>
          </div>

          {selectedTickets.map(ticket => (
            <div key={ticket.id} className="grid grid-cols-4 text-xl text-white">
              <div className="pl-4 p-4 text-start">{ticket.name}</div>
              <div className="p-4 text-center">{ticket.price}</div>
              <div className="p-4 text-center">{ticket.quantity}</div>
              <div className="p-4 text-end">${ticket.subtotal}</div>
            </div>
          ))}

          <div className="p-4 items-center flex">
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-center">
                <button
                  onClick={handleCheckout}
                  disabled={isPending}
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white px-14 py-3 rounded-lg font-condensed font-semibold hover:from-pink-600 hover:via-purple-600 hover:to-cyan-500 transition-all duration-300 shadow-[0_0_20px_rgba(255,20,147,0.5)] hover:shadow-[0_0_30px_rgba(255,20,147,0.8)] transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Processing...' : 'Checkout'}
                </button>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-sm text-cyan-300/80 font-condensed drop-shadow-[0_0_5px_rgba(0,255,255,0.4)]">
                  Total
                </span>
                <span className="text-[32px] font-condensed font-bold text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text drop-shadow-[0_0_15px_rgba(0,255,255,0.6)]">
                  ${total}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 text-center text-red-400">{error}</div>
          )}
        </div>
      )}
    </div>
  );
};

const EventTicketOptions: React.FC<
  {
    id: string;
    name: string;
    price: number;
    count: number;
    maxQuantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
  }
> = ({
  count,
  onIncrement,
  onDecrement,
  name,
  price,
  maxQuantity,
}) => {
  const maxQty = maxQuantity > 0 ? maxQuantity : 10;
  return (
    <div className="grid grid-cols-3 max-[700px]:grid-cols-2 text-2xl text-white bg-gradient-to-r from-gray-900 via-black to-gray-800 max-[700px]:shadow-lg transition-all duration-300">
      <div className="p-4 text-start">{name}</div>
      <div className="p-4 text-center max-[700px]:text-end max-[700px]:w-full">
        ${price}
      </div>
      <div className="p-4 flex justify-end items-center max-[700px]:col-span-2">
        <div className="flex gap-6 w-fit max-[700px]:w-full items-center max-[700px]:text-start">
          <button
            onClick={onDecrement}
            disabled={count === 0}
            className="bg-pink-500/20 h-10 w-10 rounded-lg text-2xl cursor-pointer hover:bg-pink-500/40 text-white border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,20,147,0.4)] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {'-'}
          </button>
          <span>{count}</span>
          <button
            onClick={onIncrement}
            disabled={count >= maxQty}
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-10 w-10 rounded-lg text-2xl cursor-pointer hover:from-pink-600 hover:to-purple-600 text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,20,147,0.4)] hover:shadow-[0_0_25px_rgba(255,20,147,0.6)] transform hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {'+'}
          </button>
        </div>
      </div>
    </div>
  );
};
