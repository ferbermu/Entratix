import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../../../lib/prisma';

interface Segments {
    params: {
        id: string;
    }
}
export async function GET(request: Request, { params }: Segments) {

    const { id } = params;
    const todo = await prisma.todo.findFirst ({ where: { id } });

    if (!todo) {
        return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }


    return NextResponse.json(todo);
}


export async function PUT(request: Request, { params }: Segments) {

    const { id } = params;
    const todo = await prisma.todo.findFirst ({ where: { id } });

    if (!todo) {
        return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    
    const body = await request.json();


    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { ...body }
    });

    return NextResponse.json(updatedTodo);
}



export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Iniciando operación DELETE...', params.id);

    const deletedEvent = await prisma.todo.delete({
      where: { id: params.id }
    });

    console.log('Evento eliminado:', deletedEvent);
    
    return NextResponse.json({ 
      message: 'Evento eliminado exitosamente',
      event: deletedEvent 
    });

  } catch (error) {
    console.error('Error al eliminar:', error);
    return NextResponse.json({ 
      error: 'Error al eliminar el evento',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}