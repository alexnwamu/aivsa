import { NextRequest, NextResponse } from "next/server";
import { callChain } from "@/lib/langchain";
import { Message } from "ai";
export const runtime = "edge";
const formatMessage = (message: Message) => {
  return `${message.role === "user" ? "Human" : "Assistant"}: ${
    message.content
  }`;
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  let nameSpace = "seng407";
  nameSpace = body.nameSpace;

  const messages: Message[] = body.messages ?? [];
  console.log("Messages ", messages);
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const question = messages[messages.length - 1].content;

  if (!question) {
    return NextResponse.json("Error: No question in the request", {
      status: 400,
    });
  }

  try {
    const streamingTextResponse = callChain(
      {
        question,
        chatHistory: formattedPreviousMessages.join("\n"),
      },
      nameSpace,
    );

    return streamingTextResponse;
  } catch (error) {
    console.error("Internal server error ", error);
    return NextResponse.json("Error: Something went wrong. Try again!", {
      status: 500,
    });
  }
}
