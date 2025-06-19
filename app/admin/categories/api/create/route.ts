import { NextRequest, NextResponse } from 'next/server';
import { createCategoryAction } from '../../actions';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { error } = await createCategoryAction(body);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}