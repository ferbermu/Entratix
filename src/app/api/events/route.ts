'use server';

import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { events } from '../../../lib/db/schema/events';
import { and, desc, eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'nonfeatured' | 'carousel' | 'featured' | null

    let result: unknown[] = [];
    if (type === 'nonfeatured') {
      result = await db
        .select()
        .from(events)
        .where(and(eq(events.isFeatured, false), eq(events.isActive, true)))
        .orderBy(desc(events.createdAt));
    } else if (type === 'carousel') {
      result = await db
        .select()
        .from(events)
        .where(and(eq(events.isCarousel, true), eq(events.isActive, true)))
        .orderBy(desc(events.createdAt));
    } else if (type === 'featured') {
      result = await db
        .select()
        .from(events)
        .where(and(eq(events.isFeatured, true), eq(events.isActive, true)))
        .orderBy(desc(events.createdAt));
    } else {
      // default: all active
      result = await db
        .select()
        .from(events)
        .where(eq(events.isActive, true))
        .orderBy(desc(events.createdAt));
    }

    return NextResponse.json({ success: true, events: result });
  } catch (error) {
    console.error('API /api/events error:', error);
    return NextResponse.json({ success: false, events: [] }, { status: 500 });
  }
}


