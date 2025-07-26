import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { UserRole } from '@prisma/client';

const createUserSchema = z.object({
    email: z.string().email('Invalid email format.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
    role: z.nativeEnum(UserRole).optional().default(UserRole.Client),
    description: z.string().optional(),
    image: z.string().url('Image must be a valid URL.').optional(),
    parentRrppId: z.number().int().optional(),
}).refine((data) => {
    if (data.role === UserRole.Producer) {
        return data.description != null && data.image != null;
    }
    return true;
}, {
    message: "For the Producer role, 'description' and 'image' fields are required.",
    path: ["description", "image"],
});

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      // Por seguridad, es buena práctica no devolver la contraseña.
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
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching users.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const validatedData = createUserSchema.parse(data);
        
        const { email, password, role, description, image, parentRrppId } = validatedData;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists.' },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role,
                }
            });

            if (role === UserRole.Producer) {
                // The refine ensures these are present
                await tx.producer.create({
                    data: {
                        description: description!,
                        image: image!,
                        userId: newUser.id
                    }
                });
            } else if (role === UserRole.RRPP) {
                await tx.rRPP.create({
                    data: {
                        userId: newUser.id,
                        parentRrppId: parentRrppId, // Can be null
                    }
                });
            }

            return newUser;
        });
        
        const fullUser = await prisma.user.findUnique({
            where: { id: result.id },
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                producer: true,
                rrpp: true,
            }
        });

        return NextResponse.json(fullUser, { status: 201 });

    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'An error occurred while creating the user.' },
            { status: 500 }
        );
    }
}