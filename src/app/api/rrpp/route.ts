import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const rrpps = await prisma.rRPP.findMany({
      include: {
        user: true,
        parentRrpp: true,
        subRRPPs: true,
      },
    });
    return NextResponse.json(rrpps);
  } catch (error) {
    console.error('[RRPP_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, parentRrppId } = body;

    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    const data: { userId: number; parentRrppId?: number } = {
        userId: Number(userId),
    };

    if (parentRrppId) {
        data.parentRrppId = Number(parentRrppId);
    }

    const rrpp = await prisma.rRPP.create({
      data,
      include: {
        user: true,
        parentRrpp: true,
      }
    });

    return NextResponse.json(rrpp, { status: 201 });
  } catch (error) {
    console.error('[RRPP_POST]', error);
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
        return new NextResponse('A RRPP with this user ID already exists.', { status: 409 });
    }
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2003') {
        return new NextResponse('The provided user ID or parent RRPP ID does not exist.', { status: 400 });
    }
    return new NextResponse('Internal error', { status: 500 });
  }
}
