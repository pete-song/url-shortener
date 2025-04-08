import { incrementVisitCount } from '@/actions/urlActions';
import { db } from '@/db/drizzle';
import { urls } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const pathnameParts = url.pathname.split('/');
  const shortenedUrl = pathnameParts[pathnameParts.length - 1];

  if (!shortenedUrl) {
    return new NextResponse("Shortened URL not provided", { status: 400 });
  }

  await incrementVisitCount(shortenedUrl);

  const urlData = await db.select()
    .from(urls)
    .where(eq(urls.shortenedUrl, shortenedUrl))
    .limit(1);

  if (urlData.length > 0) {
    redirect(urlData[0].originalUrl);
  } else {
    return new NextResponse("Shortened URL not found", { status: 404 });
  }
}
