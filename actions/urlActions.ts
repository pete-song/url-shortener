import { db } from "@/db/drizzle";
import { urls } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

interface Url {
  id: number;
  originalUrl: string;
  shortenedUrl: string;
  createdAt: Date;
  visits: number | null;
}

export const getUrls = async (): Promise<Url[]> => {
  const data = await db.select().from(urls).orderBy(desc(urls.createdAt));
  return data as Url[]; 
};

export const findExistingUrl = async (originalUrl: string) => {
  try {
    const existingUrl = await db.select({ shortenedUrl: urls.shortenedUrl }).from(urls).where(eq(urls.originalUrl, originalUrl)).limit(1);
    return existingUrl[0]; 
  } catch (error) {
    console.error("Error finding existing URL:", error);
    return undefined;
  }
};

export const addUrl = async (originalUrl: string, shortenedUrl: string) => {
  try {
    await db.insert(urls).values({
      originalUrl: originalUrl,
      shortenedUrl: shortenedUrl,
    });
  } catch (error) {
    console.error("Error adding URL:", error);
    throw error; 
  }
};

export const incrementVisitCount = async (shortenedUrl: string) => {
  try {
    await db
      .update(urls)
      .set({ visits: sql`${urls.visits} + 1` })
      .where(eq(urls.shortenedUrl, shortenedUrl));
  } catch (error) {
    console.error("Error incrementing visit count:", error);
  }
};

export const deleteUrl = async (id: number) => {
  try {
    await db.delete(urls).where(eq(urls.id, id));
  } catch (error) {
    console.error("Error deleting URL:", error);
    throw error;
  }
};