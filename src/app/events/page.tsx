'use client';
import { EventBanner } from './components/EventBanner';
import { EventData } from './components/EventData';

export default function Page() {
  return (
    <div className="grid grid-cols-3 gap-6 px-24 pt-8 ">
      <div className="col-span-2 ">
        <EventBanner />
      </div>
      <div className=" bg-blue-200">
        <EventData />
      </div>

      <div className="bg-red-400 col-span-3 text-center">
        aca va a ir la descripcion
      </div>
      <div className="bg-blue-400 col-span-3 text-center">artistas</div>

      <div className="col-span-2 bg-amber-700">Aca va a ir el checkout</div>
      <div className=" bg-blue-700">Aca va a ir la ubicacion</div>
      <div className="col-start-3 bg-green-400">Tags</div>
      <div className="col-start-3 bg-purple-500">Organizer</div>
    </div>
  );
}
