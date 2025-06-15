import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { CardProps } from '../../components/Card';


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


export async function POST(request: Request) {
  try {
    console.log('Iniciando operación POST...');
    
    const body = await request.json() as CardProps;
    console.log('Datos recibidos:', body);

    const newEvent = await prisma.todo.create({
      data: {
        title: body.title,
        address: body.address,
        date: body.date,
        imageUrl: body.imageUrl,
        dateIcon: body.dateIcon,
        addressIcon: body.addressIcon,
      }
    });

    console.log('Evento creado:', newEvent);
    return NextResponse.json({ 
      message: 'Evento creado exitosamente',
      event: newEvent 
    });
    
  } catch (error) {
    console.error('Error detallado:', error);
    return NextResponse.json({ 
      error: 'Error al crear el evento',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

