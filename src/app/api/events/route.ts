import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

// Zod Schema for validation
const ticketTypeSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().datetime(),
  location: z.string().min(1),
  address: z.string().min(1),
  imageUrl: z.array(z.string().url()).min(1),
  producerId: z.number().int(),
  artistIds: z.array(z.number().int()).optional(),
  tagIds: z.array(z.number().int()).optional(),
  ticketTypes: z.array(ticketTypeSchema).min(1),
});

export async function GET() {
  try {
    const events = await prisma.events.findMany({
      include: {
        producer: {
          select: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
        artists: {
          include: {
            artist: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        ticketTypes: true,
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching events.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = createEventSchema.parse(json);

    // Prisma Transaction to ensure all or nothing
    const newEvent = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const event = await tx.events.create({
        data: {
          title: data.title,
          description: data.description,
          date: data.date,
          location: data.location,
          address: data.address,
          imageUrl: data.imageUrl,
          producer: {
            connect: { id: data.producerId },
          },
        },
      });

      if (data.artistIds && data.artistIds.length > 0) {
        await tx.artistsOnEvents.createMany({
          data: data.artistIds.map((artistId: number) => ({
            eventId: event.id,
            artistId: artistId,
          })),
        });
      }

      if (data.tagIds && data.tagIds.length > 0) {
        await tx.tagsOnEvents.createMany({
          data: data.tagIds.map((tagId: number) => ({
            eventId: event.id,
            tagId: tagId,
          })),
        });
      }

      if (data.ticketTypes && data.ticketTypes.length > 0) {
        await tx.ticketType.createMany({
            data: data.ticketTypes.map((tt: {name: string, price: number, quantity: number}) => ({
                name: tt.name,
                price: tt.price,
                quantity: tt.quantity,
                eventId: event.id
            }))
        });
      }

      return event;
    });

    // Fetch the full event to return it in the response
    const fullEvent = await prisma.events.findUnique({
        where: { id: newEvent.id },
        include: {
            artists: { include: { artist: true }},
            tags: { include: { tag: true }},
            ticketTypes: true,
            producer: true
        }
    });

    return NextResponse.json(fullEvent, { status: 201 });

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the event.' },
      { status: 500 }
    );
  }
}
