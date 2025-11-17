import ChatComponent from "@/components/ChatComponent/page";
import PDFViewer from "@/components/PDFViewer.tsx/page";
import ChatSideBar from "@/components/ChatSideBar/page";
import MobileChatSidebar from "@/components/MobileChatSidebar";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
    if(!_chats){
return redirect("/")
    }
    if(!_chats.find(chat=> chat.id === parseInt(chatId))){
return redirect("/")

    }
    const currentChat = _chats.find(chat=> chat.id === parseInt(chatId))
  return(

    <div className="flex w-full min-h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* chat sidebar - desktop only */}
      <div className="hidden lg:block lg:flex-[1] lg:max-w-xs border-r border-slate-200">
        <ChatSideBar chats={_chats} chatId={parseInt(chatId)}  /> 
      </div>
      {/* main content including mobile chats trigger */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* mobile previous chats trigger & drawer */}
        <MobileChatSidebar chats={_chats} chatId={parseInt(chatId)} />
        {/* pdf viewer */}
        <div className="flex-[3] min-h-0 max-h-full p-4 border-b lg:border-b-0 lg:border-r border-slate-200 overflow-y-auto">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        {/* chat component */}
        <div className="flex-[2] min-h-0 max-h-full border-t lg:border-t-0 lg:border-l-4 border-l-slate-200">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>

  ) 
};

export default ChatPage;
