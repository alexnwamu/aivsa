import { db } from "@/lib/db";
import { chats, messages } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

export async function DELETE(
  req: Request,
  { params }: { params: { chatId: string } },
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const chatIdNum = Number(params.chatId);
  if (Number.isNaN(chatIdNum)) {
    return NextResponse.json({ error: "invalid chat id" }, { status: 400 });
  }

  try {
    const existing = await db
      .select()
      .from(chats)
      .where(and(eq(chats.id, chatIdNum), eq(chats.userId, userId)));

    if (!existing.length) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }

    await db.delete(messages).where(eq(messages.chatId, chatIdNum));
    await db.delete(chats).where(eq(chats.id, chatIdNum));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[delete-chat] error deleting chat", { chatId: chatIdNum, error });
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
