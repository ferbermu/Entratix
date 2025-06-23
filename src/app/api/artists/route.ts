import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { z } from 'zod';

const artistSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  description: z.string().min(1, 'Description is required.'),
  socialLinks: z.array(z.string().url('Each social link must be a valid URL.')).optional(),
});

export async function GET() {
  try {
    const artists = await prisma.artist.findMany({
      include: {
        _count: {
          select: { events: true },
        },
      },
    });
    return NextResponse.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching artists.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = artistSchema.parse(json);

    const newArtist = await prisma.artist.create({
      data: {
        name: data.name,
        description: data.description,
        socialLinks: data.socialLinks || [],
      },
    });

    return NextResponse.json(newArtist, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating artist:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the artist.' },
      { status: 500 }
    );
  }
}
