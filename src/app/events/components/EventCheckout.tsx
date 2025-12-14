import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { startTicketCheckout } from '../../actions/orders';

interface IEventCheckout {
  eventId: string;
  userId?: string;
  ticketOptions: IEventTicketOptions[];
}

interface TicketState {
  [key: string]: number;
}

export const EventCheckout = ({ eventId, userId, ticketOptions }: IEventCheckout) => {
  const router = useRouter();
  const [ticketCounts, setTicketCounts] = useState<TicketState>({});
  const [isPending, startTransition] = useTransition();

  const fallbackTicketOptions: IEventTicketOptions[] = [
    { id: 'placeholder-1', ticketType: 'General Admission', price: 35 },
    { id: 'placeholder-2', ticketType: 'VIP', price: 80 },
  ];

  const ticketOptionsToRender =
    ticketOptions.length > 0 ? ticketOptions : fallbackTicketOptions;

  const total = Object.keys(ticketCounts).reduce((sum, id) => {
    const ticket = ticketOptionsToRender.find(t => t.id === id);
    return sum + (ticket?.price || 0) * ticketCounts[id];
  }, 0);

  const handleQuantityChange = (id: string, quantity: number) => {
    setTicketCounts(prev => ({
      ...prev,
      [id]: quantity,
    }));
  };

  const selectedTickets = Object.keys(ticketCounts)
    .filter(id => ticketCounts[id] > 0)
    .map(id => {
      const ticket = ticketOptionsToRender.find(t => t.id === id);
      return {
        ...ticket,
        quantity: ticketCounts[id],
        subtotal: (ticket?.price || 0) * ticketCounts[id],
      };
    });

  const handleCheckout = () => {
    if (!userId) {
      alert('Please login to purchase tickets');
      router.push('/login');
      return;
    }

    if (ticketOptions.length === 0) {
      alert('This event has no tickets available yet');
      return;
    }

    const selections = Object.entries(ticketCounts)
      .filter(([, quantity]) => quantity > 0)
      .map(([ticketId, quantity]) => ({ ticketId, quantity }));

    if (selections.length === 0) {
      alert('Please select at least one ticket');
      return;
    }

    startTransition(async () => {
      const result = await startTicketCheckout({ eventId, selections });
      if (!result.success || !result.initPoint) {
        alert(result.message || 'Failed to start checkout');
        return;
      }
      window.location.assign(result.initPoint);
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tabla de Tickets Disponibles */}
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
          {ticketOptionsToRender.map(opt => (
            <EventTicketOptions
              key={opt.id}
              id={opt.id}
              ticketType={opt.ticketType}
              price={opt.price}
              onQuantityChange={quantity =>
                handleQuantityChange(opt.id, quantity)
              }
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
            <div
              key={ticket.id}
              className="grid grid-cols-4 text-xl text-white"
            >
              <div className="pl-4 p-4 text-start">{ticket.ticketType}</div>
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
                  type="button"
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
    const newCount = count + 1;
    setCount(newCount);
    onQuantityChange(newCount);
  };

  return (
    <div className="grid grid-cols-3 max-[700px]:grid-cols-2 text-2xl text-white bg-gradient-to-r from-gray-900 via-black to-gray-800 max-[700px]:shadow-lg transition-all duration-300">
      <div className="p-4 text-start">{ticketType}</div>
      <div className="p-4 text-center max-[700px]:text-end max-[700px]:w-full">
        ${price}
      </div>
      <div className="p-4 flex justify-end items-center max-[700px]:col-span-2">
        <div className="flex gap-6 w-fit max-[700px]:w-full items-center max-[700px]:text-start">
          <button
            onClick={handleDecrement}
            className="bg-pink-500/20 h-10 w-10 rounded-lg text-2xl cursor-pointer hover:bg-pink-500/40 text-white border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,20,147,0.4)]"
          >
            {'-'}
          </button>
          <span>{count}</span>
          <button
            onClick={handleIncrement}
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-10 w-10 rounded-lg text-2xl cursor-pointer hover:from-pink-600 hover:to-purple-600 text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,20,147,0.4)] hover:shadow-[0_0_25px_rgba(255,20,147,0.6)] transform hover:scale-105"
          >
            {'+'}
          </button>
        </div>
      </div>
    </div>
  );
};

export interface IEventTicketOptions {
  id: string;
  ticketType: string;
  price: number;
  quantity?: number;
}
