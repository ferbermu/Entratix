import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { z } from 'zod';

interface Params {
  params: {
    id: string;
  };
}

const updateArtistSchema = z.object({
    name: z.string().min(1, 'Name is required.').optional(),
    description: z.string().min(1, 'Description is required.').optional(),
    socialLinks: z.array(z.string().url('Each social link must be a valid URL.')).optional(),
});

export async function GET(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid artist ID.' }, { status: 400 });
    }

    const artist = await prisma.artist.findUnique({
      where: { id },
      include: {
        events: {
          include: {
            event: true,
          },
        },
      },
    });

    if (!artist) {
      return NextResponse.json({ error: 'Artist not found.' }, { status: 404 });
    }

    return NextResponse.json(artist);
  } catch (error) {
    console.error(`Error fetching artist ${params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the artist.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid artist ID.' }, { status: 400 });
    }

    const json = await request.json();
    const data = updateArtistSchema.parse(json);

    const updatedArtist = await prisma.artist.update({
      where: { id },
      data: data,
    });

    return NextResponse.json(updatedArtist);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
        return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
        return NextResponse.json({ error: 'Artist not found.' }, { status: 404 });
    }
    console.error(`Error updating artist ${params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while updating the artist.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid artist ID.' }, { status: 400 });
    }

    await prisma.artist.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
        return NextResponse.json({ error: 'Artist not found.' }, { status: 404 });
    }
    console.error(`Error deleting artist ${params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the artist.' },
      { status: 500 }
    );
  }
}
