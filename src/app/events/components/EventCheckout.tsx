import React, { useState } from 'react';

interface IEventCheckout {
  ticketOptions: IEventTicketOptions[];
}

export const EventCheckout = ({ ticketOptions }: IEventCheckout) => {
  return (
    <table className=" w-full bg-[#3BAFBB0D]  rounded-lg overflow-hidden  table-fixed divide-y divide-[#3BAFBB29]">
      <thead>
        <tr className="text-[#3BAFBB] text-lg  ">
          <th className="text-start pl-4 p-4  font-normal ">Ticket</th>
          <th className="font-normal ">Price</th>
          <th className="font-normal justify-end flex p-4">
            <div className="flex w-fit px-14">Buy</div>
          </th>
        </tr>
      </thead>
      <tbody className="w-full divide-y divide-[#3BAFBB29]">
        {ticketOptions.map((ticketOption, key) => (
          <EventTicketOptions
            key={key}
            id={ticketOption.id}
            ticketType={ticketOption.ticketType}
            price={ticketOption.price}
          />
        ))}
      </tbody>
    </table>
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
  quantity = 0,
}: IEventTicketOptions) => {
  const [count, setCount] = useState(0);

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <tr className=" rounded-lg text-2xl ">
      <td className="p-4 text-start  ">{ticketType}</td>
      <td className="p-4 text-center ">${price}</td>

      <td className="p-4  flex justify-end items-center  ">
        <div className="flex gap-6 w-fit  items-center ">
          <button
            onClick={handleDecrement}
            className="bg-[#3BAFBB1A]/90 h-10 w-10 rounded-lg text-2xl cursor-pointer hover:bg-[#3BAFBB1A] "
          >
            -
          </button>
          <span>{count}</span>

          <button
            onClick={() => setCount(count + 1)}
            className="bg-[#3BAFBB] h-10 w-10 rounded-lg text-2xl  cursor-pointer hover:bg-[#3BAFBB]/80"
          >
            +
          </button>
        </div>
      </td>
    </tr>
  );
};
