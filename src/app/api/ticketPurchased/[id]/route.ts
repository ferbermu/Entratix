import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { TicketStatus } from '@prisma/client';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse('Ticket Purchased ID is required', { status: 400 });
    }

    const ticketPurchased = await prisma.ticketPurchased.findUnique({
      where: {
        id: parseInt(params.id, 10),
      },
      include: {
        user: true,
        ticket: true,
      },
    });

    if (!ticketPurchased) {
      return new NextResponse('Ticket Purchased not found', { status: 404 });
    }

    return NextResponse.json(ticketPurchased);
  } catch (error) {
    console.error('[TICKET_PURCHASED_ID_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse('Ticket Purchased ID is required', { status: 400 });
    }

    const body = await req.json();
    const { status } : { status?: TicketStatus } = body;

    if (!status) {
        return new NextResponse('Status is required for update', { status: 400 });
    }
    
    if (!Object.values(TicketStatus).includes(status)) {
        return new NextResponse(`Invalid status value. Valid values are: ${Object.values(TicketStatus).join(', ')}`, { status: 400 });
    }

    const ticketPurchased = await prisma.ticketPurchased.update({
      where: {
        id: parseInt(params.id, 10),
      },
      data: {
        status,
      },
    });

    return NextResponse.json(ticketPurchased);
  } catch (error) {
    console.error('[TICKET_PURCHASED_ID_PUT]', error);
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2025') {
        return new NextResponse('Ticket Purchased not found', { status: 404 });
    }
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        if (!params.id) {
            return new NextResponse("Ticket Purchased ID is required", { status: 400 });
        }

        await prisma.ticketPurchased.delete({
            where: {
                id: parseInt(params.id, 10),
            },
        });

        return new NextResponse("ticket purchased deleted", { status: 200 });

    } catch (error) {
        console.error('[TICKET_PURCHASED_ID_DELETE]', error);
        if (error instanceof Error && 'code' in error && (error as any).code === 'P2025') {
            return new NextResponse('Ticket Purchased not found', { status: 404 });
        }
        return new NextResponse("Internal error", { status: 500 });
    }
} 