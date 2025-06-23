import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { z } from 'zod';

interface Params {
  params: {
    id: string;
  };
}

const updateTagSchema = z.object({
  name: z.string().min(1, 'Tag name is required.'),
});

export async function GET(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid tag ID.' }, { status: 400 });
    }

    const tag = await prisma.tag.findUnique({
      where: { id },
      include: {
        events: {
          include: {
            event: {
              select: { id: true, title: true, date: true }
            }
          }
        }
      },
    });

    if (!tag) {
      return NextResponse.json({ error: 'Tag not found.' }, { status: 404 });
    }

    return NextResponse.json(tag);
  } catch (error) {
    console.error(`Error fetching tag ${params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the tag.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid tag ID.' }, { status: 400 });
    }

    const json = await request.json();
    const data = updateTagSchema.parse(json);

    const updatedTag = await prisma.tag.update({
      where: { id },
      data: { name: data.name },
    });

    return NextResponse.json(updatedTag);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
        return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
        return NextResponse.json({ error: 'A tag with this name already exists.'}, { status: 409 });
    }
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
        return NextResponse.json({ error: 'Tag not found.' }, { status: 404 });
    }
    console.error(`Error updating tag ${params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while updating the tag.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid tag ID.' }, { status: 400 });
    }

    await prisma.tag.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
        return NextResponse.json({ error: 'Tag not found.' }, { status: 404 });
    }
    console.error(`Error deleting tag ${params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the tag.' },
      { status: 500 }
    );
  }
}
