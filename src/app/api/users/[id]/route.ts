import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid user ID.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        producer: true,
        rrpp: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(`Error fetching user ${params.id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the user.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid user ID.' }, { status: 400 });
    }

    const data = await request.json();
    const { email, password, role } = data;

    // Si se provee una nueva contraseña, hashearla.
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        email,
        password: data.password,
        role,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(`Error updating user ${params.id}:`, error);
    // Prisma tira un error específico si no encuentra el registro para actualizar
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
        return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'An error occurred while updating the user.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid user ID.' }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return new NextResponse('User deleted', { status: 200 }); 
  } catch (error) {
    console.error(`Error deleting user ${params.id}:`, error);
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
        return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'An error occurred while deleting the user.' },
      { status: 500 }
    );
  }
}