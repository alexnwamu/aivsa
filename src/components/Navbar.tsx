"use client";
import React from "react";

import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/dark-mode-toggle";

import { useSession } from "@clerk/nextjs";
const Navbar = () => {
  const { isSignedIn } = useSession();
  return (
    <div className=" p-4 flex h-14 items-center justify-between supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <span className="font-bold">AI VSA</span>
      <div className="flex items-center gap-2">
        {" "}
        <ModeToggle /> {isSignedIn ? <UserButton afterSignOutUrl="/" /> : ""}
      </div>
    </div>
  );
};

export default Navbar;
