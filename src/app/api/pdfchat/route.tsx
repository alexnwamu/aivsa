import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats, messages as _messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { Message } from "ai/react";
export const runtime = "edge";
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);
export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();
    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
    if (_chats.length != 1) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
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

    const response = await openai.createChatCompletion({
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
    return new StreamingTextResponse(stream);
  } catch (error) {}
}
