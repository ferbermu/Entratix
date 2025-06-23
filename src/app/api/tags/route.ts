import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { z } from 'zod';

const tagSchema = z.object({
  name: z.string().min(1, 'Tag name is required.'),
});

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: { events: true },
        },
      },
      orderBy: {
        name: 'asc'
      }
    });
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching tags.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = tagSchema.parse(json);

    const newTag = await prisma.tag.create({
      data: {
        name: data.name,
      },
    });

    return NextResponse.json(newTag, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    // Handle unique constraint violation
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
        return NextResponse.json({ error: 'A tag with this name already exists.'}, { status: 409 });
    }
    console.error('Error creating tag:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the tag.' },
      { status: 500 }
    );
  }
}
