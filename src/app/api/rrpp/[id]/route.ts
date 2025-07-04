import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse('RRPP ID is required', { status: 400 });
    }

    const rrpp = await prisma.rRPP.findUnique({
      where: {
        id: parseInt(params.id, 10),
      },
      include: {
        user: true,
        parentRrpp: true,
        subRRPPs: true,
      },
    });

    if (!rrpp) {
      return new NextResponse('RRPP not found', { status: 404 });
    }

    return NextResponse.json(rrpp);
  } catch (error) {
    console.error('[RRPP_ID_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse('RRPP ID is required', { status: 400 });
    }

    const body = await req.json();
    const { parentRrppId } = body;

    const rrpp = await prisma.rRPP.update({
      where: {
        id: parseInt(params.id, 10),
      },
      data: {
        parentRrppId: parentRrppId ? parseInt(parentRrppId, 10) : null,
      },
    });

    return NextResponse.json(rrpp);
  } catch (error) {
    console.error('[RRPP_ID_PUT]', error);
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2025') {
        return new NextResponse('RRPP not found', { status: 404 });
    }
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2003') {
        return new NextResponse('The provided parent RRPP ID does not exist.', { status: 400 });
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
            return new NextResponse("RRPP ID is required", { status: 400 });
        }

        await prisma.rRPP.delete({
            where: {
                id: parseInt(params.id, 10),
            },
        });

        return new NextResponse(null, { status: 204 });

    } catch (error) {
        console.error('[RRPP_ID_DELETE]', error);
        if (error instanceof Error && 'code' in error && (error as any).code === 'P2025') {
            return new NextResponse('RRPP not found', { status: 404 });
        }
        return new NextResponse("Internal error", { status: 500 });
    }
}
