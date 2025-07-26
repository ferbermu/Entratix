import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid event ID.' }, { status: 400 });
    }

    const event = await prisma.events.findUnique({
      where: { id },
      include: {
        producer: true,
        artists: { include: { artist: true } },
        tags: { include: { tag: true } },
        ticketTypes: true,
      },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found.' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error(`Error fetching event ${params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the event.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid event ID.' }, { status: 400 });
    }

    const data = await request.json();

    // En una implementación real, aquí habría validación con Zod
    // y una lógica más compleja para actualizar relaciones many-to-many.
    
    const updatedEvent = await prisma.events.update({
      where: { id },
      data: data, // Actualiza solo los campos escalares que se envíen
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error(`Error updating event ${params.id}:`, error);
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
        return NextResponse.json({ error: 'Event not found.' }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'An error occurred while updating the event.' },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid event ID.' }, { status: 400 });
    }

    // Gracias a `onDelete: Cascade`, Prisma se encarga de borrar
    // los registros relacionados en TicketType, ArtistsOnEvents, TagsOnEvents.
    await prisma.events.delete({
      where: { id },
    });

    return new NextResponse('Event deleted successfully', { status: 200 }); // 204 No Content
  } catch (error) {
    console.error(`Error deleting event ${params.id}:`, error);
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
        return NextResponse.json({ error: 'Event not found.' }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'An error occurred while deleting the event.' },
      { status: 500 }
    );
  }
}

