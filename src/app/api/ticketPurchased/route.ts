import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { TicketStatus } from '@prisma/client';
import { randomBytes } from 'crypto';

export async function GET() {
  try {
    const ticketsPurchased = await prisma.ticketPurchased.findMany({
      include: {
        user: true,
        ticket: true,
      },
    });
    return NextResponse.json(ticketsPurchased);
  } catch (error) {
    console.error('[TICKET_PURCHASED_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ticketTypeId, userId, status } = body;

    if (!ticketTypeId) {
      return new NextResponse('Ticket Type ID is required', { status: 400 });
    }
    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    const code = randomBytes(8).toString('hex');

    const ticketPurchased = await prisma.ticketPurchased.create({
      data: {
        ticketTypeId: Number(ticketTypeId),
        userID: Number(userId),
        code,
        status: status || TicketStatus.Pending,
      },
      include: {
        user: true,
        ticket: true,
      }
    });

    return NextResponse.json(ticketPurchased, { status: 201 });
  } catch (error) {
    console.error('[TICKET_PURCHASED_POST]', error);
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2003') {
        return new NextResponse('The provided user ID or ticket type ID does not exist.', { status: 400 });
    }
    return new NextResponse('Internal error', { status: 500 });
  }
} 