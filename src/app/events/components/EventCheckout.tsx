import React, { useState } from 'react';

interface IEventCheckout {
  ticketOptions: IEventTicketOptions[];
}

export const EventCheckout = ({ ticketOptions }: IEventCheckout) => {
  return (
    <div className="w-full bg-[#3BAFBB0D] max-[700px]:bg-transparent  rounded-lg overflow-hidden divide-y divide-[#3BAFBB29]">
      {/* Header */}
      <div className="grid grid-cols-3 max-[700px]:grid-cols-2 text-[#3BAFBB] text-lg">
        <div className="pl-4 p-4 font-normal text-start">Ticket</div>
        <div className="p-4 font-normal text-center max-[700px]:text-end">
          Price
        </div>
        <div className="p-4 font-normal justify-self-end flex max-[700px]:hidden">
          <div className="flex w-fit px-14">Buy</div>
        </div>
      </div>
      {/* Body */}
      <div className="flex flex-col max-[700px]:gap-2.5 max-[700px]:py-4 divide-y divide-[#3BAFBB29]">
        {ticketOptions.map(opt => (
          <EventTicketOptions
            key={opt.id}
            id={opt.id}
            ticketType={opt.ticketType}
            price={opt.price}
          />
        ))}
      </div>
    </div>
  );
};

export const EventCheckoutDetails = ({ ticketOptions }: IEventCheckout) => {
  return (
    <div className="w-full bg-[#3BAFBB0D] rounded-lg overflow-hidden divide-y  divide-[#3BAFBB29]">
      <div className="grid grid-cols-4 text-[#FBFBFB]/75 text-lg max-[700px]:text-sm">
        <div className="pl-4 p-4 text-start">Ticket</div>
        <div className="p-4 text-center">Price($)</div>
        <div className="p-4 text-center">Qty</div>
        <div className="p-4 text-end px-5">Sub Total($)</div>
      </div>

      {ticketOptions.map(opt => (
        <EventTicketOptionDetails
          key={opt.id}
          id={opt.id}
          ticketType={opt.ticketType}
          price={opt.price}
          quantity={opt.quantity}
        />
      ))}

      <div className="grid grid-cols-4 border-t border-[#3BAFBB29] text-white text-lg">
        <div className="p-4 text-start">
          <button className="bg-[#3BAFBB] px-8 py-3 rounded-lg text-xl cursor-pointer">
            CheckOut
          </button>
        </div>
        <div />
        <div />
        <div className="p-4 flex flex-col items-end">
          <span className="text-lg text-[#FBFBFB]/75">Total</span>
          <span className="text-[26px] font-semibold text-[#3BAFBB]">
            $3900
          </span>
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

export const EventTicketOptions = ({
  id,
  ticketType,
  price,
}: IEventTicketOptions) => {
  const [count, setCount] = useState(0);

  const handleDecrement = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div className="grid grid-cols-3 max-[700px]:grid-cols-2 text-2xl text-white max-[700px]:border max-[700px]:bg-[#3BAFBB0D] max-[700px]:border-[#3BAFBB29] max-[700px]:rounded-lg ">
      <div className="p-4 text-start">{ticketType}</div>
      <div className="p-4 text-center max-[700px]:text-end  max-[700px]:w-full ">
        ${price}
      </div>
      <div className="p-4 flex justify-end items-center max-[700px]:col-span-2">
        <div className="flex gap-6 w-fit max-[700px]:w-full items-center max-[700px]:text-start ">
          <button
            onClick={handleDecrement}
            className="bg-[#3BAFBB1A]/90 h-10 w-10 rounded-lg text-2xl cursor-pointer hover:bg-[#3BAFBB1A] text-white"
          >
            -
          </button>
          <span>{count}</span>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-[#3BAFBB] h-10 w-10 rounded-lg text-2xl cursor-pointer hover:bg-[#3BAFBB]/80 text-white"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export const EventTicketOptionDetails = ({
  id,
  ticketType,
  price,
  quantity = 0,
}: IEventTicketOptions) => {
  return (
    <div className="grid grid-cols-4 text-lg max-[700px]:text-sm text-[#FBFBFB]/75">
      <div className="p-4 text-start">{ticketType}</div>
      <div className="p-4 text-center">${price}</div>
      <div className="p-4 text-center">{quantity}</div>
      <div className="p-4 text-end px-5">${price * quantity}</div>
    </div>
  );
};
