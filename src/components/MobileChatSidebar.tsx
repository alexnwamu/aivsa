"use client";

import React from "react";
import { DrizzleChat } from "@/lib/db/schema";
import ChatSideBar from "./ChatSideBar/page";
import { Menu, X } from "lucide-react";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const MobileChatSidebar = ({ chats, chatId }: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* trigger bar - mobile only */}
      <div className="flex items-center justify-between lg:hidden px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-background">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-100"
        >
          <Menu className="w-4 h-4" />
          <span>Previous chats</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-4/5 max-w-xs bg-[#020617] text-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <span className="font-semibold text-sm">Your chats</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-md p-1 hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* reuse existing sidebar inside the drawer */}
            <div className="flex-1 overflow-y-auto">
              <ChatSideBar chats={chats} chatId={chatId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileChatSidebar;
