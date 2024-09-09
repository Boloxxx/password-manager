import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(request: Request, { params }: { params: { itemId: string } }) {
  try {
    const { itemId } = params;

    if (!itemId) {
      return NextResponse.json({ message: 'Invalid itemId' }, { status: 400 });
    }

    const deletedElement = await db.element.delete({
      where: { id: itemId },
    });

    return NextResponse.json(deletedElement);
  } catch (error) {
    console.error('Error deleting element:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
