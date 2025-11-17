import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const existingChats = await db
      .select()
      .from(chats)
      .where(eq(chats.userId, userId));

    if (!existingChats.length) {
      return NextResponse.json(
        { error: "no existing chats" },
        { status: 404 },
      );
    }

    const chat = existingChats[0];

    return NextResponse.json(
      {
        chat_id: chat.id,
        pdfName: chat.pdfName,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[my-chat] Error fetching existing chat", { userId, error });
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
