'use client';

import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { type DateRange } from 'react-day-picker';
import { TicketAdquired } from './TicketAdquired';
import { CardTicket, CardTicketProps } from './CardTicket';
import { TotalTickets } from './TotalTickets';
import { getUserTickets, getUserOrders } from '../actions/orders';
import { useAuthRedux } from '../login/hooks/useAuthRedux';

type TicketStatusFilter = 'all' | 'active' | 'used' | 'expired';

export default function MyTicketsPage() {
  const { user, isAuthenticated } = useAuthRedux();
  const [allTickets, setAllTickets] = useState<CardTicketProps[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<CardTicketProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [statusFilter, setStatusFilter] = useState<TicketStatusFilter>('all');
  const [,] = useState({
    searchTerm: '',
    dateRange: undefined as DateRange | undefined,
    location: '',
  });

  useEffect(() => {
    const fetchUserTickets = async () => {
      if (!isAuthenticated || !user?.id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Fetch user tickets
        const userTicketsData = await getUserTickets(user.id);

        // Group tickets by order to count quantities
        const ticketsByOrder = new Map<string, any[]>();
        userTicketsData.forEach((item: any) => {
          const orderId = item.order.id;
          if (!ticketsByOrder.has(orderId)) {
            ticketsByOrder.set(orderId, []);
          }
          ticketsByOrder.get(orderId)!.push(item);
        });

        // Format tickets for display
        const formattedTickets: CardTicketProps[] = Array.from(
          ticketsByOrder.entries()
        ).map(([orderId, orderTickets]) => {
          const firstTicket = orderTickets[0];
          const event = firstTicket.event;
          const order = firstTicket.order;

          // Count tickets by type
          const ticketTypeCounts = new Map<string, number>();
          orderTickets.forEach((t: any) => {
            const type = t.ticket.ticketType;
            ticketTypeCounts.set(type, (ticketTypeCounts.get(type) || 0) + 1);
          });

          // Format ticket type string (e.g., "2× VIP, 1× General")
          const ticketTypeStr = Array.from(ticketTypeCounts.entries())
            .map(([type, count]) => `${count}× ${type}`)
            .join(', ');

          // Determine status based on event date and ticket status
          const eventDate = new Date(event.date);
          const now = new Date();
          const isExpired = eventDate < now;
          const isActive = orderTickets.every(
            (t: any) => t.ticket.status === 'active'
          );

          let status: 'Active' | 'Expired' | 'Used' = 'Active';
          if (isExpired) {
            status = 'Expired';
          } else if (!isActive) {
            status = 'Used';
          }

          return {
            status,
            orderStatus: order.status, // Agregar estado de la orden
            imageUrl: event.cardImageUrl || '/assets/show1.jpg',
            title: event.title,
            artists: 'Various Artists', // TODO: Get from event artists
            date: new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            }),
            time: event.startTime,
            location: `${event.location}, ${event.address}`,
            ticketType: ticketTypeStr,
            ticketPrice: `$${parseFloat(order.subtotal).toFixed(2)}`,
            totalPaid: `$${parseFloat(order.total).toFixed(2)}`,
          };
        });

        setAllTickets(formattedTickets);
        setFilteredTickets(formattedTickets);

        // Calculate stats
        const orders = await getUserOrders(user.id);
        const completedOrders = orders.filter(
          (order: any) => order.status === 'completed'
        );

        const total = completedOrders.reduce(
          (sum: number, order: any) => sum + parseFloat(order.total),
          0
        );
        setTotalSpent(total);

        // Total events is the number of unique events
        setTotalEvents(ticketsByOrder.size);

        // Total tickets is the count of all user tickets
        setTotalTickets(userTicketsData.length);
      } catch (error) {
        console.error('Error fetching user tickets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTickets();
  }, [user, isAuthenticated]);

  // Filtrar tickets cuando cambia el filtro
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredTickets(allTickets);
    } else {
      const filtered = allTickets.filter(
        ticket => ticket.status.toLowerCase() === statusFilter.toLowerCase()
      );
      setFilteredTickets(filtered);
    }
  }, [statusFilter, allTickets]);

  if (!isAuthenticated) {
    return (
      <div className="w-full h-full min-h-screen px-60 max-[1400px]:px-4 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">
            Debes iniciar sesión para ver tus tickets
          </h2>
          <a
            href="/login"
            className="bg-[#3BAFBB] px-6 py-3 rounded-lg hover:bg-[#3BAFBB]/80"
          >
            Iniciar Sesión
          </a>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-screen px-60 max-[1400px]:px-4 text-white flex items-center justify-center">
        <div className="text-xl">Cargando tus tickets...</div>
      </div>
    );
  }

  const getEmptyMessage = (): { title: string; message: string } => {
    switch (statusFilter) {
      case 'active':
        return {
          title: 'No hay tickets activos',
          message: 'No tienes tickets disponibles para usar en eventos futuros',
        };
      case 'used':
        return {
          title: 'No hay tickets usados',
          message: 'No has utilizado ningún ticket aún',
        };
      case 'expired':
        return {
          title: 'No hay tickets expirados',
          message: 'No tienes tickets de eventos pasados o cancelados',
        };
      default:
        return {
          title: 'No tienes tickets aún',
          message: 'Explora nuestros eventos y compra tus primeros tickets',
        };
    }
  };

  return (
    <div className="w-full h-full min-h-screen px-60 max-[1400px]:px-4  text-white">
      <Header />
      <div className="py-8">
        <TicketAdquired
          activeFilter={statusFilter}
          onFilterChange={setStatusFilter}
        />
      </div>

      {allTickets.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl text-gray-400 mb-4">No tienes tickets aún</h2>
          <p className="text-gray-500 mb-6">
            Explora nuestros eventos y compra tus primeros tickets
          </p>
          <a
            href="/"
            className="bg-[#3BAFBB] px-6 py-3 rounded-lg hover:bg-[#3BAFBB]/80 inline-block"
          >
            Ver Eventos
          </a>
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl text-gray-400 mb-4">
            {getEmptyMessage().title}
          </h2>
          <p className="text-gray-500 mb-6">{getEmptyMessage().message}</p>
          <button
            onClick={() => setStatusFilter('all')}
            className="bg-[#3BAFBB] px-6 py-3 rounded-lg hover:bg-[#3BAFBB]/80 inline-block"
          >
            Ver Todos los Tickets
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 max-[1200px]:grid-cols-1 justify-center gap-8">
          {filteredTickets.map((ticket, idx) => (
            <CardTicket key={idx} {...ticket} />
          ))}
          <TotalTickets
            totalSpent={totalSpent}
            totalEvents={totalEvents}
            totalTickets={totalTickets}
          />
        </div>
      )}
    </div>
  );
}
