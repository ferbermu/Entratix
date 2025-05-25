import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET(request: Request) { 
  try {
    const todos = await prisma.todo.findMany();

    if (!todos.length) {
      return NextResponse.json({ 
        message: 'No hay todos disponibles' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      todos,
      count: todos.length 
    });

  } catch (error) {
    console.error('Error al obtener todos:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor' 
    }, { status: 500 });
  }
}