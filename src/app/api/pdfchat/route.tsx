import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats, messages as _messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { Message } from "ai/react";
import { auth } from "@clerk/nextjs";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const { messages, chatId } = await req.json();
    console.log("[pdfchat] Incoming request", { userId, chatId, messageCount: messages?.length });
    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
    if (_chats.length !== 1 || _chats[0].userId !== userId) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    // Simple per-chat rate limit: max 3 user questions
    const existingMessages = await db
      .select()
      .from(_messages)
      .where(eq(_messages.chatId, chatId));

    const userMessagesCount = existingMessages.filter(
      (m) => m.role === "user",
    ).length;

    if (userMessagesCount >= 3) {
      return NextResponse.json(
        {
          error:
            "Chat limit reached: you can only ask 3 questions about this PDF.",
        },
        { status: 429 },
      );
    }

    const fileKey = _chats[0].fileKey;

    const lastMessage = messages[messages.length - 1];
    const context = await getContext(lastMessage.content, fileKey);
    const prompt = {
      role: "system",
      content: `You are an enthusiastic AI virtual study assistant. Use the following pieces of context to answer the user.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.

If the question is not related to the context , politely respond that you are tuned to only answer questions that are related to the context.
      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK
 “Don’t justify your answers. Don’t give information not mentioned in the CONTEXT INFORMATION.”

      `,
    };

    console.log("[pdfchat] Calling OpenAI chat.completions.create", {
      model: "gpt-3.5-turbo",
      chatId,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        prompt,
        ...messages.filter((message: Message) => message.role == "user"),
      ],
      stream: true,
    });

    const stream = OpenAIStream(response, {
      onStart: async () => {
        //save user message into db
        await db.insert(_messages).values({
          chatId,
          role: "user",
          content: lastMessage.content,
        });
      },
      onCompletion: async (completion) => {
        await db.insert(_messages).values({
          chatId,
          role: "system",
          content: completion,
        });
      },
    });
    console.log("[pdfchat] Streaming response for chat", { chatId });
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("[pdfchat] Error handling request", error);
    return NextResponse.json(
      { error: "Internal server error while processing PDF chat" },
      { status: 500 },
    );
  }
}
