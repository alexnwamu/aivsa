import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// /api/create-chat
export async function POST(req: Request, res: Response) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log("[create-chat] Incoming request", {
      file_key,
      file_name,
      userId,
    });

    const existingChats = await db
      .select()
      .from(chats)
      .where(eq(chats.userId, userId));

    if (existingChats.length >= 1) {
      console.warn("[create-chat] Upload limit reached for user", { userId });
      return NextResponse.json(
        { error: "Upload limit reached: you can only upload 1 PDF." },
        { status: 429 },
      );
    }

    console.log("[create-chat] Starting S3→Pinecone pipeline", { file_key });
    await loadS3IntoPinecone(file_key);
    console.log("[create-chat] Completed S3→Pinecone pipeline", { file_key });
    const chat_id = await db
      .insert(chats)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfUrl: getS3Url(file_key),
        userId,
      })
      .returning({
        insertedId: chats.id,
      });

    return NextResponse.json(
      {
        chat_id: chat_id[0].insertedId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
