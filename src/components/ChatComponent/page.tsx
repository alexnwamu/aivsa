"use client";
import { Loader2 } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { useChat } from "ai/react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import MessageList from "../MessageList.tsx/page";

type Props = {
  chatId: number;
};
const ChatComponent = ({ chatId }: Props) => {
  const { input, isLoading, messages, handleSubmit, handleInputChange } =
    useChat({
      api: "/api/pdfchat",
        body:{
            chatId
        }
    });

    React.useEffect(()=>{
        const messageContainer = document.getElementById('message-container');
        messageContainer?.scrollTo({
            top:messageContainer.scrollHeight,
            behavior:'smooth'

        } );

    },[messages])
  return (
    <div className="relative max-h-screen overflow-scroll" id='message-container'>
      <div className="sticky top-0 inset-x-0 p-2 h-fit ">
        <h3 className="text-xl font-bold"> Chat</h3>
      </div>
      <MessageList messages={messages} isLoading={isLoading} />
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 p-2 py-4"
      >
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask questions about your material.."
            className="w-full"
          />

          <Button className="ml-2">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
;

export default ChatComponent;
