'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { calculateOrderTotal, createOrder } from '../../../actions/orders';
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
  const [orderCalculation, setOrderCalculation] = useState<{
    success: boolean;
    items?: {
      ticketId: string;
      ticketType: string;
      quantity: number;
      unitPrice: number;
      subtotal: number;
    }[];
    subtotal?: string;
    taxes?: string;
    serviceFee?: string;
    total?: string;
    currency?: string;
    message?: string;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const initialCounts: Record<string, number> = {};
    eventTickets.forEach(ticket => {
      initialCounts[ticket.id] = 0;
    });
    setTicketCounts(initialCounts);
  }, [eventTickets]);

  useEffect(() => {
    const calculateTotal = async () => {
      const selections = Object.entries(ticketCounts)
        .filter(([, count]) => count > 0)
        .map(([ticketId, count]) => ({ ticketId, quantity: count }));

      if (selections.length === 0) {
        setOrderCalculation(null);
        return;
      }

      setIsCalculating(true);
      const result = await calculateOrderTotal(eventId, selections);

      if (result.success) {
        setOrderCalculation(result);
        setError(null);
      } else {
        setError(result.message || 'Failed to calculate total');
        setOrderCalculation(null);
      }
      setIsCalculating(false);
    };

    calculateTotal();
  }, [ticketCounts, eventId]);

  const handleIncrement = (ticketId: string) => {
    const ticket = eventTickets.find(t => t.id === ticketId);
    if (ticket && ticketCounts[ticketId] < ticket.maxQuantity) {
      setTicketCounts(prev => ({ ...prev, [ticketId]: prev[ticketId] + 1 }));
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
        alert(result.message || 'Failed to create order');
      }
    });
  };

  return (
    <div className="sticky top-4 bg-gradient-to-br from-pink-500/20 via-purple-900/30 to-black/50 backdrop-blur-md p-6 rounded-lg border border-cyan-400/30">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
        Get Tickets
      </h2>

      <div className="space-y-4 mb-6">
        {eventTickets.map(ticket => (
          <EventTicketOptions
            key={ticket.id}
            {...ticket}
            count={ticketCounts[ticket.id] || 0}
            onIncrement={() => handleIncrement(ticket.id)}
            onDecrement={() => handleDecrement(ticket.id)}
          />
        ))}
      </div>

      {isCalculating && (
        <div className="text-cyan-300 text-center py-4">
          Calculating total...
        </div>
      )}

      {error && <div className="text-red-400 text-center py-4">{error}</div>}

      {orderCalculation && orderCalculation.items && (
        <div className="space-y-2 mb-6 p-4 bg-black/30 rounded-lg">
          <h3 className="font-semibold text-cyan-300 mb-2">Order Summary:</h3>
          {orderCalculation.items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>
                {item.ticketType} x {item.quantity}
              </span>
              <span>${item.subtotal.toFixed(2)}</span>
            </div>
          ))}
          <hr className="border-cyan-400/30 my-2" />
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${orderCalculation.subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxes (10%):</span>
            <span>${orderCalculation.taxes}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Service Fee (5%):</span>
            <span>${orderCalculation.serviceFee}</span>
          </div>
          <hr className="border-cyan-400/30 my-2" />
          <div className="flex justify-between font-bold text-lg text-pink-500">
            <span>Total:</span>
            <span>${orderCalculation.total}</span>
          </div>
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={isPending || !orderCalculation || isCalculating}
        className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  );
};

const EventTicketOptions: React.FC<
  IEventTicketOptions & {
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
  }
> = ({
  name,
  price,
  benefits,
  count,
  maxQuantity,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="p-4 bg-black/30 rounded-lg border border-cyan-400/20">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-cyan-300">{name}</h3>
          <p className="text-2xl font-bold text-pink-500">${price}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onDecrement}
            disabled={count === 0}
            className="w-8 h-8 bg-purple-600/50 rounded hover:bg-purple-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="w-8 text-center font-semibold">{count}</span>
          <button
            onClick={onIncrement}
            disabled={count >= maxQuantity}
            className="w-8 h-8 bg-purple-600/50 rounded hover:bg-purple-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>
      {benefits.length > 0 && (
        <ul className="text-sm text-gray-300 space-y-1">
          {benefits.map((benefit, index) => (
            <li key={index}>• {benefit}</li>
          ))}
        </ul>
      )}
      <div className="text-xs text-gray-400 mt-2">
        Max {maxQuantity} per order
      </div>
    </div>
  );
};
