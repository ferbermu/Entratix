import React, { useState } from 'react';

interface IEventCheckout {
  ticketOptions: IEventTicketOptions[];
}

interface TicketState {
  [key: number]: number;
}

export const EventCheckout = ({ ticketOptions }: IEventCheckout) => {
  const [ticketCounts, setTicketCounts] = useState<TicketState>({});

  const total = Object.keys(ticketCounts).reduce((sum, id) => {
    const ticket = ticketOptions.find(t => t.id === Number(id));
    return sum + (ticket?.price || 0) * ticketCounts[Number(id)];
  }, 0);

  const handleQuantityChange = (id: number, quantity: number) => {
    setTicketCounts(prev => ({
      ...prev,
      [id]: quantity,
    }));
  };

  const selectedTickets = Object.keys(ticketCounts)
    .filter(id => ticketCounts[Number(id)] > 0)
    .map(id => {
      const ticket = ticketOptions.find(t => t.id === Number(id));
      return {
        ...ticket,
        quantity: ticketCounts[Number(id)],
        subtotal: (ticket?.price || 0) * ticketCounts[Number(id)],
      };
    });

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
              onQuantityChange={quantity =>
                handleQuantityChange(opt.id, quantity)
              }
            />
          ))}
        </div>
      </div>

      {/* Tickets Seleccionados */}
      {selectedTickets.length > 0 && (
        <div className="w-full bg-[#3BAFBB0D] rounded-lg overflow-hidden divide-y divide-[#3BAFBB29]">
          <div className="grid grid-cols-4 text-[#3BAFBB] text-lg">
            <div className="pl-4 p-4 font-normal text-start">Ticket</div>
            <div className="p-4 font-normal text-center">Price($)</div>
            <div className="p-4 font-normal text-center">Qty</div>
            <div className="p-4 font-normal text-end">Sub-total($)</div>
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
              <div className="flex justify-center  ">
                <button className="bg-[#3BAFBB] text-white px-14 py-3 rounded-lg hover:bg-[#3BAFBB]/80 transition-colors">
                  Checkout
                </button>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-sm text-[#FBFBFB]/75">Total</span>
                <span className="text-[32px] font-semibold text-[#3BAFBB]">
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
  id: number;
  ticketType: string;
  price: number;
  quantity?: number;
}
