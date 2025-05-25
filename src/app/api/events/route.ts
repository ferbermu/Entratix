import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { CardProps } from '../../components/Card';

export async function GET(request: Request) { 
  try {
    console.log('Iniciando operación GET...');
    
    await prisma.todo.deleteMany();
    console.log('Registros eliminados correctamente');

    const eventData: CardProps[] = [
      {
        title: 'ArtLab presents Eddy M & more',
        address: 'ADDRESS GOES HERE',
        date: 'DATE HERE',
        imageUrl: '/assets/show1.jpg',
        dateIcon: '/assets/icons/cards/calendar_month.svg',
        addressIcon: '/assets/icons/cards/location.svg',
      },
    ];

    console.log('Intentando crear eventos:', eventData);

    await prisma.todo.createMany({
      data: eventData
    });

    console.log('Eventos creados exitosamente');
    return NextResponse.json({ message: 'Eventos creados exitosamente' });
    
  } catch (error) {
    console.error('Error detallado:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
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