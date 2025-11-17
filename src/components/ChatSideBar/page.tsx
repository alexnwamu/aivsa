'use client';
import { DrizzleChat } from "@/lib/db/schema";
import React from "react";

import { MessageCircle, PlusCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  const router = useRouter();

  const handleDelete = async (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const confirmDelete = window.confirm("Delete this chat?");
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`/api/chats/${id}`);
      toast.success("Chat deleted");
      if (id === chatId) {
        router.push("/");
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting chat", error);
      toast.error("Failed to delete chat");
    }
  };

  return (
    <div className="w-full h-screen overflow-scroll mt-4  p-4 text-gray-200 ">
      <Link href="/">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>

      <div className="flex max-h-screen overflow-scroll pb-20 flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-blue-600 text-[#ECFIF4] dark:text-white": chat.id === chatId,
                "hover:bg-[#ECF1F4] dark:hover:bg-[#131826] dark:hover:text-white dark:text-[#ECF1F4] text-black": chat.id !== chatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="flex-1 overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                {chat.pdfName}
              </p>
              <button
                type="button"
                onClick={(e) => handleDelete(chat.id, e)}
                className="ml-2 inline-flex items-center justify-center rounded-md px-2 py-1 text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
