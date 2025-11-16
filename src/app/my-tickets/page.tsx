'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Header } from './Header';
import { TicketAdquired } from './TicketAdquired';
import { CardTicket, CardTicketProps } from './CardTicket';
import { TotalTickets } from './TotalTickets';
import { getUserTickets, getUserOrders } from '../actions/orders';
import { useAuthRedux } from '../login/hooks/useAuthRedux';

type TicketStatusFilter = 'all' | 'Active' | 'Completed' | 'Expired';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      type: 'spring',
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 },
  },
};

export default function MyTicketsPage() {
  const { user, isAuthenticated } = useAuthRedux();
  const [allTickets, setAllTickets] = useState<CardTicketProps[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<CardTicketProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [statusFilter, setStatusFilter] = useState<TicketStatusFilter>('all');

  useEffect(() => {
    const fetchUserTickets = async () => {
      if (!user || !isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        const userTicketsData = await getUserTickets(String(user.id));
        const userOrders = await getUserOrders(String(user.id));

        const ticketsByOrder: Record<string, typeof userTicketsData> = {};
        userTicketsData.forEach(ticket => {
          if (!ticketsByOrder[ticket.orderId]) {
            ticketsByOrder[ticket.orderId] = [];
          }
          ticketsByOrder[ticket.orderId].push(ticket);
        });

        const formattedTickets: CardTicketProps[] = Object.entries(
          ticketsByOrder
        )
          .map(([, orderTickets]) => {
            const firstTicket = orderTickets[0];
            const event = firstTicket.event;
            const ticket = firstTicket.ticket;
            const order = firstTicket.order;

            if (!event || !ticket || !order) {
              return null;
            }

            const eventDate = new Date(event.date);
            const now = new Date();
            const isExpired = eventDate < now;
            const isActive = orderTickets.every(t => t.status === 'active');

            let status: 'Active' | 'Expired' | 'Completed' = 'Active';
            if (isExpired) {
              status = 'Expired';
            } else if (!isActive) {
              status = 'Completed';
            }

            const totalPrice = parseFloat(order.total);
            const ticketCount = orderTickets.length;

            return {
              status,
              imageUrl: event.cardImageUrl || '/assets/party.png',
              title: event.title,
              artists: 'Various Artists',
              date: eventDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              }),
              time: event.startTime,
              location: `${event.location}, ${event.address}`,
              ticketType: `${ticketCount}× ${ticket.type}`,
              ticketPrice: `$${parseFloat(ticket.price).toFixed(2)}`,
              totalPaid: `$${totalPrice.toFixed(2)}`,
            };
          })
          .filter((ticket): ticket is CardTicketProps => ticket !== null);

        setAllTickets(formattedTickets);
        setFilteredTickets(formattedTickets);

        const spent = userOrders
          .filter(order => order.status === 'completed')
          .reduce((sum, order) => sum + parseFloat(order.total), 0);
        setTotalSpent(spent);

        const uniqueEvents = new Set(
          userTicketsData.map(t => (t.event ? t.event.id : ''))
        );
        setTotalEvents(uniqueEvents.size);

        setTotalTickets(userTicketsData.length);
      } catch (error) {
        console.error('Error fetching user tickets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTickets();
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredTickets(allTickets);
    } else {
      const filtered = allTickets.filter(
        ticket => ticket.status === statusFilter
      );
      setFilteredTickets(filtered);
    }
  }, [statusFilter, allTickets]);

  if (!isAuthenticated) {
    return (
      <div className="w-full h-full min-h-screen px-4 sm:px-8 md:px-16 lg:px-60 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-400">
            You need to be logged in to view your tickets
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-screen px-4 sm:px-8 md:px-16 lg:px-60 text-white flex items-center justify-center">
        <div className="text-xl">Cargando tus tickets...</div>
      </div>
    );
  }

  const getEmptyMessage = (): { title: string; message: string } => {
    switch (statusFilter) {
      case 'Active':
        return {
          title: 'No hay tickets activos',
          message: 'No tienes tickets disponibles para usar en eventos futuros',
        };
      case 'Completed':
        return {
          title: 'No hay tickets completados',
          message: 'No has utilizado ningún ticket aún',
        };
      case 'Expired':
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
    <div className="w-full h-full min-h-screen px-4 sm:px-8 md:px-16 lg:px-60 text-white">
      <Header />
      <div className="py-8">
        <TotalTickets
          totalSpent={totalSpent}
          totalEvents={totalEvents}
          totalTickets={totalTickets}
        />
        <div className="py-6">
          <TicketAdquired
            selected={statusFilter}
            onSelect={status => setStatusFilter(status as TicketStatusFilter)}
          />
        </div>

        {filteredTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🎫</div>
            <h2 className="text-2xl font-bold mb-2">
              {getEmptyMessage().title}
            </h2>
            <p className="text-gray-400">{getEmptyMessage().message}</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <AnimatePresence mode="popLayout">
              {filteredTickets.map((ticket, index) => (
                <motion.div
                  key={`${ticket.title}-${index}`}
                  variants={item}
                  layout
                >
                  <CardTicket {...ticket} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
